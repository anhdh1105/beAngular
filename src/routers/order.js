import { Router } from "express";
import { createOrder, deleteOrder, getOrderById, getOrders, updateOrder } from "../controllers/order";

const router = Router();

router.post('/orders', createOrder);
router.get('/orders', getOrders);
// router.get('/orders/:userId/:orderId', getOrderById);
// Route để lấy một đơn hàng theo ID
router.get("/orders/:userId/:orderId", getOrderById);

// Route để cập nhật thông tin của một đơn hàng
router.put("/orders/:id", updateOrder);

// Route để xóa một đơn hàng
router.delete("/orders/:id", deleteOrder);

export default router;