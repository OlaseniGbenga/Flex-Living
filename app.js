import { Header } from "./components/Header/Header.js";
import {Footer} from "./components/Footer/Footer.js"

// function toggleMenu() {
//   hamburgerMenuId.classList.toggle('mobileNavDisplay');
//   cancelMenuId.classList.toggle('mobileNavDisplay');
//   mobileNavId.classList.toggle('open');
//   mobileNavBackDrop.classList.toggle('openBackDrop')
// }

// hamburgerMenuId.addEventListener('click', toggleMenu);
// cancelMenuId.addEventListener('click', toggleMenu);

customElements.define("main-header", Header);
customElements.define("main-footer", Footer);
