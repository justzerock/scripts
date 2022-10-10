//[rule: 我想看?]
//[rule: 我要看?]
//[rule: 我想看 ?]
//[rule: 我要看 ?]
//[rule: 在线 ?]
//[rule: 在线看 ?]
//[rule: 在线播放 ?]
//[rule: 在线?]
//[rule: 在线看?]
//[rule: 在线播放?]
// [priority: 1] 匹配优先级

const NUM = get('g_num')
const gapi = JSON.parse(get('g_api'))
const rapi = JSON.parse(get('r_api'))
const GURL = 'https://customsearch.googleapis.com/customsearch/v1?'
const RURL = 'https://google-search3.p.rapidapi.com/api/v1/search/'

function pst() {
  // 太平洋时区
  let date = new Date()
  let year = date.getFullYear()
  let startDate = new Date(year + '/3/13 3:00')
  let endDate = new Date(year + '/11/6 2:00')
  let timezone = date > startDate && date < endDate ? -8 : -7; //目标时区时间，东八区   东时区正数 西市区负数
  let offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
  let nowDate = new Date().getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
  let targetDate = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);
  return targetDate
}


function main() {
  let keyword = param(1)
  let answer = ''
  let data = ''
  let adminTip = ''
  let cur = get('g_cur') || 0
  let today = pst().getDate()
  let usedDate = get('g_date') || today
  if (usedDate != today) {
    gapi.forEach(api => api.times = 0)
    usedDate = today
  } else if (gapi[cur].times == 100) {
    for (let i=0; i< gapi.length; i++) {
      if (i == cur) {
        if (i == gapi.length - 1) {
          cur == 0
        } else {
          cur == i+1
        }
      }
    }
  }
  if (gapi[cur].times < 100) {
    data = request({
      method: 'GET',
      url: GURL + 'num=' + NUM + '&key=' + gapi[cur].api_key + '&cx=' + gapi[cur].cx + '&q=' + encodeURI(keyword),
      useProxy: true,
      dataType: "json",
      headers: {}
    })
    if (data) {
      if (!data.searchInformation.totalResults) {
        answer = '🦊 找不到你想看的。可以去茶杯狐找找 https://cupfox.app 👈 复制链接到浏览器打开'
      } else {
        answer = '👉 复制链接到浏览器打开\n🤝 打不开的链接，反馈直接发「留言 + 链接」\n\n'
        data.items.forEach((res, index) => {
          answer += (index + 1) + '、' + res.title + '\n链接：' + res.link + '\n\n'
        });
        answer += '\n🦊 要是没有你想要的结果，可以去茶杯狐找找 https://cupfox.app 👈 复制链接到浏览器打开'
      }
      gapi[cur].times += 1
      set('g_cur', cur)
      set('g_date', usedDate)
      set('g_api', JSON.stringify(gapi))
    }
  } else {
    let month = pst().getMonth()
    let usedMonth = get('r_month') || month
    if (usedMonth != month) {
      rapi.forEach(api => api.times = 0)
      usedMonth = month
    }
    keyword += ' 在线看'
    data = request({
      method: 'GET',
      url: RURL + 'num=' + NUM + '&q=' + encodeURI(keyword),
      useProxy: true, // 使用代理，自动调用tg代理
      dataType: "json",
      headers: {
        'x-user-agent': 'desktop',
        'x-proxy-location': 'US',
        'x-rapidapi-host': 'google-search3.p.rapidapi.com',
        'x-rapidapi-key': rapi[0].api_key //需要自己去申请，https://rapidapi.com/apigeek/api/google-search3/
      }
    })
    if (data) {
      if (!data.total) {
        answer = '🦊 找不到你想看的。可以去茶杯狐找找 https://cupfox.app 👈 复制链接到浏览器打开'
      } else {
        answer = '👉 复制链接到浏览器打开(备用接口)\n\n'
        data.results.forEach((res, index) => {
          answer += (index + 1) + '、' + res.title + '\n链接：' + res.link + '\n\n'
        });
        answer += '\n🦊 要是没有你想要的结果，可以去茶杯狐找找 https://cupfox.app 👈 复制链接到浏览器打开'
      }
      rapi[0].times += 1
      set('r_month', usedMonth)
      set('r_api', JSON.stringify(rapi))
    }
  }
  sendText(answer)
}

main()