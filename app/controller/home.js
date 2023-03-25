"use strict";
const { Controller } = require("egg");
const featchChat = require("../../broswer/index.js");
const featchVideo = require("../../broswer/video.js");

const codeMap = {
  fjzf01: 100000, // 特殊密钥
};

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "hi, egg";
  }
  // 免密钥版本
  async chat() {
    const { ctx } = this;
    const body = ctx.request.body;
    const { text, id } = body;
    const answer = await featchChat(text, id);
    ctx.body = {
      code: 200,
      data: answer,
    };
  }
  // 视频解析
  async videoParse() {
    const { ctx } = this;
    const body = ctx.request.body;
    const { text } = body;
    const answer = await featchVideo(text);
    ctx.body = {
      code: 200,
      data: answer,
    };
  }
  // 免密钥版本
  async gptChat() {
    const { ctx } = this;
    const body = ctx.request.body;
    const { text, id, code } = body;
    if (codeMap[code] > 0) {
      const answer = await featchChat(text, id);
      codeMap[code] = codeMap[code] - 1;
      ctx.body = {
        code: 200,
        data: answer,
      };
    } else {
      ctx.body = {
        code: 500,
        data: "code次数用尽，请重新获取！",
      };
    }
  }
  async genCode() {
    function generateRandomKey() {
      const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numbers = "0123456789";
      let key = "";
      // 生成随机字母
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        key += letters[randomIndex];
      }
      // 生成随机数字
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        key += numbers[randomIndex];
      }
      // 打乱顺序
      key = key
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
      return key;
    }
    const code = generateRandomKey();
    codeMap[code] = 100;
    ctx.body = {
      code: 200,
      code: code,
    };
  }
  // 密码校验
  async validCode() {
    const { ctx } = this;
    const body = ctx.request.body;
    const { code } = body;
    ctx.body = {
      code: 200,
      valid: codeMap[code] > 0,
    };
  }
}

module.exports = HomeController;
