const { Router } = require("express");
const Client = require("../models/clientModel");

const router = Router();

router.route("/").get(async (req, res) => {
  try {
    const allClients = await Client.find();
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
  .post((req, res) => {
    
  });

module.exports = router;
