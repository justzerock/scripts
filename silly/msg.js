// [rule: 留言]
// [rule: 留言?]
// [rule: 留言 ?]
// [rule: msg]
// [rule: msg?]
// [rule: msg ?]
function main() {
  let answer = ''
  let word = param(1)
  let res = word.match(/[沙煞傻妈狗屎贱骚瘙搔臊操艹肏][\s\S]{0,4}?[娘妈屄逼笔比bBＢ鼻Ｘx]/g) || ''
  if (res.length == 0) {
    if (word == '' || word.length < 6) {
      answer = '内容太短了，请想好你要说的，发「留言 + 内容 + 昵称」给我'
    } else {
      notifyMasters('来自微信的留言：\n' + word)
      answer = '留言已转发，有问题可以发「菜单」或「帮助」。'
    }
  } else {
    notifyMasters('来自微信的不友好发言：\n' + GetContent())
    answer = '🤫 富强、民主、文明、和谐，自由、平等、公正、法治，爱国、敬业、诚信、友善'
  }
  sendText(answer)
}
main()