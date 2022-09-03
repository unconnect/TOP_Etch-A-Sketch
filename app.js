const settings = {
  gridsize: 16,
  colors: {
    black: '#000',
  },
}

const elements = {
  appContainer: document.querySelector('#app'),
  etchContainer: document.createElement('div'),
  buttonsContainer: document.createElement('div'),
  buttons: {},
}

const state = {
  mouse: '',
}

document.addEventListener(
  'mouseup',
  () => {
    state.mouse = 'UP'
  },
  false
)

document.addEventListener(
  'mousedown',
  () => {
    state.mouse = 'DOWN'
  },
  false
)

const clearTheBoard = () => {
  const pixels = document.querySelectorAll('.pixelgrid > div')
  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = ''
  })
}

const resetBoardSize = () => {
  clearTheBoard()
  const newBoardSize = parseInt(prompt('Enter neu Boardsize (max. 100)'))
  elements.etchContainer.childNodes.forEach((child) => {
    child.remove()
  })
  elements.appContainer.appendChild(createPixelGrid(elements.etchContainer, newBoardSize))
}

const createCustomElement = (
  tagname,
  type = '',
  text = '',
  id = '',
  cssClasses = [],
  onclickFn
) => {
  const element = document.createElement(tagname)
  element.type = type
  element.id = id
  element.classList.add(...cssClasses)
  element.textContent = text
  element.onclick = onclickFn
  return element
}

const changeBackgroundColor = (e, selectedColor = settings.colors.black) => {
  if (state.mouse === 'DOWN') e.target.style.backgroundColor = selectedColor
}

const createPixelGrid = (etchContainerElement, gridSize = 16) => {
  gridSize = (gridSize > 100) ? 100 : gridSize
  const cssGridSize = `repeat(${gridSize}, 1fr)`
  etchContainerElement.style.gridTemplateColumns = cssGridSize
  etchContainerElement.style.gridTemplateRows = cssGridSize
  for (let i = 0; i < gridSize * gridSize; i++) {
    const pixel = document.createElement('div')
    pixel.addEventListener('mouseover', changeBackgroundColor, false)
    etchContainerElement.appendChild(pixel)
  }

  return etchContainerElement
}

const init = (gridSize = settings.gridsize) => {

  elements.buttons.clearButton = createCustomElement(
    'button',
    'button',
    'Clear',
    undefined,
    ['nes-btn'],
    clearTheBoard
  )
  elements.buttons.resetButton = createCustomElement(
    'button',
    'button',
    'Reset',
    undefined,
    ['nes-btn'],
    resetBoardSize
  )

  elements.etchContainer.classList.add('pixelgrid')
  elements.buttonsContainer.classList.add('buttons')
  
  Object.entries(elements.buttons).forEach((button) => {
    elements.buttonsContainer.appendChild(button[1]) // HTMLElement is on index 1 in array
  })

  elements.appContainer.appendChild(createPixelGrid(elements.etchContainer, gridSize))
  elements.appContainer.before(elements.buttonsContainer)
}

init()

