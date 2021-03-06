﻿using System;
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
    public class DrinkController : Controller
    {
        private readonly DBDrinkService service;

        public DrinkController(DBDrinkService service)
        {
            this.service = service;
        }

        [HttpPost("create")]
        //[FromBody]
        public bool Create(Drink drink)
        {
            return service.Create(drink);
        }

        [HttpPut("update")]
        //[FromBody]
        public bool Update(Drink drink)
        {
            return service.Update(drink);
        }

        [HttpGet("getById/{id}")]
        public Drink GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpDelete("delete/{id}")]
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