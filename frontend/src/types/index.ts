export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
  agreeToTerms: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}
