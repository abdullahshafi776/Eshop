import express from "express";
const router = express.Router();
import {
  addOrderitems,
  getOrderByID,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderitems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderByID);
router.route("/:id/delivered").put(protect, admin, updateOrderToDelivered);

export default router;
