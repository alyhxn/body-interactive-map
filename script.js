//Init
let elx, svgx, dotx, data
const input = document.querySelector('textarea')
const add = document.querySelector('button')
const history = document.querySelector('.history')
const cards = document.querySelector('.cards')
const submit = document.querySelector('#submit')
const title = document.querySelector('.slider .title')
const svg_box = document.querySelector('.svg_box')
const r8_btn = document.querySelector('img.right')
const l8_btn = document.querySelector('img.left')
const dot_box = document.querySelector('.dots')
const dots = document.querySelectorAll('.dot')
const cards_btn = document.querySelector('button#show_cards')
const close_btn = document.querySelector('button#close')
dotx = dot_box.firstElementChild
const files = ['assets/front-split.svg', 'assets/back-split.svg', 'assets/right-split.svg', 'assets/left-split.svg']

//fetch svgs
files.forEach((file, i) => {
  fetch(file).then(response => response.text())
  .then(text => {
    const temp = document.createElement('div')
    temp.innerHTML = text
    svg_box.append(temp.firstElementChild)
    if(!i)
      svgx = svg_box.firstElementChild
    const paths = svg_box.lastElementChild.querySelectorAll('path')
    const rects = svg_box.lastElementChild.querySelectorAll('rect')
    const polygons = svg_box.lastElementChild.querySelectorAll('polygon')
    paths.forEach(click)
    rects.forEach(click)
    polygons.forEach(click)
  })
})

//listeners
add.onclick = onadd
input.onkeydown = e => {e.key === 'Enter' && onadd()}
cards_btn.onclick = () => history.classList.add('show')
close_btn.onclick = () => history.classList.remove('show')
submit.onclick = onsubmit
dots.forEach(dot_click)
r8_btn.onclick = r8_click
l8_btn.onclick = l8_click


//functions
function dot_click (dot, i) {
  dot.onclick = () => {
    svgx.classList.remove('show')
    dotx.classList.remove('on')
    dotx = dot
    svgx = svg_box.children[i] 
    title.innerHTML = 'Body ' + svgx.id
    svgx.classList.add('show')
    dotx.classList.add('on')
  }
}
function r8_click () {
  svgx.classList.remove('show')
  dotx.classList.remove('on')
  if(svgx.nextElementSibling){
    svgx = svgx.nextElementSibling
    dotx = dotx.nextElementSibling
  }
  else{
    svgx = svg_box.firstElementChild
    dotx = dot_box.firstElementChild
  }
  title.innerHTML = 'Body ' + svgx.id
  svgx.classList.add('show')
  dotx.classList.add('on')
}
function l8_click () {
  svgx.classList.remove('show')
  dotx.classList.remove('on')
  if(svgx.previousElementSibling){
    svgx = svgx.previousElementSibling
    dotx = dotx.previousElementSibling
  }
  else{
    svgx = svg_box.lastElementChild
    dotx = dot_box.lastElementChild
  }
  title.innerHTML = 'Body ' + svgx.id
  svgx.classList.add('show')
  dotx.classList.add('on')
}
function click (el) {
  el.onclick = () => {
    elx && elx.classList.remove('on')
    if(elx !== el){
      el.classList.add('on')
      elx = el
      input.value = ''
      if(el.classList.contains('add')){
        input.value =  data[svgx.id][elx.id]
        add.innerHTML = 'update'
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
  add.innerHTML = 'add'
  if(!data){
    cards.innerHTML = ''
    data = {
      front: {},
      back: {},
      right: {},
      left: {}
    }
  }
  const svg_id = svgx.id
  const el_id = elx.id
  if(data[svg_id][elx.id])
    var el = history.querySelector('#'+svg_id+el_id)
  else{
    var el = document.createElement('div')
    el.classList.add('card')
    elx.classList.add('add')
    el.tabIndex = '-1'
    el.id = svg_id+el_id
    cards.append(el)
  }
  data[svg_id][el_id] = input.value
  el.innerHTML = `
    <h3>${svg_id} ${el_id}</h3>
    <div>${input.value}</div>
    <button>Edit</button>
  `
  elx.classList.remove('on')
  const edit = el.querySelector('button')
  edit.onclick = () => {
    const child = svg_box.querySelector('#'+svg_id)
    const index = Array.prototype.indexOf.call(svg_box.children, child);
    dots[index].click()
    const target = svg_box.querySelector('#'+svg_id+' #'+el_id)
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    target.dispatchEvent(event);
    history.classList.remove('show')
  }
  elx = null
  input.value = ''
  input.disabled = true
  input.placeholder = 'Pick a body part to add symptoms'
  // submit.scrollIntoView()
}
function onsubmit () {
  console.log('send email:\n'+JSON.stringify(data, null, 2))
}