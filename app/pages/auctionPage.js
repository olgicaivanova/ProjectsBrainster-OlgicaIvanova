const biddingBtn = document.querySelector("#bidBtn");
const biddingHistory = document.querySelector("#biddingHistory");
const auctionItem = document.querySelector("#auctionItem");
const artistAuction = document.querySelector("#artistAuction");
const biddingDiv = document.querySelector(".bidding");

const highestBid = document.querySelector("#highestBid");
const biddingInput = document.querySelector("#biddingInput");
const liveAuc = document.querySelector(".liveAuc");
const currentBid = document.querySelector(".currentBid");
const auctionFalse = document.querySelector(".auctionFalse");
const isArtist = localStorage.getItem("nameArtist");

function updateItems() {
  localStorage.setItem("items", JSON.stringify(items));
}

const card = (item) => {
  return `
    <div class="card mt-5">
      <img src="${item.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text priceTag mb-2">$${item.price}</p>
        </div>
        <p class="card-text desc">${item.description}</p>
        <p class="card-text type">${item.type}</p>
        <p class="card-text artist">${item.artist}</p>
        <p class="card-text todaysDate"></p>
      </div>
    </div>`;
};

function displayVisitorAuctionCard(item) {
  auctionItem.innerHTML = card(item);

  biddingDiv.style.display = "block";
  currentBid.innerHTML = `$${item.price}`;
  biddingHistory.style.display = "block";
  auctionFalse.style.display = "none";
  biddingInput.disabled = false;
  biddingBtn.disabled = false;
  biddingBtn.addEventListener("click", function () {
    const formData = new FormData();
    formData.set("amount", biddingInput.value);
    fetch("https://projects.brainster.tech/bidding/api", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        highestBid.textContent = biddingInput.value;
        biddingHistory.innerHTML = "";
        biddingHistory.innerHTML += `<li>${biddingInput.value}</li>`;

        if (data.isBidding) {
          item.price = data.bidAmount;

          highestBid.textContent = data.bidAmount;
          biddingInput.min = data.bidAmount;
          biddingInput.value = data.bidAmount;
          currentBid.innerHTML = `$${data.bidAmount}`;

          biddingHistory.innerHTML += `<li style="margin-left: 150px;">${data.bidAmount}</li>`;
        } else {
          biddingBtn.disabled = true;
          biddingInput.disabled = true;
          biddingHistory.innerHTML += `<li style="margin-left: 150px;">I give up!</li>`;
        }
      });
  });
}
export default displayVisitorAuctionCard;

export function createAuctionCard(item) {
  auctionItem.innerHTML = card(item);
  initTimer();

  liveAuc.style.display = "block";
  highestBid.textContent = item.price;
  biddingInput.min = item.price;
  biddingInput.value = item.price;
  biddingBtn.disabled = !(biddingInput.value > item.price);

  biddingInput.addEventListener("input", function () {
    biddingBtn.disabled = !(biddingInput.value > item.price);
  });

  if (isArtist) {
    biddingDiv.style.display = "block";
    biddingInput.disabled = true;
    biddingBtn.disabled = true;
    biddingHistory.style.display = "none";
    auctionFalse.style.display = "none";
    artistAuction.innerHTML = localStorage.getItem("nameArtist");
  }

  //timer
  function initTimer() {
    const biddingInput = document.querySelector("#biddingInput");
    const biddingBtn = document.querySelector("#bidBtn");
    const timerID = document.querySelector("#timerID");
    const liveAuc = document.querySelector(".liveAuc");
    const getCurrentDate = new Date().toLocaleDateString("en-IN");

    const startingMins = 2;

    let time = startingMins * 60;

    const timeInterval = setInterval(function () {
      const minutes = Math.floor(time / 60);

      let seconds = time % 60;

      localStorage.setItem("time", `${minutes}:${seconds}`);

      timerID.innerHTML = localStorage.getItem("time");

      time--;

      if (minutes === 0 && seconds === 0) {
        timerID.textContent = "Auction is done!";
        biddingBtn.disabled = "true";
        biddingInput.disabled = "true";
        const todaysDate = document.querySelector(".todaysDate");
        todaysDate.textContent = `${getCurrentDate}`;
        const priceTagEl = document.querySelector(".priceTag");
        priceTagEl.textContent = `$${item.price}`;
        liveAuc.style.display = "none";
        localStorage.getItem("time", 0);
        clearInterval(timeInterval);
        updateItems();
      }
    }, 1000);
  }
}

export function initAuctionPage() {
  const navBar = document.querySelector(".fa-bars-3");
  navBar.addEventListener("click", function () {
    const navMenu = document.querySelector(".navMenuThree");
    if (navMenu.style.display === "block") {
      navMenu.style.display = "none";
    } else {
      navMenu.style.display = "block";
    }
  });
}
