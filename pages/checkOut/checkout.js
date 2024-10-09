import { app } from "../../firebase/firebase.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { Header } from "../../components/Header/Header.js";
import { Footer } from "../../components/Footer/Footer.js";

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {

  if (user) {
    document.querySelector("#protectedContent").style.display = "block";
  } else {
    window.location.href ="../signIn/signIn.html"
  }
});

const button= document.querySelector("button");

button.addEventListener("click", (event)=>{
    event.preventDefault();
button.style.backgroundColor= "grey";
button.disabled = true;
alert("payment successful, check your mail on how to access your accomodation.")
window.location.href = "/index.html"

})

customElements.define("main-header", Header);
customElements.define("main-footer", Footer);
