export function timeStampTurnTime(timeStamp) {
  if (timeStamp > 0) {
    var date = new Date()
    date.setTime(timeStamp * 1000)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? '0' + d : d
    var h = date.getHours()
    h = h < 10 ? '0' + h : h
    var minute = date.getMinutes()
    var second = date.getSeconds()
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
    return (
      y + '年' + m + '月' + d + '日 ' + h + ':' + minute + ':' + second
    )
  } else {
    return ''
  }
}
