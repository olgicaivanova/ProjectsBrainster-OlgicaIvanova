import { items } from "../../data/data.js";
import { itemTypes } from "../../data/data.js";

export function initVisitorListing() {
  //filters
  const publishedItems = items.filter((item) => item.isPublished);
  const itemsContainer = document.querySelector("#render");

  itemsContainer.innerHTML = "";
  const iconFilter = document.querySelector(".fa-sliders");
  const iconClose = document.querySelector(".fa-xmark");

  function filterCards() {
    document.getElementById("mySidenav").style.width = "100%";
    iconClose.style.display = "block";
    iconFilter.style.display = "none";
  }

  iconFilter.addEventListener("click", filterCards);

  iconClose.style.display = "none";
  function closeFilter() {
    document.getElementById("mySidenav").style.width = "0";
    iconClose.style.display = "none";
    iconFilter.style.display = "block";
  }

  iconClose.addEventListener("click", closeFilter);

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      const artistsSelect = document.querySelector("#inputArtist");

      artistsSelect.innerHTML = "";
      artistsSelect.innerHTML = '<option value="">Select Artist</option>';

      data.forEach((user) => {
        artistsSelect.innerHTML += `<option value="${user.name}">${user.name}</option>`;
      });
    });

  const inputType = document.querySelector("#inputType");
  inputType.innerHTML = '<option value="">Select Type</option>';

  itemTypes.forEach((el) => {
    inputType.innerHTML += `
      <option>${el}</option>`;
  });

  const filterAllCards = () => {
    const title = document.querySelector("#inputName").value.toLowerCase();
    const artist = document.querySelector("#inputArtist").value;
    const minPrice = +document.querySelector("#inputPriceOne").value;
    const maxPrice = +document.querySelector("#inputPriceTwo").value;
    const type = document.querySelector("#inputType").value;

    const filtered = publishedItems.filter(
      (item) =>
        (title.toLowerCase()
          ? item.title.toLowerCase().includes(title.toLowerCase())
          : true) &&
        (artist ? item.artist === artist : true) &&
        (minPrice ? item.price >= minPrice : true) &&
        (maxPrice ? item.price <= maxPrice : true) &&
        (type ? item.type === type : true)
    );

    itemsContainer.innerHTML = "";
    filtered.forEach(({ image, title, description, price, artist }) => {
      itemsContainer.innerHTML += `<div class="card mt-5">
      <img src="${image}" class="card-img-top" alt="...">
      <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
      <h5 class="card-title artistName">${artist}</h5>
      <p class="card-text priceTag mb-2">$${price}</p>
      </div>
      <p class="card-text artist">${title}</p>
         <p class="card-text desc">${description}</p>
         <p class="card-text todaysDate"></p>
         </div>
         </div>`;
    });
  };
  const checkIcon = document.querySelector(".fa-check");
  checkIcon.addEventListener("click", filterAllCards);
  checkIcon.addEventListener("click", closeFilter);
  const card = filterAllCards();
  itemsContainer.append(card);
}
