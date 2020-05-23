const jsContainer = document.querySelector("#jsContainer");

const data = [
];

// rendering containers on site

function renderData(items) {
  jsContainer.innerHTML = ''

  items.forEach((element, index) => {
    const { name, shortDesc, liveDemo, githubLink, moreInfo, moreInfoPhoto } = element;
    jsContainer.innerHTML += `
      <div class="container__item" >
      <div class="more-info-photo-background more-info-trigger" ></div>
        <img 
          class="more-info-photo " 
          src=${moreInfoPhoto}
          data-aos="fade-up"
          data-aos-delay="${index * 150}"
          data-aos-offset="-100"
        />
        <div class="more-info-photo-title">${name}</div>
        <div class="more-info-photo-title2">${shortDesc}</div>
        
        <div class="more-info more-info--hidden">
          <div class="more-info__close">X</div>
          <h1 class="more-info__header">${name}</h1>
          
          <p class="more-info__text">${moreInfo}</p>
          <a class="more-info__demo" href="${liveDemo}" target="_blank" >
            <span class="more-info-title">Live Demo</span>
          </a>
          <a class="more-info-github" target="_blank" href="${githubLink}">
            <i class="fa fa-github"></i>
          </a>
          <img class="more-info-photo-desc" src=${moreInfoPhoto} />
        </div>
      </div>
      
    `;
  });
}

renderData(data)

function toggleMenu() {
  menuBtn.classList.toggle("change");
  siteMenu.classList.toggle("shown");
}

const menuBtn = document.querySelector("#menuBtn");
const siteMenu = document.querySelector("#siteMenu");

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

// window height variable for styles
function setHeightVariable() {
  let vh = window.innerHeight * 0.01 - 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
setHeightVariable();

window.addEventListener("resize", setHeightVariable);

// add loader to the site
window.addEventListener(
  'load',                                                         // when site is fully loaded
  () => {
    document.body.style.overflowY = "auto"
    const preloader = document.querySelector('.preloader')
    preloader.classList.add('preloader-finish')                 // add class to the preloader
  }
)

// finding skills from data 

function findSkills(list) {
  return list.reduce((result, element) => {
    result.push(...element.skills)
    return result.filter((a, b) => result.indexOf(a) === b)
  }, [])
}

// finding data item using skill

function findDataWithSkill(data, skill) {
  return data
    .filter(item => item.skills.includes(skill))
}

// render skillsButtons

const skillsContainer = document.getElementById('skills')
const skills = findSkills(data)

skills.forEach(skill => {
  skillsContainer.innerHTML += `
    <button data-skill=${skill} class='skill__button' >${skill.toUpperCase()}</button>
  `
})

const skillButtons = document.querySelectorAll('.skill__button')

// remove activeClass from button

function removeActive() {
  skillButtons.forEach(button => {
    button.classList.remove('skill__button--active')
  })
}

// listener for skillButtons

skillButtons.forEach(button => {
  button.addEventListener('click', () => {
    removeActive()
    const newData = findDataWithSkill(data, button.dataset.skill)
    button.classList.add('skill__button--active')
    renderData(newData)
    portfolioItem()
  })
})

const navbar = document.querySelector('.navbar')

window.addEventListener('scroll', (e) => {
  if(window.scrollY > window.innerHeight - 100) {
    navbar.classList.add('navbar--shadow')
  } else (
    navbar.classList.remove('navbar--shadow')
  )
})
