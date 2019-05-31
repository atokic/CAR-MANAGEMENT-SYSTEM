using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    using System;
    using System.Collections.Generic;

    public partial class Car
    {
        public int CarID { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public Nullable<int> Year { get; set; }
        public Nullable<int> Price { get; set; }
        public Nullable<int> Kilometers { get; set; }
        public string Fuel { get; set; }
        public Nullable<int> Power { get; set; }
        public Nullable<decimal> Consumption { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }

        public string UserId { get; set; }
    }
}
