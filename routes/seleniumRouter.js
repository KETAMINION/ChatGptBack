const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");
const express = require("express");
const router = express();
const {test_case, twitter_login, twitter_loginCred}=require("../models/seleniumModels");
// const driver = twitter_login();

router.get("/selenium", async function(req, res) {
  try {
    const result = await test_case();
    return res.json({ success: true, payload: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/twitterPage", async function(req, res) {
  try {
    const result = await twitter_login();
    console.log(result);
    return res.json({ success: true, payload: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
});
router.get("/twitterLoginCred", async function(req, res) {
  try {
    const result = await twitter_loginCred(driver);
    return res.json({ success: true, payload: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
});







module.exports = router ;
// test_case();