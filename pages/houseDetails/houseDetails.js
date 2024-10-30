import { Header } from "../../components/Header/Header.js";
import { Footer } from "../../components/Footer/Footer.js";
//firebase
import { app } from "../../firebase/firebase.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

import {
  getAuth,

  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const protectedContent = document.querySelector("#protectedContent");
const mainImage = document.querySelector(".main-image");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const location = document.querySelector("#location");
const bedRoom = document.querySelector("#bedroom");
const wifi = document.querySelector("#wifi");
const bathRoom = document.querySelector("#bathroom");
const book = document.querySelector("#book")
const auth = getAuth(app);
const amount = document.querySelector("#rent")
const average = document.querySelector("#average")
const booking = document.querySelector("#booking")
const total = document.querySelector("#total")

onAuthStateChanged(auth, (user) => {
 

  if (user) {
    protectedContent.style.display = "block";
  } else {
    window.location.href ="../signIn/signIn.html"
  }
});

const url = window.location.href;
const searchParams = new URL(url).searchParams;
const searchData = Array.from(searchParams.values());
const id = searchData[0];

const fetchHouseData = async (id) => {
  const db = getFirestore(app); // Initialize Firestore
  try {
    const docRef = doc(db, "house", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const houseData = docSnap.data();
      title.innerHTML = houseData.title;
      description.innerHTML = houseData.description;
      mainImage.style.backgroundImage = `url(${houseData.picture})`;
      location.innerHTML = `${houseData.location.address}, ${houseData.location.city}, ${houseData.location.state} state.`;
      bedRoom.innerHTML = `${houseData.apartmentUtil.room}`;
      bathRoom.innerHTML = `${houseData.apartmentUtil.bathRoom}`;
      wifi.innerHTML = `${houseData.apartmentUtil.wifi}`;
     amount.innerText = `$ ${houseData?.price}`
     average.innerText = `$ ${houseData?.price}`
     booking.innerText = `$ ${houseData?.price}`
     total.innerText = `$ ${houseData?.price}`

      return houseData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching house data:", error);
  }
};

const houseData = await fetchHouseData(id);
console.log(houseData);

book.addEventListener("click", ()=>{
    window.location.href = `/pages/checkOut/checkOut.html?id=${id}`
})
customElements.define("main-header", Header);
customElements.define("main-footer", Footer);
