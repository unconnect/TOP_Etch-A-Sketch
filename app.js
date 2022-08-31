const appContainerElement = document.querySelector('#app')
const etchContainerElement = document.createElement('div')
const GRIDSIZE = 64
const BLACK = '#000'
let mouse

document.addEventListener(
  'mouseup',
  () => {
    mouse = 'UP'
  },
  false
)

document.addEventListener(
  'mousedown',
  () => {
    mouse = 'DOWN'
  },
  false
)

const changeBackgroundColor = (e, selectedColor = BLACK) => {
  if (mouse === 'DOWN') e.target.style.backgroundColor = selectedColor
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

const createAndAppendEtchASketch = (gridSize = GRIDSIZE) => {
  const pixelGrid = createPixelGrid(etchContainerElement, gridSize)

  etchContainerElement.classList.add('pixelgrid')
  appContainerElement.appendChild(pixelGrid)
}

createAndAppendEtchASketch()
