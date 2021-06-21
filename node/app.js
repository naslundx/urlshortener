"use strict";

const express = require('express');
const cookieParser = require("cookie-parser");
const { query, validationResult } = require('express-validator');
const db = require('./storage'); 

const app = express();
app.set('view engine', 'ejs');
app.use(cookieParser());

// Endpoints
app.get('/create', [query("url").isURL()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        return res.json(errors[0]);
    }

    let userid = null;
    console.log(req.query);
    if ("userid" in req.query && typeof req.query.userid === "string") {
        if (req.query.userid.length > 5) {
            userid = req.query.userid;
        }
    }

    const result = db.shorten(decodeURI(req.query.url), userid);
    res.json(result);
});

// Pages
app.get("/", (req, res) => {
    let previous = [];
    if ("userid" in req.cookies === false) {
        res.cookie("userid", db.create_uid());
    } else {
        previous = db.allByUser(req.cookies.userid);
    }

    res.render("pages/index", {previous});
});

// Static data
app.use(express.static('public'));

app.get("*", (req, res) => {
    const path = req.path.split("/")[1];
    const result = db.follow(path);

    if (result === null) {
        res.status(404);
        return res.render("pages/notfound");
    }

    res.render("pages/follow", {url: result});
});

app.listen(process.env.PORT || 5000);
