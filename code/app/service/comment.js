const Service = require("egg").Service;
const { v4: uuidv4 } = require("uuid");
class CommentService extends Service {
  async create(user_id, content, movie_id) {
    const result = await this.app.mysql.insert("comments", {
      id: uuidv4(),
      user_id,
      content,
      movie_id,
    });
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
  async find(movie_id) {
    const movie = await this.app.mysql.select("comments", {
      where: { movie_id },
      columns: ["content", "created_time", "user_id", "id"],
      orders: [["created_time", "desc"]],
    });
    return movie;
  }
  async findById(id) {
    const comment = await this.app.mysql.get("comments", { id });
    return comment;
  }
  async update(id, content) {
    const result = await this.app.mysql.update("comments", {
      id,
      content,
    });
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
  async remove(id) {
    const result = await this.app.mysql.delete("comments", {
      id,
    });
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
}
module.exports = CommentService;
