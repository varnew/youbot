"use strict";
const { Controller } = require("egg");
const featchChat = require("../../broswer/index.js");
const featchVideo = require("../../broswer/video.js");

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "hi, egg";
  }
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
}

module.exports = HomeController;
