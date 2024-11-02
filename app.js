import { Header } from "./components/Header/Header.js";
import { Footer } from "./components/Footer/Footer.js";
import { CustomHouseElement } from "./components/house/house.js";
import fetchData from "./components/fetchData.js";
import pagination from "./components/pagination.js";

// Debounce function
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Search input
const houseContainer = document.getElementById("house-container");
const control = document.getElementById("pagination-controls");
const searchLoading = document.getElementById("search-loading");

const handleSearch = async (e) => {
  e.preventDefault();
  const city = e.target.value.toLowerCase().trim();
  const customHouse = document.querySelector("custom-house");

  if (city !== "") {
    customHouse.style.display = "none"; 
    const data = await fetchData(searchLoading, city);
    houseContainer.style.display = "block";
    pagination(2, control, data);
  } else {
    control.style.display = "none";
    houseContainer.style.display = "none";
    customHouse.style.display = "block"; // Show custom-house
  }
};

document.querySelector("#search").addEventListener("input", debounce(handleSearch, 300));

// Testimonial carousel
const carouselTrack = document.querySelector(".carousel-track");
const carouselItems = document.querySelectorAll(".carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const numItems = carouselItems.length;
let currentIndex = 0;

function moveCarousel(direction) {
  if (direction === "next" && currentIndex < numItems - 1) {
    currentIndex++;
  } else if (currentIndex > 0 && direction === "prev") {
    currentIndex--;
  }

  // Calculate the offset based on currentIndex and itemWidth
  if (currentIndex < numItems) {
    const itemWidth = carouselItems[0].clientWidth;
    const offset = currentIndex * (itemWidth + 20) * -1;
    carouselTrack.style.transition = "transform 0.5s ease";
    carouselTrack.style.transform = `translateX(${offset}px)`;
  }
}

prevBtn.addEventListener("click", () => moveCarousel("prev"));
nextBtn.addEventListener("click", () => moveCarousel("next"));

// Define the custom elements
customElements.define("custom-house", CustomHouseElement);
customElements.define("main-header", Header);
customElements.define("main-footer", Footer);
