const db = require("../models");

module.exports = app => {
    app.get("/", (req, res) => {
        res.render("index");
    })
    app.get("/scrape", (req, res) => {
        res.render("index");
    })
}