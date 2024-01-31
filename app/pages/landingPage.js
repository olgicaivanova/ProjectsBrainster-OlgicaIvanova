import { getCurrentArtist, setCurrentArtist } from "../globals.js";

export function initLandingPage() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      const artistsSelect = document.querySelector("#topArtist");

      artistsSelect.innerHTML = "";
      artistsSelect.innerHTML = '<option value="">Select Artist</option>';

      data.forEach((user) => {
        artistsSelect.innerHTML += `<option value="${user.name}">${user.name}</option>`;
      });

      artistsSelect.addEventListener("change", function (event) {
        setCurrentArtist(event.currentTarget.value);
        location.hash = "#artistHomePage";
        const artist = document.querySelector("#artist");
        if (localStorage.getItem("nameArtist")) {
          artist.textContent = ` ${localStorage.getItem("nameArtist")}!`;
        }
        console.log(event.currentTarget.value);
        const name = getCurrentArtist();

        localStorage.setItem("nameArtist", name);

        artist.textContent = `${name}!`;
      });
    });
}
