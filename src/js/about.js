const data = [
  {
    name: "BuildBot",
    shortDesc: "Android Build Scripts",
    githubLink: "https://github.com/Unicote/BuildBot",
    liveDemo: "https://github.com/Unicote/BuildBot#installation",
    moreInfo:
      "Android Build Scripts for building custom ROMs",
    moreInfoPhoto: "src/img/projects/BuildBot.jpg",
  },
  {
    name: "Rom_Extractor-Linux",
    shortDesc: "Extractor for linux",
    githubLink: "https://github.com/Unicote/Rom_Extractor-Linux",
    liveDemo: "https://github.com/Unicote/Rom_Extractor-Linux#released-scripts",
    moreInfo:
      "Rom extractor for linux",
    moreInfoPhoto: "src/img/projects/extrator.png",
  },
  {
    name: "Rock Paper and Scissors",
    shortDesc: "Simple game in JS",
    githubLink: "https://github.com/Unicote/rps/",
    liveDemo: "https://Unicote.github.io/rps/",
    moreInfo:
      "Simple Rock Paper and Scissors. Based on http://rock-paper-sizor.surge.sh/",
    moreInfoPhoto: "src/img/projects/rps.png",
  }
];

// rendering containers on site

function renderData(items) {
  jsContainer.innerHTML = ''

  items.forEach((element, index) => {
    const { name, shortDesc, liveDemo, githubLink, moreInfo, moreInfoPhoto } = element;
    jsContainer.innerHTML += `
      <div class="container__item" >
        <img 
          class="more-info-photo more-info-photo-background more-info-trigger" 
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

if(jsContainer) {
  renderData(data)
}

function portfolioItem() {
  // selecting items from site
  const moreInfoTrigger = document.querySelectorAll(".more-info-trigger");
  const moreInfoElements = document.querySelectorAll(".more-info");
  const closeButtons = document.querySelectorAll(".more-info__close");

  // close more info about portfolio item
  function closeInfo() {
    moreInfoElements.forEach(element => {
      element.classList.add("more-info--hidden");
      document.body.style.overflowY = "auto"
    });
  }
  
  closeButtons.forEach(button => {
    button.addEventListener("click", closeInfo);
  });


  // open more ino about portfolio item
  moreInfoTrigger.forEach(icon => {
    icon.addEventListener("click", () => {
      const moreInfo = icon.parentElement.querySelector(".more-info");
      closeInfo();
      moreInfo.classList.remove("more-info--hidden");
      document.body.style.overflowY = "hidden"
    });
  });
}

portfolioItem()

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

// navbar shadow
const navbar = document.querySelector('.navbar')

window.addEventListener('scroll', (e) => {
  if(window.scrollY > window.innerHeight - 180) {
    navbar.classList.add('navbar--shadow')
  } else (
    navbar.classList.remove('navbar--shadow')
  )
})
