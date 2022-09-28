
$httpClient.get('https://api.64clouds.com/v1/getServiceInfo?veid=1172197&api_key=private_X8ri9QVK0tpJEOERPP02aE3K', (error, response, data) => {
  if (error) {
    console.log(error)
  } else {
    console.log(data)
    $done({
      title: '地址',
      content: data.node_location,
      backgroundColor: "#663399",
      icon: "network",
    })
  }
})
