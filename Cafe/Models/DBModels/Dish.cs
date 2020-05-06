using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cafe.Models.DBModels
{
    public class Dish
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Category { get; set; }
        public double Weight { get; set; }
        public double FirstPrice { get; set; }
        public double MarkUp { get; set; }
        public double Price { get; set; }
    }
}
