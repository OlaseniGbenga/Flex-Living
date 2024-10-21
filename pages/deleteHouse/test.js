import { Header } from "../../components/Header/Header.js";
import { Footer } from "../../components/Footer/Footer.js";
import { app } from "../../firebase/firebase.js";
import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    startAfter,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

customElements.define("main-header", Header);
customElements.define("main-footer", Footer);

const housesPerPage = 2; // Number of houses to display per page
let currentPage = 1;
let totalPages = 0;
let lastVisible = null; // Store the last visible document for pagination

// Function to render a house template
const houseTemplate = (house) => {
    return `
    <article class="house">
        <div class="house-img">
          <img src="${house.picture || '/default-house.jpg'}" alt="${house.title || 'House Image'}" onerror="this.onerror=null; this.src='/default-house.jpg';" />
        </div>
        <div class="house-details">
          <p class="house-name">${house.title || 'Unknown Title'}</p>
          <ul>
            <li>
              <img src="/media/svg/bed.svg" alt="Number of bedrooms" />
              <p>${house.apartmentUtil?.room || 'N/A'}</p>
            </li>
            <li>
              <img src="/media/svg/bathroom.svg" alt="Number of bathrooms" />
              <p>${house.apartmentUtil?.bathRoom || 'N/A'}</p>
            </li>
            <li>
              <img style="width: 1.25rem" src="/media/svg/wifi.svg" alt="Wifi availability" />
              <p>${house.apartmentUtil?.wifi ? house.apartmentUtil.wifi + ' wifi' : 'No wifi'}</p>
            </li>
          </ul>
          <p class="available-date">${house.available ? 'Available' : 'Not available'}</p>
          <p class="price">from <span>&#8364;</span>${house.price || 0} /month</p>
        </div>
    </article>
    `;
};

// Function to render houses for the current page
const renderHouses = async (page) => {
    const db = getFirestore(app);

    // Create query with orderBy and limit, now ordering by title
    let housesQuery = query(
        collection(db, "house"),
        orderBy("title"), 
        limit(housesPerPage)
    );

    if (page > 1 && lastVisible) {
        // If not on the first page, start after the last visible document
        housesQuery = query(
            collection(db, "house"),
            orderBy("title"),
            startAfter(lastVisible),
            limit(housesPerPage)
        );
    }

    const snapshot = await getDocs(housesQuery);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(data);

    // Check if there are any documents
    if (snapshot.empty) {
        console.log("No matching documents.");
        return;
    }

    // Store the last visible document for pagination
    lastVisible = snapshot.docs[snapshot.docs.length - 1];

    const housesHtml = snapshot.docs.map(doc => houseTemplate(doc.data())).join("");
    const houseContainer = document.querySelector("#house-container");
    houseContainer.innerHTML = housesHtml;

    // Get total houses to update pagination info
    const totalHousesSnapshot = await getDocs(collection(db, "houses"));
    const totalHouses = totalHousesSnapshot.size;
    totalPages = Math.ceil(totalHouses / housesPerPage);
    
    // Update pagination info
    document.getElementById("page-info").textContent = `Page ${page} of ${totalPages}`;
    document.getElementById("prev-page").disabled = page === 1;
    document.getElementById("next-page").disabled = page === totalPages;

    renderPageNumbers(totalPages);
};

// Function to render numbered pagination controls
const renderPageNumbers = (totalPages) => {
    const pageNumbersContainer = document.getElementById("page-numbers");
    pageNumbersContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.disabled = (i === currentPage);
        button.addEventListener("click", () => {
            currentPage = i;
            renderHouses(currentPage);
        });
        pageNumbersContainer.appendChild(button);
    }
};

// Event listeners for pagination buttons
document.getElementById("prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderHouses(currentPage);
    }
});

document.getElementById("next-page").addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        renderHouses(currentPage);
    }
});

// Initial render
renderHouses(currentPage);
