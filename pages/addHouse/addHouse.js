import { app } from "../../firebase/firebase.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

import { Header } from "../../components/Header/Header.js";
import { Footer } from "../../components/Footer/Footer.js";

const db = getFirestore(app);
const storage = getStorage(app);

document
  .getElementById("houseForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;
    const address = event.target.address.value;
    const city = event.target.city.value;
    const state = event.target.state.value.toLowerCase();
    const zipCode = event.target.zipCode.value;
    const fileInput = event.target["main-picture"];
    const bathRoom = event.target.bathRoom.value;
    const room = event.target.room.value;
    const wifi = event.target.wifi.value;

    let picture = "";

    // Upload file to Firebase Storage
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);

      // Get the download URL
      picture = await getDownloadURL(storageRef);
    }

    // Add document to Firestore
    try {
      await addDoc(collection(db, "house"), {
        title,
        description,
        location: {
          address,
          city,
          state,
          zipCode,
        },
        apartmentUtil:{
            bathRoom,
            room,
            wifi,
        },
        picture, // Use the download URL here
      });
      alert("House information submitted successfully!");
      event.target.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  });

customElements.define("main-header", Header);
customElements.define("main-footer", Footer);
