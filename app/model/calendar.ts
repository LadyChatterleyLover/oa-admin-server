module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // 下面得操作是连接数据库
  const CadenlarSchema = new Schema({
    users: {
      type: Array,
      required: true
    },
    // 开始时间
    startTime: {
      type: Date,
      required: true
    },
    // 结束时间
    endTime: {
      type: Date,
      required: true
    },
    // 日程内容
    schedule: {
      type: String,
      required: true
    },
    // 当前日期
    currentDay: {
      type: String,
      required: true
    },
    __v: {
      type: Number,
      select: false
    }
  })
 
  return mongoose.model('Cadenlar', CadenlarSchema, 'cadenlar')
}