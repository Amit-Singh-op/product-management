const express = require("express");
const router = express.Router();
const validateProduct = require("../validators/productValidator");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Routes
router.post("/products", validateProduct, createProduct);
router.get("/products", getProducts);
router.put("/products/:id", validateProduct, updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
