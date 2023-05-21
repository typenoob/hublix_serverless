const Controller = require("egg").Controller;

class CollectionController extends Controller {
  async create() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id: user_id } = await ctx.service.user.find(username);
    ctx.body = await ctx.service.collection.create(user_id);
    ctx.status = 200;
  }
  async delete() {
    const { ctx } = this;
    const { id } = ctx.params;
    ctx.body = await ctx.service.collection.delete(id);
    ctx.status = 200;
  }
  async rename() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { name } = ctx.request.body;
    ctx.body = await ctx.service.collection.rename(id, name);
    ctx.status = 200;
  }
  async addMovie() {
    const { ctx } = this;
    const { id, movie_id } = ctx.params;
    await ctx.service.movie.find(movie_id); //检查电影是否存在
    ctx.body = await ctx.service.collection.addMovie(id, movie_id);
    ctx.status = 200;
  }
  async deleteMovie() {
    const { ctx } = this;
    const { id, movie_id } = ctx.params;
    ctx.body = await ctx.service.collection.deleteMovie(id, movie_id);
    ctx.status = 200;
  }
  async allMovie() {
    const { ctx } = this;
    const { id } = ctx.params;
    ctx.body = await ctx.service.collection.allMovie(id);
  }
  async all() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id: user_id } = await ctx.service.user.find(username);
    ctx.body = await ctx.service.collection.findAll(user_id);
    ctx.status = 200;
  }
}
module.exports = CollectionController;
