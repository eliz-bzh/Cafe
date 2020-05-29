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
    public class UnitController : Controller
    {
        private readonly DBUnitsService service;

        public UnitController(DBUnitsService service)
        {
            this.service = service;
        }

        [HttpPost("create")]
        public bool Create(Units units)
        {
            return service.Create(units);
        }

        [HttpPut("update")]
        //[FromBody]
        public bool Update(Units units)
        {
            return service.Update(units);
        }

        [HttpGet("getById/{id}")]
        public Units GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpGet("getAll")]
        public IList<Units> GetAll()
        {
            return service.GetAll();
        }
    }
}