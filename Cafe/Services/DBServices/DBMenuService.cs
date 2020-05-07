using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cafe.Models;
using Cafe.Models.DBModels;
using Microsoft.EntityFrameworkCore;

namespace Cafe.Services.DBServices
{
    public class DBMenuService : IDBService<Menu>
    {
        public bool Create(Menu entity)
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

        public IList<Menu> GetAll()
        {
            using (var context = new ApplicationContext())
            {
                return context.Menus.ToList();
            }
        }

        public Menu GetById(int id)
        {
            using (var context = new ApplicationContext())
            {
                return context.Menus.FirstOrDefault(x => x.Id == id);
            }
        }

        public bool Remove(int id)
        {
            using (var context = new ApplicationContext())
            {
                var deleted = context.Menus.FirstOrDefault(x => x.Id == id);

                if (deleted == null)
                {
                    return false;
                }

                var result = context.Menus.Remove(deleted).State;

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

        public bool Update(Menu newEntity)
        {
            if (newEntity == null)
            {
                return false;
            }
            using (var context = new ApplicationContext())
            {
                var prevEntity = context.Menus.FirstOrDefault(x => x.Id == newEntity.Id);

                if (prevEntity == null)
                {
                    return false;
                }

                prevEntity.DishId = newEntity.DishId;
                prevEntity.DrinkId = newEntity.DrinkId;

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
