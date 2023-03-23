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
  const url = encodeURI(`https://bilibili.iiilab.com/`);
  page = await browser.newPage({ javascriptEnabled: true });
  await page.setDefaultNavigationTimeout(1000 * 60 * 60 * 24);
  await page.goto(url);
  return page;
}

async function getResult(page, option) {
  const { text } = option;
  console.log("等待页面完全加载");
  const res = await page.evaluate(
    (options) => {
      const { text } = options;
      const time = new Date().getTime().toString().substr(0, 10);
      return new Promise(async (resolve, reject) => {
        try {
          Tool["prototype"]["uc"] = function (_0x329aa0) {
            const _0x1601b2 = {};
            (_0x1601b2[_0x459376(0xcc, 0xa9, 0xd9, 0xf3)] = function (_0x357e24, _0x58ecca) {
              return _0x357e24 === _0x58ecca;
            }),
              (_0x1601b2[_0x3db832(0x270, 0x280, 0x237, 0x26f)] = "webdriver"),
              (_0x1601b2[_0x459376(0x112, 0x130, 0x121, 0x14c)] = function (_0x3e64a2, _0x3653c9) {
                return _0x3e64a2 + _0x3653c9;
              });
            function _0x3db832(_0x38a633, _0x2bb068, _0x542203, _0x58921f) {
              return _0x2e8662(_0x58921f - 0x261, _0x2bb068, _0x542203 - 0x1bf, _0x58921f - 0x1c4);
            }
            (_0x1601b2[_0x459376(0xbe, 0xc3, 0xd5, 0xac)] = _0x3db832(0x278, 0x260, 0x271, 0x27d)),
              (_0x1601b2[_0x459376(0x118, 0x125, 0x128, 0x12f)] = function (_0x28b580, _0x1c5a78) {
                return _0x28b580 % _0x1c5a78;
              });
            function _0x459376(_0x109a03, _0x3e9c34, _0x2a75b4, _0x347183) {
              return _0x55a951(_0x109a03 - 0x2f, _0x109a03 - -0xbc, _0x2a75b4 - 0xb1, _0x3e9c34);
            }
            _0x1601b2[_0x459376(0x125, 0x122, 0x133, 0x11d)] = function (_0x261d45, _0xea90cb) {
              return _0x261d45 - _0xea90cb;
            };
            const _0x8d2af6 = _0x1601b2;
            let _0x5599ba = window["location"][_0x3db832(0x272, 0x218, 0x20b, 0x237)]["split"](".")[-0x4c5 + 0x156f + 0x2 * -0x855];
            // if (
            //   _0x8d2af6["CMuMV"](window[_0x3db832(0x21a, 0x239, 0x223, 0x246)]["webdriver"], !![]) ||
            //   window[_0x459376(0xc1, 0x99, 0xa1, 0xae)][_0x459376(0x105, 0x117, 0x13b, 0x13c) + _0x3db832(0x23e, 0x290, 0x245, 0x265)][
            //     "getAttribu" + "te"
            //   ](_0x8d2af6[_0x459376(0xec, 0xb1, 0x11e, 0xbd)]) ||
            //   window[_0x3db832(0x233, 0x262, 0x27d, 0x23f) + "m"] ||
            //   window[_0x459376(0xbf, 0xa7, 0x80, 0xb7)]
            // )
            //   return this[_0x3db832(0x262, 0x2ba, 0x26d, 0x28b)](
            //     _0x8d2af6[_0x459376(0x112, 0x126, 0x113, 0xed)](_0x329aa0, _0x8d2af6[_0x459376(0xbe, 0xfc, 0xbe, 0xc9)])
            //   );
            let _0x8f53d7 = _0x5599ba[_0x459376(0xf5, 0x10c, 0x114, 0x11e)](
                _0x8d2af6[_0x3db832(0x285, 0x260, 0x298, 0x29b)](
                  _0x329aa0["charCodeAt"](-0x1248 + 0x1 * -0xf91 + 0x21d9 * 0x1),
                  _0x5599ba[_0x3db832(0x25e, 0x248, 0x297, 0x260)]
                )
              ),
              _0xb138af = _0x5599ba[_0x3db832(0x2b6, 0x242, 0x25e, 0x278)](
                _0x8d2af6[_0x3db832(0x276, 0x277, 0x299, 0x29b)](
                  _0x329aa0[_0x3db832(0x29b, 0x254, 0x273, 0x281)](
                    _0x8d2af6[_0x3db832(0x2d0, 0x2a7, 0x2a2, 0x2a8)](
                      _0x329aa0[_0x459376(0xdd, 0xb1, 0x115, 0xae)],
                      -0x551 * 0x1 + -0x26d3 + 0x2c25
                    )
                  ),
                  _0x5599ba[_0x3db832(0x225, 0x29d, 0x27d, 0x260)]
                )
              );
            return this[_0x459376(0x108, 0xe1, 0x135, 0x102)](
              _0x8d2af6[_0x459376(0x112, 0x14f, 0x12a, 0xfc)](_0x8f53d7 + _0x329aa0, _0xb138af)
            );
          };
          let app = document.getElementById("app").__vue__;
          app.link = text;
          app.submit();
          await app.parseVideo();
          const timer = setTimeout(() => {
            app = document.getElementById("app").__vue__;
            resolve(app.requestResult);
            clearTimeout(timer);
          }, 1000);
        } catch (error) {
          reject(error);
        }
      });
    },
    { text }
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

async function featch(text) {
  const browser = await buildBrowser(false);
  const page = await buildPage(browser);
  const res = await getResult(page, { text });
  console.log(`${text}：`, res);
  return res;
}

// featch("你好", "");

module.exports = featch;
