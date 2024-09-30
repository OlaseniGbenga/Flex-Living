import { app } from "../../firebase/firebase.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

import { Header } from "../../components/Header/Header.js";
import { Footer } from "../../components/Footer/Footer.js";

const auth = getAuth(app);

const logOut = document.querySelector("#logOut");
logOut.addEventListener("click", async () => {
  try {
    await signOut(auth);
    window.location.href = "../../index.html";  
  } catch (error) {
    console.error("my Account error:", error);
  }
});

onAuthStateChanged(auth, (user) => {
  const signUpLink = this.querySelector("#signUpLink");

  if (user) {
    signUpLink.textContent = "My account";
    signUpLink.href = "./pages/myAccount/myAccount.html";
    // signUpLink.addEventListener("click", () => {
    //   signOut(auth).then(() => {
    //     window.location.reload();
    //   }).catch((error) => {
    //     console.error("my Account error:", error);
    //   });
    // });
  } else {
    signUpLink.textContent = "Sign In";
    signUpLink.href = "./pages/signIn/signIn.html";
  }
});

customElements.define("main-header", Header);
customElements.define("main-footer", Footer);
