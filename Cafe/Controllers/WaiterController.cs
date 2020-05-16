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
    public class WaiterController : Controller
    {
        private readonly DBWaiterService service;

        public WaiterController(DBWaiterService service)
        {
            this.service = service;
        }

        [HttpGet("create")]
        //[FromBody]
        public bool Create(Waiter waiter)
        {
            return service.Create(waiter);
        }

        [HttpGet("edit")]
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

        [HttpGet("delete/{id}")]
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