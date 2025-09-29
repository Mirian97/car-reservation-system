import { FormGroup, ValidationErrors } from '@angular/forms';

export const passwordMatchValidator = (
  form: FormGroup,
): ValidationErrors | null => {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;
  if (password !== confirmPassword) {
    return { passwordMismatch: true };
  }
  return null;
};
