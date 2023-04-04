// [rule: 留言]
// [rule: 留言?]
// [rule: 留言 ?]
// [rule: msg]
// [rule: msg?]
// [rule: msg ?]
function main() {
  let answer = ''
  let word = param(1)
  if (word == '' || word.length < 3) {
    answer = '内容太短了，请想好你要说的，发「留言 + 昵称 + 内容」给我'
  } else {
    notifyMasters('来自微信的留言：\n' + word)
    answer = '留言已转发，有问题可以发「菜单」或「帮助」。\n📱 百G流量低价月租 https://ka.zerock.top 选张适合你的卡吧'
  }
  sendText(answer)
}
main()