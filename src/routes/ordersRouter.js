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
      const newOrder = await Orders.create({
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
      res.redirect("/orders");
    } catch (error) {
      console.log(error);
    }
  });

router
  .route("/:orderId/details")
  .get(async (req, res) => {
    const { orderId } = req.params;
    const currentOrder = await Orders.findById(orderId)
      .populate("client")
      .populate("comments");
    res.render("orderDetails", { currentOrder });
  })
  .delete(async (req, res) => {
    try {
      const { orderId } = req.params;
      await Orders.findByIdAndDelete(orderId);
      res.status(200).redirect("/orders");
    } catch (error) {
      console.log(error);
    }
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
    const tmpOrder = await Orders.findByIdAndUpdate(
      orderId,
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    );
    console.log("tmpOrder===>", tmpOrder);
    res.json(newComment);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
