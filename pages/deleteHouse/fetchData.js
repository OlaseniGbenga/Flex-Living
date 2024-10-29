import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

import { app } from "../../firebase/firebase.js";

const db = getFirestore(app);

const fetchData = async (loading, control) => {
  try {
    loading.style.display = "block";
    control.style.display = "none";

    let housesQuery = query(
      collection(db, "house"),
      orderBy("title")
      
    );

    const snapshot = await getDocs(housesQuery);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const count = snapshot.size;

    return { data, count };
  } catch (error) {
    console.log(error);
    return { data: [], count: 0 };
  } finally {
    loading.style.display = "none";
  }
};

export default fetchData;
