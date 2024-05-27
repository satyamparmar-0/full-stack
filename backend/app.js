const express = require("express");
const app = express();
const path = require("path");
const port = 4000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require('cors');

// Parse incoming requests with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        res.send('Hello World!')
// })

app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// connection with the database
const connectToDatabase = require("./connection");
connectToDatabase();
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRoutes = require('./routes/products')
//var billingRouter = require("./routes/billing");

// view engine for ejs
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use('/',productsRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
