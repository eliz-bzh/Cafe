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
    public class CategoryController : Controller
    {
        private readonly DBCategoryService service;

        public CategoryController(DBCategoryService service)
        {
            this.service = service;
        }

        [HttpPost("create")]
        public bool Create(Category category)
        {
            return service.Create(category);
        }

        [HttpPut("update")]
        //[FromBody]
        public bool Update(Category category)
        {
            return service.Update(category);
        }

        [HttpGet("getById/{id}")]
        public Category GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpGet("getAll")]
        public IList<Category> GetAll()
        {
            return service.GetAll();
        }
    }
}