import { HttpRequest } from '../utils/request'
var exChange = {
  // 外汇兑换接口
  exChangeList(param) {
    return HttpRequest.getRequest({
      method: 'GET',
      url: '/api/exchange',
      data: param
    })
  },

  other(param) {
    return HttpRequest.getRequest({
      method: 'GET',
      url: 'API地址',
      data: param
    })
  }
}
export { exChange }
