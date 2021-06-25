const { Router } = require("express");
const Orders = require("../models/orderModel");
const Client = require("../models/clientModel");
const router = Router();

router.route("/").get(async (req, res) => {
  try {
    const allOrders = await Orders.find().populate("client");
    res.render("orders", { allOrders });
  } catch (error) {
    console.log(error);
  }
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
      const {
        number,
        typeFurn,
        priceFurn,
        deliveryTeam,
        deliveryDate,
        delivPrice,
        constructDate,
        constructTeam,
        constructPrice,
        status,
      } = req.body;
      const newOrder = await Orders.create({
        number,
        typeFurn,
        priceFurn,
        deliveryTeam,
        deliveryDate,
        delivPrice,
        constructDate,
        constructTeam,
        constructPrice,
        status,
        client: currentClient?._id,
      });
      res.redirect("/orders");
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
