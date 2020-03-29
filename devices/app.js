// Overlay

const overlay = document.querySelector(".d__overlay");
const links = document.querySelectorAll(".download__btn");
const modal = document.querySelector(".d__modal");
const closeBtn = document.querySelector(".d__modal .close");

links.forEach(link =>
  link.addEventListener("click", function(e) {
    overlay.classList.add("shown");
  })
);

closeBtn.addEventListener("click", function() {
  overlay.classList.remove("shown");
});

window.onclick = function(event) {
  if (event.target == overlay) {
    overlay.classList.remove("shown");
  }
};
