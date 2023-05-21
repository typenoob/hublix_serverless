const Service = require("egg").Service;
class EmailService extends Service {
  async create(address, code) {
    const result = await this.app.mysql.insert("codes", {
      address,
      code,
    });
    const updateSuccess = result.affectedRows === 1;
    return { updateSuccess };
  }
  async verify(address, code) {
    const email = await this.app.mysql.select("codes", {
      where: { address }, // WHERE 条件
      columns: ["code"], // 要查询的表字段
      orders: [["id", "desc"]], // 排序方式
      limit: 1, // 返回数据量
      offset: 0, // 数据偏移量
    });
    const verifySuccess = email.length > 0 && email[0].code === code;
    return { verifySuccess };
  }
}
module.exports = EmailService;
