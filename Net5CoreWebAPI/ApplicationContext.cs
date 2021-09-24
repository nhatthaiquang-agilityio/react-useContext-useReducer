using Microsoft.EntityFrameworkCore;
using Net5CoreWebAPI.Models;

namespace Net5CoreWebAPI
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions options): base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}