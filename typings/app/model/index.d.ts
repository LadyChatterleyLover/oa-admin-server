// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCalendar from '../../../app/model/calendar';
import ExportStaff from '../../../app/model/staff';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Calendar: ReturnType<typeof ExportCalendar>;
    Staff: ReturnType<typeof ExportStaff>;
    User: ReturnType<typeof ExportUser>;
  }
}
