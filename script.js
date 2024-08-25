let elx
const data = []
const paths = document.querySelectorAll('path')
const rects = document.querySelectorAll('rect')
const input = document.querySelector('textarea')
const add = document.querySelector('button')
const history = document.querySelector('.history')
const cards = document.querySelector('.cards')
const submit = document.querySelector('#submit')


paths.forEach(click)
rects.forEach(click)
add.onclick = onadd
input.onkeydown = e => {
  if(e.key === 'Enter')
    onadd()
}
submit.onclick = onsubmit

function click (el) {
  el.onclick = () => {
    elx && elx.classList.remove('on')
    if(elx !== el){
      el.classList.add('on')
      elx = el
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
  if(!data.length)
    cards.innerHTML = ''
  data.push(input.value)
  const el = document.createElement('div')
  el.classList.add('card')
  el.innerHTML = `
    <h2>${elx.id}</h2>
    <div>${input.value}</div>
  `
  cards.append(el)
  elx.onclick = null
  elx = null
  input.value = ''
  input.disabled = true
  input.placeholder = 'Pick a body part to add symptoms'
  submit.scrollIntoView()
}

function onsubmit () {
  console.log('send email!')
}