const Service = require("egg").Service;
class HistoryService extends Service {
  async createWatch(user_id, movie_id) {
    const old = await this.app.mysql.select("watch_histories", {
      where: { user_id },
      orders: [["created_date", "asc"]],
    });
    if (old.length > 10)
      this.app.mysql.delete("watch_histories", {
        user_id: old[0].user_id,
        movie_id: old[0].movie_id,
      }); //删除过期记录
    const result = await this.app.mysql.insert("watch_histories", {
      user_id,
      movie_id,
    });
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
  async createSearch(user_id, movie_id) {
    const old = await this.app.mysql.select("search_histories", {
      where: { user_id },
      orders: [["created_date", "asc"]],
    });
    if (old.length > 10)
      this.app.mysql.delete("search_histories", {
        user_id: old[0].user_id,
        movie_id: old[0].movie_id,
      }); //删除过期记录
    const result = await this.app.mysql.insert("search_histories", {
      user_id,
      movie_id,
    });
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
  async readWatch(user_id) {
    const history = await this.app.mysql.select("watch_histories", {
      where: { user_id },
      orders: [["created_date", "desc"]],
      limit: 10,
    });
    return history;
  }
  async readSearch(user_id) {
    const history = await this.app.mysql.select("search_histories", {
      where: { user_id },
      orders: [["created_date", "desc"]],
      limit: 10,
    });

    return history;
  }
  async clearSearch(user_id) {
    const result = await this.app.mysql.delete("search_histories", {
      user_id,
    });
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
}
module.exports = HistoryService;
