function toggleMenu() {
  hamburgerMenuId.classList.toggle('mobileNavDisplay');
  cancelMenuId.classList.toggle('mobileNavDisplay');
  mobileNavId.classList.toggle('open');
  mobileNavBackDrop.classList.toggle('openBackDrop')
}

hamburgerMenuId.addEventListener('click', toggleMenu);
cancelMenuId.addEventListener('click', toggleMenu);




