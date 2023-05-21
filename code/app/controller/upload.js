const fs = require("fs");
const path = require("path");

const Controller = require("egg").Controller;

class UploadController extends Controller {
  async uploadAvatar() {
    const { ctx } = this;
    const { username } = ctx.state.user;
    const { id } = await ctx.service.user.find(username);
    try {
      let file = ctx.request.files[0];
      let fileData = fs.readFileSync(file.filepath);
      let dir = `/public/avatars/user-${Date.now()}.jpg`;
      fs.writeFileSync(`./app/${dir}`, fileData);
      ctx.service.user.updateAvatar(id, dir);
      ctx.body = {
        desc: "上传成功",
        path: dir,
      };
      ctx.status = 200;
    } catch (error) {
      ctx.body = {
        desc: "上传失败",
        path: null,
      };
      ctx.status = 500;
    } finally {
      ctx.cleanupRequestFiles();
    }
  }
}

module.exports = UploadController;
