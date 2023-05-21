const Controller = require("egg").Controller;

class CommentController extends Controller {
  async post() {
    const { ctx } = this;
    const { content } = ctx.request.body;
    const { username } = ctx.state.user;
    const { id: movie_id } = ctx.params;
    const { id: user_id } = await ctx.service.user.find(username);
    ctx.body = await ctx.service.comment.create(user_id, content, movie_id);
    ctx.status = 200;
  }
  async delete() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id } = ctx.params;
    const { id: user_id } = await ctx.service.user.find(username);
    if ((await ctx.service.comment.findById(id)).user_id != user_id) {
      ctx.body = { err: "没有权限" };
      ctx.status = 403;
    } else {
      ctx.body = await ctx.service.comment.remove(id);
      ctx.status = 200;
    }
  }
  async update() {
    const { ctx } = this;
    const { content } = ctx.request.body;
    const { username } = ctx.state.user;
    const { id } = ctx.params;
    const { id: user_id } = await ctx.service.user.find(username);
    if ((await ctx.service.comment.findById(id)).user_id != user_id) {
      ctx.body = { err: "没有权限" };
      ctx.status = 403;
    } else {
      ctx.body = await ctx.service.comment.update(id, content);
      ctx.status = 200;
    }
  }
  async get() {
    const { ctx } = this;
    const { id: movie_id } = ctx.params;
    ctx.body = await ctx.service.comment.find(movie_id);
    ctx.status = 200;
  }
}
module.exports = CommentController;
