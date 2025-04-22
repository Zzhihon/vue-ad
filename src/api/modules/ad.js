import request from '@/utils/request'

// 获取广告列表
export function getAdList(params) {
  return request({
    url: 'ad/list',
    method: 'get',
    params
  })
}

// 获取广告详情
export function getAdDetail(id) {
  return request({
    url: `ad/detail/${id}`,
    method: 'get'
  })
}

// 创建广告
export function createAd(data) {
  return request({
    url: 'ad/create',
    method: 'post',
    data
  })
}

// 更新广告
export function updateAd(id, data) {
  return request({
    url: `ad/update/${id}`,
    method: 'put',
    data
  })
}

// 删除广告
export function deleteAd(id) {
  return request({
    url: `ad/delete/${id}`,
    method: 'delete'
  })
}
