const Service = require("egg").Service;
const { v4: uuidv4 } = require("uuid");
class CollectionService extends Service {
  async create(user_id, { name } = { name: "" }) {
    let result;
    if (name) {
      await this.app.mysql.insert("collections", {
        id: uuidv4(),
        user_id,
        name,
      });
      result = await this.app.mysql.update(
        "users",
        { default_collection: (await this.findAll(user_id))[0].id },
        { where: { id: user_id } }
      );
    } else {
      result = await this.app.mysql.insert("collections", {
        user_id,
      });
    }
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
  async delete(id) {
    const result = await this.app.mysql.delete("collections", {
      id,
    });
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
  async findAll(user_id) {
    const collections = await this.app.mysql.select("collections", {
      where: { user_id },
      orders: [["created_date", "asc"]],
    });
    return collections;
  }
  async rename(id, name) {
    const result = await this.app.mysql.update(
      "collections",
      {
        name,
      },
      { where: { id } }
    );
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
  async addMovie(collection_id, movie_id) {
    const result = await this.app.mysql.insert("movie_collection", {
      collection_id,
      movie_id,
    });
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
  async deleteMovie(collection_id, movie_id) {
    const result = await this.app.mysql.delete("movie_collection", {
      collection_id,
      movie_id,
    });
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
  async allMovie(collection_id) {
    const result = await this.app.mysql.select("movie_collection", {
      where: {
        collection_id,
      },
      columns: ["movie_id"],
    });
    return result;
  }
}
module.exports = CollectionService;
