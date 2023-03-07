const express = require("express");

require("dotenv").config( "../.env" );
const { twitterClient } = require("../twitterClient")

const router = express();


router.get("/twittersearch", async function(req, res) {
    try {
      const result = await twitterClient.v2.search(req.query);
      return res.json({ success: true, payload: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: error.message });
    }
  });

router.post("/twitterpost", async function(req,res) {
    const result = await twitterClient.v2.tweet(req.body)
    return res.json({success: true, payload: result}) 
  })

  module.exports = router ;