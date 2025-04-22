import request from '@/utils/request'

// 获取患者信息 - 注意URL路径不要包含baseURL部分
export function getPatient(patientId) {
  return request({
    url: `GetPatient/${patientId}/`,
    method: 'get'
  })
}

// 根据ID查找报告
export function findReportsByID(patientId) {
  return request({
    url: `FindReportsByID/${patientId}/`,
    method: 'get'
  })
}

// 获取图像 - 确保正确设置了 responseType
export function getImage(imagePath) {
  return request({
    url: `GetImage/${imagePath}/`,
    method: 'get',
    responseType: 'blob',
    headers: {
      // 某些情况下需要明确告诉服务器我们需要图片
      'Accept': 'image/*'
    }
  })
}
