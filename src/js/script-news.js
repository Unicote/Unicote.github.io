const jsContainer = document.querySelector("#jsContainer");

const menuBtn = document.querySelector("#menuBtn");
const siteMenu = document.querySelector("#siteMenu");

// open / close menu
function toggleMenu() {
  menuBtn.classList.toggle("change");
  siteMenu.classList.toggle("shown");
  if(siteMenu.classList.contains("shown")) {
    document.body.style.overflowY = "hidden"
  } else {
    document.body.style.overflowY = "auto"
  }
}
  
menuBtn.addEventListener("click", toggleMenu);

// add loader to the site
window.addEventListener(
  'load',                                                         // when site is fully loaded
  () => {
    document.body.style.overflowY = "auto"
    const preloader = document.querySelector('.preloader')
    preloader.classList.add('preloader-finish')                 // add class to the preloader
  }
)

// Shadow in navbar
const navbar = document.querySelector('.navbar')

window.addEventListener('scroll', (e) => {
  if(window.scrollY > window.innerHeight - 805) {
    navbar.classList.add('navbar--shadow')
  } else (
    navbar.classList.remove('navbar--shadow')
  )
})

