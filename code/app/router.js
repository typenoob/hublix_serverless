/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, jwt } = app;
  const apiV1Router = router.namespace("/api/v1");
  apiV1Router.post("/session/token", controller.session.login); //获取用户JWT token pass
  apiV1Router.get("/user", jwt, controller.user.info); //获取当前用户信息 pass
  apiV1Router.get("/user/:id", controller.user.otherInfo); //获取指定用户信息 pass
  apiV1Router.post("/user", controller.user.register); //注册用户 pass
  apiV1Router.post("/user/logout", jwt, controller.user.logout); //用户退出登录 pass
  apiV1Router.post("/upload/avatar", jwt, controller.upload.uploadAvatar); //上传用户头像 pass
  apiV1Router.get("/movie/:id", controller.movie.info); //查询电影信息 pass
  apiV1Router.get("/movie/:id/attitude", jwt, controller.movie.getAttitude); //查询用户对电影的喜爱度 pass
  apiV1Router.post("/movie/:id/attitude", jwt, controller.movie.addAttitude); //用户对电影的喜爱度增加 pass
  apiV1Router.delete(
    "/movie/:id/attitude/",
    jwt,
    controller.movie.minusAttitude
  ); //用户对电影的喜爱度减少 pass
  apiV1Router.post("/comment/movie/:id", jwt, controller.comment.post); //用户评论电影 pass
  apiV1Router.get("/comment/movie/:id", controller.comment.get); //获取评论信息 pass
  apiV1Router.delete("/comment/:id", jwt, controller.comment.delete); //删除评论 pass
  apiV1Router.post("/comment/:id", jwt, controller.comment.update); //更新评论 pass
  apiV1Router.get("/friend/all", jwt, controller.friend.all); //查看所有好友 pass
  apiV1Router.post("/friend/apply", jwt, controller.friend.apply); //发送好友申请 pass
  apiV1Router.get("/friend/apply/all", jwt, controller.friend.getApply); //查看所有好友申请 pass
  apiV1Router.post("/friend/:id/accept", jwt, controller.friend.agree); //同意好友申请 pass
  apiV1Router.post("/friend/:id/reject", jwt, controller.friend.reject); //拒绝好友申请 pass
  apiV1Router.post("/friend/:id/pin", jwt, controller.friend.pinTop); //置顶好友 pass
  apiV1Router.delete("/friend/:id", jwt, controller.friend.delete); //删除好友 pass
  apiV1Router.post(
    "/history/search/movie/:id",
    jwt,
    controller.history.createSearch
  ); //记录用户搜索电影 pass
  apiV1Router.get("/history/search/movie", jwt, controller.history.readSearch); // 读取用户搜索过的电影 pass
  apiV1Router.delete(
    "/history/search/all",
    jwt,
    controller.history.clearSearch
  ); //删除用户搜索过的电影 pass
  apiV1Router.post(
    "/history/watch/movie/:id",
    jwt,
    controller.history.createWatch
  ); //记录用户观看电影 pass
  apiV1Router.get("/history/watch/movie", jwt, controller.history.readWatch); // 读取用户观看过的电影 pass
  apiV1Router.get("/collection/all", jwt, controller.collection.all); //查看所有收藏夹 pass
  apiV1Router.post("/collection", jwt, controller.collection.create); //用户创建收藏夹 pass
  apiV1Router.delete("/collection/:id", jwt, controller.collection.delete); //用户删除收藏夹 pass
  apiV1Router.post("/collection/:id", jwt, controller.collection.rename); //用户重命名收藏夹 pass
  apiV1Router.get(
    "/collection/:id/movie/all",
    jwt,
    controller.collection.allMovie
  ); //查看收藏夹中所有电影 pass
  apiV1Router.post(
    "/collection/:id/movie/:movie_id",
    jwt,
    controller.collection.addMovie
  ); //用户添加电影至收藏夹 pass
  apiV1Router.delete(
    "/collection/:id/movie/:movie_id",
    jwt,
    controller.collection.deleteMovie
  ); //用户删除收藏夹中的全部电影 pass
  apiV1Router.post("/user/online", jwt, controller.user.renew); //心跳机制,用户续期 pass
  apiV1Router.get("/user/:id/online", controller.user.isOnline); //判断用户是否在线 pass
  apiV1Router.get("/email", controller.email.verifyCode); //判断邮箱验证码是否正确 pass
  apiV1Router.post("/email", controller.email.sendCode); //发送邮箱验证码 pass
};
