using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cafe.Models.DBModels
{
    public class Drink
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public double FirstPrice { get; set; }
        public double MarkUp { get; set; }
        public double Price { get; set; }

        
        public ICollection<DrinkOrderInfo> DrinkOrderInfos { get; set; }
    }
}
