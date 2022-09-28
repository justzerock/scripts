// [rule: 统计]
// [admin: true] 是否只允许管理员使用
// [cron: 30 14 * * *] 定时任务

const gapi = JSON.parse(get('g_api'))
const date = get('g_date')

const rapi = JSON.parse(get('r_api'))
const month = get('r_month')

function main() {

  let answer = '自定义搜索 ' + date + '日统计：\n'

  gapi.forEach((api, index) => {
    answer += '接口' + (index + 1) + ' ：' + api.times + ' /100 次\n'
  });

  answer += '\nrapidapi ' + (month*1 + 1) + '月统计：\n'

  rapi.forEach((api, index) => {
    answer += '接口' + (index + 1) + ' ：' + api.times + ' /600 次\n'
  })

  sendText(answer)
}
main()