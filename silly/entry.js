// [rule: ^[京东商城农场萌宠领现金健康社区极速特价版金币汪赛跑乐园签到免单赚惊喜工厂金融养猪金豆红包子活动登入口]{2,6}$]
// [priority: 1] 匹配优先级

const data = {
  '登入': '请输入关键字「登录」',
  '京东商城|京东极速版|京东特价版|京喜|京喜特价|活动入口|活动|入口': '直接发送活动名称，我会告诉你入口的。\n比如给我发「农场」',
  '京豆|豆豆|豆子|金豆': '想知道自己的京豆明细请发「查询」\n\n京豆与现金比例为100:1，有效期相对较长，可以慢慢攒。',
  '京东红包|极速版红包|京喜红包|惊喜红包|红包': '想知道自己的红包明细请发「查询」\n\n目前送红包的活动有：东东农场、领现金、京喜金币、汪汪赛跑、京东赚赚\n\n红包只能用于对应app\n\n可叠加，无门槛，不同红包的有效期不同，2-7天不等,记得及时使用',
  '东东农场|京东农场': '想知道自己的农场进度请发「查询」\n\n京东app -> 我的 -> 东东农场',
  '东东萌宠|京东萌宠': '东东萌宠目前已下线',
  '领现金': '京东app搜索「领现金」',
  '东东健康社区|东东健康社区': '京东app搜索「健康社区」或「东东健康社区」',
  '特价金币|极速金币|京喜金币': '京喜特价app -> 我的 -> 金币',
  '汪汪赛跑': '汪汪赛跑目前找不到入口，可以通过链接打开 https://h5platform.jd.com/swm-stable/people-run/index?activityId=L-sOanK_5RJCz7I314FpnQ',
  '汪汪乐园': '京喜特价app -> 我的 -> 汪汪乐园',
  '签到免单': '京喜特价app -> 我的 -> 签到免单',
  '京东赚赚': '微信小程序「京东赚赚」-> 底部「赚好礼」',
  '京喜工厂|惊喜工厂': '京喜工厂目前已下线',
  '金融养猪|养猪猪': '京东金融app -> 我的 -> 养猪猪',
}

let link = `\n
👉 温馨提示：登录成功即可自动积攒京豆红包
🍉 新手需手动开启「东东农场」

💡 <a href="https://mp.weixin.qq.com/s/YYPV4q2ZLopJNHt1sV9ceA">了解全部入口</a>
📱 百G流量低价月租 https://ka.zerock.top 选张适合你的卡吧
`

function main() {
  let answer = ''
  let word = GetContent().trim()
  for (const [key, value] of Object.entries(data)) {
    if (key == word) {
      answer = value + link
      break
    } else if (key.indexOf(word) > -1) {
      answer = value + link
      break
    }
  }
  answer != '' ? sendText(answer) : ''
}
main()
