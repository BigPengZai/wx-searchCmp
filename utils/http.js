import {
  config
} from '../config.js'

// 自定义状态码
/** 
 * 这里以 gitHub api 的code码为示例，具体的以自己项目中为准
 * 状态代码	描述
    200	OK
    304	Not modified
    403	Forbidden
    422	Validation failed
    503	Service unavailable
 * 
 * 
 */
const tips = {
  1: '抱歉，出现一个错误',
  304: 'Not modified',
  403: 'Forbidden',
  422: 'Validation failed',
  503: 'Service unavailable'
}


class HTTP {
  request({
    url,
    data = {},
    method = 'GET'
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }


  _request(url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          this._show_error(code)
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip?tip:tips[1],
      icon: "none",
      duration: 2000
    })
  }
}

export {
  HTTP
}