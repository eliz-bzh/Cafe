using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cafe.Models;
using Cafe.Models.DBModels;
using Microsoft.EntityFrameworkCore;

namespace Cafe.Services.DBServices
{
    public class DBOrderService : IDBService<Order>
    {
        public bool Create(Order entity)
        {
            if (entity == null)
            {
                return false;
            }
            using (var context = new ApplicationContext())
            {
                var state = context.Add(entity).State;

                if (state != EntityState.Added)
                {
                    return false;
                }

                try
                {
                    context.SaveChanges();

                }
                catch
                {
                    return false;
                }

                return true;
            }
        }

        public IList<Order> GetAll()
        {
            using (var context = new ApplicationContext())
            {
                return context.Orders.ToList();
            }
        }

        public Order GetById(int id)
        {
            using (var context = new ApplicationContext())
            {
                return context.Orders.FirstOrDefault(x => x.Id == id);
            }
        }

        public bool Remove(int id)
        {
            using (var context = new ApplicationContext())
            {
                var deleted = context.Orders.FirstOrDefault(x => x.Id == id);

                if (deleted == null)
                {
                    return false;
                }

                var result = context.Orders.Remove(deleted).State;

                if (result != EntityState.Deleted)
                {
                    return false;
                }

                try
                {
                    context.SaveChanges();
                }
                catch
                {
                    return false;
                }

                return true;
            }
        }

        public bool Update(Order newEntity)
        {
            if (newEntity == null)
            {
                return false;
            }
            using (var context = new ApplicationContext())
            {
                var prevEntity = context.Orders.FirstOrDefault(x => x.Id == newEntity.Id);

                if (prevEntity == null)
                {
                    return false;
                }

                prevEntity.Date = newEntity.Date;
                prevEntity.NumberTable = newEntity.NumberTable;
                prevEntity.WaiterId = newEntity.WaiterId;
                prevEntity.TotalPrice = newEntity.TotalPrice;

                try
                {
                    context.SaveChanges();
                }
                catch
                {
                    return false;
                }

                return true;
            }
        }
    }
}
