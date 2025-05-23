import request from '@/utils/request'

// 用户登录
export function login(data) {
  return request({
    url: 'auth/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: 'user/info',
    method: 'get'
  })
}

// 用户登出
export function logout() {
  return request({
    url: 'auth/logout',
    method: 'post'
  })
}
