using Microsoft.EntityFrameworkCore;

namespace TestShop.Models
{
    public class TestShopContext : DbContext
    {
        public TestShopContext(DbContextOptions<TestShopContext> options) 
            : base(options)
            {
            }
        public DbSet<Product> Products { get; set; }

        public DbSet<ProductCategory> ProductCategories { get; set; }

    }
}
