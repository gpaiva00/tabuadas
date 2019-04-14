//Math.floor((Math.random() * 10) + 1)
const generateRandomNumber = (init = 1, limit = 10) => Math.floor((Math.random() * limit) + init)
const table1  = document.getElementById('number1')
const table2  = document.getElementById('number2')
const option1 = document.getElementById('op1')
const option2 = document.getElementById('op2')
const option3 = document.getElementById('op3')
const scoreEl   = document.getElementById('score')
const roundEl   = document.getElementById('round')
const displayModal = document.getElementById('displayModal')
const progressBar = document.getElementById('progressBar')
const closeModal = document.getElementById('closeModal')
const totalRoundsEl  = document.getElementById('inputRounds')
const startButton = document.getElementById('startButton')
const finalScoreMsg = document.getElementById('finalScoreMsg')
const saveUserEl = document.getElementById('saveUser')
const playerNameEl = document.getElementById('playerName')
const playerPasswordEl = document.getElementById('playerPassword')
const userNameEl = document.getElementById('playerUserName')
const tBody = document.getElementById("rankingBody")

let totalRounds = 0
let result = 0
let round = 0
let score = 0
var timer = null
var totalUsers = 0

const refreshTable = () => {
  const number1 = generateRandomNumber()
  const number2 = generateRandomNumber()
  const product = number1*number2

  table1.innerHTML = number1
  table2.innerHTML = number2

  return { product, number1, number2 }
}

const load = () => {
  refreshUsers()
}

const refreshAll = () => {  
  if (round === totalRounds) return gameOver()

  resetTimer()

  const { product, number1, number2 } = refreshTable()
  const randomPosition = generateRandomNumber(1, 3)
  const positions = [1, 2, 3]
  
  result = product

  // set result into random position
  eval('option'+randomPosition).innerHTML = product

  positions.forEach(i => {
    if(i === randomPosition) return

    eval('option'+i).innerHTML = generateRandomNumber(1, 30) // or 1, 100
  })

  round++
  roundEl.innerHTML = round

  // fill others options with random numbers
  // for(let i = 1; i < 4; i++) {
  //   if(eval('option'+i).innerHTML === '') eval('option'+i).innerHTML = generateRandomNumber(number1, number2) // or 1, 100
  // }
}

const answer = (pos) => {
  const buttton = eval('option'+pos)
  if(buttton.innerHTML == result) {
    score++
    scoreEl.innerHTML = score

    refreshAll()
  
  } else {
    window.clearTimeout(timer)

    buttton.classList.add('list-group-item-danger')

    setTimeout(() => {
      buttton.classList.remove('list-group-item-danger')

      refreshAll()
    }, 1500)
  }
  
}

const gameOver = () => {
  clearTimeout(timer)

  round = 0
  totalRounds = 0
  result = 0
  table1.innerHTML = 0
  table2.innerHTML = 0

  option1.innerHTML = ''
  option2.innerHTML = ''
  option3.innerHTML = ''

  option1.disabled = true
  option2.disabled = true
  option3.disabled = true

  finalScoreMsg.innerHTML = `${score} Acerto${score > 1 ? 's' : ''}!`
  
  $('#finalScoreMsg').animate({
    'font-size': '45px'
  }, 400)
  
  score = 0
  $('#progressBar').find('div').css({'width' : '0px'})
}

const inputRounds = () => {
  // console.log(totalRoundsEl.value)
  
  if(Number(totalRoundsEl.value) > 0) startButton.disabled = false
  else startButton.disabled = true
}

const startGame = () => {
  totalRounds = Number(totalRoundsEl.value)
  scoreEl.innerHTML = 0

  option1.disabled = false
  option2.disabled = false
  option3.disabled = false

  // startButton.disabled = true
  refreshAll()
}

const resetTimer = (stop) => {
  clearTimeout(timer)
  
  // resetProgressBar(0, 0)
  resetProgressBar(10, 10)
}

const refreshUserName = () => userNameEl.innerHTML = playerNameEl.value

const showModal = () => displayModal.click()

load()