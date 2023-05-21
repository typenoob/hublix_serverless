const Controller = require("egg").Controller;

class UserController extends Controller {
  async info() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    ctx.body = await ctx.service.user.find(username);
    ctx.status = 200;
  }
  async otherInfo() {
    const { ctx } = this;
    const { id } = ctx.params;
    ctx.body = await ctx.service.user.find(id, { byId: true });
    ctx.status = 200;
  }
  //用户注册
  async register() {
    const { ctx } = this;
    const { username, password, nickname, email } = ctx.request.body;
    await ctx.service.user.create(username, password, nickname, email);
    const { id } = await ctx.service.user.find(username);
    ctx.body = await ctx.service.collection.create(id, { name: "我的收藏" });
    ctx.status = 200;
  }
  async renew() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id } = await ctx.service.user.find(username);
    ctx.body = await ctx.service.user.renew(id);
    ctx.status = 200;
  }
  async isOnline() {
    const { ctx } = this;
    const { id } = await ctx.params;
    ctx.body = await ctx.service.user.isOnline(id);
    ctx.status = 200;
  }
  async logout() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id } = await ctx.service.user.find(username);
    ctx.body = await ctx.service.user.renew(id, { alive: false });
    ctx.status = 200;
  }
}
module.exports = UserController;
