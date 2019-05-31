import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User} from './user.model';
import {Http, Response, Headers, RequestMethod, RequestOptions} from "@angular/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser:User;
  userList:User;
  
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'http://localhost:54277/api';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', [Validators.required,Validators.email]],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
    console.log("isMatch: " + isMatch);
  }

  getUsers()
  {
    return this.http.get(this.BaseURI + '/User');
  }

  getUserById(Id: number): Observable<any> {
    return this.http.get(this.BaseURI+ '/User/'   + `${Id}`);
  }

  deleteUser(Id: string) {
    return this.http.delete(this.BaseURI+ '/User/' + `${Id}`);
  }

  editUser(user: User) {
    return this.http.put(this.BaseURI + '/User/' + `${user.Id}`, user);
  }

  checkAdminRole(): boolean {
      var isAdmin = false;
      var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var userRole = payLoad.role;
  
        if ( userRole== 'Admin') 
        {
          isAdmin = true;
        }
        return isAdmin;
  }

  checkUserRole(): boolean {
      var isUser = false;
      var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var userRole = payLoad.role;

        if ( userRole== 'Customer') 
        {
          isUser = true;
        }
      return isUser;
  }
}
