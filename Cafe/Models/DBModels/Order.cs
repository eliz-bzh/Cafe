using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cafe.Models.DBModels
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Info { get; set; }
        public int NumberTable { get; set; }
        public int Waiter { get; set; }
        public double TotalPrice { get; set; }
    }
}
