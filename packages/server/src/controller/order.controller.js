const mongoose = require("mongoose");
const Order = require("../models/Order");
const CompletedOrder = require("../models/CompletedOrder");

exports.create = async (req, res) => {
    try {
        const {
            userId,
            userName,
            address,
            location,
            products,
            mobileNo,
            totalAmount,
        } = req.body;

        const order = new Order({
            userId,
            userName,
            address,
            location,
            products,
            mobileNo,
            totalAmount,
        });
        await order.save();
        res.send({
            message: "Order accepted",
        });
    } catch (err) {
        return res.status(400).json({ errors: "Something went wrong" });
    }
};

exports.get = async (req, res) => {
    try {
        const orders = await Order.find().sort({ orderdTime: 1 });
        res.send({ orders });
    } catch (err) {
        return res.status(400).json({ errors: "Something went wrong" });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findOneAndRemove({
            _id: mongoose.Types.ObjectId(id),
        }).lean();
        const completedOrder = new CompletedOrder({
            ...order,
            status: "completed",
        });
        await completedOrder.save();
        res.send({
            message: "Order deleted",
        });
    } catch (err) {
        return res.status(400).json({ errors: "Something went wrong" });
    }
};
