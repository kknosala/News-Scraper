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
        result.company = "polygon";

        db.PolyArticle.create(result)
          .then(dbArticle => location.reload(true))
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
        result.company = "gamespot";

        db.SpotArticle.create(result)
          .then(dbArticle => location.reload(true))
          .catch(err => console.log(err));
      });
    });

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
        result.company = "destructoid";

        db.DestArticle.create(result)
          .then(dbArticle => location.reload(true))
          .catch(err => console.log(err));
      });
    });
  });

  app.put("/api/favorite/add/:company/:id", (req, res) => {
    switch (req.params.company) {
      case "polygon":
        db.PolyArticle.update(
          { _id: req.params.id },
          { $set: { saved: true } }
        ).then(results => res.json(results));
        break;
      case "gamespot":
        db.SpotArticle.update(
          { _id: req.params.id },
          { $set: { saved: true } }
        ).then(results => res.json(results));
        break;
      case "destructoid":
        db.DestArticle.update(
          { _id: req.params.id },
          { $set: { saved: true } }
        ).then(results => res.json(results));
        break;
    }
  });

  app.put("/api/favorite/remove/:company/:id", (req, res) => {
    switch (req.params.company) {
      case "polygon":
        db.PolyArticle.update(
          { _id: req.params.id },
          { $set: { saved: false } }
        ).then(results => res.json(results));
        break;
      case "gamespot":
        db.SpotArticle.update(
          { _id: req.params.id },
          { $set: { saved: false } }
        ).then(results => res.json(results));
        break;
      case "destructoid":
        db.DestArticle.update(
          { _id: req.params.id },
          { $set: { saved: false } }
        ).then(results => res.json(results));
        break;
    }
  });

  app.post("/api/notes/add/:company/:id", (req, res) => {
    const newNoteId = req.params.id;
    switch (req.params.company) {
      case "polygon":
        db.Note.create(req.body)
          .then(function(dbNote) {
            return db.PolyArticle.findOneAndUpdate(
              { _id: newNoteId },
              { note: dbNote._id },
              { new: true }
            );
          })
          .then(function(dbArticle) {
            res.json(dbArticle);
          })
          .catch(function(err) {
            res.json(err);
          });
        break;
      case "gamespot":
        db.Note.create(req.body)
          .then(function(dbNote) {
            return db.SpotArticle.findOneAndUpdate(
              { _id: newNoteId },
              { note: dbNote._id },
              { new: true }
            );
          })
          .then(function(dbArticle) {
            res.json(dbArticle);
          })
          .catch(function(err) {
            res.json(err);
          });
        break;
      case "destructoid":
        db.Note.create(req.body)
          .then(function(dbNote) {
            return db.DestArticle.findOneAndUpdate(
              { _id: newNoteId },
              { note: dbNote._id },
              { new: true }
            );
          })
          .then(function(dbArticle) {
            res.json(dbArticle);
          })
          .catch(function(err) {
            res.json(err);
          });
        break;
    }
  });
};
