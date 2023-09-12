using System.ComponentModel.DataAnnotations.Schema;

namespace TestShop.Models
{
    [Table("ProductCategory")]
    public class ProductCategory
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
