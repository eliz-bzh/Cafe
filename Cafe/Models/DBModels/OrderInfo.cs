using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cafe.Models.DBModels
{
    public class OrderInfo
    {
        public int Id { get; set; }
        public int IncludeDish { get; set; }
        public int IncludeDrink { get; set; }
    }
}
