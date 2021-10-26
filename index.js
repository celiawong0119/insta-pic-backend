const express = require("express");
const app = express();
const apiRouter = require("./controllers/apiRouter");

const port = 4000;

let myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};

app.use(myLogger);

// expose public folder to anyone
app.use(express.static("public"));
// app.use("/api", apiRouter);

app.get("/user/:id", function (req, res) {
  res.send("dassda" + req.params.id);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
