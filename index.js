// some helper
var ready = (callback) => {
  if (document.readyState != 'loading') callback()
  else document.addEventListener('DOMContentLoaded', callback)
}

var delay = (ms) => new Promise((res) => setTimeout(res, ms))

var removeClassByPrefix = (node, prefix) => {
  var regx = new RegExp('\\b' + prefix + '[^ ]*[ ]?\\b', 'g')
  node.className = node.className.replace(regx, '')
  return node
}

var reassignColor = (node, list, removeByPrefix, currentIndex = -1) => {
  if (removeByPrefix) removeClassByPrefix(node, removeByPrefix)
  var selected = list[Math.floor(Math.random() * list.length)]
  if (currentIndex >= 0) {
    currentIndex = Math.min(list.length - 1, currentIndex + 1)
    selected = list[currentIndex]
  }
  node.className += ` ${selected}`
  return selected
}

// play input
var chars = Array(7)
  .fill()
  .map((x, i) => i + 65) // A-G
const title = [[73], [32, 76, 79, 86, 69], [32, 89, 79, 85]]
const subtitle = [
  [87, 73, 76, 76],
  [32, 89, 79, 85],
  [32, 77, 65, 82],
  [82, 89],
  [32, 77, 69],
]

const colors = [
  'bg-indigo-500',
  'bg-yellow-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-red-500',
  'bg-purple-500',
]
var selectedColors = colors[0]
const finalColors = ['bg-pink-600']

async function run() {
  var elDisplay = document.getElementById('display')
  var elTitle = document.getElementById('title')
  var elSubtitle = document.getElementById('subtitle')

  elTitle.innerHTML = ''
  elSubtitle.innerHTML = ''

  for (const value of chars) {
    await delay(800)
    elTitle.innerHTML = String.fromCharCode(value)
    selectedColors = reassignColor(elDisplay, colors, 'bg-', selectedColors)
  }

  await delay(2100)
  elTitle.innerHTML = String.fromCharCode(65 + 7)
  selectedColors = reassignColor(elDisplay, colors, 'bg-', selectedColors)
  await delay(800)

  for (let index = 0; index < title.length; index++) {
    var combine = title[index].map((c) => String.fromCharCode(c)).join('')
    elTitle.innerHTML = index == 0 ? combine : elTitle.innerHTML + combine

    selectedColors = reassignColor(elDisplay, colors, 'bg-', selectedColors)
    if (index == title.length - 1) reassignColor(elDisplay, finalColors, 'bg-')
    await delay(800)
  }

  for (let index = 0; index < subtitle.length; index++) {
    var combine = subtitle[index].map((c) => String.fromCharCode(c)).join('')
    elSubtitle.innerHTML = index == 0 ? combine : elSubtitle.innerHTML + combine
    await delay(410)
  }

  await delay(10 * 1000)
  run()
}

ready(run)
