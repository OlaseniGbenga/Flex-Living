// Import Firebase and Firestore
import { app } from "../../firebase/firebase.js";
import {
  getFirestore,
  collection,
  getDocs,
  limit,
  query,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Define a class for the custom element
export class CustomHouseElement extends HTMLElement {
  constructor() {
    super();
    // Attach a shadow DOM to the custom element (optional)
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.fetchData().then((data) => this.render(data));

  
  }

  async fetchData() {
    const db = getFirestore(app);
    const querySnapshot = await getDocs(query(collection(db, "house"),limit(4)));

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));



    return data;
  }

  newPage(id) {
    window.location.href = `pages/houseDetails/houseDetails.html?id=${id}`;
  }

  render(data) {
    // Define the HTML template for each house
    const houseTemplate = (house) => `
      <div  data-house-id="${house.id}" class="house">
        <div style="background-color: ${"red"}" class="house-img">
          <img src="${house?.picture || "./house.jpg"}" alt="">
        </div>
        <div class="house-details">
          <p class="house-name">${house?.title || "No name"}</p>
          <ul>
            <li>
              <img src="./media/svg/bed.svg" alt="bedroom icon" />
              <p>${house?.apartmentUtil?.room || "0"} bedroom${
      house?.apartmentUtil?.room > 1 ? "s" : ""
    }</p>
            </li>
            <li>
              <img src="./media/svg/bathroom.svg" alt="bathroom icon" />
              <p>${house?.apartmentUtil?.bathRoom || "0"} bathroom${
      house?.apartmentUtil?.bathRoom > 1 ? "s" : ""
    }</p>
            </li>
            <li>
              <img style="width: 1.25rem;" src="./media/svg/wifi.svg" alt="wifi icon" />
              <p>${house?.apartmentUtil?.wifi || "0"} wifi${
      house?.apartmentUtil?.wifi > 1 ? "s" : ""
    }</p>
            </li>
          </ul>
          <p class="available-date"> Available</p>
          <p class="price">from <span>&#8364;</span>${
            house?.price || "0"
          } /month</p>
        </div>
      </div>
    `;

    // Create a template string with all house items
    const housesHtml = data.map(houseTemplate).join("");

    // Define the complete HTML template
    const template = `
      <style>
  * {
    box-sizing: border-box;
  }

      body, h1, h2, h3, h4, h5, h6, p, blockquote, pre, code, address, hr, dl, dd, menu, nav, ul {
    margin: 0;
    padding: 0;
}
      .house {
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-top: 50px;
  padding: 0 3.75rem;
  cursor: pointer;
  height: 200px;
  width: 758px;
}

.house-img {
  border-top-left-radius: 80px;
  border-bottom-left-radius: 15px;

  overflow: hidden;
 
}

.house-img img {
  height: 100%;
  width: 100%;
 
}

.house-details {
  display: flex;
  flex-direction: column;
  padding: 20px 32px;
  justify-content: space-between;
  background-color: var(--dark-white);
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
}

.house-name {
  font-size: 1.5rem;
  font-weight: 700;
}

.house-properties {
  display: flex;
  flex-direction: column;
}

.house-details ul {
  display: flex;
  gap: 0.5rem;
}

.house-details ul li {
  display: flex;
}


.available-container {
  display: flex;
}

.available-date {
  background-color: var(--green2);
  color: var(--white);
  border-radius: 20px;
  padding: 5px 10px;
  width: 200px;
}

@media (max-width:768px){
 .house {
    display: flex;
    flex-direction: column;
height: auto;
    width: 80%;
  padding: 0.625rem 1.875rem;
  }

  .house-img{
    height: 200px;
    border-top-right-radius: 80px;
    border-bottom-left-radius: 0;
 
   
  }

  .house-img img {
    width: 100%;
   
  }


  .house-details {

    border-top-right-radius: 0;
    gap: 1rem;

  }

}

@media (max-width:610px) {
  .house-details ul {
    flex-direction: column;
   }
}
       </style>
      ${housesHtml}
    `;

    // Set the inner HTML of the element
    this.shadowRoot.innerHTML = template;

    data.forEach((house) => {
      const houseElement = this.shadowRoot.querySelector(`[data-house-id="${house.id}"]`);

      if (houseElement) {
        houseElement.addEventListener("click", () => {
          this.newPage(house.id);
        });
      }
    });
  }
}
