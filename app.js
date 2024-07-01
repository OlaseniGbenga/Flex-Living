function toggleMenu() {
  hamburgerMenuId.classList.toggle('mobileNavDisplay');
  cancelMenuId.classList.toggle('mobileNavDisplay');
  mobileNavId.classList.toggle('open');
}

hamburgerMenuId.addEventListener('click', toggleMenu);
cancelMenuId.addEventListener('click', toggleMenu);




