// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportCalendarCalendar from '../../../app/controller/calendar/calendar';
import ExportStaffStaff from '../../../app/controller/staff/staff';
import ExportUserUser from '../../../app/controller/user/user';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    calendar: {
      calendar: ExportCalendarCalendar;
    }
    staff: {
      staff: ExportStaffStaff;
    }
    user: {
      user: ExportUserUser;
    }
  }
}
