let elx, svgx, dotx
const data = {}
const input = document.querySelector('textarea')
const add = document.querySelector('button')
const history = document.querySelector('.history')
const cards = document.querySelector('.cards')
// const submit = document.querySelector('#submit')
const title = document.querySelector('.slider .title')
const svg_box = document.querySelector('.svg_box')
const r8_btn = document.querySelector('img.right')
const l8_btn = document.querySelector('img.left')
const dots = document.querySelector('.dots')
const cards_btn = document.querySelector('button#show_cards')
const close_btn = document.querySelector('button#close')

dotx = dots.firstElementChild

const files = ['assets/front-split.svg', 'assets/back-split.svg', 'assets/right-split.svg', 'assets/left-split.svg']
files.forEach((file, i) => {
  fetch(file).then(response => response.text())
  .then(text => {
    const temp = document.createElement('div')
    temp.innerHTML = text
    svg_box.append(temp.firstElementChild)
    if(!i){
      svgx = svg_box.firstElementChild
      svgx.classList.add('show')
    }
    
    const paths = svg_box.lastElementChild.querySelectorAll('path')
    const rects = svg_box.lastElementChild.querySelectorAll('rect')
    const polygons = svg_box.lastElementChild.querySelectorAll('polygons')
    paths.forEach(click)
    rects.forEach(click)
  })
})


add.onclick = onadd
input.onkeydown = e => {
  if(e.key === 'Enter')
    onadd()
}

cards_btn.onclick = () => {
  history.classList.add('show')
}
close_btn.onclick = () => {
  history.classList.remove('show')
}
// submit.onclick = onsubmit
r8_btn.onclick = () => {
  svgx.classList.remove('show')
  dotx.classList.remove('on')
  if(svgx.nextElementSibling){
    svgx = svgx.nextElementSibling
    dotx = dotx.nextElementSibling
  }
  else{
    svgx = svg_box.firstElementChild
    dotx = dots.firstElementChild
  }
  svgx.classList.add('show')
  dotx.classList.add('on')
}
l8_btn.onclick = () => {
  svgx.classList.remove('show')
  dotx.classList.remove('on')
  if(svgx.previousElementSibling){
    svgx = svgx.previousElementSibling
    dotx = dotx.previousElementSibling
  }
  else{
    svgx = svg_box.lastElementChild
    dotx = dots.lastElementChild
  }
  svgx.classList.add('show')
  dotx.classList.add('on')
}


function click (el) {
  el.onclick = () => {
    elx && elx.classList.remove('on')
    if(elx !== el){
      el.classList.add('on')
      elx = el
      if(el.classList.contains('add')){
        input.value = data[elx.id]
      }
      input.disabled = false
      input.focus()
      input.placeholder = 'Enter symptoms here'
      input.scrollIntoView()
    }
  }
}

function onadd () {
  if(!input.value)
    return
  if(!Object.keys(data).length)
    cards.innerHTML = ''
  if(data[elx.id])
    var el = history.querySelector('#a'+elx.id)
  else{
    var el = document.createElement('div')
    el.classList.add('card')
    elx.classList.add('add')
    el.id = 'a'+elx.id
    cards.append(el)
  }
  data[elx.id] = input.value
  el.innerHTML = `
    <h2>${elx.id}</h2>
    <div>${input.value}</div>
    <button>Edit</button>
  `
  elx.classList.remove('on')
  const edit = el.querySelector('button')
  edit.onclick = () => {
    const target = svg_box.querySelector('#'+el.firstElementChild.innerHTML)
    console.log(target)
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    target.dispatchEvent(event);
  }
  elx = null
  input.value = ''
  input.disabled = true
  input.placeholder = 'Pick a body part to add symptoms'
  // submit.scrollIntoView()
}

function onsubmit () {
  console.log('send email!')
}