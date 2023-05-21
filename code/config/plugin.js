/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
  cors: {
    enable: true,
    package: "egg-cors",
  },
  mysql: {
    enable: true,
    package: "egg-mysql",
  },
  routerPlus: {
    enable: true,
    package: "egg-router-plus",
  },
};
