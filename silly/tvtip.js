// [rule: ^.*[想要在线播放看电影视剧动画漫综艺节目]{2,}.*$]
// [priority: 0] 匹配优先级

function main() {
  let random = Math.random() * 10
  let tip = ''
  let type = []
  if (random < 5) {
    tip = '🤗 想看电视吗，请发送：'
    type = ['我想看','在线看']
  } else {
    tip = '😎 我来给点提示，请发送：'
    type = ['我要看','在线播放']
  }
  sendText(tip + '\n\n' + type[0] + ' + 影视剧名\n\n或：\n' + type[1] + ' + 影视剧名\n\n📽️ https://ddys.site 👈 低端影视，值得推荐\n📱 百G流量低价月租 https://ka.zerock.top 选张适合你的卡吧')
}
main()