let listArr = [];
let express = require('express');
let router = express.Router();
const {Options} = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver');
const {By} = webdriver;

require('chromedriver');

router.get('/', function(req, res, next){
  res.render('index', {
    sites: SITES
  });
});

router.get('/2', function(req, res, next){
  let builder = new webdriver.Builder();
  let options = new Options();
  const id = req.query.id;
  const pw = req.query.pw;
  const url = "https://blog.naver.com/" + id
  
	options.addArguments("--remote-debugging-port=9221");
	builder.setChromeOptions(options);
	let driver = builder.forBrowser('chrome').build(); // 생성
  (async() => {
    while (true){
      await driver.sleep(100);
      try {
        await driver.get(url); // 들어온 것
        await driver.sleep(1000);
        await driver.switchTo().frame(0);
        const listBtn = await driver.findElement(By.css('td #toplistSpanBlind'));
        console.log(listBtn);
        // listBtn.click(); // 목록열기 클릭
        console.log("클릭후")
        await driver.sleep(1000);
        const item = await driver.findElement(By.css('.wrap_checkbox > a'));
        listArr.add(item);

        await driver.switchTo().parentFrame();
        console.log(listArr);


        await driver.sleep(100000);

      } catch (err) {
        console.log(err)
        console.log('unexpected error')
      }
    }
  })();
})

module.exports = router;