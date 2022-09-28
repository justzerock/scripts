// [rule: 小爱?]
// [rule: 小爱 ?]

// [priority: 0] 匹配优先级
// [admin: false] 这里默认关闭了、开启true后除管理员账号外、群员不可用

function main() {
  let word = param(1)
  let data = request({
    url: "https://xiaobai.klizi.cn/API/other/xiaoai.php?data=&msg=" + encodeURI(word),
    "dataType": "json"
  })
  if (data) {
    if (data.text) {
      let answer = data.text
      sendText(answer)
    } else {
      return
    }
  } else {
    return
  }
}
main()
