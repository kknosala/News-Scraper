const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  saved: {
    type: Boolean,
    require: true,
    default: false
  },
  company: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

const SpotArticle = mongoose.model("SpotArticle", ArticleSchema);

module.exports = SpotArticle;
