const express = require("express");
const path = require("path");
const hbs = require("hbs");

const port = process.env.PORT || '3001';
const logger = require("morgan");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
hbs.registerPartials(__dirname + "/views/partials");
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, (err) => {
  if (err) {
    return console.log(">>>>>>>>>>>>>>>ooooops", err);
  }
  console.log(`>>>Server is listening on port ${port}<<<`);
});
