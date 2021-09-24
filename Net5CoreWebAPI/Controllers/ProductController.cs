using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Net5CoreWebAPI.Models;
using Net5CoreWebAPI.Services;

namespace Net5CoreWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ILogger<ProductController> _logger;
        private readonly ProductService _productService;

        public ProductController(ProductService productService, ILogger<ProductController> logger)
        {
            _logger = logger;
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseModel>> GetProductsAsync([FromQuery] RequestModel requestModel)
        {
            try
            {
                var results = await _productService.GetProductsAsync();
                var products = results.Skip(requestModel.PageIndex * requestModel.PageSize)
                    .Take(requestModel.PageSize)
                    .ToList();

                var productsResponse = new ResponseModel
                {
                    total = results.Count,
                    results = products
                };

                return Ok(productsResponse);
            }
            catch (Exception exception)
            {
                _logger.LogError(
                    $"Request is failed {{pageIndex}} {{pageSize}}", 
                    requestModel.PageIndex, requestModel.PageSize, exception);
                return BadRequest("Request is failed");
            }
        }

        [HttpGet("{productId}")]
        public async Task<ActionResult<Product>> GetByIdAsync(int productId)
        {
            var product = await _productService.GetProductAsync(productId);

            if (product == null)
            {
                return Ok();
            }

            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> Create(Product product)
        {
            try
            {
                var objProduct = await _productService.CreateAsync(product);
                product.ProductId = objProduct.ProductId;
                product.DateCreated = DateTime.Now;
                return Ok(product);
            }
            catch(Exception exception)
            {
                _logger.LogError($"Product couldn't create {{productName}}", product.ProductName, exception);
                return BadRequest("Request is failed");
            }
        }

        [HttpPut("{productId}")]
        public async Task<ActionResult<Product>> Update(int productId, Product product)
        {
            try
            {
                var updatedProduct = await _productService.UpdateAsync(product);
                return Ok(updatedProduct);
            }
            catch(Exception exception)
            {
                _logger.LogError(
                    $"Product doesn't update {{productId}} {{productName}}",
                    productId, product.ProductName, exception);
                return BadRequest("Request is failed");
            }
        }

        [HttpDelete("{productId}")]
        public async Task<ActionResult> DeleteAsync(int productId)
        {
            try
            {
                _logger.LogInformation("Delete", productId);
                var isDeleted = await _productService.DeleteAsync(productId);
                
                if (isDeleted)
                    return Ok();

                return BadRequest("Request is failed.");
            }
            catch(Exception exception)
            {
                _logger.LogError($"Product couldn't delete {{productId}}", productId,  exception);
                return BadRequest("Request is failed");
            }
        }
    }
}