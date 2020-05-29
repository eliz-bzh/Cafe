using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cafe.Models;
using Cafe.Models.DBModels;
using Microsoft.EntityFrameworkCore;

namespace Cafe.Services.DBServices
{
    public class DBStockService : IDBService<Stock>
    {
        public bool Create(Stock entity)
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

        public IList<Stock> GetAll()
        {
            using (var context = new ApplicationContext())
            {
                return context.Stocks.ToList();
            }
        }

        public Stock GetById(int id)
        {
            using (var context = new ApplicationContext())
            {
                return context.Stocks.FirstOrDefault(x => x.Id == id);
            }
        }

        public bool Remove(int id)
        {
            using (var context = new ApplicationContext())
            {
                var deleted = context.Stocks.FirstOrDefault(x => x.Id == id);

                if (deleted == null)
                {
                    return false;
                }

                var result = context.Stocks.Remove(deleted).State;

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

        public bool Update(Stock newEntity)
        {
            if (newEntity == null)
            {
                return false;
            }
            using (var context = new ApplicationContext())
            {
                var prevEntity = context.Stocks.FirstOrDefault(x => x.Id == newEntity.Id);

                if (prevEntity == null)
                {
                    return false;
                }

                prevEntity.IngredientId = newEntity.IngredientId;
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