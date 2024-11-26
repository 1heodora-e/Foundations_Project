export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  licenseNumber: string;
  password: string;
  rememberMe: boolean;
  agreeToTerms: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}
