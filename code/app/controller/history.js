const Controller = require("egg").Controller;

class HistoryController extends Controller {
  async createWatch() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id: user_id } = await ctx.service.user.find(username);
    const { id: movie_id } = ctx.params;
    ctx.body = await ctx.service.history.createWatch(user_id, movie_id);
    ctx.status = 200;
  }
  async createSearch() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id: user_id } = await ctx.service.user.find(username);
    const { id: movie_id } = ctx.params;
    await ctx.service.movie.find(movie_id);
    ctx.body = await ctx.service.history.createSearch(user_id, movie_id);
    ctx.status = 200;
  }
  async readWatch() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id: user_id } = await ctx.service.user.find(username);
    ctx.body = await ctx.service.history.readWatch(user_id);
    ctx.status = 200;
  }
  async readSearch() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id: user_id } = await ctx.service.user.find(username);
    ctx.body = await ctx.service.history.readSearch(user_id);
    ctx.status = 200;
  }
  async clearSearch() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id: user_id } = await ctx.service.user.find(username);
    ctx.body = await ctx.service.history.clearSearch(user_id);
    ctx.status = 200;
  }
}
module.exports = HistoryController;
