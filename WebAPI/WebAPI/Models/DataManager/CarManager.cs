using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models.Repository;

namespace WebAPI.Models.DataManager
{
    public class CarManager : IDataRepository<Car>
    {
        readonly AuthenticationContext _carContext;

        public CarManager(AuthenticationContext context)
        {
            _carContext = context;
        }

        public IEnumerable<Car> GetAll()
        {
            return _carContext.Car.ToList();
        }

        public Car Get(long id)
        {
            return _carContext.Car
                  .FirstOrDefault(e => e.CarID == id);
        }

        public void Add(Car entity)
        {
            _carContext.Car.Add(entity);
            _carContext.SaveChanges();
        }

        public void Update(Car car, Car entity)
        {
            car.Brand = entity.Brand;
            car.Model = entity.Model;
            car.Year = entity.Year;
            car.Price = entity.Price;
            car.Kilometers = entity.Kilometers;
            car.Fuel = entity.Fuel;
            car.Power = entity.Power;
            car.Consumption = car.Consumption;
            car.Description = entity.Description;
            car.Image = entity.Image;
            car.UserId = entity.UserId;
            _carContext.SaveChanges();
        }

        public void Delete(Car car)
        {
            _carContext.Car.Remove(car);
            _carContext.SaveChanges();
        }
    }
}

