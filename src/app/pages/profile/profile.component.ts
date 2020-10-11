import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  public user: User;
  public profileForm: FormGroup;
  public changePasswordForm
  public imgUpload: File;
  public imgTemp: any = null;

  

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });

    this.changePasswordForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
      repPassword2: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: this.equalsPassword('password2', 'repPassword2'),
    });
  }

  profileUpdate() {
    this.userService.updateProfile(this.profileForm.value).subscribe(
      () => {
        const { name, email } = this.profileForm.value;

        this.user.name = name;
        this.user.email = email;

        Swal.fire('Success!', 'Changes made successfully!', 'success');
      },
      (err) => {
        Swal.fire('Error', err.error.message, 'error');
      }
    );
  }
  imgChange(file: File) {
    this.imgUpload = file;

    if ( !file ) { 
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }
  imageUpload() {
    this.userService.updatePicture(this.imgUpload,this.user.id).then(img=>{
      console.log(img);
      this.user.img = img;
      Swal.fire('Success!', 'Image uploaded successfully!', 'success');
    }).catch(err => {
      Swal.fire('Error', 'Image could not be uploaded', 'error');
    });
  }
  changePassword() {
    console.log(this.changePasswordForm.value);
    this.userService.changePassword(this.changePasswordForm.value).subscribe(
      () => {
        Swal.fire('Success!', 'Password changed successfully!', 'success');
      },
      (err) => {
        Swal.fire('Error', err.error.message, 'error');
      }
    );
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
