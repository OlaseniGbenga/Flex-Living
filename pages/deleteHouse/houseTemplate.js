const houseTemplate = (house) => {
  return `
      <div id="${house.id}"  class="house">
          <div class="house-img">
            <img src="${house?.picture}" alt="${
    house?.title || "House Image"
  }" />
          </div>
          <div class="house-details">
            <p class="house-name">${house?.title || "Unknown Title"}</p>
            <ul>
              <li>
                <img src="/media/svg/bed.svg" alt="bedroom icon" />
                <p>${house?.apartmentUtil?.room || "N/A"}</p>
              </li>
              <li>
                <img src="/media/svg/bathroom.svg" alt="bathroom icon" />
                <p>${house?.apartmentUtil?.bathRoom || "N/A"}</p>
              </li>
              <li>
                <img style="width: 1.25rem" src="/media/svg/wifi.svg" alt="wifi icon" />
                <p>${
                  house?.apartmentUtil?.wifi
                    ? house.apartmentUtil.wifi + " wifi"
                    : "No wifi"
                }</p>
              </li>
            </ul>
            <p class="available-date">${
              house?.available ? "Available" : "Not available"
            }</p>
            <p class="price">from <span>&#8364;</span>${
              house?.price || 0
            } /month</p>
          </div>
      </div>
      `;
};

export default houseTemplate;
