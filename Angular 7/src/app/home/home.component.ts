import { UserService } from '../user/shared/user.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType} from '@angular/common/http';
import { CarService } from '../cars/shared/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  userDetails;
  isGuest=true;

  constructor(private router: Router, private service: UserService,private http: HttpClient,private renderer: Renderer2) 
  { 
    this.renderer.setStyle(document.body, 'background-image',  'url(https://www.loudwallpapers.com/wp-content/uploads/2018/12/stylish-black-car-wallpaper-1920.jpg)' );
  }

  ngOnInit() { 
    if (localStorage.getItem('token') != null){
      this.service.getUserProfile().subscribe(
        res => {
          this.userDetails = res;
        },
        err => {
          console.log(err);
        },
      );
      this.isGuest=false;
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/home');
    window.location.reload();
  }
  
  login(){
    this.router.navigateByUrl('/login');
  }
}

