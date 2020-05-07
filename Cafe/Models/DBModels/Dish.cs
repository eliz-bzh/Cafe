using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cafe.Models.DBModels
{
    public class Dish
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public double Weight { get; set; }
        public double FirstPrice { get; set; }
        public double MarkUp { get; set; }
        public double Price { get; set; }

        public ICollection<DishComposition> DishCompositions { get; set; }
        public ICollection<Menu> Menus { get; set; }
        public ICollection<OrderInfo> OrderInfos { get; set; }
    }
}
