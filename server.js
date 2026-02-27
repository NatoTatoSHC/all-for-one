const express = require("express");

var app = express();

app.post("/", (req, res)) {
    console.log("posted")
}

app.listen(3000);