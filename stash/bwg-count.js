
$httpClient.get($argument, (error, response, data) => {
  if (error) {
    console.log(error)
  } else {
    $done({
      title: data.node_location,
      content: data.data_counter*multi/(1024*1024*1024),
      backgroundColor: "#663399",
      icon: "network",
    })
  }
})
