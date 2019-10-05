const saveUserEl = document.getElementById("saveUser")
const playerNameEl = document.getElementById("playerName")
const userNameLoginEl = document.getElementById("userNameLogin")
const passwordLoginEl = document.getElementById("passwordLogin")
const playerPasswordEl = document.getElementById("playerPassword")
const loginMessageEl = document.getElementById("loginMessage")
const userNameEl = document.getElementById("playerUserName")
const loginUserEl = document.getElementById("loginUserBtn")
const newUserEl = document.getElementById("newUser")
const logoutUserEl = document.getElementById("logoutUser")

let finalUserName = ""
let loggedIn = false

const generateMiniHash = (length = 3) =>
  generateRandomNumber(100, 500).toString(36)

const refreshUserName = () => {
  finalUserName = playerNameEl.value.replace(" ", "") + "" + generateMiniHash()

  userNameEl.innerHTML = `<span class="text-secondary">Salve seu nome de usuário:</span> ${finalUserName}`
}

const savingPassword = () => {
  if (playerPasswordEl.value.length >= 5 && finalUserName != "") {
    saveUserEl.disabled = false
  }
}

function doLogin(username = null, password = null) {
  const _username = username || userNameLoginEl.value
  const _password = password || passwordLoginEl.value
  loginMessageEl.innerHTML = ""
  console.log('given username', _username);
  

  // check if user exists
  const loggedUser = PlayersDb.find(player => player.username == _username && player.password == _password)
  
  if(loggedUser != undefined) {
    console.log('loggedUser', loggedUser.name)
    
    // store user
    localStorage.setItem("username", loggedUser.username)
    localStorage.setItem("password", loggedUser.password)
    localStorage.setItem("name", loggedUser.name)
    localStorage.setItem("id", loggedUser.id)
    localStorage.setItem("_id", loggedUser._id)

    refreshLoggedUser(loggedUser)
    closeModal.click()
    
  } else {
    console.log('Não achou :(')
  }
}

function refreshLoggedUser(loggedUser) {
  const username = loggedUser
    ? loggedUser.username
    : localStorage.getItem("username")

  const playerName = loggedUser ? loggedUser.name : localStorage.getItem("name")

  if (username !== null) {
    console.log('logged', username)
    
    newUserEl.style.display = "none"
    logoutUserEl.style.display = "initial"
    loginUserEl.innerHTML = `<i class="fas fa-user"></i> ${playerName}`
    loginUserEl.disabled = true

  } else {
    console.log('no logged in')

    newUserEl.style.display = "initial"
    logoutUserEl.style.display = "none"
    loginUserEl.innerHTML = '<i class="ri-lock-line"></i>'+' Entrar'
    loginUserEl.disabled = false
  }
}

function newUser({ user }) {
  user.score = 0
  user.id = `${PlayersDb.length + 1}`

  console.log('new user', user)

  const ajax = new XMLHttpRequest() 
  
  ajax.open('POST', apiUrl, true)
  ajax.setRequestHeader("content-type", "application/json");
  ajax.send(JSON.stringify(user))

  ajax.onreadystatechange = function() {
    if(ajax.readyState == 4 && ajax.status == 200) {
      refreshUsers()
      closeModal.click()
    }
  }
}

function saveUser () {
  const finalName = playerNameEl.value
    .replace(/\s(.)/g, function($1) {
      return $1.toUpperCase()
    })
    .replace(/^(.)/, function($1) {
      return $1.toLowerCase()
    })

  // console.log('finalName', finalName)
  
  const user = {
    name: finalName,
    username: finalUserName,
    password: playerPasswordEl.value
  }

  newUser({ user })
}

function logout() {
  localStorage.removeItem('username')
  localStorage.removeItem('password')
  localStorage.removeItem('name')
  localStorage.removeItem('id')
  localStorage.removeItem('_id')
  
  refreshLoggedUser()
}

const showModal = () => displayModal.click()
const showModal2 = () => displayModal2.click()


refreshLoggedUser()