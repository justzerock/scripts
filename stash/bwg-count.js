
$httpClient.get("https://api.64clouds.com/v1/getServiceInfo?veid=1172197&api_key=private_RJT1Ik0L10x759KFDbu2ezB8", (error, response, data) => {
  if (error) {
    console.log(error)
  } else {
    let multiplier = data.monthly_data_multiplier
    let plan_monthly_data = toGB(data.plan_monthly_data, multiplier)
    let data_counter = toGB(data.data_counter, multiplier)
    let data_next_reset = timestamp(data.data_next_reset)
    let content = `
    流量：已使用 ${data_counter}，共 ${plan_monthly_data}
    重置日期：${data_next_reset}
    `
    $done({
      title: data.node_location,
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
