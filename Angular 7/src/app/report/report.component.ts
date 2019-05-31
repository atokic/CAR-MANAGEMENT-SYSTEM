import { Component, OnInit, Renderer2 } from '@angular/core';
import { CarService } from '../cars/shared/car.service';
import { Car } from '../cars/models/car.model';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  cars: Car[];
  totalValue = 0;
  oldestCar: Car = null ;
  mostUsedCar: Car = null;
  mostExpensive: Car = null;
  mostFuelEfficient: Car = null;
  
  constructor(private renderer: Renderer2,private carService: CarService) {
    this.renderer.setStyle(document.body, 'background-image',  'url(https://images.wallpaperscraft.com/image/mercedes_benz_mercedes_amg_front_view_silver_wood_100115_2000x1115.jpg)' );
  }

  calculateTotalValue() {

    for (const car of this.cars) {
      this.totalValue += car.price;

      if ( isNullOrUndefined(this.oldestCar) || car.year < this.oldestCar.year ) {
        this.oldestCar = car;
      }

      if ( isNullOrUndefined(this.mostUsedCar) || car.kilometers > this.mostUsedCar.kilometers ) {
        this.mostUsedCar = car;
      }

      if ( isNullOrUndefined(this.mostFuelEfficient) || car.consumption < this.mostFuelEfficient.consumption ){
        this.mostFuelEfficient = car;
      }

      if ( isNullOrUndefined(this.mostExpensive) || car.price > this.mostExpensive.price ) {
        this.mostExpensive = car;
      }
    }

  }

  ngOnInit() {
    this.carService.getCars().subscribe( (cars: Car[] ) => {
      this.cars = cars;
      this.calculateTotalValue();
    },
    error => alert('Could not retrieve cars')
    );
  }



}
