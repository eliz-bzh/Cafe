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
    public class WaiterController : Controller
    {
        private readonly DBWaiterService service;

        public WaiterController(DBWaiterService service)
        {
            this.service = service;
        }

        [HttpPost("create")]
        //[FromBody]
        public bool Create(Waiter waiter)
        {
            return service.Create(waiter);
        }

        [HttpPut("update")]
        //[FromBody]
        public bool Update(Waiter waiter)
        {
            return service.Update(waiter);
        }

        [HttpGet("getById/{id}")]
        public Waiter GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpGet("getAll")]
        public IList<Waiter> GetAll()
        {
            return service.GetAll();
        }
    }
}