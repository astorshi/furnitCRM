const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const Orders = require("../models/orderModel");

router.route("/").get(async (req, res) => {
  res.render("orders.hbs");
});







module.exports = router;
