const { Router } = require("express");
const router = Router();
const Users = require("../models/userModel");

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
