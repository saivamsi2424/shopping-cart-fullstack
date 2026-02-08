const router = require("express").Router();
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) return res.status(400).send("Cart empty");

  const order = new Order({
    userId: req.user._id,
    items: cart.items,
  });

  await order.save();
  await Cart.deleteOne({ _id: cart._id });

  res.send("Order placed");
});

router.get("/", auth, async (req, res) => {
  res.send(await Order.find({ userId: req.user._id }));
});

module.exports = router;
