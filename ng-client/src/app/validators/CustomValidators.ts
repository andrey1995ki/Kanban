import {AbstractControl, ValidationErrors} from "@angular/forms";

export class CustomValidators {
  static MatchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value
    const confirmPassword = control.get('confirmPassword')?.value
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({misMatch: true})
      return {misMatch: true}
    } else {
      control.get('confirmPassword')?.setErrors(null)
      return null
    }
  }
}
