const Controller = require("egg").Controller;
const nodemailer = require("nodemailer");
require("dotenv").config();
class EmailController extends Controller {
  // 发送验证码
  async sendCode() {
    const { ctx } = this;
    const { address } = ctx.request.body;
    const code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      service: "outlook",
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"hublix 随意影视 👻" <hublix1@outlook.com>', // sender address
      to: address, // list of receivers
      subject: `电子邮件验证码： ${code} `, // Subject line
      html: `<table>\
      <tbody>\
      <tr>\
          <td style="padding-top:30px;font-size:20px;color:#323a45">\
              您的邮箱<span class="il">验证</span><span class="il">码</span>为：\
          </td>\
      </tr>\
      <tr>\
          <td valign="left" style="font-size:36px;color:#323a45;height:110px">\
              <code style="display:block;text-align:center">${code}</code>\
          </td>\
      </tr>\
      <tr>\
          <td style="font-size:14px;padding:10px 0">\
              该<span class="il">验证</span><span class="il">码</span> 10 分钟内有效。为了保障您的账户安全，请勿向他人泄漏<span class="il">验证</span><span class="il">码</span>信息。\
          </td>\
      </tr>\
      </tbody>\
  </table>`, // html body
    });
    ctx.service.email.create(address, code);
    ctx.body = { sent: info.messageId };
    ctx.status = 200;
  }
  async verifyCode() {
    const { ctx } = this;
    const { address, code } = ctx.query;
    ctx.body = await ctx.service.email.verify(address, code);
    ctx.status = 200;
  }
}
module.exports = EmailController;
