const Service = require("egg").Service;
class MovieService extends Service {
  async create(id) {
    const result = await this.app.mysql.insert("movies", {
      id,
    });
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
  async find(id) {
    let movie = await this.app.mysql.get("movies", { id });
    if (!movie) {
      this.create(id);
      movie = await this.app.mysql.get("movies", { id });
    } // 没有电影自动创建
    return movie;
  }
  async updateLikes(id, positive = true) {
    const movie = await this.app.mysql.get("movies", { id });
    const like_count = movie.like_count + positive * 2 - 1;
    const result = await this.app.mysql.update("movies", {
      id: movie.id,
      like_count,
    });
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
  async createVote(user_id, movie_id) {
    const result = await this.app.mysql.insert("votes", {
      user_id,
      movie_id,
    });
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
  async findVote(user_id, movie_id) {
    const vote = await this.app.mysql.get("votes", {
      user_id,
      movie_id,
    });
    return vote;
  }
  async updateVote(user_id, movie_id, positive = true) {
    const movie = await this.app.mysql.get("votes", { user_id, movie_id });
    if (movie) {
      const attitude = movie.attitude + positive * 2 - 1;
      if (attitude > 1) return { updateSuccess: false, err: "喜爱度超过上限" };
      else if (attitude < -1) {
        return { updateSuccess: false, err: "喜爱度超过下限" };
      }
      const result = await this.app.mysql.update(
        'votes',
        {
          attitude,
        },
        { where: { user_id, movie_id } }
      );
      const updateSuccess = result.affectedRows === 1;
      return { updateSuccess };
    }
    this.createVote(user_id, movie_id);
  }
}
module.exports = MovieService;
