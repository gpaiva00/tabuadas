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

const doLogin = (username = null, password = null) => {
  const userName = username || userNameLoginEl.value
  const pass = password || passwordLoginEl.value
  loginMessageEl.innerHTML = ""


  // find user
  const loggedUser = db({username, password})
  
  if(loggedUser.count() > 0) {
    console.log('loggedUser', loggedUser)
    
    // store user
    localStorage.setItem("username", loggedUser.username)
    localStorage.setItem("password", loggedUser.password)
    localStorage.setItem("name", loggedUser.name)
    localStorage.setItem("_id", loggedUser._id)
    localStorage.setItem("__id", loggedUser.__id)

    refreshLoggedUser(loggedUser)
    
  } else {
    console.log('Não achou :(')
  }

  /* db.allDocs({ include_docs: true, descending: true }, (err, doc) => {
    let loggedUser = doc.rows.filter(row =>
      row.doc.username === userName && row.doc.password === pass
        ? row.doc
        : false
    )

    if (loggedUser.length === 0)
      return (loginMessageEl.innerHTML = "Usuário ou senha inválidos!")

    loggedUser = loggedUser[0].doc
    
    // store user
    localStorage.setItem("username", loggedUser.username)
    localStorage.setItem("password", loggedUser.password)
    localStorage.setItem("name", loggedUser.name)
    localStorage.setItem("_id", loggedUser._id)
    localStorage.setItem("_rev", loggedUser._rev)

    refreshLoggedUser(loggedUser)

    closeModal2.click()
  }) */

  const allRecords = db()
  console.log('Records', allRecords.count())
  
}

const refreshLoggedUser = (loggedUser) => {
  const username = loggedUser
    ? loggedUser.username
    : localStorage.getItem("username")

  const playerName = loggedUser ? loggedUser.name : localStorage.getItem("name")
  
  // if(username === null) console.log('eh null')

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
    loginUserEl.innerHTML = '<i class="fas fa-lock"></i>'+' Entrar'
    loginUserEl.disabled = false


  }
}

const newUser = ({ user }) => {
  user.score = 0
  user._id = `${totalUsers + 1}`

  console.log('new user', user)

  db.insert(user)

  totalUsers++
  
  doLogin(user.username, user.password)

  closeModal.click()
}

const saveUser = () => {
  const finalName = playerNameEl.value
    .replace(/\s(.)/g, function($1) {
      return $1.toUpperCase()
    })
    .replace(/^(.)/, function($1) {
      return $1.toLowerCase()
    })

  console.log('finalName', finalName)
  
  const user = {
    name: finalName,
    username: finalUserName,
    password: playerPasswordEl.value
  }

  newUser({ user })
}

const logout = () => {
  localStorage.removeItem('username')
  localStorage.removeItem('password')
  localStorage.removeItem('name')
  localStorage.removeItem('_id')
  localStorage.removeItem('_rev')
  
  refreshLoggedUser()
}

const showModal = () => displayModal.click()
const showModal2 = () => displayModal2.click()


refreshLoggedUser()
