const express = require('express');

const router = express.Router();

const categoryRouter = require('./category.routes');
const productRouter = require('./product.routes');
const userRouter = require('./user.routes');
const cartRouter = require('./cart.routes');
const imageRouter = require('./image.routes');

router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/cart', cartRouter);
router.use('/gallaries', imageRouter);

module.exports = router;
