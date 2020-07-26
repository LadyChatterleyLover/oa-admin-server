module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // 下面得操作是连接数据库
  const StaffSchema = new Schema({
    // 姓名
    name: {
      type: String,
      required: true,
    },
    // 性别
    gender: {
      type: String,
      required: true,
    },
    // 邮箱
    email: {
      type: String,
      required: true,
    },
    // 生日
    birthday: {
      type: String,
      required: true,
    },
    // 政治面貌
    political: {
      type: String,
      required: true,
    },
    // 电话
    phone: {
      type: String,
      required: true,
    },
    // 籍贯
    place: {
      type: String,
      required: true,
    },
    // 联系地址
    address: {
      type: String,
      required: true,
    },
    // 民族
    nation: {
      type: String,
      required: true
    },
    // 职位
    position: {
      type: String,
      required: true
    },
    // 职称
    title: {
      type: String,
      required: true
    },
    // 部门
    department: {
      type: String,
      required: true
    },
    // 学历
    education: {
      type: String,
      required: true
    },
    // 毕业学校
    school: {
      type: String,
      required: true
    },
    // 专业
    major: {
      type: String,
      required: true
    },
    // 身份证
    idCard: {
      type: String,
      required: true
    },
    // 婚姻状态
    wedlock: {
      type: String,
      required: true
    },
    // 入职日期
    entryTime: {
      type: String,
      required: true
    },
    // 离职日期
    conversionTime: {
      type: String
    },
    // 合同开始时间
    beginTime: {
      type: String,
      required: true
    },
    // 合同结束时间
    endTime: {
      type: String,
      required: true
    },
    // 聘用形式
    employ: {
      type: String,
      required: true
    }
  })
 
  return mongoose.model('Staff', StaffSchema, 'staff')
}