require("dotenv").config();
const express = require("express");
const path = require("path");
const sessions = require("express-session");
const MongoStore = require("connect-mongo");
const { connect } = require("./src/db/db");
const hbs = require("hbs");
const morgan = require("morgan");
const { DB_CONNECTION_URL, SECRET_KEY } = process.env;

const { helperCheckAndAdd } = require("./helper-func/helper.js");

const indexRouter = require("./src/routes/indexRouter");
const authRouter = require("./src/routes/authRouter");
const clientsRouter = require("./src/routes/clientsRouter");
const ordersRouter = require("./src/routes/ordersRouter");

const PORT = process.env.PORT || 3000;

const app = express();

console.log();

const sessionParser = sessions({
  name: app.get("cookieName"),
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: DB_CONNECTION_URL,
  }),
  cookie: {
    // secure: true,
    httpOnly: true,
    maxAge: 100000000,
  },
});
app.use(sessionParser);

app.use(morgan("dev"));
app.set("view engine", "hbs");
hbs.registerHelper("helperCheckAndAdd", helperCheckAndAdd);
hbs.registerPartials(path.join(__dirname, "src", "views", "partials"));
app.set("cookieName", "userCookie");
app.set("views", path.join(process.env.PWD, "src", "views"));
app.use(express.static(path.join(__dirname, "src", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(morgan('dev'));
app.use((req, res, next) => {
  // res.locals.email = req.session.email;
  if (req.session?.user) {
    res.locals.id = req.session.user.id;
    res.locals.name = req.session.user.name;
    res.locals.email = req.session.user.email;
<<<<<<< HEAD

    console.log(res.locals);
=======
>>>>>>> 49e11dc2f7ed0493f6e60a92b2ed53c07cb0cf3d
  }
  next();
});

app.use("/auth", authRouter);
app.use("/clients", clientsRouter);
app.use("/orders", ordersRouter);
<<<<<<< HEAD

=======
app.use("/", indexRouter);
>>>>>>> 49e11dc2f7ed0493f6e60a92b2ed53c07cb0cf3d

app.listen(PORT, () => {
  connect();
  console.log("Server started on PORT", PORT);
  connect();
});
