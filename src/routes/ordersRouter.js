const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const Order = require("../models/orderModel");
const Client = require("../models/clientModel");

router.route("/").get(async (req, res) => {
  res.render("orders");
});

router
  .route("/new/:clientId")
  .get(async (req, res) => {
    const { clientId } = req.params;
    const currentClient = await Client.findById(clientId);
    res.render("newOrder", { currentClient });
  })
  .post(async (req, res) => {
    const { clientId } = req.params;
    const currentClient = await Client.findById(clientId);
    try {
      const newOrder = await Order.create({
        ...req.body,
        client: currentClient?._id,
      });
      const updClient = await Client.findByIdAndUpdate(
        clientId,
        {
          $push: { orders: newOrder._id },
        },
        { new: true }
      );
      console.log("updClient===>", updClient);
      res.redirect("/orders");
    } catch (error) {
      console.log(error);
    }
  });

router.route("/:orderId/details").get(async (req, res) => {
  const { orderId } = req.params;
  const currentOrder = await Order.findById(orderId).populate('client');
  console.log();
  res.render("orderDetails", { currentOrder });
});

module.exports = router;
