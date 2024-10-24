import {
  doc,
  deleteDoc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

import { app } from "../../firebase/firebase.js";

const db = getFirestore(app);

// Function to delete a document
const deleteHouse = async (houseId,  yes, no, cancel,loading,) => {
  try {
    loading.style.display = "block";
    yes.disabled = true;
    no.disabled = true;
    cancel.disabled = true;
    const houseRef = doc(db, "house", houseId); // Replace "houses" with your collection name
    await deleteDoc(houseRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
  } finally {
    loading.style.display = "none";
    yes.disabled = false;
    no.disabled = false;
    cancel.disabled = false;
  }
};

export default deleteHouse;
