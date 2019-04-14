const saveUserEl = document.getElementById("saveUser")
const playerNameEl = document.getElementById("playerName")
const userNameLoginEl = document.getElementById("userNameLogin")
const passwordLoginEl = document.getElementById("passwordLogin")
const playerPasswordEl = document.getElementById("playerPassword")
const userNameEl = document.getElementById("playerUserName")

let finalUserName = ''

const generateMiniHash = (length = 3) => (generateRandomNumber(100,500)).toString(36);

const refreshUserName = () => {
  finalUserName = playerNameEl.value.replace(' ', '')+''+generateMiniHash()

  userNameEl.innerHTML = `<span class="text-secondary">Nome de usuário:</span> ${finalUserName}`
}

const showModal = () => displayModal.click()
const showModal2 = () => displayModal2.click()

const savingPassword = () => {
  if(playerPasswordEl.value.length >= 5 && finalUserName != '') {
    saveUserEl.disabled = false
  }
}

const doLogin = () => {
  
}