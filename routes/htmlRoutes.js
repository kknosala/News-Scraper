const db = require("../models");

module.exports = app => {
  app.get("/", (req, res) => {
    const all_polygon = db.PolyArticle.find({})
      .sort({ created: -1 })
      .limit(10);
    const all_gamespot = db.SpotArticle.find({})
      .sort({ created: -1 })
      .limit(10);
    const all_destructoid = db.DestArticle.find({})
      .sort({ created: -1 })
      .limit(10);
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
    const all_polygon = db.PolyArticle.find({ saved: true }).sort({
      created: -1
    });
    const all_gamespot = db.SpotArticle.find({ saved: true }).sort({
      created: -1
    });
    const all_destructoid = db.DestArticle.find({ saved: true }).sort({
      created: -1
    });
    Promise.all([all_polygon, all_gamespot, all_destructoid]).then(
      responses => {
        res.render("favorites", {
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
