using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Models.DataManager;
using WebAPI.Models.Repository;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AuthenticationContext _dataRepository;

        public UserController(AuthenticationContext dataRepository)
        {
            _dataRepository = dataRepository;
        }

        // GET: api/User
        [HttpGet]
        public IActionResult Get()
        {
            var cars = _dataRepository.Users.ToList();
            return Ok(cars);
        }
        
        // GET: api/User/5
        /*[HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            Users user = _dataRepository.Get(id);

            if (user == null)
            {
                return NotFound("The User record couldn't be found.");
            }

            return Ok(user);
        }
        */
   /*     // PUT: api/User/5
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] Users user)
        {
            if (user == null)
            {
                return BadRequest("User is null.");
            }

            Users userToUpdate = _dataRepository.Get(id);
            if (userToUpdate == null)
            {
                return NotFound("The User record couldn't be found.");
            }

            _dataRepository.Update(userToUpdate, user);
            return NoContent();
        }

        // POST: api/User
        [HttpPost]
        public IActionResult Post([FromBody] Users user)
        {
            if (user == null)
            {
                return BadRequest("User is null.");
            }

            _dataRepository.Add(user);
            return CreatedAtRoute(
                  "Get",
                  new { Id = user.Id },
                  user);
        }*/

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var user = _dataRepository.Users.First(e => e.Id == id);


            _dataRepository.Users.Remove(user);
            _dataRepository.SaveChanges();
            return Ok(user);
        }
    }
}
