// [rule: 你好]
// [rule: 你好?]
// [rule: hello]
// [rule: hello?]

function main () {
  let answer = ''
  let word = param(1).trim()
  let res = word.match(/[沙煞傻妈狗屎贱骚瘙搔臊操艹肏][\s\S]{0,4}?[娘妈屄逼笔比bBＢ鼻Ｘx]/g) || ''
  if (res.length == 0) {
    answer = '👋 你好啊，可以发送「菜单」或「帮助」了解更多用法。'
  } else {
    notifyMasters('来自微信的不友好发言：\n' + GetContent())
    answer = '🤫 富强、民主、文明、和谐，自由、平等、公正、法治，爱国、敬业、诚信、友善'
  }
  sendText(answer)
}
main()