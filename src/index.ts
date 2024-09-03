import { Record } from 'interfaces/leaderboard'
import { createRecord, getTop3Records } from './database/collections/records'
import { GameManager } from './GameManager'
import './style.css'

const menuScreen = document.getElementById('screen-main-menu')
const startButton = document.getElementById('start-game-button')
const gameScreen = document.getElementById('screen-game')
const elapsedTime = document.getElementById('game-elapsed-time')
const leaderboard = document.getElementById('leaderboard')
const canvas = document.getElementById('game-canvas') as HTMLCanvasElement

canvas.width = innerWidth
canvas.height = innerHeight

async function updateLeaderboard() {
  const top3Records = await getTop3Records()

  const generateRecord = (record: Record, index: number) =>
    `<li>${index + 1}. ${record.username} - ${(record.time / 1000).toFixed(
      2
    )}s</li>`

  leaderboard.innerHTML = top3Records.map(generateRecord).join('')
}

function navigateToMenu() {
  menuScreen.style.display = 'flex'
  gameScreen.style.display = 'none'
}

function handleStartGame() {
  menuScreen.style.display = 'none'
  gameScreen.style.display = 'block'

  const ctx = canvas.getContext('2d')
  const gameManager = new GameManager(ctx)

  gameManager.on('gameWon', (time) => {
    const username = window.prompt(
      `You won! Enter your name to save your score:`
    )

    if (username) {
      createRecord(username, time)
    }

    updateLeaderboard()
    navigateToMenu()
  })

  gameManager.on('gameLost', () => {
    alert('You lost!')
    navigateToMenu()
  })

  gameManager.on('gameTick', (time) => {
    elapsedTime.innerText = `${(time / 1000).toFixed(2)}s`
  })

  gameManager.startGame()
}

startButton.addEventListener('click', handleStartGame)
updateLeaderboard()
