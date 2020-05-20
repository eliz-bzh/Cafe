using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Cafe.Models.DBModels
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [JsonIgnore]
        public ICollection<Dish> Dishes { get; set; }
        [JsonIgnore]
        public ICollection<Drink> Drinks { get; set; }
    }
}
