﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cafe.Models.DBModels
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Weight { get; set; }
        public int Unit { get; set; }
        public double FirstPrice { get; set; }
    }
}
