"use strict";
const featchChat = require("../../broswer/index.js");
const { Controller } = require("egg");

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
}

module.exports = HomeController;
