using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cafe.Models.DBModels
{
    public class Menu
    {
        public int Id { get; set; }
        public int IdDish { get; set; }
        public int IdDrink { get; set; }
    }
}
