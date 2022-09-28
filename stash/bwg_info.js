const bwgid = $persistentStore.read("bwgid")
const bwgkey = $persistentStore.read("bwgkey")
const bwgurl = `https://api.64clouds.com/v1/getServiceInfo?veid=${bwgid}&api_key=${bwgkey}`

$httpClient.get(bwgurl, (error, response, data) => {
  if (error) {
    console.log(error)
  } else {
    console.log(bwgurl)
    let bwg = JSON.parse(data)
    let today = new Date()
    let time = today.toLocaleTimeString('chinese', { hour12: false })
    let multiplier = bwg.monthly_data_multiplier
    let plan_monthly_data = toGB(bwg.plan_monthly_data, multiplier)
    let data_counter = toGB(bwg.data_counter, multiplier)
    let data_next_reset = toDate(bwg.data_next_reset, today)
    let content = `🌈 已使用 ${data_counter} / ${plan_monthly_data}GB
    剩余 ${(plan_monthly_data - data_counter).toFixed(2)}GB

    更新于 ${time}，${data_next_reset}`

    $done({
      title: '🇺🇸 ' + bwg.node_location,
      content: content,
      backgroundColor: "#663399",
      icon: "airplane.departure",
    })
  }
})

function toGB(bit, multi) {
  let GB = bit*multi/(1024*1024*1024)
  return GB.toFixed(2)
}

function toDate(reset, today) {
  let diff = reset*1000 - today
  let day = Math.floor(diff/(24*60*60*1000))
  if (day == 0) {
    let hour_st = diff%(24*60*60*1000)
    let hour = Math.floor((hour_st/(60*60*1000)))
    return hour + '小时后重置流量'
  } else {
    return day + '天后重置流量'
  }
}
