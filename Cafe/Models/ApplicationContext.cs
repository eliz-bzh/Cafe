using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cafe.Models.DBModels;
using Microsoft.EntityFrameworkCore;

namespace Cafe.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext()
        {
            this.Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=.\\SQLEXPRESS;Initial Catalog=kursach_db;Trusted_connection=True");
        }

        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<DishComposition> DishCompositions { get; set; }
        public virtual DbSet<Dish> Dishes { get; set; }
        public virtual DbSet<Drink> Drinks { get; set; }
        public virtual DbSet<Ingredient> Ingredients { get; set; }
        public virtual DbSet<Menu> Menus { get; set; }
        public virtual DbSet<OrderInfo> OrderInfos { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Stock> Stocks { get; set; }
        public virtual DbSet<Units> Units { get; set; }
        public virtual DbSet<Waiter> Waiters { get; set; }
    }
}