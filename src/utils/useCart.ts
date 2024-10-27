interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export const addToCart = (cartItem: CartItem) => {
  if (typeof window !== "undefined") {
    const localCartString = localStorage.getItem("@cart");
    if (!localCartString) {
      // If no cart exists, create a new one with the item
      localStorage.setItem("@cart", JSON.stringify([cartItem]));
    } else {
      let localCart = JSON.parse(localCartString) as CartItem[];

      const itemIndex = localCart.findIndex(
        (item: CartItem) => item.name === cartItem.name
      );

      if (itemIndex !== -1) {
        // If the item exists, increment its quantity
        localCart[itemIndex]!.quantity += cartItem.quantity;
      } else {
        // If the item doesn't exist, add it to the cart
        localCart.push(cartItem);
      }

      // Update localStorage with the new cart state
      localStorage.setItem("@cart", JSON.stringify(localCart));
    }
  }
};

export const clearCart = () => {
  console.log("");
  localStorage.removeItem("@cart");
};
