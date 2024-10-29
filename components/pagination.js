import houseTemplate from "../pages/deleteHouse/houseTemplate.js";

const pagination = async (housesPerPage, control, houses) => {
  let currentPage = 1;
  let selectedHouseId;

  const numOfPages = Math.ceil(houses.count / housesPerPage);

  const renderHouses = (page) => {
    const start = (page - 1) * housesPerPage;
    const end = start + housesPerPage;
    const housesToShow = houses?.data?.slice(start, end);
    control.style.display = "flex";

    const housesHtml = housesToShow?.map(houseTemplate)?.join("");
    const houseContainer = document.querySelector("#house-container");
    houseContainer.innerHTML = housesHtml;

    // Attach click event listener to each house element
    document.querySelectorAll(".house").forEach((element) => {
      element.addEventListener("click", (e) => {
        const houseData = e.currentTarget.id;
        selectedHouseId = houseData; // Store the ID of the clicked house
        window.location.href = `pages/houseDetails/houseDetails.html?id=${selectedHouseId}`;
      });
    });

    const btn = document
      .querySelector("#pageNumbersContainer")
      .querySelectorAll("button");
    btn.forEach((btn, i) => {
      if (i + 1 === currentPage) {
        btn.disabled = true;
      } else {
        btn.disabled = false;
      }
    });

    // Update pagination info

    document.getElementById("prev-page").disabled = page === 1;
    document.getElementById("next-page").disabled =
      page === Math.ceil(houses?.count / housesPerPage);
  };

  const pageNumbersContainer = document.getElementById("pageNumbersContainer");
  pageNumbersContainer.innerHTML = "";
  for (let i = 1; i <= numOfPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;

    button.addEventListener("click", () => {
      currentPage = i;
      renderHouses(currentPage);
    });
    pageNumbersContainer.appendChild(button);
  }

  // Event listeners for pagination buttons
  document.getElementById("prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderHouses(currentPage);
    }
  });

  document.getElementById("next-page").addEventListener("click", () => {
    if (currentPage < Math.ceil(houses?.count / housesPerPage)) {
      currentPage++;
      renderHouses(currentPage);
    }
  });

  if (houses.data.length > 0) {
    renderHouses(currentPage);
  } else {
    const section1 = document.getElementById("house-container");
    section1.innerHTML = "<p>None</p>";
  }
};
export default pagination;
