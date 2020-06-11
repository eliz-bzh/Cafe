using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cafe.Models.DBModels;
using Cafe.Services.DBServices;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Office.Interop.Excel;
using System.IO;
using Cafe.Models;
using Cafe.Controllers;
using OfficeOpenXml;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;

namespace Cafe.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowMyOrigin")]
    public class OrderController : Controller
    {
        private readonly DBOrderService service;
        private readonly DBWaiterService waiterController;

        public OrderController(DBOrderService service, DBWaiterService waiterService)
        {
            this.service = service;
            this.waiterController = waiterService;
        }

        [HttpPost("create")]
        public bool Create(Order order)
        {
            return service.Create(order);
        }

        [HttpPut("update")]
        //[FromBody]
        public bool Update(Order order)
        {
            return service.Update(order);
        }

        [HttpGet("getById/{id}")]
        public Order GetById(int id)
        {
            return service.GetById(id);
        }

        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            return service.Remove(id);
        }

        [HttpGet("getAll")]
        public IList<Order> GetAll()
        {
            return service.GetAll();
        }

        private void CheckFile()
        {
            if (!System.IO.File.Exists("C:\\Report.xlsx"))
            {
                System.IO.File.Create("C:\\Report.xlsx");
            }
        }

        private string waiterFormate(IList<Waiter> waiters, int id)
        {
            foreach (var waiter in waiters)
            {
                if (id == waiter.Id)
                {
                    return string.Concat(waiter.Name + " " + waiter.Surname + " " + waiter.Patronymic);
                }
            }
            return " ";
        }

        [HttpGet("excelDoc")]
        public string WriteToExcel()
        {
            using (var context = new ApplicationContext())
            {
                var query = GetAll();
                var waiters = waiterController.GetAll();

                string path = Path.Combine(@"C:", "Report.xlsx");

                using (var p = new ExcelPackage())
                {
                    var ws = p.Workbook.Worksheets.Add("Sheet");

                    ws.Cells[1, 1].Value = "Order number";
                    ws.Cells[1, 2].Value = "Order date";
                    ws.Cells[1, 3].Value = "Number table";
                    ws.Cells[1, 4].Value = "Waiter";
                    ws.Cells[1, 5].Value = "Order total price";

                    int i = 2;
                    foreach (var item in query)
                    {
                        ws.Cells[i, 1].Value = item.Id;
                        ws.Cells[i, 2].Value = item.Date.ToString("dd/MM/yyyy");
                        ws.Cells[i, 3].Value = item.NumberTable;
                        ws.Cells[i, 4].Value = waiterFormate(waiters, item.WaiterId);
                        ws.Cells[i, 5].Value = item.TotalPrice;

                        ++i;
                    }

                    for (i = 1; i <= 5; i++)
                    {
                        ws.Column(i).AutoFit();
                    }

                    p.SaveAs(new FileInfo(path));
                }

                return path;
            }
        }
    }
}