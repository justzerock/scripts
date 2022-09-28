
$httpClient.get($argument, (error, response, data) => {
  if (error) {
    console.log(error)
  } else {
    console.log(data)
    $done({
      title: 'test',
      content: $argument,
      backgroundColor: "#663399",
      icon: "network",
    })
  }
})
