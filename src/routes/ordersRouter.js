const { Router } = require("express");
const Orders = require("../models/orderModel");
const Client = require("../models/clientModel");
const Comment = require("../models/commentModel");
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
    const { clientId } = req.params;
    const currentClient = await Client.findById(clientId);
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
  const currentOrder = await Orders.findById(orderId).populate("client");
  console.log();
  res.render("orderDetails", { currentOrder });
});

router.route("/:orderId/details/comment").post(async (req, res) => {
  try {
    const { body } = req.body;
    const { orderId } = req.params;
    let dat = new Date();
    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    let dateNow = dat.toLocaleString("ru-RU", options);
    const newComment = await Comment.create({
      body,
      user: res.locals.name,
      date: dateNow,
    });
    await Order.findByIdAndUpdate(
      orderId,
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    );
    res.json(newComment);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
