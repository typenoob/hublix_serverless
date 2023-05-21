const Service = require("egg").Service;
class FriendService extends Service {
  async create(user_id, friend_id) {
    try {
      const result = await this.app.mysql.insert("friends", {
        user_id,
        friend_id,
      });
      const updateSuccess = result.affectedRows === 1;
      return { updateSuccess };
    } catch (e) {
      if (e.errno == 1062) return { err: "已经申请过了" };
    }
  }
  async delete(user_id, friend_id) {
    let friend = await this.app.mysql.get("friends", { user_id, friend_id });
    if (!friend)
      friend = await this.app.mysql.get("friends", {
        user_id: friend_id,
        friend_id: user_id,
      });
    const result = await this.app.mysql.delete("friends", {
      user_id: friend.user_id,
      friend_id: friend.friend_id,
    });
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
  async agree(user_id, friend_id) {
    const result = await this.app.mysql.update(
      "friends",
      {
        wait_for_agree: false,
      },
      {
        where: {
          user_id,
          friend_id,
        },
      }
    );
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
  async reject(user_id, friend_id) {
    const result = await this.app.mysql.delete("friends", {
      user_id,
      friend_id,
    });
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
  async pinTop(user_id, friend_id) {
    let friend = await this.app.mysql.get("friends", { user_id, friend_id });
    if (!friend)
      friend = await this.app.mysql.get("friends", {
        user_id: friend_id,
        friend_id: user_id,
      });
    const result = await this.app.mysql.update(
      "friends",
      {
        is_top: !friend.is_top,
      },
      {
        where: {
          user_id: friend.user_id,
          friend_id: friend.friend_id,
        },
      }
    );
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
  async findAll(id, apply = false) {
    let friends = [];
    friends = await this.app.mysql.select("friends", {
      where: {
        user_id: id,
        wait_for_agree: apply,
      },
      orders: [["created_date", "asc"]],
      columns: ["friend_id", "is_top"],
    });
    if (!apply)
      friends.push(
        ...(await Promise.all(
          (
            await this.app.mysql.select("friends", {
              where: {
                friend_id: id,
                wait_for_agree: apply,
              },
              orders: [["created_date", "asc"]],
              columns: ["user_id", "is_top"],
            })
          ).map((item) => ({ friend_id: item.user_id, is_top: item.is_top }))
        ))
      );
    friends.sort((x, y) => y.is_top - x.is_top);
    return friends;
  }
}
module.exports = FriendService;
