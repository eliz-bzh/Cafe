using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cafe.Models.DBModels
{
    public class Stock
    {
        public int Id { get; set; }
        [ForeignKey("Ingredient")]
        public int IngredientId { get; set; }
        public Ingredient Ingredient { get; set; }
        public double UnitPrice { get; set; }
    }
}
