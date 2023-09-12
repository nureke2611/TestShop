using System.ComponentModel.DataAnnotations.Schema;

namespace TestShop.Models
{
    [Table("Products")]
    public class Product
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int Price { get; set; }

        public int Weight { get; set; }

        public string Color {get; set; }

        public int ProductCategoryId { get; set; }
    }
}
