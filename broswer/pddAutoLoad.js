const puppeteer = require("puppeteer");

async function sleep(time = 3000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

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
async function buildPage(browser, urlPath) {
  if (page) return page;
  const url = encodeURI(urlPath);
  page = await browser.newPage({ javascriptEnabled: true });

  // ---
  await page.setCookie({
    name: "pdd_user_uin",
    value: "A6P3VWTPYQTD5VAMJHJFELSVYY_GEXDA",
    domain: "mobile.yangkeduo.com",
    path: "/",
    expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
  });
  await page.setCookie({
    name: "pdd_user_id",
    value: "4150721168",
    domain: "mobile.yangkeduo.com",
    path: "/",
    url,
    expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
  });
  await page.setCookie({
    name: "PDDAccessToken",
    value: "OJY4XRHRAHNO6QQN5ADAIX7SJA2MKJW5WT7SQDDC2DVDJM7LZV2A112903f",
    domain: "mobile.yangkeduo.com",
    path: "/",
    url,
    expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
  });
  await page.setCookie({
    name: "jrpl",
    value: "ayqFeJeBQlr7hqN2tpZY1",
    domain: "mobile.yangkeduo.com",
    path: "/",
    url,
    expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
  });
  await page.setCookie({
    name: "njrpl",
    value: "F3a1MoSYOEkyQ72CvTSJ6zXqO047gmjc",
    domain: "mobile.yangkeduo.com",
    path: "/",
    url,
    expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
  });
  await page.setCookie({
    name: "_nano_fp",
    value: "XpE8l0XjXqXjX0Pqno_Do9Fa4OY6CBnFD6N5xDnN",
    domain: "mobile.yangkeduo.com",
    path: "/",
    url,
    expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
  });
  await page.setCookie({
    name: "pdd_vds",
    value: "gaSRgJJXWMgSJApKSXXRXKSjFXMgVMKHSXSHWWZVWVWWVjpSkzHMgAqAKFJk",
    domain: "mobile.yangkeduo.com",
    path: "/",
    url,
    expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
  });
  await page.setCookie({
    name: "webp",
    value: "1",
    domain: "mobile.yangkeduo.com",
    path: "/",
    url,
    expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
  });
  await page.setCookie({
    name: "api_uid",
    value: "CktnHGQJyt/CcgBrA9ZLAg==",
    domain: "mobile.yangkeduo.com",
    path: "/",
    url,
    expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
  });
  // ---

  await page.setDefaultNavigationTimeout(1000 * 60 * 60 * 24);
  await page.goto(url);
  return page;
}

// let currentItem = null; // 当前查询的商品
// let currentIndex = 0; // 当前商品下表
// let list = []; // 商品列表
// let resultUrl = []; // 可以的商品列表
async function getResult(page) {
  console.log("等待页面完全加载");

  let length = 1000;
  let index = 0;

  let list = [];
  // 自动滚动函数
  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 50);
      });
    });
  }
  async function auto() {
    let productList = await page.$$("._1o7l_Qm-");
    await sleep(1000);
    productList[index].click();
    await sleep(2000);
    const url = await page.url();
    // await sleep();
    const num = await page.evaluate(() => {
      return new Promise((resolve) => {
        const title = document.querySelector("._1T2rjtbU");
        if (title && title.innerText.indexOf("手机") !== -1 && title.innerText.indexOf("膜") !== -1) {
          const dom = document.querySelector(".ccIhLMdm");
          if (dom) {
            resolve(dom.innerText.match(/\d+/g)[0]);
          } else {
            resolve();
          }
        } else {
          resolve();
        }
      });
    });
    if (num > 1000) {
      console.log("评价数", num);
      console.log("url", url);
      list.push(url);
    }
    await page.goBack();
    index++;
    if (index < length) {
      await sleep();
      auto();
    } else {
      console.log("遍历结束");
      console.log(list);
    }
  }
  await sleep(20000);
  for (let i = 0; i < 3; i++) {
    await autoScroll(page);
    await sleep(3000);
  }
  auto();
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
  const page = await buildPage(browser, "https://mobile.yangkeduo.com/search_result.html?search_key=手机膜");
  const res = await getResult(page);
  return res;
}

featch("你好", "");

// module.exports = featch;
