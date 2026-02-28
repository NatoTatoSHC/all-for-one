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
var oneTimes = [];
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.sendFile(path.resolve("./index.html"));
});

app.get("/app", (req, res) => {
    res.sendFile(path.resolve("./verify.html"));
});

app.get("/status", (req, res) => {
    res.sendFile(path.resolve("./status.html"));
});

app.post("/app", (req, res) => {
    if (req.body.loc == "") {
        res.redirect("/");
    }
    if (req.body.password == fs.readFileSync(path.resolve("password.txt"), "utf8") || oneTimes.includes(req.body.password)) {
        console.log("verified");
        res.sendFile(path.resolve(req.body.loc+".html"));
        if (oneTimes.includes(req.body.password)) {
            oneTimes.splice(oneTimes.indexOf(req.body.password));
        }
    } else {
        console.log("deniaed");
    }
})

app.post("/status", (req, res) => {
    console.log("Status Update Request");
    console.log(req.body);
    if (req.body.oneTime) {
        if (req.body.password == fs.readFileSync(path.resolve("password.txt"), "utf8")) {
            if (!oneTimes.includes(req.body.oneTime)) {
                oneTimes.push(req.body.oneTime);
            }
            res.redirect("/status");
        } else {
            res.send("Incorrect Password");
        }
    } else {
        if (req.body.password == fs.readFileSync(path.resolve("password.txt"), "utf8")) {
            let silo = req.body.silo;
            let status = req.body.status;
            let missle = req.body.missle;
            DB(silo, status, missle);
            res.send("Updated Status");
        } else {
            res.send("Incorrect Password");
        }
    }
    console.log(oneTimes);
});

app.listen(3000);