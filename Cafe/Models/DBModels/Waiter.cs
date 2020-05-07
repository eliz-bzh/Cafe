using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cafe.Models.DBModels
{
    public class Waiter
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Patronymic { get; set; }

        public ICollection<Order> Orders { get; set; }
    }
}
