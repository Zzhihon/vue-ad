import request from '@/utils/request'

// 添加报告
export function addReport(data) {
  return request({
    url: 'AddReport/',
    method: 'post',
    data
  })
}

// 上传图像
export function uploadImage(formData) {
  return request({
    url: 'UploadImage/',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
