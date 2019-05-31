using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Models.Repository;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly IDataRepository<Car> _dataRepository;

        public CarController(IDataRepository<Car> dataRepository)
        {
            _dataRepository = dataRepository;
        }

        // GET: api/Car
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Car> cars = _dataRepository.GetAll();
            return Ok(cars);
        }

        // GET: api/Car/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(long id)
        {
            Car car = _dataRepository.Get(id);

            if (car == null)
            {
                return NotFound("The Car record couldn't be found.");
            }

            return Ok(car);
        }

        // POST: api/Car
        [HttpPost]
        public IActionResult Post([FromBody] Car car)
        {
            if (car == null)
            {
                return BadRequest("Car is null.");
            }

            _dataRepository.Add(car);
            return CreatedAtRoute(
                  "Get",
                  new { Id = car.CarID },
                  car);
        }

        // PUT: api/Car/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] Car car)
        {
            if (car == null)
            {
                return BadRequest("Car is null.");
            }

            Car carToUpdate = _dataRepository.Get(id);
            if (carToUpdate == null)
            {
                return NotFound("The Car record couldn't be found.");
            }

            _dataRepository.Update(carToUpdate, car);
            return NoContent();
        }

        // DELETE: api/Car/5
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            Car car = _dataRepository.Get(id);
            if (car == null)
            {
                return NotFound("The Car record couldn't be found.");
            }

            _dataRepository.Delete(car);
            return NoContent();
        }
    }
}
