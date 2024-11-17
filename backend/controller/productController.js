const Product = require("../models/product");

// Helper function for handling errors
const handleError = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({ error: message });
};

const addProduct = async (req, res) => {
  const { shoename, description, price, quantity } = req.body;

  try {
    // Check if the fields are not empty
    if (!shoename || shoename.trim() === '') {
      return handleError(res, "Invalid 'shoename': Cannot be empty.", 400);
    }

    if (!description || description.trim() === '') {
      return handleError(res, "Invalid 'description': Cannot be empty.", 400);
    }

    if (price === undefined || price === null) {
      return handleError(res, "Invalid 'price': Cannot be empty.", 400);
    }

    if (!quantity || typeof quantity !== 'object') {
      return handleError(res, "Invalid 'quantity': Must be an object.", 400);
    }

    // Check for non-empty sizes in quantity (assuming quantity is an object with sizes like 'L', 'M', 'S')
    const sizes = ['L', 'M', 'S'];
    for (let size of sizes) {
      if (quantity[size] === undefined || quantity[size] === null) {
        return handleError(res, `Invalid quantity for size '${size}': Cannot be empty.`, 400);
      }
    }

    // Data is valid, proceed to save the product
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    console.log("Product added successfully:", savedProduct);
    return res.status(201).json(savedProduct); // Return created product with 201 status
  } catch (error) {
    console.error("Error adding product:", error.message);
    return handleError(res, "Internal server error", 500); // Return internal server error status
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return handleError(res, "No products found", 404); // Return 404 if no products found
    }
    console.log("Products retrieved successfully:", products);
    return res.status(200).json(products); // Return products with 200 status
  } catch (error) {
    console.error("Error retrieving products:", error.message);
    return handleError(res, "Internal server error", 500); // Return internal server error status
  }
};

module.exports = {
  addProduct,
  getAllProduct,
};
