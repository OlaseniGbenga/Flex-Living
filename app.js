function toggleMenu() {
  hamburgerMenuId.classList.toggle('mobileNavDisplay');
  cancelMenuId.classList.toggle('mobileNavDisplay');
  mobileNavId.classList.toggle('mobileNavDisplay');
}

hamburgerMenuId.addEventListener('click', toggleMenu);
cancelMenuId.addEventListener('click', toggleMenu);




