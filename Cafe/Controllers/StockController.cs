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
    public class StockController : Controller
    {
        private readonly DBStockService service;

        public StockController(DBStockService service)
        {
            this.service = service;
        }

        [HttpGet("create")]
        public bool Create([FromBody]Stock stock)
        {
            return service.Create(stock);
        }

        [HttpGet("update")]
        public bool Update([FromBody]Stock stock)
        {
            return service.Update(stock);
        }

        [HttpGet("getById/{id}")]
        public Stock GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpGet("delete/{id}")]
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