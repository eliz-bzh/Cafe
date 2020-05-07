using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cafe.Models.DBModels;
using Cafe.Services.DBServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cafe.Controllers
{
    [Route("api/[controller]")]
    public class DrinkController : Controller
    {
        private readonly DBDrinkService service;

        public DrinkController(DBDrinkService service)
        {
            this.service = service;
        }

        [HttpGet("create")]
        public bool Create([FromBody]Drink drink)
        {
            return service.Create(drink);
        }

        [HttpGet("edit")]
        public bool Update([FromBody]Drink drink)
        {
            return service.Update(drink);
        }

        [HttpGet("getById/{id}")]
        public Drink GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpGet("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpGet("getAll")]
        public IList<Drink> GetAll()
        {
            return service.GetAll();
        }
    }
}