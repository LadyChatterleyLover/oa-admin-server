import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router, jwt } = app;

  // 用户
  router.get('/user/captcha', controller.user.user.getCaptcha)
  router.get('/user/getMenus', controller.user.user.getMenus)
  router.post('/user/register', controller.user.user.register)
  router.post('/user/accountLogin', controller.user.user.accountLogin)
  router.post('/user/phoneLogin', controller.user.user.phoneLogin)
  router.post('/user/sendCode', controller.user.user.sendCode)
  router.post('/user/updatePwd', controller.user.user.updatePwd)

  // 日程
  router.get('/calendar', jwt, controller.calendar.calendar.getCalendar)
  router.post('/addCalendar', jwt, controller.calendar.calendar.addCalendar)
  router.post('/delCalendar', jwt, controller.calendar.calendar.delCalendar)
  router.post('/repeatDynamic', jwt, controller.calendar.calendar.repeatDynamic)

  // 员工
  router.get('/staff', jwt, controller.staff.staff.getStaff)
  router.post('/addStaff', jwt, controller.staff.staff.addStaff)
  router.post('/delStaff', jwt, controller.staff.staff.delStaff)
  router.post('/updateStaff', jwt, controller.staff.staff.updateStaff)
}
