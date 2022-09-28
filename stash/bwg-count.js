
$httpClient.get($argument, (error, response, data) => {
  if (error) {
    console.log(error)
  } else {
    console.log(data)
    $done({
      title: '测试',
      content: $argument,
      backgroundColor: "#663399",
      icon: "network",
    })
  }
})
