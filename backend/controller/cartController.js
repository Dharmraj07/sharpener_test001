const Cart = require("../models/cart");
const Product = require("../models/product");

// Helper function for handling errors
const handleError = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({ error: message });
};

const addToCart = async (req, res) => {
  const {  productId, size, quantity } = req.body;

  try {
    const product = await Product.findById({_id:productId});
    if (!product) {
      return handleError(res, "Product not found", 404);
    }

    // Check if requested quantity is available
    if (product.quantity[size] < quantity) {
      return handleError(res, `Not enough quantity available for size ${size}`, 400);
    }

    // Deduct quantity from the product
    product.quantity[size] -= quantity;
    await product.save();

    // Find or create cart
    let cart = await Cart.findById(cartId);
    if (!cart) {
      cart = new Cart({ items: [] });
    }

    // Check if the product and size are already in the cart
    const cartItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (cartItemIndex > -1) {
      // Update existing cart item
      cart.items[cartItemIndex].quantity += quantity;
    } else {
      // Add new cart item
      cart.items.push({ productId, size, quantity });
    }

    await cart.save();
    return res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    return handleError(res, error.message, 500); // Internal server error
  }
};

const getAllCarts = async (req, res) => {
  try {
    // Fetch all carts from the database
    const carts = await Cart.find().populate("items.productId");

    if (!carts || carts.length === 0) {
      return handleError(res, "No carts found", 404);
    }

    // Format carts for response
    const allCarts = carts.map((cart) => ({
      cartId: cart._id,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        productName: item.productId.name,
        size: item.size,
        quantity: item.quantity,
        pricePerUnit: item.productId.price,
        totalPrice: item.quantity * item.productId.price,
      })),
    }));

    console.log("All carts retrieved:", allCarts);
    return res.status(200).json(allCarts);
  } catch (error) {
    console.error("Error retrieving all carts:", error.message);
    return handleError(res, "Error retrieving carts", 500); // Internal server error
  }
};

module.exports = { addToCart, getAllCarts };
