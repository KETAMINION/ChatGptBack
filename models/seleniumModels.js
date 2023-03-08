const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");


async function test_case() {
    let driver = await new Builder().forBrowser("chrome").build();
  
    await driver.get("https://google.com");
      await driver.findElement(By.className("QS5gu sy4vM")).click();
    await driver.findElement(By.name("q")).sendKeys("Hello, world", Key.RETURN);
  
    setInterval(function () {
      driver.quit();
    }, 5000);
  }

  async function twitter_login() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://twitter.com");
      await driver.findElement(By.className("css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0")).click();
    // await driver.findElement(By.name("q")).sendKeys("Hello, world", Key.RETURN);
  
    // setInterval(function () {
    //   driver.quit();
    // }, 5000);
  }
//   let driver;
  async function twitter_login() {
    let driver = await new Builder().forBrowser("chrome").build();
  
    await driver.get("https://twitter.com");
    //   await driver.findElement(By.className("css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0")).click();
    // await driver.findElement(By.name("q")).sendKeys("Hello, world", Key.RETURN);
    // await driver.findElement(By.className("r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-xyw6el r-y0fyvk r-1dz5y72 r-fdjqy7 r-13qz1uu")).click();
    // await driver.findElement(By.className("r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-xyw6el r-y0fyvk r-1dz5y72 r-fdjqy7 r-13qz1uu")).sendKeys("Hello, world", Key.RETURN);
    // await twitter_loginCred(driver)
    // setInterval(function () {
    //   driver.quit();
    // }, 5000);
    return driver;
  }
  async function twitter_loginCred(driver) {
    // let driver = await new Builder().forBrowser("chrome").build();
    
    // await driver.get("https://twitter.com");
    await driver.findElement(By.className("r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-xyw6el r-y0fyvk r-1dz5y72 r-fdjqy7 r-13qz1uu")).click();
    await driver.findElement(By.className("r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-xyw6el r-y0fyvk r-1dz5y72 r-fdjqy7 r-13qz1uu")).sendKeys("Hello, world", Key.RETURN);
  
    // setInterval(function () {
    //   driver.quit();
    // }, 5000);
  }


  module.exports={
    test_case,
    twitter_login,
    twitter_loginCred,
    
  }