using Cafe.Models.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cafe.Models;
using Microsoft.EntityFrameworkCore;

namespace Cafe.Services.DBServices
{
    public class DBDrinkOrderInfoService : IDBService<DrinkOrderInfo>
    {
        public bool Create(DrinkOrderInfo entity)
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

        public IList<DrinkOrderInfo> GetAll()
        {
            using (var context = new ApplicationContext())
            {
                return context.DrinkOrderInfos.ToList();
            }
        }

        public DrinkOrderInfo GetById(int id)
        {
            using (var context = new ApplicationContext())
            {
                return context.DrinkOrderInfos.FirstOrDefault(x => x.Id == id);
            }
        }

        public bool Remove(int id)
        {
            using (var context = new ApplicationContext())
            {
                var deleted = context.DrinkOrderInfos.FirstOrDefault(x => x.Id == id);

                if (deleted == null)
                {
                    return false;
                }

                var result = context.DrinkOrderInfos.Remove(deleted).State;

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

        public bool Update(DrinkOrderInfo newEntity)
        {
            if (newEntity == null)
            {
                return false;
            }
            using (var context = new ApplicationContext())
            {
                var prevEntity = context.DrinkOrderInfos.FirstOrDefault(x => x.Id == newEntity.Id);

                if (prevEntity == null)
                {
                    return false;
                }

                prevEntity.DrinkId = newEntity.DrinkId;
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
