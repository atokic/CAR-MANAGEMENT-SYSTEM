import { Injectable, Input } from '@angular/core';
import { Car } from '../models/car.model';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder,Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/user/shared/user.service';
import { HomeComponent } from 'src/app/home/home.component';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  selectedCar:Car;
  carList:Car;
  userDetails;

  constructor(private service: UserService,private fb: FormBuilder, private http: HttpClient) { 
    this.getUserId();
  }

  readonly BaseURI = 'http://localhost:54277/api';

  formModel = this.fb.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
    year: [0, [Validators.required,Validators.max(2019), Validators.min(1950)]],
    price: [0, [Validators.required,Validators.max(2000000), Validators.min(0)]],
    kilometers: [0, [Validators.required,Validators.max(1000000), Validators.min(0)]],
    fuel: ['', Validators.required],
    power: [0, [Validators.required,Validators.max(999), Validators.min(0)]],
    consumption: [0, [Validators.required,Validators.max(99), Validators.min(0)]],
    description: [''],
    image: ['']

  });

  get f() {
    return this.formModel.controls;
  }

   CarAdd(car :Car) {
    var body = {
      brand: car.brand,
      model: car.model,
      year: car.year,
      price: car.price,
      kilometers: car.kilometers,
      fuel: car.fuel,
      power: car.power,
      consumption: car.consumption,
      description: car.description,
      image: car.image,
      userId: this.userDetails.id

    };
    return this.http.post(this.BaseURI + '/Car', body);
  }

  getCars() {
    return this.http.get(this.BaseURI + '/Car');
  }

  getCarById(carID: number): Observable<any> {
    return this.http.get(this.BaseURI+ '/Car/'   + `${carID}`);
  }

  deleteCar(carID: number) {
    return this.http.delete(this.BaseURI+ '/Car/' + `${carID}`);
  }

  editCar(car: Car) {
    return this.http.put(this.BaseURI + '/Car/' + `${car.carID}`, car);
  }

  getUserId(){  
    if (localStorage.getItem('token') != null){
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
  
}
