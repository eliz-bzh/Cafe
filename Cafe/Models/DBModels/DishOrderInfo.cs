using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cafe.Models.DBModels
{
    public class DishOrderInfo
    {
        public int Id { get; set; }
        [ForeignKey("Dish")]
        public int DishId { get; set; }
        public Drink Drink { get; set; }
        [ForeignKey("Order")]
        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}
