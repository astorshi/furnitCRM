require("dotenv").config();
const express = require("express");
const path = require("path");
const sessions = require("express-session");
const MongoStore = require("connect-mongo");
//const morgan = require('morgan');
//const secretKey = require("crypto").randomBytes(64).toString("hex");
const { SECRET_KEY } = process.env;
const { connect } = require("./src/db/db");
const hbs = require("hbs");
const morgan = require("morgan");
//const { DB_HOST, DB_NAME, DB_PORT } = process.env;
const { DB_CONNECTION_URL } = process.env;

const { helperCheckAndAdd } = require("./helper-func/helper.js");

const indexRouter = require("./src/routes/indexRouter");
const authRouter = require("./src/routes/authRouter");
const clientsRouter = require("./src/routes/clientsRouter");

const ordersRouter = require("./src/routes/ordersRouter");

const PORT = process.env.PORT || 3000;

const app = express();

const sessionParser = sessions({
  name: app.get("cookieName"),
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    //  mongoUrl: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    mongoUrl: DB_CONNECTION_URL,
  }),
  cookie: {
    // secure: true,
    httpOnly: true,
    maxAge: 100000000,
  },
});
app.use(sessionParser);

hbs.registerHelper("helperCheckAndAdd", helperCheckAndAdd);

app.set("cookieName", "userCookie");
app.set("views", path.join(process.env.PWD, "src", "views"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "src", "public")));
hbs.registerPartials(path.join(__dirname, "src", "views", "partials"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(morgan('dev'));
app.set("view engine", "hbs");

app.use((req, res, next) => {
  if (req.session.user?.id) {
    res.locals.id = req.session.user.id;
    res.locals.name = req.session.user.name;
    res.locals.email = req.session.user.email;

    console.log(res.locals);
  }
  next();
});

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/clients", clientsRouter);
app.use("/orders", ordersRouter);


app.listen(PORT, () => {
  connect();
  console.log("Server started on PORT", PORT);
});
