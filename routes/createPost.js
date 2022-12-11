const express = require("express");
const router = express.Router();
const DailyMenuModel = require("../models/DailyMenu");

router.post("/add-daily-menu", async (req, res) => {
  const { title, description, slug, date } = req.body;

  const newDailyMenuObj = { title, description, slug, date };

  try {
    const newDoc = await DailyMenuModel.model.create(newDailyMenuObj);

    res.status(200).json({ message: "success", data: newDoc });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
