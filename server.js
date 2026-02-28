const express = require("express");
const path = require("path");
const fs = require("fs");
const {createClient} = require("@supabase/supabase-js");
let client = createClient("https://jgjdxlulszliepzrhgff.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnamR4bHVsc3psaWVwenJoZ2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0ODc1ODIsImV4cCI6MjA4MTA2MzU4Mn0.OWdRl6uqpdui33Jg0g1SRMS3oeKVDUOBsogBovVnq_I");

async function DB(sil, stat, miss) {
    await client.from("silos").update({status: stat, missle: miss}).eq("silo", sil);
}

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
    if (req.body.password == fs.readFileSync(path.resolve("password.txt"), "utf8")) {
        let silo = req.body.silo;
        let status = req.body.status;
        let missle = req.body.missle;
        DB(silo, status, missle);
        res.send("Updated Status");
    } else {
        res.send("Incorrect Password");
    }
})

app.listen(3000);