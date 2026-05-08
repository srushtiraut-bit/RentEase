const express = require("express");
const router = express.Router();

console.log("Product Routes Loaded");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

// Routes for /api/products
router.route("/")
  .get(getProducts)
  .post(protect, createProduct); // optional protect

// Routes for /api/products/:id
router.route("/:id")
  .get(getProductById)
  .put(protect, updateProduct)   // optional protect
  .delete(protect, deleteProduct);

module.exports = router;