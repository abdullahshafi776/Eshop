import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, image, category } = req.body;
  const product = new Product({
    name: name,
    price: price,
    user: req.user._id,
    image: image,
    category: category,
  });

  const createdProduct = await product.save();
  res.status(200).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.body.id);
  if (product) {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.image = req.body.image || product.image;

    await product.save();
    res.json({ message: "Product Updated" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
