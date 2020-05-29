using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cafe.Models.DBModels;
using Cafe.Services.DBServices;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cafe.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowMyOrigin")]
    public class IngredientController : Controller
    {
        private readonly DBIngredientService service;

        public IngredientController(DBIngredientService service)
        {
            this.service = service;
        }

        [HttpPost("create")]
        public bool Create(Ingredient ingredient)
        {
            return service.Create(ingredient);
        }

        [HttpPut("update")]
        //[FromBody]
        public bool Update(Ingredient ingredient)
        {
            return service.Update(ingredient);
        }

        [HttpGet("getById/{id}")]
        public Ingredient GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpGet("getAll")]
        public IList<Ingredient> GetAll()
        {
            return service.GetAll();
        }
    }
}