import { Controller } from 'egg'

export default class BaseController extends Controller {
  public async result(code: number, msg: string, data?: any) {
    const { ctx } = this
    ctx.body = {
      code,
      msg,
      data
    }
  }
}