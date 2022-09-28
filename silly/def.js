// [rule: 解释]
// [rule: 解释?]
// [rule: 解释 ?]
// [rule: def]
// [rule: def?]
// [rule: def ?]
const data = {
  '登录|登陆': '就是以对话方式登录🐶东账号，试着对我说：登录',
  '查询': '即查询你账号的明细，试着对我说：查询',
  '入口|entry': '查询京东活动入口，试着说：入口 + 活动名\n觉得有点怪可以说：活动名 + 入口',
  '帮助|help': '给你提供需要的答案，试着对我说：帮助',
  '留言|msg': '把你想说的话马上转发给管理员，试着对我说：留言 + 内容 + 昵称',
  '解释|def': '😏 解释一下什么叫解释？',
}
const tail = '\n\n💡 发送「菜单」可以查看全部命令'

function main() {
  let answer = ''
  let word = param(1).trim()
  let res = word.match(/[沙煞傻妈狗屎贱骚瘙搔臊操艹肏][\s\S]{0,4}?[娘妈屄逼笔比bBＢ鼻Ｘx]/g) || ''
  if (res.length == 0) {
    if (word == '' || word.length < 2) {
      answer = '本命令格式：「解释 + 你想了解的命令名称」' + tail
    } else {
      answer = word + '？可能没这个命令，或者它不需要解释，你可以留言给管理员' + tail
      for (const [key, value] of Object.entries(data)) {
        if (key.indexOf(word) > -1) {
          answer = value + tail
        }
      }
    }
  } else {
    notifyMasters('来自微信的不友好发言：\n' + GetContent())
    answer = '🤫 富强、民主、文明、和谐，自由、平等、公正、法治，爱国、敬业、诚信、友善'
  }
  sendText(answer)
}
main()
