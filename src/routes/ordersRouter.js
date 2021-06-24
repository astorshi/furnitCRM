const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const Orders = require("../models/orderModel");
const { model } = require("mongoose");

router.route("/clients/new").get(async (req, res) => {
  res.render("../views/ordersForm");
});

module.exports = router;
