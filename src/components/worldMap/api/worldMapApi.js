import { HttpRequest } from '../utils/request'
var worldMap = {
  // 新闻列表
  worldMapList(param) {
    return HttpRequest.getRequest({
      method: 'GET',
      url: '/newsList',
      data: param
    })
  },
  //
  other(param) {
    return HttpRequest.getRequest({
      method: 'GET',
      url: 'API地址',
      data: param
    })
  }
}
export { worldMap }
