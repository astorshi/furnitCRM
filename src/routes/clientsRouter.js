const { Router } = require("express");
const Client = require("../models/clientModel");
const Comment = require("../models/commentModel");

const router = Router();

router.route("/").get(async (req, res) => {
  try {
    const allClients = await Client.find()
      .populate("creator")
      .populate("comments");
    const allComments = allClients.map((el) => el.comments);
    console.log("allComments===>", allComments);
    res.render("clients", { allClients });
  } catch (error) {
    console.log(error);
  }
});

router
  .route("/new")
  .get((req, res) => {
    console.log(8888888);
    res.render("newClient");
  })
  .post(async (req, res) => {
    console.log(1111111111);
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
  console.log("req.body===>", req.body);
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
    // console.log("dat==>", dat);
    // console.log("dateNow==>>", dateNow);
    const newComment = await Comment.create({
      body,
      user: req.session.user.id,
      date: dateNow,
    });
    const currentClient = await Client.findByIdAndUpdate(
      clientId,
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    );
    console.log("currentClient===>>>", currentClient);
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
