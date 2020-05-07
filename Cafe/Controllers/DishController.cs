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
    public class DishController : Controller
    {
        private readonly DBDishService service;

        public DishController(DBDishService service)
        {
            this.service = service;
        }

        [HttpGet("create")]
        public bool Create([FromBody]Dish dish)
        {
            return service.Create(dish);
        }

        [HttpGet("edit")]
        public bool Update([FromBody]Dish dish)
        {
            return service.Update(dish);
        }

        [HttpGet("getById/{id}")]
        public Dish GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpGet("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpGet("getAll")]
        public IList<Dish> GetAll()
        {
            return service.GetAll();
        }
    }
}