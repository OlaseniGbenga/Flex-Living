import { app } from "../../firebase/firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword,onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const signInForm = document.querySelector("#signInForm");
const loadingIndicator = document.querySelector("#loading");

signInForm.addEventListener("submit", createUser);

//Init Auth
const auth = getAuth(app);


async function createUser(event) {
  event.preventDefault();
  loadingIndicator.style.display= "block"
 

  try {

    
    await signInWithEmailAndPassword(auth, signInForm.email.value, signInForm.password.value);
    onAuthStateChanged(auth, (user) => {
          loadingIndicator.style.display= "none";
        if(user){
            window.location.href = "../../index.html";  
        } else{window.location.href = ".";  
        }
    })
    
    window.location.href = "../../index.html"; 

  } catch (error) {
      loadingIndicator.style.display= "none"
   alert(error)
  }
}
