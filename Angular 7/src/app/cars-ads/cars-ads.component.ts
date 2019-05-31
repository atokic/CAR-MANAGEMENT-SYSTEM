import { Component, OnInit, Renderer2 } from '@angular/core';
import { Car } from '../cars/models/car.model';
import { CarService } from '../cars/shared/car.service';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material';
import { MyCarComponent } from '../cars/mycar.component';
import { UserService } from '../user/shared/user.service';

@Component({
  selector: 'app-cars-ads',
  templateUrl: './cars-ads.component.html',
  styleUrls: ['./cars-ads.component.css']
})

export class CarsAdsComponent implements OnInit {
  
  isPopupOpened = true;

  cars: Car[];
  selectedCar: Car;
  public show:boolean = false;
  public buttonName:any = 'Show more';

  searchText;

  isGuest=true;
  isUser=false;
  isAdmin=false;

  constructor(private router: Router,private renderer: Renderer2,private carService: CarService,private service:UserService,private dialog?: MatDialog) {
    this.renderer.setStyle(document.body, 'background-image',  'url(https://images.wallpaperscraft.com/image/audi_r8_chrome_cw_5_matte_black_black_side_view_97060_3840x2160.jpg)' );
    this.selectedCar = new Car();
   }

  ngOnInit() {
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
  }
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe( (cars: Car[]) => {
      this.cars = cars;
    });
  }

    deleteCar(carId: number) {
      this.carService.deleteCar( carId ).subscribe( (car: Car) => {
        this.getCars();
      });
    }

    toggle() {
      this.show = !this.show;
      if(this.show)  
        this.buttonName = "Hide";
      else
        this.buttonName = "Show more";
    }
}
