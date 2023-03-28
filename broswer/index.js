const puppeteer = require("puppeteer");

let browser = null;
async function buildBrowser(headless = false) {
  if (browser) return browser;
  browser = await puppeteer.launch({
    headless,
  });
  // 监听浏览器窗口关闭事件
  browser.on("targetdestroyed", (target) => {
    if (target === page.target()) {
      browser.close();
      browser = null;
      page = null;
      console.log("监测到浏览器关闭，执行清除browser、page");
    }
  });
  return browser;
}
let page = null;
async function buildPage(browser) {
  if (page) return page;
  const url = encodeURI(`http://www.openmao.com/#/coding`);
  page = await browser.newPage({ javascriptEnabled: true });
  await page.setDefaultNavigationTimeout(1000 * 60 * 60 * 24);
  await page.goto(url);
  return page;
}

async function getResult(page, option) {
  const { text, id } = option;
  console.log("等待页面完全加载");
  const res = await page.evaluate(
    (options) => {
      const { text, id } = options;
      const time = new Date().getTime().toString().substr(0, 10);
      return new Promise((resolve, reject) => {
        try {
          const sign = document.querySelector(".chat-box").__vue__.$children[0].sign(text, id, time);
          resolve({ sign, time, text, id });
        } catch (error) {
          reject(error);
        }
      });
    },
    { text, id }
  );
  return res;
}

/**
 * @desc: 请求回答
 * @params:
 * text { String } 当前的提问
 * history { Array } 历史问答
 *  { question: "", answer: "" }
 */

async function featch(text, id, time) {
  const browser = await buildBrowser(false);
  const page = await buildPage(browser);
  const res = await getResult(page, { text, id, time });
  // console.log(`${text}：`, res);
  return res;
}

// featch("你好", "");

module.exports = featch;
