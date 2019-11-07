const boxes = document.querySelectorAll('.grid-item')
const closeBtn = document.querySelector('#close-btn')

for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener('click', function() {
    const feature = this.dataset.feature
    const featureContent = document.querySelector(`#${feature}`)
    featureContent.classList.add('show')
    closeBtn.classList.add('show', `show-${feature}-feature`)
    console.log(closeBtn.classList)
  })
}

closeBtn.addEventListener('click', function() {
  const feature = document.querySelector('.feature-item.show')
  feature.classList.remove('show')
  this.classList.remove('show', `show-${feature.id}-feature`)
  console.log(this.classList)
})
