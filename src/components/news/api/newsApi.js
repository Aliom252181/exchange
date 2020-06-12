import { HttpRequest } from '../utils/request'
var news = {
  // 新闻列表
  newsList(param) {
    return HttpRequest.getRequest({
      method: 'GET',
      url: '/api/news',
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
export { news }
