const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = app => {
  app.get("/scrape", (req, res) => {
    axios.get("https://polygon.com/").then(response => {
      const $ = cheerio.load(response.data);

      $("div.c-compact-river__entry").each(function(i, element) {
        let result = {};

        result.title = $(this)
          .find("h2")
          .text();
        result.link = $(this)
          .find("h2")
          .find("a")
          .attr("href");

        db.PolyArticle.create(result)
          .then(dbArticle => console.log(dbArticle))
          .catch(err => console.log(err));
      });
    });

    axios.get("https://www.gamespot.com/").then(response => {
      const $ = cheerio.load(response.data);

      $("article").each(function(i, element) {
        let result = {};

        result.title = $(this)
          .find("h3")
          .text();
        result.summary = $(this)
          .find("p")
          .text();
        result.link = $(this)
          .find("a")
          .attr("href");

        db.SpotArticle.create(result)
          .then(dbArticle =>console.log(dbArticle))
          .catch(err => console.log(err));
      });
    })

    axios.get("https://www.destructoid.com/").then(response => {
      const $ = cheerio.load(response.data);

      $("article").each(function(i, element) {
        let result = {};

        result.title = $(this)
          .find("h2")
          .find("a")
          .text();
        result.summary = $(this)
          .find("p")
          .text();
        result.link = $(this)
          .find("a")
          .attr("href");
        
        db.DestArticle.create(result)
          .then(dbArticle =>console.log(dbArticle))
          .catch(err => console.log(err));
      });
    })
  });
};
