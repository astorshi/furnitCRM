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

module.exports = router;
