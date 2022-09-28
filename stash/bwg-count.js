
$httpClient.get('https://api.64clouds.com/v1/getServiceInfo?veid=1172197&api_key=private_X8ri9QVK0tpJEOERPP02aE3K', (error, response, data) => {
  if (error) {
    console.log(error)
  } else {
    let bwg = JSON.parse(data)
    $done({
      title: bwg.node_location,
      content: bwg.email,
      backgroundColor: "#663399",
      icon: "network",
    })
  }
})
