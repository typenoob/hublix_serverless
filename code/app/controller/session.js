const Controller = require("egg").Controller;

class SessionController extends Controller {
  // 验证登录并且生成 token
  async login() {
    const { ctx, app } = this;
    //获取用户端传递过来的参数
    const { username, password } = ctx.request.body;
    // 进行验证 data 数据 登录是否成功
    // .........
    //成功过后进行一下操作
    //生成 token 的方式
    if (await ctx.service.user.verify(username, password)) {
      const token = app.jwt.sign(
        {
          username,
          //需要存储的 token 数据
        },
        app.config.jwt.secret,
        {
          expiresIn: 8 * 60 * 60, // token 过期时间
        }
      );
      // 返回 token 到前端
      ctx.body = token;
    } else {
      ctx.body = "登录失败";
      ctx.status = 401;
    }
  }
}
module.exports = SessionController;
