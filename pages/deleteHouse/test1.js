import { Header } from "../../components/Header/Header.js";
import { Footer } from "../../components/Footer/Footer.js";
import data from "./data.js";

customElements.define("main-header", Header);
customElements.define("main-footer", Footer);

const housesPerPage = 2; // Number of houses to display per page
let currentPage = 1;

const houseTemplate = (house) => {
    return `
    <div class="house">
        <div class="house-img">
          <img src="/house.jpg" alt="${house?.title || 'House Image'}" />
        </div>
        <div class="house-details">
          <p class="house-name">${house?.title || 'Unknown Title'}</p>
          <ul>
            <li>
              <img src="/media/svg/bed.svg" alt="bedroom icon" />
              <p>${house?.apartmentUtil?.room || 'N/A'}</p>
            </li>
            <li>
              <img src="/media/svg/bathroom.svg" alt="bathroom icon" />
              <p>${house?.apartmentUtil?.bathRoom || 'N/A'}</p>
            </li>
            <li>
              <img style="width: 1.25rem" src="/media/svg/wifi.svg" alt="wifi icon" />
              <p>${house?.apartmentUtil?.wifi ? house.apartmentUtil.wifi + ' wifi' : 'No wifi'}</p>
            </li>
          </ul>
          <p class="available-date">${house?.available ? 'Available' : 'Not available'}</p>
          <p class="price">from <span>&#8364;</span>${house?.price || 0} /month</p>
        </div>
    </div>
    `;
};

const renderHouses = (page) => {
    const start = (page - 1) * housesPerPage;
    const end = start + housesPerPage;
    const housesToShow = data.slice(start, end);

    const housesHtml = housesToShow.map(houseTemplate).join("");
    const houseContainer = document.querySelector("#house-container");
    houseContainer.innerHTML = housesHtml;

    // Update pagination info
    document.getElementById("page-info").textContent = `Page ${page} of ${Math.ceil(data.length / housesPerPage)}`;
    document.getElementById("prev-page").disabled = page === 1;
    document.getElementById("next-page").disabled = page === Math.ceil(data.length / housesPerPage);
};

// Event listeners for pagination buttons
document.getElementById("prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderHouses(currentPage);
    }
});

document.getElementById("next-page").addEventListener("click", () => {
    if (currentPage < Math.ceil(data.length / housesPerPage)) {
        currentPage++;
        renderHouses(currentPage);
    }
});

// Initial render
renderHouses(currentPage);
