import { HttpRequest } from '../utils/request'
var globalTrends = {
  // 全球外汇兑换接口
  globalTrendsList(param) {
    return HttpRequest.getRequest({
      method: 'GET',
      url: '/globalTrends',
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
export { globalTrends }
