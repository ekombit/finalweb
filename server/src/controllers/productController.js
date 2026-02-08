const { validationResult } = require("express-validator");
const Product = require("../models/Product");

async function createProduct(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: "Validation error", errors: errors.array() });

  const product = await Product.create(req.body);
  res.status(201).json(product);
}

async function getProducts(req, res) {
  const items = await Product.find().sort({ createdAt: -1 });
  res.json(items);
}

async function getProductById(req, res) {
  const item = await Product.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Product not found" });
  res.json(item);
}

async function updateProduct(req, res) {
  const item = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: "Product not found" });
  res.json(item);
}

async function deleteProduct(req, res) {
  const item = await Product.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Deleted" });
}

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
