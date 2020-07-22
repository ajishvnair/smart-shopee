const mongoose = require("mongoose");
const Location = require("./../models/Location");

exports.create = async (req, res) => {
    try {
        const {
            active,
            location,
            deliveryCharge,
            deliveryTime,
            isDeleted,
        } = req.body;

        const newLocation = new Location({
            active,
            location,
            deliveryCharge,
            isDeleted,
            deliveryTime,
        });
        await newLocation.save();
        res.send({ location: newLocation });
    } catch (err) {
        return res.status(400).json({ errors: "Something went wrong" });
    }
};

exports.edit = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            active,
            location,
            deliveryCharge,
            deliveryTime,
            isDeleted,
        } = req.body;

        let newLocation = await Location.findOneAndUpdate(
            { _id: id },
            {
                active,
                location,
                deliveryCharge,
                isDeleted,
                deliveryTime,
            }
        );

        newLocation = await Location.find({ _id: id });
        res.send({ location: newLocation[0] });
    } catch (err) {
        return res.status(400).json({ errors: "Something went wrong" });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const location = await Location.findOneAndRemove({ _id: id });
        res.send({ msg: "Location deleted successfully" });
    } catch (err) {
        return res.status(400).json({ errors: "Something went wrong" });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { active } = req.body;
        const location = await Location.findOneAndUpdate(
            { _id: id },
            { active }
        );
        res.send({ msg: "Status changed successfully" });
    } catch (err) {
        return res.status(400).json({ errors: "Something went wrong" });
    }
};

exports.all = async (req, res) => {
    try {
        const locations = await Location.find().sort({ createdAt: -1 });
        res.send({ locations });
    } catch (err) {
        return res.status(400).json({ errors: "Something went wrong" });
    }
};

exports.allActive = async (req, res) => {
    try {
        const locations = await Location.find({ active: true }).sort({
            createdAt: -1,
        });
        res.send({ locations });
    } catch (err) {
        return res.status(400).json({ errors: "Something went wrong" });
    }
};
