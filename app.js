const settings = {
  gridsize: 16,
  colors: {
    black: '#000'
  }
}

const elements = {
  appContainer: document.querySelector('#app'),
  etchContainer: document.createElement('div'),
  buttonsContainer: document.createElement('div'),
  buttons: {},
}

const state = {
  mouse: ''
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

const createButton = (text = '', cssClasses = [], onclickFn) => {
  const button = document.createElement('button')
  button.type = 'button'
  button.classList.add(...cssClasses)
  button.textContent = text
  button.onclick = onclickFn
  return button
}

const changeBackgroundColor = (e, selectedColor = settings.colors.black) => {
  if (state.mouse === 'DOWN') e.target.style.backgroundColor = selectedColor
}

const createPixelGrid = (etchContainerElement, gridSize = 16) => {
  const cssGridSize = `repeat(${gridSize}, 1fr)`
  etchContainerElement.style.gridTemplateColumns = cssGridSize
  etchContainerElement.style.gridTemplateRows = cssGridSize
  for (let i = 0; i < (gridSize * gridSize); i++) {
    const pixel = document.createElement('div')
    pixel.addEventListener('mouseover', changeBackgroundColor, false)
    etchContainerElement.appendChild(pixel)
  }

  return etchContainerElement
}

const createAndAppendEtchASketch = (gridSize = settings.gridsize) => {
  const pixelGrid = createPixelGrid(elements.etchContainer, gridSize) // should be refactored into elements
  
  elements.buttons.clearButton = createButton('Clear', ['nes-btn'], clearTheBoard)

  elements.etchContainer.classList.add('pixelgrid')
  
  elements.buttonsContainer.classList.add('buttons')
  elements.buttonsContainer.appendChild(elements.buttons.clearButton)
  
  elements.appContainer.appendChild(pixelGrid)
  elements.appContainer.appendChild(elements.buttonsContainer)
}

createAndAppendEtchASketch()
