require('dotenv').config()
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const db = require("./db");

const bodyparser = require("body-parser");
app.use(bodyparser.json());

// middleware functions
const logreq = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Req made to : ${req.originalUrl}`);
  next();
}
app.use(logreq)
// using for authentication
const passport = require('./auth')
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})

app.get("/",(req, res) => {
  return res.send("welocme to my hotel's homeland");
});

const personRouter = require('./routers/Person');
app.use('/person', personRouter)

const menuRouter = require('./routers/MenuItems');
app.use('/menu', localAuthMiddleware ,menuRouter);

app.listen(PORT, () => console.log("server running at port", PORT));
