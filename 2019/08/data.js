/**
 * Read this blog post:
 * https://medium.com/@heyoka/scratch-made-svg-donut-pie-charts-in-html5-2c587e935d72
 *
 */

// base circumference of 100 (i.e. 100%) for easier math
const C = 100
const R = C / (2 * Math.PI)
// stroke-dashoffset to make sure, the first segment starts at 12 o'clock
const INITIAL_SEGMENT_OFFSET = 125
const SVG_NAMESPACE_URI = 'http://www.w3.org/2000/svg'
const ANIMATION_DURATION = 500

const dataSet = [
  [
    { value: 80, color: '#374a9a' },
    { value: 10, color: '#8aaddc' },
    { value: 7, color: '#b9ceea' },
    { value: 5, color: '#dce6f4' }
  ],
  [
    { value: 20, color: '#374a9a' },
    { value: 20, color: '#8aaddc' },
    { value: 20, color: '#b9ceea' }
  ],
  [
    { value: 5, color: '#b9ceea' },
    { value: 25, color: '#8aaddc' },
    { value: 45, color: '#374a9a' },
    { value: 5, color: '#dce6f4' }
  ]
]
let data = dataSet[2]
const sum = data.reduce((acc, cur) => acc + cur.value, 0)
const percentage = (value, total) => (100 * value) / total
let precedingSegmentsLength = 0
const processedData = data
  // Sort descending to start donut chart with highest value
  .sort((a, b) => b.value - a.value)
  .map(a => ({
    percentage: percentage(a.value, sum),
    ...a
  }))

const createDonutSegments = data => {
  const group = document.createElementNS(SVG_NAMESPACE_URI, 'g')
  for (let i = 0; i < data.length; i++) {
    const dash = data[i].percentage
    const gap = C - dash
    const offset = INITIAL_SEGMENT_OFFSET - precedingSegmentsLength
    precedingSegmentsLength = precedingSegmentsLength + data[i].percentage
    const segment = document.createElementNS(SVG_NAMESPACE_URI, 'circle')
    segment.classList.add('donut-segment')
    segment.setAttribute('cx', 20)
    segment.setAttribute('cy', 20)
    segment.setAttribute('r', R)
    segment.setAttribute('fill', 'transparent')
    segment.setAttribute('stroke', data[i].color)
    // segment.setAttribute('stroke-dasharray', `${dash} ${gap}`)
    segment.setAttribute('stroke-dashoffset', offset)
    segment.setAttribute(
      'style',
      `
        animation-duration: ${ANIMATION_DURATION}ms;
        animation-delay: ${(ANIMATION_DURATION / 4) * i}ms;
        stroke-dasharray: ${dash} ${gap};
      `
    )
    group.append(segment)
  }
  return group
}

document.getElementById('donut').appendChild(createDonutSegments(processedData))
