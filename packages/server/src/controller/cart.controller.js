const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// exports.get = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         const cart = await Cart.findOne({ userId });
//         if (cart) {
//             const { products = [] } = cart;
//             // extracting product ids
//             const productIds = products.map((product) =>
//                 mongoose.Types.ObjectId(product.id)
//             );
//             // taking from db
//             const productList = await Product.find({
//                 _id: { $in: [...productIds] },
//             });
//             // making new array for return
//             // const newProductList = productList.map((pro) => {
//             //     const p = products.find((pr) => pr.id.equals(pro._doc._id));
//             //     return {
//             //         quantity: p.quantity,
//             //         product: pro,
//             //     };
//             // });
//             res.send({
//                 products: productList || [],
//                 quantities: products,
//             });
//         } else {
//             const newCart = await new Cart({
//                 userId,
//                 products: [],
//             });
//             await newCart.save();
//             res.send({
//                 products: [],
//                 quantities: [],
//             });
//         }
//     } catch (err) {
//         return res.status(400).json({ errors: "Something went wrong" });
//     }
// };

// exports.add = async (req, res) => {
//     try {
//         const { userId, product } = req.body;
//         const cart = await Cart.findOne({ userId });
//         if (cart) {
//             const { products = [] } = cart;
//             // checking if product exist or not
//             // it exist then rewrite else add new
//             if (products.find((pro) => pro.id === product.id)) {
//                 const index = products.findIndex(
//                     (pro) => pro.id === product.id
//                 );
//                 products[index] = product;
//             } else {
//                 products.push(product);
//             }
//             await Cart.findOneAndUpdate(
//                 { userId },
//                 { products: [...products] }
//             );
//             res.send({
//                 message: "Added successfully",
//             });
//         } else {
//             const newCart = new Cart({
//                 userId,
//                 products: [product],
//             });
//             newCart.save();
//             res.send({
//                 message: "Added successfully",
//             });
//         }
//     } catch (err) {
//         return res.status(400).json({ errors: "Something went wrong" });
//     }
// };

exports.set = async (req, res) => {
    try {
        const { userId, products = [] } = req.body;
        await Cart.findOneAndUpdate({ userId }, { products }, { upsert: true });
    } catch (err) {
        return res.status(400).json({ errors: "Something went wrong" });
    }
};
