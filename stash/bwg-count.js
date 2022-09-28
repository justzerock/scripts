
$httpClient.get($argument, (error, response, data) => {
  if (error) {
    console.log(error)
  } else {
    console.log(data.node_location)
    $done({
      title: 'test',
      content: $argument,
      backgroundColor: "#663399",
      icon: "network",
    })
  }
})
