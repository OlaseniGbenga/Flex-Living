import { Header } from "../../components/Header/Header.js";
import { Footer } from "../../components/Footer/Footer.js";

import houseTemplate from "./houseTemplate.js";
import fetchData from "./fetchData.js";

customElements.define("main-header", Header);
customElements.define("main-footer", Footer);

const housesPerPage = 2;
let currentPage = 1;

const loading = document.getElementById("loading");
const control = document.getElementById("pagination-controls");

const display = async () => {
  const houses = await fetchData(loading, control);

  const numOfPages = Math.ceil(houses.count / housesPerPage);

  const renderHouses = (page) => {
    const start = (page - 1) * housesPerPage;
    const end = start + housesPerPage;
    const housesToShow = houses?.data?.slice(start, end);
    control.style.display = "flex";
     
    const handleOpen = () => {
      document.getElementById("modal").style.display = "block";
    };
    const housesHtml = housesToShow
      ?.map((house) => houseTemplate(house, handleOpen))
      ?.join("");
    const houseContainer = document.querySelector("#house-container");
    houseContainer.innerHTML = housesHtml;

    const btn = document
      .querySelector("#pageNumbersContainer")
      .querySelectorAll("button");
    btn.forEach((btn, i) => {
      if (i + 1 === currentPage) {
        btn.disabled = true;
      } else {
        btn.disabled = false;
      }
    });

    // Update pagination info

    document.getElementById("prev-page").disabled = page === 1;
    document.getElementById("next-page").disabled =
      page === Math.ceil(houses?.count / housesPerPage);
  };

  const pageNumbersContainer = document.getElementById("pageNumbersContainer");
  for (let i = 1; i <= numOfPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;

    button.addEventListener("click", () => {
      currentPage = i;
      renderHouses(currentPage);
    });
    pageNumbersContainer.appendChild(button);
  }

  // Event listeners for pagination buttons
  document.getElementById("prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderHouses(currentPage);
    }
  });

  document.getElementById("next-page").addEventListener("click", () => {
    if (currentPage < Math.ceil(houses?.count / housesPerPage)) {
      currentPage++;
      renderHouses(currentPage);
    }
  });

  const handleClose = () => {
    document.getElementById("modal").style.display = "none";
  };

  const handleDelete = ()=>{
    alert("close");
  } 
  
  
  const closeModal = document.getElementById("close-modal");
  const no = document.getElementById("no");
  const yes = document.getElementById("yes");

  closeModal.addEventListener("click", handleClose);
  no.addEventListener("click", handleClose);
  yes.addEventListener("click", handleDelete);

  // Initial render
  if (houses.data.length > 0) {
    renderHouses(currentPage);
  } else {
    const section1 = document.getElementById("house-container");
    section1.innerHTML = "<p>None</p>";
  }
};
display();
