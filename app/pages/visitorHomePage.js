import { items } from "../../data/data.js";

export function initVisitorHomePageSlide() {
  let wrapper = document.querySelector(".wrapper-one");
  let wrapperTwo = document.querySelector(".wrapper-two");

  wrapper.innerHTML = "";
  wrapperTwo.innerHTML = "";

  const createLoop = (loopItems) =>
    `<div class="scroll col-1 mb-3"><a href="#visitorListing"><img class="b-shadow imgWidth" src="${loopItems.image}"/></a></div>`;

  const shuffleItems = [];
  const itemsLength = items.length;

  for (let i = 0; i < itemsLength; i++) {
    let randomElement = Math.floor(Math.random() * itemsLength);
    if (shuffleItems.indexOf(items[randomElement]) !== -1) {
      i--;
    } else {
      shuffleItems.push(items[randomElement]);
    }
  }

  let slicedItems = [];
  let step = 10;

  for (let i = 0; i < itemsLength; i++) {
    let sliced = shuffleItems.slice(i, i + step);
    slicedItems.push(sliced);
  }
  slicedItems[0].forEach((el) => (wrapper.innerHTML += createLoop(el)));
  slicedItems[0].forEach((el) => (wrapperTwo.innerHTML += createLoop(el)));
}
