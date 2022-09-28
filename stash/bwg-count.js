
$httpClient.get('https://api.64clouds.com/v1/getServiceInfo?veid=1172197&api_key=private_X8ri9QVK0tpJEOERPP02aE3K', (error, response, data) => {
  if (error) {
    console.log(error)
  } else {
    console.log(data)
    $done({
      title: 'new',
      content: data,
      backgroundColor: "#663399",
      icon: "network",
    })
  }
})
