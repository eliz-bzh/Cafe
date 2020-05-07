using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cafe.Models.DBModels
{
    public class DishComposition
    {
        public int Id { get; set; }
        [ForeignKey("Dish")]
        public int DishId { get; set; }
        public Dish Dish { get; set; }
        [ForeignKey("Ingredient")]
        public int IngredientId { get; set; }
        public Ingredient Ingredient { get; set; }
        public int Amount { get; set; }
    }
}
