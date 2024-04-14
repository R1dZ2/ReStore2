namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            if (Items.All(i => i.ProductId != product.Id))
            {
                Items.Add(new BasketItem { ProductId = product.Id, Quantity = quantity });
                return;
            }

            Items.First(i => i.ProductId == product.Id).Quantity += quantity;
        }

        public void RemoveItem(int productId)
        {
            var item = Items.FirstOrDefault(i => i.ProductId == productId);
            if (item is null) return;

            if (item.Quantity > 1)
            {
                item.Quantity--;
                return;
            }

            Items.Remove(item);
        }
    }
}