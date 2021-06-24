const { Router } = require("express");
const Client = require("../models/clientModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");

const router = Router();

router.route("/").get(async (req, res) => {
  try {
    const allClients = await Client.find()
      .populate("creator")
      .populate("comments")
      .lean();
    res.render("clients", { allClients });
  } catch (error) {
    console.log(error);
  }
});

router
  .route("/new")
  .get((req, res) => {
    res.render("newClient");
  })
  .post(async (req, res) => {
    try {
      const newClient = await Client.create({
        ...req.body,
        creator: req.session.user.id,
      });
    } catch (error) {
      console.log(error);
    }
  });

router.route("/comment").post(async (req, res) => {
  try {
    const { body, clientId } = req.body;
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
    await Client.findByIdAndUpdate(
      clientId,
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

router
  .route("/:clientId")
  .get(async (req, res) => {
    try {
      const currentClient = await Client.findById(req.params.clientId);
      res.render("editClient", { currentClient });
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res) => {
    await Client.findByIdAndUpdate(req.params.clientId, req.body, {
      new: true,
    });
    res.redirect("/clients");
  })
  .delete(async (req, res) => {
    try {
      await Client.findByIdAndDelete(req.params.clientId);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
