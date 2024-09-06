const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  isRecommended: { type: Boolean, default: false },
  isBestseller: { type: Boolean, default: false },
  status: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
