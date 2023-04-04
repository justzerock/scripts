// [rule: ^.*[加群套餐流量电话号卡]{2,}.*$]

function main () {
  let word = GetContent().trim()
  if (word == '加群') {
    let img = get('qrcode') || 'https://wework.qpic.cn/wwpic/560148_yj-4yFXpRTKSvKZ_1678178757/0'
    sendImage(img)
  } else {
    let answer = `📱 直达号卡商城 👉 https://ka.zerock.top
🔍 订单查询 👉 https://od.zerock.top

这些卡都是三大运营商的正规电话卡，只是营销方案不同，大部分都是参与首充活动，赠送超多流量，但价格不会像营业厅的高高在上。
点击上面的链接选一个适合你的卡吧。

🧑🏻‍💻 有更多问题，可以发送「留言 + 你的问题」，我会立即看到。

👥 加群请发「加群」
`
    sendText(answer)
  }
}
main()