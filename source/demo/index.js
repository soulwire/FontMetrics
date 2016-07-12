// ——————————————————————————————————————————————————
// Dependencies
// ——————————————————————————————————————————————————

import { EXAMPLE_FONT, DISPLAY_FONT, FONTS } from './config'
import { Promise } from 'es6-promise'
import { render } from './graphics'

// ——————————————————————————————————————————————————
// DOM
// ——————————————————————————————————————————————————

const container = document.getElementById('container')
const shuffle = document.getElementById('shuffle')
const select = document.getElementById('select')
const canvas = document.getElementById('canvas')

// ——————————————————————————————————————————————————
// Variables
// ——————————————————————————————————————————————————

let fontFamily
let metrics

// ——————————————————————————————————————————————————
// Methods
// ——————————————————————————————————————————————————

const initialize = () => {
  loadFont(DISPLAY_FONT).then(() => {
    loadFont(EXAMPLE_FONT).then(() => {
      updateFontMetrics()
      bindWindowEvents()
      initializeUI(FONTS)
    })
  })
}

const bindWindowEvents = () => {
  window.addEventListener('resize', onWindowResized)
}

const bindUIEvents = () => {
  shuffle.addEventListener('click', onShuffleClicked)
  select.addEventListener('change', onFontSelected)
}

const updateFontMetrics = () => {
  const origin = 'top'
  metrics = FontMetrics({ fontFamily, origin })
  renderFontMetrics()
}

const renderFontMetrics = () => {
  const context = canvas.getContext('2d')
  const height = canvas.clientHeight
  const width = canvas.clientWidth
  const scale = window.devicePixelRatio || 1
  canvas.height = height * scale
  canvas.width = width * scale
  context.scale(scale, scale)
  render(metrics, context, width, height)
}

const initializeUI = (fonts) => {
  fonts.forEach((font, index) => {
    const option = document.createElement('option')
    option.value = font
    option.text = font
    select.add(option, index)
  })
  shuffle.disabled = false
  select.disabled = false
  select.value = EXAMPLE_FONT
  bindUIEvents()
}

const loadFont = (name) => new Promise((resolve, reject) => {
  WebFont.load({
    google: { families: [ fontFamily = name ] },
    active: resolve,
    inactive: reject
  })
})

// ——————————————————————————————————————————————————
// Handlers
// ——————————————————————————————————————————————————

const onFontSelected = () => {
  loadFont(select.value)
    .then(updateFontMetrics)
}

const onShuffleClicked = () => {
  const index = Math.floor(Math.random() * select.options.length)
  const option = select.options[index]
  select.value = option.value
  onFontSelected()
}

const onWindowResized = () => {
  renderFontMetrics()
}

// ——————————————————————————————————————————————————
// Bootstrap
// ——————————————————————————————————————————————————

initialize()
