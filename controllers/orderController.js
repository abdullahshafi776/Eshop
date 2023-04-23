import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

const addOrderitems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.lenght === 0) {
    res.status(404);
    throw new Error("No order item");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      isPaid: true,
    });
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

const getOrderByID = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user._id });
  res.json(order);
});

const getOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({}).populate("user", "id name");
  res.json(order);
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    const updateOrder = order.save();
    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  addOrderitems,
  getOrderByID,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
};
