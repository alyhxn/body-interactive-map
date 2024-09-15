let svgx, dotx, data, xcard, els = []
//Init
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

//fetch svgs
const files = get_imgs();
files.forEach((text, i) => {
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
    el.classList.toggle('on')
    const id = el.parentElement.parentElement.parentElement.id+' '+el.id
    if(id in els){
      els = els.filter(v => v !== id)
      input.disabled = Boolean(els.length)
      input.placeholder = 'Pick a body part to add symptoms'
    }
    else{
      if(!els.length){
        input.disabled = false
        input.placeholder = 'Enter symptoms here'
      }
      els.push(id)
      input.focus()
      if(el.classList.contains('add')){
        input.value =  data[svgx.id][els.id]
        add.innerHTML = 'update'
      }

    }
  }
}
function onadd () {
  if(!input.value)
    return
  add.innerHTML = 'add'
  if(!data){
    cards.innerHTML = ''
    data = []
  }
  const card_id = xcard || 'a'+data.length
  const body_parts = els
  const desc = input.value
  input.value = ''
  input.disabled = true
  input.placeholder = 'Pick a body part to add symptoms'
  els = []

  console.log(xcard)
  if(xcard)
    var el = history.querySelector('#'+xcard)
  else{
    var el = document.createElement('div')
    xcard = null
    el.classList.add('card')
    el.tabIndex = '-1'
    el.id = card_id
    cards.append(el)
  }
  data = data.filter(card => card.id !== card_id)
  data.push({
    id: card_id,
    body_parts,
    desc
  })
  el.innerHTML = `
    <div class='tags'>${body_parts.map(id => `<span>${id}</span>`).join('')}</div>
    <div class='desc'>${desc}</div>
    <button>Edit</button>
  `
  const edit = el.querySelector('button')
  edit.onclick = () => onedit({card_id, body_parts, desc})
  body_parts.forEach(part => {
    const [svg_id, el_id] = part.split(' ')
    svg_box.querySelector('#'+svg_id+' #'+el_id).classList.remove('on')
  })
}
function onedit({card_id, body_parts, desc}) {
  els.forEach(part => {
    const [svg_id, el_id] = part.split(' ')
    svg_box.querySelector('#'+svg_id+' #'+el_id).classList.remove('on')
  })
  xcard = card_id
  body_parts.forEach(part => {
    const [svg_id, el_id] = part.split(' ')
    const target = svg_box.querySelector('#'+svg_id+' #'+el_id)
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    target.dispatchEvent(event);
  })
  input.value = desc
}
function onsubmit () {
  console.log('send email:\n'+JSON.stringify(data, null, 2))
}