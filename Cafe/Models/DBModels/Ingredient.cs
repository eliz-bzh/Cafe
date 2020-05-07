using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cafe.Models.DBModels
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Weight { get; set; }
        [ForeignKey("Units")]
        public int UnitId { get; set; }
        public Units Units { get; set; }
        public double FirstPrice { get; set; }

        public ICollection<DishComposition> DishCompositions { get; set; }
        public ICollection<Stock> Stocks { get; set; }
    }
}
