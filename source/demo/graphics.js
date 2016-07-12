// ——————————————————————————————————————————————————
// Dependencies
// ——————————————————————————————————————————————————

import { SAMPLE_TEXT } from './config'

// ——————————————————————————————————————————————————
// Methods
// ——————————————————————————————————————————————————

const render = (metrics, context, width, height) => {
  const { top, bottom, fontFamily, fontWeight } = metrics
  const fontSize = computeFontSize(context, fontFamily, fontWeight, metrics, width, height)
  const lineHeight = bottom * fontSize
  context.strokeStyle = '#fff'
  context.fillStyle = '#fff'
  context.textBaseline = 'top'
  context.textAlign = 'left'
  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`
  const textWidth = context.measureText(SAMPLE_TEXT).width
  const centerX = width * 0.5
  const centerY = height * 0.5
  const offsetX = textWidth * -0.5
  const offsetY = lineHeight * -0.5
  context.globalAlpha = 1
  context.fillStyle = '#81d4fa'
  context.translate(centerX + offsetX, centerY + offsetY)
  context.fillText(SAMPLE_TEXT, 0, 0)
  renderLabels(context, metrics, fontSize, lineHeight)
}

const renderLabels = (context, metrics, fontSize, lineHeight) => {
  const { ascent, capHeight, tittle, xHeight, baseline, descent, top, bottom } = metrics
  const data = computeCharData(context)
  context.textAlign = 'center'
  context.font = '10px Roboto Mono'
  context.fillStyle = '#fff'
  renderLabel(context, 'capHeight', capHeight, data.S, fontSize, lineHeight, true)
  renderLabel(context, 'descent', descent, data.p, fontSize, lineHeight, false)
  renderLabel(context, 'ascent', ascent, data.h, fontSize, lineHeight, true)
  renderLabel(context, 'tittle', tittle, data.i, fontSize, lineHeight, true)
  renderLabel(context, 'baseline', baseline, data.n, fontSize, lineHeight, false)
  renderLabel(context, 'xHeight', xHeight, data.x, fontSize, lineHeight, true)
  renderLabel(context, 'top', top, data.n, fontSize, lineHeight, true)
  renderLabel(context, 'bottom', bottom, data.S, fontSize, lineHeight, false)
}

const renderLabel = (context, text, metric, textData, fontSize, lineHeight, above) => {
  const { x, width } = textData
  const y = metric * fontSize
  const cx = x + width / 2
  const ox = width * 0.4
  const oy = above ? Math.min(y, -20) : lineHeight + 20
  context.setLineDash([2, 2])
  context.textBaseline = above ? 'bottom' : 'top'
  context.beginPath()
  context.moveTo(cx - ox, y)
  context.lineTo(cx + ox, y)
  context.moveTo(cx, y)
  context.lineTo(cx, oy)
  context.globalAlpha = 0.55
  context.stroke()
  context.globalAlpha = 0.75
  context.fillText(formatLabel(text), x + width / 2, oy)
}

const formatLabel = (text) =>
  text.replace(/([A-Z])/g, ' $1').toUpperCase()

const computeCharData = (context) => {
  const data = {}
  let x = 0
  SAMPLE_TEXT.split('').forEach(char => {
    const width = context.measureText(char).width
    data[char] = { x, width }
    x += width
  })
  return data
}

const computeFontSize = (context, fontFamily, fontWeight, metrics, width, height) => {
  const targetWidth = width * 0.75
  const targetHeight = height * 0.5
  const testSize = 100
  context.font = `${fontWeight} ${testSize}px ${fontFamily}`
  const textWidth = context.measureText(SAMPLE_TEXT).width
  const textHeight = testSize * metrics.bottom
  return testSize * Math.min(targetWidth / textWidth, targetHeight / textHeight)
}

// ——————————————————————————————————————————————————
// Exports
// ——————————————————————————————————————————————————

export { render }