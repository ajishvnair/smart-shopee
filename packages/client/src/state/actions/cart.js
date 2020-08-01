// initial time
export const initCart = (cart) => ({
    type: "SET",
    payload: [...cart.products],
});

// set cart when pressing add to cart
export const setCart = (cart) => ({
    type: "SET",
    payload: [...cart],
});
