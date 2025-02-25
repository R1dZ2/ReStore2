using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext context;
        public BasketController(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null)
            {
                return NotFound();
            }
            return MapBasketToDto(basket);
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();

            if (basket == null) basket = CreateBasket();

            var product = await context.Products.FindAsync(productId);

            if (product == null) return BadRequest(new ProblemDetails
            {
                Title = "Product not found"
            });

            basket.AddItem(product, quantity);

            var result = await context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

            return BadRequest(new ProblemDetails
            {
                Title = "Failed to add item to basket"
            });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId)
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            basket.RemoveItem(productId);

            var result = await context.SaveChangesAsync() > 0;

            if (result) return Ok();
            return BadRequest(new ProblemDetails
            {
                Title = "Failed to remove item from basket"
            });
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await context.Baskets
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30)
            };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket
            {
                BuyerId = buyerId
            };
            context.Baskets.Add(basket);
            return basket;
        }


        private static BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(x => new BasketItemDto
                {
                    ProductId = x.ProductId,
                    Name = x.Product.Name,
                    Price = x.Product.Price,
                    PictureUrl = x.Product.PictureUrl,
                    Type = x.Product.Type,
                    Brand = x.Product.Brand,
                    Quantity = x.Quantity,
                }).ToList()
            };
        }
    }
}