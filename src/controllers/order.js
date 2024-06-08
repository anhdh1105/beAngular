import { StatusCodes } from "http-status-codes";
import Order from "../models/order";

export const createOrder = async (req, res) => {

    try {
        const { userId, items, totalPrice, customerInfo } = req.body;
        const order = await Order.create({ userId, items, totalPrice, customerInfo });
        return res.status(StatusCodes.CREATED).json(order);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

export const getOrders = async (req, res) => {
    try {
        const order = await Order.find();
        if (order.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "No order found" });
        }
        return res.status(StatusCodes.OK).json(order);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};


export const getOrderById = async (req, res) => {
    console.log('Order');
    try {
        console.log(req.params);
        const { userId, orderId } = req.params;
        console.log({ userId, orderId });
        const order = await Order.findOne({ userId, _id: orderId });
        console.log(order);
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Order not found" });
        }
        res.status(StatusCodes.OK).json(order);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};


export const updateOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const { userId, items, totalPrice, status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { userId, items, totalPrice, status },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller để xóa một đơn hàng
export const deleteOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId);
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};