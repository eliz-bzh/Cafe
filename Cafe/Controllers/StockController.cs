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
    public class StockController : Controller
    {
        private readonly DBStockService service;

        public StockController(DBStockService service)
        {
            this.service = service;
        }

        [HttpPost("create")]
        //[FromBody]
        public bool Create(Stock stock)
        {
            return service.Create(stock);
        }

        [HttpPut("update")]
        //[FromBody]
        public bool Update(Stock stock)
        {
            return service.Update(stock);
        }

        [HttpGet("getById/{id}")]
        public Stock GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpGet("getAll")]
        public IList<Stock> GetAll()
        {
            return service.GetAll();
        }
    }
}