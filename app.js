import { Header } from "./components/Header/Header.js";
import {Footer} from "./components/Footer/Footer.js"

// function toggleMenu() {
//   hamburgerMenuId.classList.toggle('mobileNavDisplay');
//   cancelMenuId.classList.toggle('mobileNavDisplay');
//   mobileNavId.classList.toggle('open');
//   mobileNavBackDrop.classList.toggle('openBackDrop')
// }

// hamburgerMenuId.addEventListener('click', toggleMenu);
// cancelMenuId.addEventListener('click', toggleMenu);

customElements.define("main-header", Header);
customElements.define("main-footer", Footer);


const carouselTrack = document.querySelector(".carousel-track");
const carouselItems = document.querySelectorAll(".carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const numItems = carouselItems.length;


let currentIndex = 0;

function moveCarousel(direction) {
  if (direction === "next" && currentIndex < (numItems-1)) {
    currentIndex++;
  } else if (currentIndex >0 && direction === "prev") {
    currentIndex--;
  }

  // Calculate the offset based on currentIndex and itemWidth
  if (currentIndex <= numItems) {

   const itemWidth = carouselItems[0].clientWidth;
    const offset = currentIndex * (itemWidth+20) * -1;
    carouselTrack.style.transition = "transform 0.5s ease";
    carouselTrack.style.transform = `translateX(${offset}px)`;
  }
}

prevBtn.addEventListener("click", () => moveCarousel("prev"));
nextBtn.addEventListener("click", () => moveCarousel("next"));



