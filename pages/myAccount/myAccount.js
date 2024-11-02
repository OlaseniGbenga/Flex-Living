import { app } from "../../firebase/firebase.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// import { Header } from "../../components/Header/Header.js";
// import { Footer } from "../../components/Footer/Footer.js";

import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

const firstName = document.querySelector("#firstName");
//const phone = document.querySelector("#phone");
const name = document.querySelector("#name");
//const number = document.querySelector("#number");
const email = document.querySelector("#email");
//const address = document.querySelector("#address");
//const birthday = document.querySelector("#birthday");
//const gender = document.querySelector("#gender");

const logOut = document.querySelector("#logOut");
logOut.addEventListener("click", async () => {
  try {
    await signOut(auth);
    window.location.href = "../../index.html";
  } catch (error) {
    console.error("my Account error:", error);
  }
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const { uid } = user;
    const snapshot = await getDoc(doc(db, "users", uid));

    if (snapshot.exists()) {
      const data = {
        id: snapshot.id,
        ...snapshot.data(),
      };

      firstName.innerText = data?.firstName;
      name.innerHTML = data?.firstName+ " " + data?.lastName;
      email.innerText = data?.email;


      if (data?.role === "admin") {
        document.querySelector("#add").style.display = "block";
        document.querySelector("#delete").style.display = "block";
      }

      console.log(data);
    } else {
      console.log("No such document!");
    }
  }
});

// customElements.define("main-header", Header);
// customElements.define("main-footer", Footer);
