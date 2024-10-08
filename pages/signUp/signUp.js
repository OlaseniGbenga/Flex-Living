import { app } from "../../firebase/firebase.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const signUpForm = document.querySelector("#signUpForm");
const loadingIndicator = document.querySelector("#loading");

signUpForm.addEventListener("submit", createUser);

//Init Auth
const auth = getAuth(app);
//init firestore
const db = getFirestore(app);
//colref
const userColRef = collection(db, "users");

async function createUser(event) {
  event.preventDefault();
    loadingIndicator.style.display= "block"
  const userDetails = {
    firstName: signUpForm.firstName.value,
    lastName: signUpForm.lastName.value,
    email: signUpForm.email.value,
    
  };

  try {
    const userCredentail = await createUserWithEmailAndPassword(
      auth,
      userDetails.email,
      signUpForm.password.value
    );
    const docRef = doc(userColRef, userCredentail.user.uid);
    await setDoc(docRef, userDetails);
    await sendEmailVerification(userCredentail.user);
      loadingIndicator.style.display= "none"
    window.location.href = "../../index.html"; 

  } catch (error) {
      loadingIndicator.style.display= "none"
   alert(error)
  }
}
