import request from '@/utils/request'

// 获取医生信息
export function getDoctor(doctorId) {
  return request({
    url: `GetDoctor/${doctorId}/`,
    method: 'get'
  })
}

// 获取医生的患者列表
export function getPatients(doctorId) {
  return request({
    url: `GetPatients/${doctorId}/`,
    method: 'get'
  })
}
