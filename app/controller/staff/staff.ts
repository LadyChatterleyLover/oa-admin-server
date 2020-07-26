import Base from '../base'

export default class StaffController extends Base {
  public async getStaff() {
    let {pageSize = 10, pageNum = 1, query = ''} = this.ctx.query
    let reg = new RegExp(query, 'i') 
    let res = await this.ctx.model.Staff.find({
      $or: [
        {name: {$regex : reg}},
        {gender: {$regex : reg}},
        {email: {$regex : reg}},
        {birthday: {$regex : reg}},
        {political: {$regex : reg}},
        {phone: {$regex : reg}},
        {place: {$regex : reg}},
        {address: {$regex : reg}},
        {nation: {$regex : reg}},
        {title: {$regex : reg}},
        {department: {$regex : reg}},
        {education: {$regex : reg}},
        {school: {$regex : reg}},
        {major: {$regex : reg}},
        {idCard: {$regex : reg}},
        {entryDate: {$regex : reg}},
        {conversionTime: {$regex : reg}},
        {beginTime: {$regex : reg}},
        {endTime: {$regex : reg}},
        {employ: {$regex : reg}},
      ]
    }).limit(pageSize * 1)
    .skip((pageNum * 1 - 1) * pageSize * 1)
    .sort({
      _id: -1,
    })
    let total = await this.app.model.Staff.count({$or: [
      {name: {$regex : reg}},
      {gender: {$regex : reg}},
      {email: {$regex : reg}},
      {birthday: {$regex : reg}},
      {political: {$regex : reg}},
      {phone: {$regex : reg}},
      {place: {$regex : reg}},
      {address: {$regex : reg}},
      {nation: {$regex : reg}},
      {title: {$regex : reg}},
      {department: {$regex : reg}},
      {education: {$regex : reg}},
      {school: {$regex : reg}},
      {major: {$regex : reg}},
      {idCard: {$regex : reg}},
      {entryDate: {$regex : reg}},
      {conversionTime: {$regex : reg}},
      {beginTime: {$regex : reg}},
      {endTime: {$regex : reg}},
      {employ: {$regex : reg}},
    ]})
    let data = {
      data: res,
      total,
      page: Math.ceil(total / pageSize),
    }
    this.result(200, '获取员工列表成功', data)
  }
  public async addStaff() {
    let res = new this.ctx.model.Staff(this.ctx.request.body)
    let user = await res.save()
    if (user) {
      this.result(200, '添加成功', user)
    } else {
      this.result(500, '添加失败')
    }
  }
  public async delStaff() {
    let res = await this.ctx.model.Staff.findByIdAndRemove(this.ctx.request.body.id)
    if (res) {
      this.result(200, '删除成功')
    } else {
      this.result(500, '删除失败')
    }
  }
  public async updateStaff() {
    let res = await this.ctx.model.Staff.findByIdAndUpdate(this.ctx.request.body.id, this.ctx.request.body)
    if (res) {
      this.result(200, '修改成功')
    } else {
      this.result(500, '修改失败')
    }
  }
}