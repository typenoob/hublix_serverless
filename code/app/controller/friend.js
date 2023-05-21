const Controller = require("egg").Controller;

class FriendController extends Controller {
  async apply() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { name } = ctx.request.body;
    const { id: friend_id } = await ctx.service.user.find(username);
    const user_id = (await ctx.service.user.find(name)).id;
    if (user_id) ctx.body = await ctx.service.friend.create(user_id, friend_id);
    else ctx.body = { err: "找不到用户" };
    ctx.status = 200;
  }
  async delete() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id: user_id } = await ctx.service.user.find(username);
    const { id: friend_id } = ctx.params;
    ctx.body = await ctx.service.friend.delete(user_id, friend_id);
    ctx.status = 200;
  }
  async agree() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id: friend_id } = ctx.params;
    const { id: user_id } = await ctx.service.user.find(username);
    ctx.body = await ctx.service.friend.agree(user_id, friend_id);
    ctx.status = 200;
  }
  async reject() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id: friend_id } = ctx.params;
    const { id: user_id } = await ctx.service.user.find(username);
    ctx.body = await ctx.service.friend.reject(user_id, friend_id);
    ctx.status = 200;
  }
  async all() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id } = await ctx.service.user.find(username);
    ctx.body = await ctx.service.friend.findAll(id);
    ctx.status = 200;
  }
  async pinTop() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id: friend_id } = ctx.params;
    const { id: user_id } = await ctx.service.user.find(username);
    ctx.body = await ctx.service.friend.pinTop(user_id, friend_id);
    ctx.status = 200;
  }
  async getApply() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id } = await ctx.service.user.find(username);
    ctx.body = await ctx.service.friend.findAll(id, true);
    ctx.status = 200;
  }
}
module.exports = FriendController;
