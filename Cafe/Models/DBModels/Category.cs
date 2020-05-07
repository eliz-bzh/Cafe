using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cafe.Models.DBModels
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Dish> Dishes { get; set; }
        public ICollection<Drink> Drinks { get; set; }
    }
}
