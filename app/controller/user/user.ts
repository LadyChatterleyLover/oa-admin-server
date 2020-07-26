import Base from '../base'
const utility = require('utility')
const SMSClient = require('@alicloud/sms-sdk')
const svgCaptcha = require('svg-captcha')

export default class HomeController extends Base {
  public async getCaptcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      ignoreChars: 'Ooli',
      width: 160,
      height: 60,
      noise: 3,
      color: true,
      background: '#87ceeb',
    });
    this.ctx.session.captcha = captcha.text
    this.ctx.response.type = 'image/svg+xml'
    // this.result(200, '获取验证码成功', captcha.data)
    this.ctx.body = captcha.data
  }
  public async accountLogin() {
    let { code, username, password } = this.ctx.request.body
    if (code.toLowerCase() === this.ctx.session.captcha.toLowerCase()) {
      password = utility.md5(password)
      let user = await this.app.model.User.findOne({
        username,
        password
      })
      if (user) {
        let token = this.app.jwt.sign(this.ctx.request.body, this.app.config.jwt.sign)
        this.result(200, '登录成功', {
          token,
          user
        })
      } else {
        this.result(500, '账号或密码错误')
      }
    } else {
      this.result(500, '验证码错误')
    }
  }
  public async phoneLogin() {
    let { sms, phone } = this.ctx.request.body
    if (sms === this.ctx.session.sms) {
      let user = await this.ctx.model.User.findOne({ phone })
      if (user) {
        this.result(200, '登录成功', user)
      } else {
        this.result(500, '用户不存在')
      }
    } else {
      this.result(500, '验证码错误')
    }
  }
  public async register() {
    let { phone, email, username, sms } = this.ctx.request.body
    let nameUser = await this.ctx.model.User.findOne({ username })
    let phoneUser = await this.ctx.model.User.findOne({ phone })
    let emailUser = await this.ctx.model.User.findOne({ email })
    if (nameUser) {
      this.result(500, '用户已存在')
      return
    }
    if (phoneUser) {
      this.result(500, '手机号已被注册')
      return
    }
    if (emailUser) {
      this.result(500, '邮箱已被注册')
      return
    }
    if (sms === this.ctx.session.sms) {
      this.ctx.request.body.password = utility.md5(this.ctx.request.body.password)
      let user = new this.app.model.User(this.ctx.request.body)
      let res = await user.save()
      if (res) {
        this.result(200, '注册成功', res)
      } else {
        this.result(500, '注册失败')
      }
    } else {
      this.result(500, '验证码不正确')
    }
  }
  public async getMenus() {
    let menus = [
      {
        name: '工作台',
        id: 1,
        children: []
      },
      {
        name: '日程管理',
        id: 2,
        children: []
      },
      {
        name: '员工管理',
        id: 3,
        children: [
          {
            name: 'offer管理',
            id: 4
          },
          {
            name: '人员信息',
            id: 5,
          },
          {
            name: '薪酬管理',
            id: 6,
          }
        ]
      },
      {
        name: '部门管理',
        id: 7,
        children: [
          {
            name: '添加部门',
            id: 8
          }
        ]
      },
      {
        name: '统计管理',
        id: 9,
        children: []
      }
    ]
    this.result(200, '获取菜单成功', menus)
  }
  public async sendCode() {
    let { accessKeyId, secretAccessKey } = this.app.config.alikey
    const smsClient = new SMSClient({ accessKeyId, secretAccessKey })
    let { phone } = this.ctx.request.body
    let code = ('000000' + Math.floor(Math.random() * 999999)).slice(-6)
    let res = await smsClient.sendSMS({
      PhoneNumbers: phone,
      SignName: '小爱在线',
      TemplateCode: 'SMS_178450150',
      TemplateParam: '{code:' + code + '}'
    })
    if (res.Message === 'OK') {
      this.ctx.session.sms = code
      this.result(200, '短信发送成功', code)
    }
  }
  public async updatePwd() {
    let {ctx} = this
    let { username, password, newPwd } = ctx.request.body
    password = utility.md5(password)
    newPwd = utility.md5(newPwd)
    console.log(password)
    console.log(newPwd)
    let user = await ctx.model.User.findOne({
      username,
      password
    })
    if (user) {
      if (password === newPwd) {
        ctx.body = {
          code: 500,
          msg: '新密码不能与原密码相同'
        }
      } else {
        let res = await ctx.model.User.findOneAndUpdate({
          username,
          password
        }, {
          password: newPwd
        })
        if (res) {
          ctx.body = {
            code: 200,
            msg: '修改成功'
          }
        } else {
          ctx.body = {
            code: 500,
            msg: '修改失败'
          }
        }
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '原密码不正确,请重新输入'
      }
    }
  }
}