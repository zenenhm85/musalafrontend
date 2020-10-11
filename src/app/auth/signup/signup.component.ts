import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  formSubmitted: boolean = false;

  public registerForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: this.equalsPassword('password', 'password2'),
    }
  );

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  createUser() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.userService.createUser(this.registerForm.value).subscribe(
      (resp) => {
        this.router.navigateByUrl('dashboard');
      },
      (err) => {
        console.log(err);
        Swal.fire('Error', err.error.message, 'error');
      }
    );
  }

  invalidFields(campo: string): boolean {
    return this.formSubmitted && this.registerForm.get(campo).invalid;
  }

  invalidPassword() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    return pass1 !== pass2 && this.formSubmitted;
  }

  equalsPassword(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ notEquals: true });
      }
    };
  }
}
