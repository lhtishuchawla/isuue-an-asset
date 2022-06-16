const stellar = require("stellar-sdk");
const express = require("express");
const crypto = require("crypto");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());

/**
 * Status Check End Point
 */
app.get("/", (req, res) => {
  res.json({ status: "Stellar Toml APIs are Deployed!!!!!" });
});

/**
 * -----------SEP1 Implimentation Start---------------//
 */
app.get("/.well-known/stellar.toml", (req, res, next) => {
  const options = { root: path.join(__dirname, "public") };
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("content-type", "text/plain");
  res.sendFile("stellar.toml", options);
});
//-----------SEP1 Implimentation End------------------//

/**
 * Starting Server
 */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is Running Locally on http://localhost:${PORT}`);
});
