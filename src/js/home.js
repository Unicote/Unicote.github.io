// navbar shadow
const navbar = document.querySelector('.navbar')

window.addEventListener('scroll', (e) => {
  if(window.scrollY > window.innerHeight - 100) {
    navbar.classList.add('navbar--shadow')
  } else (
    navbar.classList.remove('navbar--shadow')
  )
})
