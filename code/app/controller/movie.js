const Controller = require("egg").Controller;

class MovieController extends Controller {
  async info() {
    const { ctx } = this;
    const { id } = ctx.params;
    ctx.body = await ctx.service.movie.find(id);
  }
  async addLikes() {
    const { ctx } = this;
    const { id } = ctx.params;
    ctx.body = await ctx.service.movie.updateLikes(id);
  }
  async minusLikes() {
    const { ctx } = this;
    const { id } = ctx.params;
    ctx.body = await ctx.service.movie.updateLikes(id, false);
  }
  async addAttitude() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id: user_id } = await ctx.service.user.find(username);
    const { id: movie_id } = ctx.params;
    ctx.body = await ctx.service.movie.updateVote(user_id, movie_id);
    if (ctx.body.updateSuccess) await this.addLikes();
  }
  async minusAttitude() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id: user_id } = await ctx.service.user.find(username);
    const { id: movie_id } = ctx.params;
    ctx.body = await ctx.service.movie.updateVote(user_id, movie_id, false);
    if (ctx.body.updateSuccess) await this.minusLikes();
  }
  async getAttitude() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id: user_id } = await ctx.service.user.find(username);
    const { id: movie_id } = ctx.params;
    ctx.body = await ctx.service.movie.findVote(user_id, movie_id);
  }
}
module.exports = MovieController;
