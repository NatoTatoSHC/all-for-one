const express = require("express");
const path = require("path");
const fs = require("fs");

var app = express();
var status = {"MO":{"D8":{"SG":{"J":[]}}}}
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.sendFile(path.resolve("./index.html"));
});

app.get("/app", (req, res) => {
    res.sendFile(path.resolve("./verify.html"));
})

app.post("/app", (req, res) => {
    if (req.body.loc == "") {
        res.redirect("/");
    }
    if (req.body.password == fs.readFileSync(path.resolve("password.txt"), "utf8")) {
        console.log("verified");
        res.sendFile(path.resolve(req.body.loc+".html"));
    } else {
        console.log("deniaed");
    }
})

app.post("/status", (req, res) => {
    
})

app.listen(3000);