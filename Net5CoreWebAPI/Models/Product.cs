using System;
using System.ComponentModel.DataAnnotations;

namespace Net5CoreWebAPI.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        [Required]
        public string ProductName { get; set; }

        public string Code { get; set; }

        [Required]
        public decimal Price { get; set; }

        public int Quantity {get; set;}

        public DateTime DateCreated { get; set; }
    }
}
