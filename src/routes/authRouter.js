const { Router } = require("express");
const bcrypt = require("bcrypt");
const saltRound = 10;
const router = Router();
const Users = require("../models/userModel");

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, saltRound);
    const newUser = await Users.create({
      name,
      email,
      password: hash,
    });
    if (newUser) {
      req.session.user = {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      };
    }
    return res.redirect("/");
  } catch (err) {
    const flag = true;
    return res.status(418).render("signup", { flag });
  }
});

router.get("/signout", (req, res) => {

  req.session.destroy(function(err) {
    if (err) return res.redirect('/')
    res.clearCookie(req.app.get("cookieName"));
    res.redirect("/");
  })
 
});

router.get("/signin", async (req, res) => {
  res.render("signin");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await Users.findOne({ email });
    const check =  bcrypt.compare(password, findUser.password);
    if (check) {
      req.session.newId = findUser._id;
      req.session.user = {
        id: findUser._id,
        name: findUser.name,
        email: findUser.email,
      };
      return res.redirect('/');
    } else {
      const flag2 = true;
      return res.status(418).render("signin", { flag2 });
    }
  } catch (err) {
    const flag = true;
    return res.status(418).render("signin", { flag });
  }
});

module.exports = router;
