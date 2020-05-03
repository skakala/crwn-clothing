export const addItemToCart = (cartItems, cartItemtoAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemtoAdd.id
  );

  console.log(cartItems, " ", cartItemtoAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemtoAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemtoAdd, quantity: 1 }];
};
