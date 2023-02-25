import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/User";
import {Router} from "@angular/router";
import SwAl from "sweetalert2";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  idUser: number | any;
  newPassword: number | any;
  user: User | any;
  countNumber: number = 0;
  changePassForm = this.formBuilder.group({
    password: ['', {validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'}],
    newPassword: ['', {
      validators: [Validators.required, Validators.minLength(6), this.changePassValidator.bind(this)],
      updateOn: 'blur'
    }],
    confirmNewPassword: ['', {
      validators: [Validators.required, this.confirmPassValidator.bind(this)],
      updateOn: 'blur'
    }]
  });

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.changePassForm.controls['password'].valueChanges.subscribe(
      () => {
        this.changePassForm.controls['newPassword'].updateValueAndValidity();
      }
    )
    this.changePassForm.controls['newPassword'].valueChanges.subscribe(
      () => {
        this.changePassForm.controls['confirmNewPassword'].updateValueAndValidity();
      }
    )
    this.idUser = localStorage.getItem("idUser");
  }

  confirmPassValidator(control: FormControl): { [s: string]: boolean } | null {
    // @ts-ignore
    if (control.value !== '' && control.value !== control?.parent?.controls?.['newPassword'].value) {
      return {'notMatch': true};
    }
    return null
  }

  changePassValidator(control: FormControl): { [s: string]: boolean } | null {
    // @ts-ignore
    if (control.value !== '' && control.value === control?.parent?.controls?.['password'].value) {
      return {'notChange': true};
    }
    return null
  }

  clearValid(event: Event, messDiv: HTMLDivElement) {
    let input = event.target as HTMLInputElement
    input.classList.add('clear')
    messDiv.classList.add('hide')
  }

  checkValid(event: FocusEvent, messDiv: HTMLDivElement) {
    let input = event.target as HTMLInputElement
    input.classList.remove('clear')
    messDiv.classList.remove('hide')
  }

  saveChange() {
    if (!this.changePassForm.valid) {
      Object.keys(this.changePassForm.controls).forEach(field => {
        const control = this.changePassForm.get(field);
        control?.markAsTouched({onlySelf: true});
      });
    } else {
      this.userService.findById(this.idUser).subscribe(data => {
        this.user = data
        this.newPassword = this.changePassForm.value.newPassword;
        if (this.changePassForm.value.password == this.user.password) {
          this.user.password = this.newPassword
          this.userService.updatePass(this.user).subscribe(() => {
            localStorage.removeItem('idUser')
            SwAl.fire({
              title: 'You have successfully changed your password. Please login again!',
              icon: "success",
              showConfirmButton: false,
              showCloseButton: false,
              timer: 2000,
              customClass: {
                title: 'success-message',
                popup: 'popup',
                confirmButton: 'confirm-btn',
                closeButton: 'close-btn'
              }
            }).then()
            return this.router.navigateByUrl("/auth")
          })

        } else {
          this.countNumber = this.countNumber + 1
          // @ts-ignore
          if (this.countNumber == 3) {
            this.countNumber = 0
            SwAl.fire({
              title: 'You have entered your current password incorrectly more than 3 times. Please log in again!',
              icon: "error",
              showConfirmButton: false,
              showCloseButton: false,
              timer: 1500,
              customClass: {
                title: 'error-message',
                popup: 'popup',
                confirmButton: 'confirm-btn',
                closeButton: 'close-btn'
              }
            }).then()
            this.router.navigateByUrl("/auth").finally();
          } else {
            SwAl.fire({
              title: 'Current password is incorrect',
              icon: "error",
              showConfirmButton: false,
              showCloseButton: false,
              timer: 1500,
              customClass: {
                title: 'error-message',
                popup: 'popup',
                confirmButton: 'confirm-btn',
                closeButton: 'close-btn'
              }
            }).then()
          }
        }
      })
    }
  }
}
