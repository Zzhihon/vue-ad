import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 确保使用正确的API基础URL
const baseURL = 'https://ad.primedigitaltech.com:9308/ad/api/'

// 创建axios实例
const service = axios.create({
  baseURL: baseURL,
  timeout: 30000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 从localStorage获取token并添加到请求头
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    
    // 确保Content-Type不会被覆盖
    if (!config.headers['Content-Type'] && !config.headers['content-type']) {
      config.headers['Content-Type'] = 'application/json;charset=utf-8'
    }
    
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 如果是图片或二进制数据，直接返回整个响应对象
    if (response.config.responseType === 'blob' || 
        response.headers['content-type']?.includes('image/')) {
      return response;
    }
    
    // 如果是文件上传等使用FormData的请求，直接返回原始响应
    const contentType = response.headers['content-type'] || ''
    if (contentType.includes('multipart/form-data') || 
        response.config.responseType === 'blob' || 
        response.config.url.includes('UploadImage')) {
      return response
    }
    
    const res = response.data
    
    // 这里根据后端API的实际返回结构进行调整
    if (res.code && res.code !== 200) {
      // 显示错误消息
      ElMessage({
        message: res.message || '请求失败',
        type: 'error',
        duration: 5 * 1000
      })
      
      // 401: 未登录或token过期
      if (res.code === 401) {
        // 重定向到登录页
        router.push('/login')
      }
      
      return Promise.reject(new Error(res.message || '请求失败'))
    } else {
      return res
    }
  },
  error => {
    console.error('响应错误:', error)
    
    // 处理HTTP错误状态码
    const { response } = error
    let message = '连接服务器失败'
    
    if (response) {
      switch (response.status) {
        case 401:
          message = '未授权，请重新登录'
          router.push('/login')
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求错误，未找到资源'
          break
        case 500:
          message = '服务器错误'
          break
        default:
          message = `请求失败: ${response.status}`
      }
    }
    
    ElMessage({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    
    return Promise.reject(error)
  }
)

export default service
