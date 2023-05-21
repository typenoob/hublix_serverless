const Service = require("egg").Service;
const { v4: uuidv4 } = require('uuid');
class UserService extends Service {
  async create(username, password, nickname, email) {
    try {
      const result = await this.app.mysql.insert("users", {
        id:uuidv4(),
        username,
        password,
        nickname,
        email,
      });
      const updateSuccess = result.affectedRows === 1;
      return { updateSuccess };
    } catch (err) {
      if (err.errno == 1062)
        return { updateSuccess: false, err: "用户名已存在" };
      else return { updateSuccess: false, err: "未知错误" };
    }
  }
  async verify(username, password) {
    const user = await this.app.mysql.get("users", { username, password });
    if (user) return true;
    else return false;
  }
  async find(username, { byId } = { byId: false }) {
    let user;
    if (byId) user = await this.app.mysql.get("users", { id: username });
    else user = await this.app.mysql.get("users", { username });
    if (user) {
      const {
        id,
        username: name,
        email,
        nickname,
        avatar_url,
        default_collection,
      } = user;
      return { id, name, email, nickname, avatar_url, default_collection };
    } else return false;
  }
  async renew(id, { alive } = { alive: true }) {
    const result = await this.app.mysql.update("users", {
      id,
      recent_active: alive ? new Date() : new Date(1970),
    });
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
  async isOnline(id) {
    let moment = require("moment");
    const { recent_active } = await this.app.mysql.get("users", {
      id,
    });
    let seconds = moment(recent_active).diff(moment.now(), "seconds");
    return seconds > -60;
  }
  async updateAvatar(id, avatar_url) {
    const result = await this.app.mysql.update("users", {
      id,
      avatar_url,
    });
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
}
module.exports = UserService;
