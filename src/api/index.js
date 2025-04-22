// API模块统一导出

import * as user from './modules/user'
import * as ad from './modules/ad'
import * as system from './modules/system'
import * as patient from './modules/patient'
import * as report from './modules/report'
import * as doctor from './modules/doctor'

export default {
  user,
  ad,
  system,
  patient,
  report,
  doctor
}
