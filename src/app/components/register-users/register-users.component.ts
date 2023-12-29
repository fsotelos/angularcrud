import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User, Gender } from '../../interfaces/user'
import { UserServiceService } from 'src/app/services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { debounceTime, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.component.html',
  styleUrls: ['./register-users.component.css']
})
export class RegisterUsersComponent implements OnInit {
  form: FormGroup
  isValidForm: boolean = true;
  isInvalidPassword: boolean = false;
  isEditForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: UserServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      id: 0,
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      lastFirstName: ['', Validators.required],
      lastSecondName: ['', Validators.required],
      nickName: ['', Validators.required],
      email: ['',  [Validators.required, Validators.email],[this.validateEmailNotTaken.bind(this)]],
      phoneNumber: ['1', Validators.required],
      birthDay: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.form.value.id = + params['id'];
      if (this.form.value.id) {
        this.isEditForm = true;
        this.loadUser(this.form.value.id);
      }
    });
  }

  saveUser() {
    if (this.form.invalid)
      return;
    if (this.form.value.password != this.form.value.confirmPassword) {
      this.isInvalidPassword = true;
      return;
    }
    const user: User = {
      id: this.form.value.id,
      firstName: this.form.value.firstName,
      secondName: this.form.value.secondName,
      lastFirstName: this.form.value.lastFirstName,
      lastSecondName: this.form.value.lastSecondName,
      nickName: this.form.value.nickName,
      phoneNumber: this.form.value.phoneNumber,
      password: this.form.value.password,
      gender: Gender.Male,
      birthDayDate: this.form.value.birthDay,
      email: this.form.value.email,
      createdDate: new Date(),
      phoneCodeArea: '57'
    };
    if (user.id == 0) {
      this.service
        .addUser(user)
        .subscribe({
          next: (data) => {
            this._snackBar.open("User saved Successfully.", "OK!");
            this.router.navigate(["/listUsers"]);
          },
          error: (e) => {
            console.log(e);
          },
          complete: () => console.log('complete')
        })
    } else {
      this.service
        .editUser(user)
        .subscribe({
          next: (data) => {
            this._snackBar.open("User saved Successfully.", "OK!");
            this.router.navigate(["/listUsers"]);
          },
          error: (e) => {
            console.log(e);
          },
          complete: () => console.log('complete')
        })
    }
  }

  loadUser(idUser: number) {
    this.service.getUserById(idUser).subscribe({
      next: (data) => {
        var dateTransformated = this.datePipe.transform(data.result[0].birthDayDate,"yyyy-MM-dd")
        try {
          this.form.setValue({
            id: data.result[0].id,
            firstName: data.result[0].firstName,
            secondName: data.result[0].secondName,
            lastFirstName: data.result[0].lastFirstName,
            lastSecondName: data.result[0].lastSecondName,
            nickName: data.result[0].nickName,
            email: data.result[0].email,
            phoneNumber: data.result[0].phoneNumber,
            birthDay: dateTransformated,
            password: data.result[0].password,
            confirmPassword: data.result[0].password
          })
        } catch (e) {
          console.log(e); 
        }

      },
      error: (e) => console.log(e)
    })

  }

  validateEmailNotTaken(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return of(null);
  }
}
