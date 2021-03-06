const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(cors());
// SEP-1 for serving info using stellar.toml
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.json({
    status: "Deployed on Heroku!!!!!",
  });
});

app.get("/.well-known/stellar.toml", (req, res, next) => {
  const options = {
    root: path.join(__dirname, "public"),
  };
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("content-type", "text/plain");
  res.sendFile("stellar.toml", options);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
