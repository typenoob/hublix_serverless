/* eslint valid-jsdoc: "off" */
const path = require("path");
require("dotenv").config();
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1653123705435_9404";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.jwt = {
    secret: "GmvjBd1gxK89iZDfcc1M", // 自定义 token 的加密条件字符串
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [
      "http://localhost:8080",
      "http://hublix.namu.cf",
      "https://hublix.vercel.app",
    ], // 允许访问接口的白名单
  };
  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };
  config.mysql = {
    client: {
      // host
      host: process.env.MYSQL_HOST,
      // 端口号
      port: process.env.MYSQL_PORT,
      // 用户名
      user: process.env.MYSQL_USER,
      // 密码
      password: process.env.MYSQL_PASS,
      // 数据库名
      database: process.env.MYSQL_DB,
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.multipart = {
    mode: "file",
  };

  return {
    ...config,
    ...userConfig,
  };
};
