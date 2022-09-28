
$httpClient.get($argument, (error, response, data) => {
  if (error) {
    console.log(error)
  } else {
    let bwg = JSON.parse(data)
    $done({
      title: bwg.node_location + 'haha',
      content: bwg.email,
      backgroundColor: "#663399",
      icon: "network",
    })
  }
})
