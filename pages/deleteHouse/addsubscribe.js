import { Header } from "../../components/Header/Header.js";
import { Footer } from "../../components/Footer/Footer.js";

import houseTemplate from "./houseTemplate.js";
import fetchData from "./fetchData.js";
import deleteHouse from "./delete.js";
import { getFirestore, collection, onSnapshot } from "firebase/firestore"; // Import Firestore functions

customElements.define("main-header", Header);
customElements.define("main-footer", Footer);

const housesPerPage = 2;
let currentPage = 1;

const textLoading = document.getElementById("textLoading");
const loading = document.getElementById("loading");
const control = document.getElementById("pagination-controls");
let selectedHouseId;
const db = getFirestore(); // Initialize Firestore

const displayHouses = (houses) => {
  const numOfPages = Math.ceil(houses.length / housesPerPage);

  const renderHouses = (page) => {
    const start = (page - 1) * housesPerPage;
    const end = start + housesPerPage;
    const housesToShow = houses.slice(start, end);
    control.style.display = "flex";

    const housesHtml = housesToShow.map(houseTemplate).join("");
    const houseContainer = document.querySelector("#house-container");
    houseContainer.innerHTML = housesHtml;

    // Attach click event listener to each house element
    document.querySelectorAll(".house").forEach((element) => {
      element.addEventListener("click", (e) => {
        selectedHouseId = e.currentTarget.id; // Store the ID of the clicked house
        document.getElementById("modal").style.display = "block";
      });
    });

    const btn = document
      .querySelector("#pageNumbersContainer")
      .querySelectorAll("button");
    btn.forEach((btn, i) => {
      btn.disabled = i + 1 === currentPage;
    });

    // Update pagination info
    document.getElementById("prev-page").disabled = page === 1;
    document.getElementById("next-page").disabled =
      page === Math.ceil(houses.length / housesPerPage);
  };

  const pageNumbersContainer = document.getElementById("pageNumbersContainer");
  pageNumbersContainer.innerHTML = ""; // Clear previous buttons
  for (let i = 1; i <= numOfPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;

    button.addEventListener("click", () => {
      currentPage = i;
      renderHouses(currentPage);
    });
    pageNumbersContainer.appendChild(button);
  }

  // Initial render
  if (houses.length > 0) {
    renderHouses(currentPage);
  } else {
    document.getElementById("house-container").innerHTML = "<p>None</p>";
  }
};

const subscribeToHouses = () => {
  const housesRef = collection(db, "houses"); // Replace with your collection name

  // Set up a listener for real-time updates
  onSnapshot(housesRef, (snapshot) => {
    const houses = [];
    snapshot.forEach((doc) => {
      houses.push({ id: doc.id, ...doc.data() }); // Collect data
    });

    displayHouses(houses); // Call to render houses
  });
};

const handleClose = () => {
  document.getElementById("modal").style.display = "none";
};

const closeModal = document.getElementById("close-modal");
const no = document.getElementById("no");
const yes = document.getElementById("yes");

const handleDelete = async () => {
  await deleteHouse(selectedHouseId, yes, no, closeModal, textLoading);
  handleClose();
};

// Set up event listeners for modal buttons
closeModal.addEventListener("click", handleClose);
no.addEventListener("click", handleClose);
yes.addEventListener("click", handleDelete);

// Start listening for changes in Firestore
subscribeToHouses();
