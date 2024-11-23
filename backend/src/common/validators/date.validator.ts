import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'isFutureDate', async: false })
export class IsFutureDateConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (!value) return false;
    const date = new Date(value);
    const now = new Date();
    return date > now;
  }

  defaultMessage() {
    return 'Date must be in the future';
  }
}

@ValidatorConstraint({ name: 'isPastDate', async: false })
export class IsPastDateConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (!value) return false;
    const date = new Date(value);
    const now = new Date();
    return date < now;
  }

  defaultMessage() {
    return 'Date must be in the past';
  }
}

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFutureDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsFutureDateConstraint,
    });
  };
}

export function IsPastDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPastDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsPastDateConstraint,
    });
  };
}
