const db = require("../models");

module.exports = app => {
  app.get("/", (req, res) => {
    const all_polygon = db.PolyArticle.find({}).limit(10);
    const all_gamespot = db.SpotArticle.find({}).limit(10);
    const all_destructoid = db.DestArticle.find({}).limit(10);
    Promise.all([all_polygon, all_gamespot, all_destructoid]).then(
      responses => {
        res.render("index", {
          polygon: responses[0],
          gamespot: responses[1],
          destructoid: responses[2]
        });
      }
    );
  });

  app.get("/favorites", (req, res) => {
    const all_polygon = db.PolyArticle.find({ saved: true });
    const all_gamespot = db.SpotArticle.find({ saved: true });
    const all_destructoid = db.DestArticle.find({ saved: true });
    Promise.all([all_polygon, all_gamespot, all_destructoid]).then(
      responses => {
        res.render("index", {
          polygon: responses[0],
          gamespot: responses[1],
          destructoid: responses[2]
        });
      }
    );
  });

  app.get("/notes/:website/:id", (req, res) => {
    res.render("notes");
  });
};
