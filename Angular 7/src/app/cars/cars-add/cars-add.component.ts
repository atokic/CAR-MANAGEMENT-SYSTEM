import { Component, OnInit, OnChanges, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { Car } from '..//models/car.model';
import { CarService } from '../shared/car.service';
import { isNullOrUndefined } from 'util';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user/shared/user.service';


@Component({
  selector: 'app-cars-add',
  templateUrl: './cars-add.component.html',
  styleUrls: ['./cars-add.component.css']
})
export class CarsAddComponent implements OnInit, OnChanges {

  @Input() selectedCar: Car;
  car: Car = new Car();
  imageUrl: string;
  fileToUpload : File = null;
  bla: string
  
  @Output() update: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private service: CarService, private toastr: ToastrService) {
    console.log(this.selectedCar);
  }

  ngOnInit() {
    this.service.formModel.reset();
  }

  ngOnChanges() {
    console.log(this.selectedCar);
    this.car = this.selectedCar;
  }

  debug( form ): void {
    console.log(form);
  }

  isAddAction(carID){
    return isNullOrUndefined(carID) || carID === 0
  }
  
  onSubmit() {
    this.service.CarAdd(this.car).subscribe(
      (res: any) => {
          this.service.formModel.reset();
          this.toastr.success('New car added!', 'Successful!',{timeOut:3000});
      },
      err => {
        console.log(err);
      }
    );
    setTimeout(() => {
      location.reload();
    }, 3000);
  }

  processForm(car: Car): void 
  {
    console.log(car);
    if ( this.isAddAction( car.carID ) ) 
    {
      this.onSubmit();
    } else 
    {
      this.service.editCar( this.selectedCar ).subscribe((car: Car) => {
        this.update.emit(true);
      });
      this.service.formModel.reset();
      this.toastr.success('Car edited!', 'Successful!',{timeOut:3000});
    }

  }
}
