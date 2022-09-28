
$httpClient.get($argument, (error, response, data) => {
  if (error) {
    console.log(error)
  } else {
    $done({
      title: data.node_location,
      content: data.data_counter,
      backgroundColor: "#663399",
      icon: "network",
    })
  }
})
