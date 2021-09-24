using Net5CoreWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Net5CoreWebAPI
{
    public class AppContextSeed
    {
        public async Task SeedAsync(ApplicationContext context)
        {
            if (!context.Products.Any())
            {
                await context.Products.AddRangeAsync(GetPreconfiguredProducts());
                await context.SaveChangesAsync();
                await context.SaveChangesAsync();
            }
        }

        private static IEnumerable<Product> GetPreconfiguredProducts()
        {
            return new List<Product>
            {
                new Product
                {
                    Quantity = 100,
                    ProductName = "Bot Black Hoodie",
                    Price = 19,
                    Code = "BOt Hoodie 101",
                    DateCreated = DateTime.Now
                },
                new Product
                {
                    Quantity = 100,
                    ProductName =  "Black & White Shoes",
                    Price = 18,
                    Code = "BOt White 102",
                    DateCreated = DateTime.Now
                },
                new Product
                {
                    Quantity = 100,
                    ProductName = "Prism White T-Shirt",
                    Price = 18,
                    Code = "White T-Shirt 102",
                    DateCreated = DateTime.Now
                },
                new Product
                {
                    Quantity = 100,
                    ProductName = "Foundation T-shirt",
                    Price = 18,
                    Code = "Foundation T-shirt 102",
                    DateCreated = DateTime.Now
                },
                new Product
                {
                    Quantity = 200,
                    ProductName = "Roslyn Red trousers pantst",
                    Price = 22,
                    Code = "Roslyn R 102",
                    DateCreated = DateTime.Now
                },
                new Product
                {
                    Quantity = 140,
                    ProductName = "Blue Hoodie",
                    Price = 15,
                    Code = "Blue Hoodie R 102",
                    DateCreated = DateTime.Now
                },
                new Product
                {
                    Quantity = 160,
                    ProductName = "Roslyn Red T-Shirt",
                    Price = 25,
                    Code = "Roslyn R 152",
                    DateCreated = DateTime.Now
                },
                new Product
                {
                    Quantity = 160,
                    ProductName = "Kudu Purple Hoodie",
                    Price = 15,
                    Code = "HodPur R 152",
                    DateCreated = DateTime.Now
                },
                new Product
                {
                    Quantity = 160,
                    ProductName = "White Sneaker 11",
                    Price = 35,
                    Code = "White Sneaker 152",
                    DateCreated = DateTime.Now
                },
                new Product
                {
                    Quantity = 180,
                    ProductName = "F1 Trouser",
                    Price = 35,
                    Code = "F1 Trouser 111",
                    DateCreated = DateTime.Now
                },
            };
        }
    }
}
