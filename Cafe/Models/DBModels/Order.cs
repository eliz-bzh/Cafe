using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cafe.Models.DBModels
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        [ForeignKey("OrderInfo")]
        public int Info { get; set; }
        public OrderInfo OrderInfo { get; set; }
        public int NumberTable { get; set; }
        [ForeignKey("Waiter")]
        public int WaiterId { get; set; }
        public Waiter Waiter { get; set; }
        public double TotalPrice { get; set; }
    }
}
