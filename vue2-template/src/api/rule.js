import { URL } from './config'
import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = false

export const get = url => {
  return axios.get(`${URL}${url}`).then(res => {
    if (res.data.success) {
      return Promise.resolve(res.data.data)
    } else {
      return Promise.reject(res.data)
    }
  })
}

export const post = (url, val) => {
  const data = val !== undefined ? qs.stringify(val) : {}
  return axios.post(`${URL}${url}`, data).then(res => {
    if (res.data.success) {
      return Promise.resolve(res.data.data)
    } else {
      return Promise.reject(res.data)
    }
  })
}
