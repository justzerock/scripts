// [rule: ^.*[沙煞傻妈狗屎贱骚瘙搔臊操艹肏][\s\S]{0,4}?[娘妈屄逼笔比bBＢ鼻Ｘx].*$]

function main () {
  notifyMasters('来自微信的不友好发言：\n' + GetContent())
  sendText('🤫 富强、民主、文明、和谐，自由、平等、公正、法治，爱国、敬业、诚信、友善')
}
main()