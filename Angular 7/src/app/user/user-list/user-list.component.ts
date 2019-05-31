import { Component, OnInit, Renderer2 } from '@angular/core';
import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http'; 
import { ToastrService } from 'ngx-toastr';  
import { UserService } from '../shared/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers:[UserService]
})
export class UserListComponent implements OnInit {

  selectedUser:User;
  users:User[];
  constructor(private renderer: Renderer2,private userService:UserService,private http : Http) {
    this.renderer.setStyle(document.body, 'background-image',  'url(https://wallpapercave.com/wp/wp53625.jpg)' );
   }

  ngOnInit() {
    this.getUsers();
  }
  
  getUsers() {
    this.userService.getUsers().subscribe( (users: User[]) => {
      this.users = users;
      console.log(this.users);
    });
  }

    deleteUser(UserID: string) {
      this.userService.deleteUser( UserID ).subscribe( (user: User) => {
        this.getUsers();
      });
    }
}