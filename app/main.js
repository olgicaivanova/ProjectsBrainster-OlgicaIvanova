import { initArtistHomePage } from "./pages/artistHomePage.js";
import { initLandingPage } from "./pages/landingPage.js";
import { initVisitorListing } from "./pages/visitorListing.js";
import { initVisitorHomePageSlide } from "./pages/visitorHomePage.js";
import { itemsPageArtist } from "./pages/itemsPage.js";
import { initCaptureImage } from "./pages/artistCaptureImg.js";
import { initAuctionPage } from "./pages/auctionPage.js";

function handleRoute() {
  const hash = location.hash === "" ? "#landingPage" : location.hash;

  const allPages = document.querySelectorAll(".page");
  allPages.forEach((page) => (page.style.display = "none"));
  document.querySelector(hash).style.display = "block";

  switch (hash) {
    case "#landingPage":
      initLandingPage();
      break;

    case "#artistHomePage":
      initArtistHomePage();
      break;

    case "#visitorHomePage":
      initVisitorHomePageSlide();
      break;

    case "#visitorListing":
      initVisitorListing();
      break;

    case "#itemsPage":
      itemsPageArtist();
      break;

    case "#artistCaptureImage":
      initCaptureImage();
      break;

    case "#auctionLivePage":
      initAuctionPage();
      break;

    default:
      break;
  }
}

window.addEventListener("hashchange", handleRoute);
window.addEventListener("load", handleRoute);
