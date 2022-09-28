
$httpClient.get($argument, (error, response, data) => {
  if (error) {
    console.log(error)
  } else {
    $done({
      title: data.node_location,
      content: $argument,
      backgroundColor: "#663399",
      icon: "network",
    })
  }
})
