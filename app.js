const settings = {
  gridsize: 16,
  color: '#000',
}

const elements = {
  appContainer: document.querySelector('#app'),
  etchContainer: document.createElement('div'),
  buttonsContainer: document.createElement('div'),
  buttons: {},
}

const state = {
  mouse: '',
  color: 'DEFAULT',
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
  settings.gridsize = parseInt(prompt('Enter new boardsize (max. 100)')) || settings.gridsize
  elements.etchContainer.childNodes.forEach((child) => {
    child.remove()
  })
  elements.appContainer.appendChild(createPixelGrid(elements.etchContainer, settings.gridsize))
}

const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

// The best solution is problably this one: https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
// but I try it myself and simpler
const getDarkenRGBColor = (shadingValue, currentBackgroundColorStyle) => {
  const colorRegEx = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/
  // value at index 0 is the complete string, then the capture groups are following
  const [_, r, g, b] = currentBackgroundColorStyle.match(colorRegEx) || ['', 255, 255, 255]
  return `rgb(${parseInt(r) + shadingValue}, ${parseInt(g) + shadingValue}, ${
    parseInt(b) + shadingValue
  })`
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

const changePixelBackgroundColor = (e) => {
  if (state.mouse === 'DOWN') {
    if (state.color === 'DEFAULT') e.target.style.backgroundColor = settings.color
    if (state.color === 'RANDOM') e.target.style.backgroundColor = getRandomColor()
    if (state.color === 'FADE') e.target.style.backgroundColor = getDarkenRGBColor(-25.5, e.target.style.backgroundColor)
  }
}

const createPixelGrid = (etchContainerElement, gridSize = settings.gridsize) => {
  gridSize = gridSize > 100 ? 100 : gridSize
  const cssGridSize = `repeat(${gridSize}, 1fr)`
  etchContainerElement.style.gridTemplateColumns = cssGridSize
  etchContainerElement.style.gridTemplateRows = cssGridSize
  for (let i = 0; i < gridSize * gridSize; i++) {
    const pixel = document.createElement('div')
    pixel.addEventListener(
      'mouseover',
      (e) => {
        changePixelBackgroundColor(e)
      },
      false
    )
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
    'New Gridsize',
    undefined,
    ['nes-btn'],
    resetBoardSize
  )
  elements.buttons.rainbowColorButton = createCustomElement(
    'button',
    'button',
    'Color Rainbow',
    undefined,
    ['nes-btn'],
    () => {
      state.color = 'RANDOM'
    }
  )
  elements.buttons.resetColor = createCustomElement(
    'button',
    'button',
    'Color Black',
    undefined,
    ['nes-btn'],
    () => {
      state.color = 'DEFAULT'
    }
  )
  elements.buttons.fadeColorDark = createCustomElement(
    'button',
    'button',
    'Color Fade Darker',
    undefined,
    ['nes-btn'],
    () => {
      state.color = 'FADE'
    }
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
