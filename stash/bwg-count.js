
$httpClient.get($argument, (error, response, data) => {
  if (error) {
    console.log(error)
  } else {
    console.log($argument)
    let bwg = JSON.parse(data)
    console.log(bwg.node_location)
    let multiplier = bwg.monthly_data_multiplier
    console.log('multiplier: ' + multiplier)
    let plan_monthly_data = toGB(bwg.plan_monthly_data, multiplier)
    console.log('plan_monthly_data: '+plan_monthly_data)
    let data_counter = toGB(bwg.data_counter, multiplier)
    console.log('data_counter: '+data_counter)
    let data_next_reset = toDate(bwg.data_next_reset)
    console.log('data_next_reset: '+data_next_reset)
    let content = `
    流量：已使用 ${data_counter}，共 ${plan_monthly_data}
    重置日期：${data_next_reset}
    `
    console.log('content: '+ content)
    $done({
      title: bwg.node_location,
      content: content,
      backgroundColor: "#663399",
      icon: "network",
    })
  }
})

function toGB(bit, multi) {
  let GB = bit*multi/(1024*1024*1024)
  return GB.toFixed(2) + 'GB'
}

function toDate(timestamp) {
  let date = new Date(timestamp*1000)
  let month = date.getMonth() + 1
  let day = date.getDate()
  return month + '月' + day + '日'
}
