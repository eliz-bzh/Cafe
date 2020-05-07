using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cafe.Models;
using Cafe.Models.DBModels;
using Microsoft.EntityFrameworkCore;

namespace Cafe.Services.DBServices
{
    public class DBDrinkService : IDBService<Drink>
    {
        public bool Create(Drink entity)
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

        public IList<Drink> GetAll()
        {
            using (var context = new ApplicationContext())
            {
                return context.Drinks.ToList();
            }
        }

        public Drink GetById(int id)
        {
            using (var context = new ApplicationContext())
            {
                return context.Drinks.FirstOrDefault(x => x.Id == id);
            }
        }

        public bool Remove(int id)
        {
            using (var context = new ApplicationContext())
            {
                var deleted = context.Drinks.FirstOrDefault(x => x.Id == id);

                if (deleted == null)
                {
                    return false;
                }

                var result = context.Drinks.Remove(deleted).State;

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

        public bool Update(Drink newEntity)
        {
            if (newEntity == null)
            {
                return false;
            }
            using (var context = new ApplicationContext())
            {
                var prevEntity = context.Drinks.FirstOrDefault(x => x.Id == newEntity.Id);

                if (prevEntity == null)
                {
                    return false;
                }

                prevEntity.Name = newEntity.Name;
                prevEntity.CategoryId = newEntity.CategoryId;
                prevEntity.FirstPrice = newEntity.FirstPrice;
                prevEntity.MarkUp = newEntity.MarkUp;
                prevEntity.Price = newEntity.Price;

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
