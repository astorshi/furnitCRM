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
    const currentClient = await Client.findById(req.params.clientId);
    console.log("req.body==>", req.body);
    try {
      const newOrder = await Order.create({
        ...req.body,
        client: currentClient?._id,
      });
      res.redirect("/orders");
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
