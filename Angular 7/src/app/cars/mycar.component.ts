import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { Car } from './models/car.model';
import { CarService } from './shared/car.service';
import { Router } from '@angular/router';
import { UserService } from '../user/shared/user.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-cars',
  templateUrl: './mycar.component.html',
  styleUrls: ['./mycar.component.css']
})
export class MyCarComponent implements OnInit {

  cars: Car[];
  selectedCar: Car;
  myCars : Car[];

  constructor(private router: Router,private service:UserService,private renderer: Renderer2,private carService: CarService) {
    this.renderer.setStyle(document.body, 'background-image',  'url(https://www.loudwallpapers.com/wp-content/uploads/2018/12/stylish-black-car-wallpaper-1920.jpg)' );
    this.selectedCar = new Car();
   }

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe( (cars: Car[]) => {
      this.cars = cars;
    });
  }

  editCar(carId: number) {
    this.carService.getCarById( carId ).subscribe( (car: Car ) => {
      this.selectedCar = car;
    },
    error => {
      alert('Could not retrieve car with id ' + carId);
    }
    );
  }

  deleteCar(carId: number) {
    this.carService.deleteCar( carId ).subscribe( (car: Car) => {
      this.getCars();
    });
  }
}
