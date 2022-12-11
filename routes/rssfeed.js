const express = require("express");
const router = express.Router();
const xml = require("xml");
const DailyMenuModel = require("../models/DailyMenu");

const posts = require("../posts.json");

router.get("/rssfeed", async (req, res) => {
  const postLists = await DailyMenuModel.model.find();

  const sortedPosts = postLists.sort(function (first, second) {
    return new Date(second.date).getTime() - new Date(first.date).getTime();
  });

  const feedItems = [];

  feedItems.push(
    ...sortedPosts.map((post) => ({
      item: [
        { title: post.title },
        {
          pubDate: new Date(post.date).toUTCString(),
        },
        {
          guid: [],
        },
        {
          description: {
            _cdata: post.description,
          },
        },
      ],
    }))
  );

  const feedObject = {
    rss: [
      {
        _attr: {
          version: "2.0",
          "xmlns:atom": "http://www.w3.org/2005/Atom",
        },
      },
      {
        channel: [
          {
            "atom:link": {
              _attr: {
                href: "folkan-meny/feed.rss",
                rel: "self",
                type: "application/rss+xml",
              },
            },
          },
          {
            title: "Folkan Meny",
          },
          {
            link: "folkan-meny/",
          },
          { description: "folkan-meny" },
          { language: "sv-SE" },
          ...feedItems,
        ],
      },
    ],
  };

  const feed = '<?xml version="1.0" encoding="UTF-8"?>' + xml(feedObject);
  console.log(feed);
  res.send(feed);
});

module.exports = router;
