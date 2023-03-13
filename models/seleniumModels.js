const { By, Key, Builder, until, WebDriver } = require("selenium-webdriver");
require("chromedriver");
const _http = require('selenium-webdriver/http');

let google_driver = async function () {
  driver = await new Builder().forBrowser("chrome").build();
  driver.getSession().then(function (session) {
        console.log("Session:" + session.getId());
        sessionId = session.getId();
      })

  await driver.get("https://google.com");
  return driver;
}

async function test_case(driver, bodyValue) {
  await driver.get("https://google.com");
  await driver.findElement(By.className("QS5gu sy4vM")).click();
  await driver.findElement(By.name("q")).sendKeys(bodyValue.text, Key.RETURN);
}

module.exports = {
  test_case,
  // test_google,
  google_driver,
  //twitter_login,
  //twitter_loginCred,
};
