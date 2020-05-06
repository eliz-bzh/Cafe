using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cafe.Models.DBModels
{
    public class DishComposition
    {
        public int Id { get; set; }
        public int IdIng { get; set; }
        public int Amount { get; set; }
    }
}
