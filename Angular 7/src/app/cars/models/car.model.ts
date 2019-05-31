export class Car {
    carID: number;
    brand: string;
    model: string;
    year: number;
    price: number;
    kilometers: number;
    fuel: 'petrol' | 'diesel' | 'electric';
    power: number;
    consumption: number;
    description: string;
    image:string;
    userId: string;

    Car() {
        this.carID = null;
        this.brand = '';
        this.model = '';
        this.year = null;
        this.price = null;
        this.kilometers = null;
        this.fuel = null;
        this.power = null;
        this.consumption = null;
        this.description = '';
        this.image = '';
        this.userId = '';
    }
}
