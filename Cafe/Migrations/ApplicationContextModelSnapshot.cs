﻿// <auto-generated />
using System;
using Cafe.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Cafe.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    partial class ApplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Cafe.Models.DBModels.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Cafe.Models.DBModels.Dish", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CategoryId");

                    b.Property<double>("FirstPrice");

                    b.Property<double>("MarkUp");

                    b.Property<string>("Name");

                    b.Property<double>("Price");

                    b.Property<double>("Weight");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Dishes");
                });

            modelBuilder.Entity("Cafe.Models.DBModels.DishComposition", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Amount");

                    b.Property<int>("DishId");

                    b.Property<int>("IngredientId");

                    b.HasKey("Id");

                    b.HasIndex("DishId");

                    b.HasIndex("IngredientId");

                    b.ToTable("DishCompositions");
                });

            modelBuilder.Entity("Cafe.Models.DBModels.DishOrderInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("DishId");

                    b.Property<int?>("DrinkId");

                    b.Property<int>("OrderId");

                    b.HasKey("Id");

                    b.HasIndex("DishId");

                    b.HasIndex("DrinkId");

                    b.HasIndex("OrderId");

                    b.ToTable("DishOrderInfos");
                });

            modelBuilder.Entity("Cafe.Models.DBModels.Drink", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CategoryId");

                    b.Property<double>("FirstPrice");

                    b.Property<double>("MarkUp");

                    b.Property<string>("Name");

                    b.Property<double>("Price");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Drinks");
                });

            modelBuilder.Entity("Cafe.Models.DBModels.DrinkOrderInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("DrinkId");

                    b.Property<int>("OrderId");

                    b.HasKey("Id");

                    b.HasIndex("DrinkId");

                    b.HasIndex("OrderId");

                    b.ToTable("DrinkOrderInfos");
                });

            modelBuilder.Entity("Cafe.Models.DBModels.Ingredient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("FirstPrice");

                    b.Property<string>("Name");

                    b.Property<int>("UnitId");

                    b.Property<double>("Weight");

                    b.HasKey("Id");

                    b.HasIndex("UnitId");

                    b.ToTable("Ingredients");
                });

            modelBuilder.Entity("Cafe.Models.DBModels.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date");

                    b.Property<int>("NumberTable");

                    b.Property<double>("TotalPrice");

                    b.Property<int>("WaiterId");

                    b.HasKey("Id");

                    b.HasIndex("WaiterId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Cafe.Models.DBModels.Stock", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("IngredientId");

                    b.Property<double>("UnitPrice");

                    b.HasKey("Id");

                    b.HasIndex("IngredientId");

                    b.ToTable("Stocks");
                });

            modelBuilder.Entity("Cafe.Models.DBModels.Units", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Units");
                });

            modelBuilder.Entity("Cafe.Models.DBModels.Waiter", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.Property<string>("Patronymic");

                    b.Property<string>("Surname");

                    b.HasKey("Id");

                    b.ToTable("Waiters");
                });

            modelBuilder.Entity("Cafe.Models.DBModels.Dish", b =>
                {
                    b.HasOne("Cafe.Models.DBModels.Category", "Category")
                        .WithMany("Dishes")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Cafe.Models.DBModels.DishComposition", b =>
                {
                    b.HasOne("Cafe.Models.DBModels.Dish", "Dish")
                        .WithMany("DishCompositions")
                        .HasForeignKey("DishId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Cafe.Models.DBModels.Ingredient", "Ingredient")
                        .WithMany("DishCompositions")
                        .HasForeignKey("IngredientId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Cafe.Models.DBModels.DishOrderInfo", b =>
                {
                    b.HasOne("Cafe.Models.DBModels.Dish")
                        .WithMany("DishOrderInfos")
                        .HasForeignKey("DishId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Cafe.Models.DBModels.Drink", "Drink")
                        .WithMany()
                        .HasForeignKey("DrinkId");

                    b.HasOne("Cafe.Models.DBModels.Order", "Order")
                        .WithMany()
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Cafe.Models.DBModels.Drink", b =>
                {
                    b.HasOne("Cafe.Models.DBModels.Category", "Category")
                        .WithMany("Drinks")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Cafe.Models.DBModels.DrinkOrderInfo", b =>
                {
                    b.HasOne("Cafe.Models.DBModels.Drink", "Drink")
                        .WithMany("DrinkOrderInfos")
                        .HasForeignKey("DrinkId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Cafe.Models.DBModels.Order", "Order")
                        .WithMany()
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Cafe.Models.DBModels.Ingredient", b =>
                {
                    b.HasOne("Cafe.Models.DBModels.Units", "Units")
                        .WithMany("Ingredients")
                        .HasForeignKey("UnitId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Cafe.Models.DBModels.Order", b =>
                {
                    b.HasOne("Cafe.Models.DBModels.Waiter", "Waiter")
                        .WithMany("Orders")
                        .HasForeignKey("WaiterId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Cafe.Models.DBModels.Stock", b =>
                {
                    b.HasOne("Cafe.Models.DBModels.Ingredient", "Ingredient")
                        .WithMany("Stocks")
                        .HasForeignKey("IngredientId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
