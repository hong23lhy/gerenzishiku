const navToggle = document.querySelector('.nav-toggle')
const navMenu = document.getElementById('nav-menu')
const themeToggle = document.getElementById('themeToggle')
const toTop = document.querySelector('.to-top')
const form = document.querySelector('.contact-form')

function toggleMenu(){
  const expanded = navToggle.getAttribute('aria-expanded') === 'true'
  navToggle.setAttribute('aria-expanded', String(!expanded))
  navMenu.classList.toggle('open', !expanded)
}

function toggleTheme(){
  const dark = document.documentElement.dataset.theme !== 'light'
  if(dark){
    document.documentElement.dataset.theme = 'light'
    themeToggle.setAttribute('aria-pressed', 'true')
    document.documentElement.style.setProperty('--bg', '#f6f0e6')
    document.documentElement.style.setProperty('--bg-soft', '#f1e6d6')
    document.documentElement.style.setProperty('--text', '#3a2e2a')
    document.documentElement.style.setProperty('--muted', '#6b5c54')
    document.documentElement.style.setProperty('--card', 'rgba(58,46,42,0.06)')
    document.documentElement.style.setProperty('--border', 'rgba(58,46,42,0.25)')
  }else{
    document.documentElement.dataset.theme = 'dark'
    themeToggle.setAttribute('aria-pressed', 'false')
    document.documentElement.style.removeProperty('--bg')
    document.documentElement.style.removeProperty('--bg-soft')
    document.documentElement.style.removeProperty('--text')
    document.documentElement.style.removeProperty('--muted')
    document.documentElement.style.removeProperty('--card')
    document.documentElement.style.removeProperty('--border')
  }
}

function validateInput(el){
  const error = el.parentElement.querySelector('.error')
  let msg = ''
  if(el.hasAttribute('required') && !el.value.trim()){
    msg = '请填写此字段'
  }else if(el.type === 'email'){
    const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value.trim())
    if(!ok) msg = '邮箱格式不正确'
  }
  error.textContent = msg
  el.classList.toggle('invalid', !!msg)
  return !msg
}

function onScroll(){
  const y = window.scrollY || document.documentElement.scrollTop
  toTop.classList.toggle('show', y > 300)
}

function scrollToTop(){
  window.scrollTo({ top: 0, behavior: 'smooth' })
}


navToggle.addEventListener('click', toggleMenu)
themeToggle.addEventListener('click', toggleTheme)
window.addEventListener('scroll', onScroll)
toTop.addEventListener('click', scrollToTop)

form.addEventListener('blur', e => {
  if(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement){
    validateInput(e.target)
  }
}, true)

form.addEventListener('submit', e => {
  e.preventDefault()
  const inputs = form.querySelectorAll('input, textarea')
  let ok = true
  inputs.forEach(el => {
    if(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement){
      ok = validateInput(el) && ok
    }
  })
  if(ok){
    const btn = form.querySelector('.btn-primary')
    btn.disabled = true
    btn.textContent = '已发送'
    setTimeout(() => {
      btn.disabled = false
      btn.textContent = '发送'
      form.reset()
      form.querySelectorAll('.error').forEach(e => e.textContent = '')
    }, 1500)
  }
})
