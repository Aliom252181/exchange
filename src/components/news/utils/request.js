import axios from 'axios'

var HttpRequest = {
  getRequest({ url, data = {}, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      this._getRequest(url, resolve, reject, data, method)
    })
  },
  _getRequest(url, resolve, reject, data = {}, method = 'GET') {
    const format = method.toLocaleLowerCase() === 'get' ? 'params' : 'data'
    axios({
      url: url,
      method: method,
      [format]: data,
      header: {
        'content-type': 'application/json',
        'Origin': 'https://api-q.fx678img.com/',
        'Referer': 'exchangeSymbol.php?exchName=WH'
      }
    }).then(res => {
      resolve(res)
    }).catch(() => {
      reject(res)
    })
  }
}
export { HttpRequest }
