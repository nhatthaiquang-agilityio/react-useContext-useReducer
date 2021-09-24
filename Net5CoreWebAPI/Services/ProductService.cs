using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Net5CoreWebAPI.Models;

namespace Net5CoreWebAPI.Services
{
    public class ProductService
    {
        private readonly ApplicationContext _context;
        private readonly ILogger<ProductService> _logger;
        public ProductService(ApplicationContext context, ILogger<ProductService> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public Task<List<Product>> GetProductsAsync()
        {
            return _context.Products.ToListAsync();
        }

        public Task<Product> GetProductAsync(int id)
        {
            return _context.Products.SingleOrDefaultAsync(p => p.ProductId == id);
        }

        public async Task<Product> CreateAsync(Product product)
        {
            try { 
                _context.Products.Add(product);
                await _context.SaveChangesAsync();
                return product;
            } 
            catch(Exception exception)
            {
                _logger.LogError("Couldn't delete item", exception);

                throw new InvalidOperationException("Couldn't delete item in ProductService", exception);
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var product = _context.Products.SingleOrDefaultAsync(
                    item => item.ProductId == id).GetAwaiter().GetResult();

                if (product == null)
                {
                    return false;
                }

                _context.Products.Remove(product);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception exception)
            {
                _logger.LogError("Couldn't delete item", exception);

                throw new InvalidOperationException("Couldn't delete item in ProductService", exception);
            }
        }

        public async Task<Product> UpdateAsync(Product product)
        {
            try { 
                _context.Products.Update(product);
                await _context.SaveChangesAsync();
                return product;
            } 
            catch(Exception exception)
            {
                _logger.LogError("Couldn't delete item", exception);

                throw new InvalidOperationException("Couldn't delete item in ProductService", exception);
            }
        }
    }
}