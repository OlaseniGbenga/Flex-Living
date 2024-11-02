import { app } from "../../firebase/firebase.js";
import {
  getAuth,
 
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

export class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <header>
      <section>
        <img
          class="logo"
          src="/media/images/logo.png"
          alt="Flex living logo"
        />
        <nav id="destop-nav">
          <ul>
            <li><a href="/index.html">Home</a></li>
           <li><a id="signUpLink"  href="/pages/signUp/signUp.html">Sign Up</a></li>
            <li>Blog</li>
            <li>Contacts</li>
          </ul>
        </nav>

        <img
          id="hamburgerMenuId"
          class="hamburgerMenu"
          src="/media/svg/hamburgerMenu.svg"
          alt="hamburger menu"
        />
        <img
          id="cancelMenuId"
          class="cancelMenu mobileNavDisplay"
          src="/media/svg/cancel.svg"
          alt="Close menu"
        />
      </section>
      <nav id="mobileNavId" class="mobileNav">
        <ul>
           <li><a href="/index.html">Home</a></li>
          <li><a id="signUpLink"  href="/pages/signUp/signUp.html">Sign Up</a></li>
            
          <li>Blog</li>
          <li>Contacts</li>
        </ul>
      </nav>
      <div id="mobileNavBackDrop" class="mobileNavBackDrop"></div>
    </header>`;

    const hamburgerMenuId = this.querySelector("#hamburgerMenuId");
    const cancelMenuId = this.querySelector("#cancelMenuId");
    const mobileNavId = this.querySelector("#mobileNavId");
    const mobileNavBackDrop = this.querySelector("#mobileNavBackDrop");

    const toggleMenu = () => {
      hamburgerMenuId.classList.toggle("mobileNavDisplay");
      cancelMenuId.classList.toggle("mobileNavDisplay");
      mobileNavId.classList.toggle("open");
      mobileNavBackDrop.classList.toggle("openBackDrop");
    };

    hamburgerMenuId.addEventListener("click", toggleMenu);
    cancelMenuId.addEventListener("click", toggleMenu);

    // Update header based on authentication state
    this.updateHeader();
  }

  async updateHeader() {
    // const signUpLink = this.querySelector("#signUpLink");
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
      const signUpLink = this.querySelector("#signUpLink");

      if (user) {
        signUpLink.textContent = "My account";
        signUpLink.href = "/pages/myAccount/myAccount.html";
      } else {
        signUpLink.textContent = "Sign In";
        signUpLink.href = "./pages/signIn/signIn.html";
      }
    });
  }
}
