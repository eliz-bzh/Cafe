using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cafe.Models;
using Cafe.Models.DBModels;
using Microsoft.EntityFrameworkCore;

namespace Cafe.Services.DBServices
{
    public class DBDishOrderInfoService : IDBService<DishOrderInfo>
    {
        public bool Create(DishOrderInfo entity)
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

        public IList<DishOrderInfo> GetAll()
        {
            using (var context = new ApplicationContext())
            {
                return context.DishOrderInfos.ToList();
            }
        }

        public DishOrderInfo GetById(int id)
        {
            using (var context = new ApplicationContext())
            {
                return context.DishOrderInfos.FirstOrDefault(x => x.Id == id);
            }
        }

        public bool Remove(int id)
        {
            using (var context = new ApplicationContext())
            {
                var deleted = context.DishOrderInfos.FirstOrDefault(x => x.Id == id);

                if (deleted == null)
                {
                    return false;
                }

                var result = context.DishOrderInfos.Remove(deleted).State;

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

        public bool Update(DishOrderInfo newEntity)
        {
            if (newEntity == null)
            {
                return false;
            }
            using (var context = new ApplicationContext())
            {
                var prevEntity = context.DishOrderInfos.FirstOrDefault(x => x.Id == newEntity.Id);

                if (prevEntity == null)
                {
                    return false;
                }

                prevEntity.DishId = newEntity.DishId;
                prevEntity.OrderId = newEntity.OrderId;

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
