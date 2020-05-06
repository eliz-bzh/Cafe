using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cafe.Models.DBModels
{
    public class Drink
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Category { get; set; }
        public double FirstPrice { get; set; }
        public double MarkUp { get; set; }
        public double Price { get; set; }
    }
}
