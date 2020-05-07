using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cafe.Models.DBModels
{
    public class OrderInfo
    {
        public int Id { get; set; }
        [ForeignKey("Dish")]
        public int IncludeDish { get; set; }
        public Dish Dish { get; set; }
        [ForeignKey("Drink")]
        public int IncludeDrink { get; set; }
        public Drink Drink { get; set; }

        public ICollection<Order> Orders { get; set; }
    }
}
