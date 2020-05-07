using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cafe.Models.DBModels
{
    public class Menu
    {
        public int Id { get; set; }
        [ForeignKey("Dish")]
        public int DishId { get; set; }
        public Dish Dish { get; set; }
        [ForeignKey("Drink")]
        public int DrinkId { get; set; }
        public Drink Drink { get; set; }
    }
}
