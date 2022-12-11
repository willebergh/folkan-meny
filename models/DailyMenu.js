const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  date: {
    required: true,
    type: "date",
  },
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  slug: {
    type: "string",
    required: true,
  },
});

const model = mongoose.model("daily-menu", schema);

module.exports = { schema, model };
