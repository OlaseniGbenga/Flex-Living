hamburgerMenuId.addEventListener("click", () => {
  if (!hamburgerMenuId.classList.contains("mobileNavDisplay")) {
    hamburgerMenuId.classList.add("mobileNavDisplay");
    cancelMenuId.classList.remove("mobileNavDisplay");
    mobileNavId.classList.remove("mobileNavDisplay");
  }
});

cancelMenuId.addEventListener("click", () => {
  if (!cancelMenuId.classList.contains("mobileNavDisplay")) {
    hamburgerMenuId.classList.remove("mobileNavDisplay");
    cancelMenuId.classList.add("mobileNavDisplay");
    mobileNavId.classList.add("mobileNavDisplay");
  }
});




