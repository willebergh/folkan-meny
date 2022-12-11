const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to database
mongoose
  .connect(process.env.MONGODB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database successfully!"))
  .catch((e) => {
    console.log("Could not connect to the database!!!");
    console.error(e);
    console.log("Could not connect to the database!!!");
  });

const app = express();

app.use(require("./routes/rssfeed"));
app.use(express.json());
app.use(require("./routes/createPost"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
