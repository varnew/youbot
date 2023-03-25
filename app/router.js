"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.post("/chat", controller.home.chat);
  router.post("/videoParse", controller.home.videoParse);
  router.post("/gptChat", controller.home.gptChat);
  router.post("/genCode", controller.home.genCode);
  router.post("/validCode", controller.home.validCode);
};
