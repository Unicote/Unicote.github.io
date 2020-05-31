// Shadow in navbar
const navbar = document.querySelector('.navbar')

window.addEventListener('scroll', (e) => {
  if(window.scrollY > window.innerHeight - 805) {
    navbar.classList.add('navbar--shadow')
  } else (
    navbar.classList.remove('navbar--shadow')
  )
})

