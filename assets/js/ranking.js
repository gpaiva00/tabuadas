
function refreshUsers() {
  const ajax = new XMLHttpRequest()
  let response = []

  ajax.open('GET', apiUrl, true)
  ajax.send()

  ajax.onreadystatechange = function() {
    if(ajax.readyState == 4 && ajax.status == 200) {
      response = JSON.parse(ajax.responseText)
      // refresh local db
      PlayersDb = [...response]
      // refresh ranking
      refreshRankingTable(response)
      doLogin(response.username, response.password)
    }
  }
}

const tag = t => contents => `<${t}>${contents}</${t}>`

function refreshRankingTable( rows ){
  let items = rows.map((row, index) => {
    const id = tag("th")(index+1)
    const name = tag("td")(row.name)
    const score = tag("td")(row.score)

    const item = [id, name, score].join("")

    return tag("tr")(item)
  })

  // console.log('items', items);

  tBody.innerHTML = items.join("")
}

function refreshPlayerScore( score ) {
  const _id = localStorage.getItem("_id")
  console.log("update score", _id)
  // console.log('Players', PlayersDb);
  
  const user = PlayersDb.find(user => user._id == _id)

  if(user) {
    user.score = score
    updateUser(user)
  } else {
    console.log('user não encontrado :(');
    
  }
}

function updateUser(user) {
  const ajax = new XMLHttpRequest()
  const userId = user._id 
  const updateUrl = `${apiUrl}/${userId}`
  
  ajax.open('PUT', updateUrl, true)
  ajax.setRequestHeader("content-type", "application/json");
  ajax.send(JSON.stringify(user))

  ajax.onreadystatechange = function() {
    if(ajax.readyState == 4 && ajax.status == 200) {
      refreshUsers()
    }
  }
}