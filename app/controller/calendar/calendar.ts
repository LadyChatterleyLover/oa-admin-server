import Base from '../base'
const dayjs = require('dayjs')

export default class CalendarController extends Base {
  public async getCalendar() {
    console.log(this.ctx.model)
    let data = await this.app.model.Calendar.find()
    if (data.length) {
      this.result(200, '查询成功', data)
    } else {
      this.result(200, '暂无日程', [])
    }
  }
  public async addCalendar() {
    let newSchedule = new this.app.model.Calendar(this.ctx.request.body)
    let res = await newSchedule.save()
    if (res) {
      this.result(200, '添加成功', res)
    } else {
      this.result(500, '添加失败')
    }
  }
  public async delCalendar() {
    let id = this.ctx.request.body.id
    let res = await this.app.model.Calendar.findByIdAndRemove(id)
    if (res) {
      this.result(200, '删除成功')
    } else {
      this.result(500, '删除失败')
    }
  }
  public async repeatDynamic() {
    let { currentDay } = this.ctx.request.body
    let lastDay = dayjs(currentDay).subtract(7, 'days').format('YYYY-MM-DD')
    let res = await this.ctx.model.Calendar.find({
      currentDay: lastDay
    })
    if (res.length > 0) {
      let obj: any = {}
      for (let i = 0; i < res.length; i++) {
        let item = res[i]
        obj.currentDay = currentDay
        obj.startTime = item.startTime
        obj.endTime = item.endTime
        obj.schedule = item.schedule
        obj.users = item.users
        let newItem = new this.ctx.model.Calendar(obj)
        let result = await newItem.save()
        if (result) {
          this.result(200, '操作成功')
        } else {
          this.result(500, '操作失败')
        }
      }
    }
  }
}