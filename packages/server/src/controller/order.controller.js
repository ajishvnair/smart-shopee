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

exports.delete = async (req, res) => {
    try {
        const { id } = req.body;
        const order = await Order.findOneAndRemove({ _id: id });
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
