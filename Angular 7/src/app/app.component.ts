import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user/shared/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Car Management System';
  isGuest=true;
  isUser=false;
  isAdmin=false;
  userDetails;

  constructor(private router: Router,private service : UserService){}

  ngOnInit()
  {
    if (localStorage.getItem('token') == null)
    {
      this.isGuest=true;
      this.isUser=false;
      this.isAdmin=false;    
    }
    else
    {
      this.isAdmin = this.service.checkAdminRole();
      if(this.isAdmin)
      {
        this.isGuest = false;
        this.isUser = false;
      }
      else
      {
        this.isUser = this.service.checkUserRole(); 
        if(this.isUser)
        {
          this.isGuest = false;
        }
        else{
          this.isGuest = true;
        }
      }

      this.getInfo();
  }
}
    
onLogout() {
  localStorage.removeItem('token');
  this.router.navigate(['home']);   
  location.replace('/');
}

  getInfo(){
    this.service.getUserProfile().subscribe(
         res => {
           this.userDetails = res;
         },
         err => {
           console.log(err);
         },
       );
       }
}

