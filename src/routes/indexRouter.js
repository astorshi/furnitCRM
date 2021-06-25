const { Router } = require("express");
const router = Router();
const Users = require("../models/userModel");

router.get("/", (req, res) => {
  const user = req.session.user;
  res.render("index", { user });
});

module.exports = router;
