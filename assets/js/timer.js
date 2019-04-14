const resetProgressBar = (timeleft, timetotal) => {
  if (timeleft === 0) {
    clearTimeout(timer)

    window.clearTimeout()
    
    // resetProgressBar(0, 0)

    setTimeout(() => {
      refreshAll()
    }, 100)
    // $("#progressBar")
    //   .find("div")
    //   .css(
    //     "background-image",
    //     "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)"
    //   )

    // resetProgressBar(10, 10)
    // refreshAll()
  }

  var progressBarWidth = (timeleft * $("#progressBar").width()) / timetotal

  // console.log("timeleft", timeleft)

  $("#progressBar")
    .find("div")
    .animate({ width: progressBarWidth }, 100)

  // .html((timeleft % 60))
  if (timeleft > 0) {
    $("#progressBar")
      .find("div")
      .css(
        "background-image",
        "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)"
      )

    timer = setTimeout(() => {
      resetProgressBar(timeleft - 1, timetotal)
    }, 300)
  }

  if (timeleft < 4)
    $("#progressBar")
      .find("div")
      .css(
        "background-image",
        "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)"
      )
}

const resetTimer = stop => {
  clearTimeout(timer)

  // resetProgressBar(0, 0)
  resetProgressBar(10, 10)
}
