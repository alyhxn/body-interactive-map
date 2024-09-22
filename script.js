let svgx, dotx, els = []
//Init
const input = document.querySelector('textarea')
const history = document.querySelector('.history')
const form = history.querySelector('form')
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
// input.onkeydown = e => {e.key === 'Enter' && onsubmit(e)}
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
    // const id = el.parentElement.parentElement.parentElement.id+' '+el.id
    // if(id in els){
    //   els = els.filter(v => v !== id)
    //   input.disabled = Boolean(els.length)
    //   input.placeholder = 'Pick a body part to add symptoms'
    // }
    // else{
    //   if(!els.length){
    //     input.disabled = false
    //     input.placeholder = 'Enter symptoms here'
    //   }
    //   els.push(id)
    // }
  }
}
function onsubmit (e) {
  // Fill the report with form data
  e.preventDefault()
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const desc = document.getElementById('desc').value;

  if(!form.checkValidity()){
    form.reportValidity()
    return
  }

  report.querySelector('#report-name').innerText = firstname + ' ' + lastname;
  report.querySelector('#report-email').innerText = email;
  report.querySelector('#report-desc').innerText = desc;
  const reportImages = report.querySelector('#report-images');
  const labels = ['Front', 'Back', 'Left', 'Right']
  Array.from(reportImages.children).forEach((child, i) => {
    child.innerHTML = svg_box.children[i].outerHTML
    const label = document.createElement('div')
    label.classList.add('label')
    label.innerHTML = labels[i]
    child.append(label)
  })
  // Generate and download the image
  html2canvas(report).then(function(canvas) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'medical-report.png';
    link.click();
  });
}
const report = document.createElement('div')
report.id = 'report'
document.body.append(report)
report.innerHTML = `
  <h1>Medical Report</h1>
  <div class="details">
    <div><strong>Name:</strong> <span id="report-name"></span></div>
    <div><strong>Email:</strong> <span id="report-email"></span></div>
  </div>
  <div class="description">
    <strong>Description:</strong> <span id="report-desc"></span>
  </div>
  <div class="images" id="report-images">
    <div></div><div></div><div></div><div></div>
  </div>
`