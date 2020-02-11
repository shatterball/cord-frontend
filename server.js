const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const sslRedirect = require("heroku-ssl-redirect");

const app = express();

app.use(sslRedirect());
app.use("/", serveStatic(path.join(__dirname, "/dist")));

app.get(/.*/, function(req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port);

// eslint-disable-next-line no-console
console.log(`Devcord is listening on port: ${port}`);
