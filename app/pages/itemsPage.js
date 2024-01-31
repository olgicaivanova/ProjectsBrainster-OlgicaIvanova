import { items } from "../../data/data.js";
import { createAuctionCard } from "./auctionPage.js";
import displayVisitorAuctionCard from "./auctionPage.js";

export function itemsPageArtist() {
  //Update Items object
  function updateItems() {
    localStorage.setItem("items", JSON.stringify(items));
  }

  //menu
  const navBar = document.querySelector(".fa-bars-2");
  navBar.addEventListener("click", function () {
    console.log("clicked");
    const navMenu = document.querySelector(".navMenuTwo");
    if (navMenu.style.display === "block") {
      navMenu.style.display = "none";
    } else {
      navMenu.style.display = "block";
    }
  });
  const artistItem = document.querySelector("#artistItem");
  artistItem.innerHTML = localStorage.getItem("nameArtist");
  const addElIcon = document.querySelector(".addNew");
  const closeBtn = document.querySelector("#closeBtn");
  const addBtn = document.querySelector("#addBtn");
  const saveBtn = document.querySelector("#save");
  const itemsContainer = document.querySelector("#artistItems");

  //open modal
  function open() {
    document.getElementById("cardsNav").style.width = "100%";
    closeBtn.style.display = "block";
    itemTitle.value = "";
    itemDescription.value = "";
    itemType.value = "";
    itemPrice.value = "";
    itemImage.value = "";
    itemCapturedImage.src = "";
    addBtn.style.display = "block";
    saveBtn.style.display = "none";
  }
  saveBtn.style.display = "none";

  addElIcon.addEventListener("click", open);

  //close modal
  closeBtn.style.display = "none";
  function close() {
    document.getElementById("cardsNav").style.width = "0";
    closeBtn.style.display = "none";
    addElIcon.style.display = "block";
  }
  closeBtn.addEventListener("click", close);

  // create cards
  const createCardItem = (item) => {
    let { image, title, type, description, price, artist, isPublished, id } =
      item;

    let publishButtonText = isPublished ? "Unpublish" : "Publish";

    const wrapper = document.createElement("div");
    wrapper.classList.add("card", "mt-5");
    wrapper.setAttribute("id", `${id}`);

    const priceTag = document.createElement("p");
    priceTag.textContent = `$${price}`;
    priceTag.classList.add("pl-1", "pr-1", "priceTag");

    const img = document.createElement("img");
    img.src = image;

    const typeArt = document.createElement("p");
    typeArt.textContent = type;
    typeArt.classList.add("pType");

    const titleH5 = document.createElement("h5");
    titleH5.textContent = title;
    titleH5.classList.add("titleH5");

    const wrapperPrTi = document.createElement("div");
    wrapperPrTi.classList.add(
      "d-flex",
      "justify-content-between",
      "pl-3",
      "pr-3",
      "pt-3",
      "align-items-center"
    );
    wrapperPrTi.append(titleH5, priceTag);

    const pDesc = document.createElement("p");
    pDesc.textContent = description;
    pDesc.classList.add("pDesc");

    const pArtist = document.createElement("p");
    pArtist.textContent = artist;
    const content = document.createElement("div");
    content.classList.add("pl-3", "pr-3", "pb-3");
    content.append(wrapperPrTi, pDesc, typeArt, pArtist);
    let editedItemId = null;
    let isNewItem = false;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("btn-red", "mr-1", "btn-edit");
    removeBtn.addEventListener("click", function (event) {
      const confirmed = window.confirm(
        "Are you sure you want to remove this item?"
      );
      if (confirmed) {
        event.preventDefault();
        const postContainer = event.target.parentElement.parentElement;
        postContainer.remove();
        const index = items.findIndex(
          (item) => item.id === parseInt(postContainer.id)
        );
        if (index !== -1) {
          items.splice(index, 1);
          items.forEach((el, key) => (el.id = key + 1));
          updateItems();
        }
        editedItemId = null;
        window.location.reload();
      }
    });

    //Send to auction btn
    const sendToAucBtn = document.createElement("button");
    sendToAucBtn.textContent = "Send to auction";
    sendToAucBtn.classList.add("btn-blue", "mr-1", "btn-edit");
    sendToAucBtn.addEventListener("click", function () {
      window.location.href = "#auctionLivePage";
      localStorage.setItem("currentAuctionItem", JSON.stringify(item));
      createAuctionCard(item);
    });

    //visitors
    const joinAsVisitor = document.querySelector("#joinAsVisitor");
    joinAsVisitor.addEventListener("click", function () {
      const currentItem = JSON.parse(
        localStorage.getItem("currentAuctionItem")
      );
      let visitor;
      localStorage.setItem("visitor", +visitor + 1);
      location.hash = "#visitorHomePage";
      displayVisitorAuctionCard(currentItem);
    });

    //Edit Button
    function resetInputFields() {
      itemTitle.value = "";
      itemDescription.value = "";
      itemType.value = "";
      itemPrice.value = "";
      itemImage.value = "";
      itemCapturedImage.src = "";
    }

    function populateInputFields(item) {
      itemTitle.value = item.title;
      itemDescription.value = item.description;
      itemType.value = item.type;
      itemPrice.value = item.price;
      itemImage.value = item.image;
    }
    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("btn-white", "mr-1", "btn-edit");

    editBtn.addEventListener("click", function (event) {
      event.preventDefault();
      open();

      const card = event.target.closest(".card");
      const itemId = card.id;
      editedItemId = itemId;

      const index = items.findIndex((item) => item.id === +itemId);

      if (index !== -1) {
        isNewItem = false;
        populateInputFields(items[index]);
      }

      saveBtn.style.display = "block";
      addBtn.style.display = "none";
    });

    // Save Button
    saveBtn.addEventListener("click", function (event) {
      event.preventDefault();

      const newTitle = itemTitle.value;
      const newDescription = itemDescription.value;
      const newType = itemType.value;
      const newPrice = itemPrice.value;
      const newImage = itemImage.value;

      if (isNewItem) {
        const newId = new Date().valueOf();
        const newItem = {
          id: newId,
          description: newDescription,
          title: newTitle,
          type: newType,
          price: newPrice,
          image: newImage || itemCapturedImage.src,
          isPublished: true,
          dateCreated: new Date().toString(),
          artist: localStorage.getItem("nameArtist"),
        };
        items.push(newItem);

        const card = createCardItem(newItem);
        itemsContainer.append(card);

        resetInputFields();
        close();
      } else if (editedItemId !== null) {
        const index = items.findIndex((item) => item.id === +editedItemId);
        if (index !== -1) {
          items[index].title = newTitle;
          items[index].description = newDescription;
          items[index].type = newType;
          items[index].price = newPrice;
          items[index].image = newImage;

          const cardToUpdate = document.getElementById(editedItemId);
          if (cardToUpdate) {
            const titleElement = cardToUpdate.querySelector(".titleH5");
            const priceTagElement = cardToUpdate.querySelector(".priceTag");
            const pDescElement = cardToUpdate.querySelector(".pDesc");
            const pType = cardToUpdate.querySelector(".pType");
            const imgElement = cardToUpdate.querySelector("img");

            titleElement.textContent = newTitle;
            priceTagElement.textContent = `$${newPrice}`;
            pDescElement.textContent = newDescription;
            pType.textContent = newType;
            imgElement.src = newImage;
          }
          editedItemId = null;
        }
      }

      updateItems();
      close();
    });

    //Publish/Unpublish Button
    const publishBtn = document.createElement("button");
    publishBtn.textContent = publishButtonText;
    publishBtn.classList.add("btn-edit", "mr-1");
    const isPublishedCheck = document.querySelector("#isPublished");

    if (!isPublished) {
      publishBtn.classList.add("publish");
      isPublishedCheck.checked = false;
    } else {
      publishBtn.classList.add("unpublish");
      isPublishedCheck.checked = true;
    }

    publishBtn.addEventListener("click", function (event) {
      isPublished = !isPublished;

      const card = event.target.closest(".card");
      const itemId = card.id;
      const index = items.findIndex((item) => item.id === +itemId);

      if (index !== -1) {
        items[index].isPublished = isPublished;
        updateItems();

        if (!isPublished) {
          publishBtn.classList.remove("unpublish");
          publishBtn.classList.add("publish");
          publishBtn.style.backgroundColor = "white";
        } else {
          publishBtn.classList.remove("publish");
          publishBtn.classList.add("unpublish");
          publishBtn.style.backgroundColor = "green";
        }
        publishBtn.textContent = isPublished ? "Unpublish" : "Publish";
      }
    });

    const containerButtons = document.createElement("div");
    containerButtons.classList.add("buttonsArt");
    containerButtons.append(sendToAucBtn, publishBtn, removeBtn, editBtn);
    wrapper.append(img, wrapperPrTi, content, containerButtons);

    return wrapper;
  };

  // append card in container
  const artist = localStorage.getItem("nameArtist");
  const artistItems = items.filter((item) => item.artist === artist);
  artistItems.forEach((item) => {
    const card = createCardItem(item);
    itemsContainer.append(card);
  });

  //values and validation
  const itemTitle = document.querySelector("#title");
  const itemDescription = document.querySelector("#textarea");
  const itemType = document.querySelector("#type");
  const itemPrice = document.querySelector("#price");
  const itemImage = document.querySelector("#imageUrl");
  const isPublishedCheck = document.querySelector("#isPublished");
  const itemCapturedImage = document.querySelector("#capturedImage");

  const validateInput = (
    itemTitle,
    itemDescription,
    itemType,
    itemPrice,
    itemImage,
    itemCapturedImage
  ) =>
    (itemTitle.value.trim() !== "" &&
      itemDescription.value.trim() !== "" &&
      itemType.value.trim() !== "" &&
      itemPrice.value.trim() !== NaN &&
      itemImage.value.trim() !== "") ||
    itemCapturedImage.src.trim() !== "";

  //add new item
  const addNewItem = (event) => {
    event.preventDefault();
    const cameraStop = document.querySelector(".cameraStop");
    const pShot = document.querySelector(".pShot");
    cameraStop.style.display = "block";
    pShot.style.display = "block";
    const isValidInput = validateInput(
      itemTitle,
      itemDescription,
      itemType,
      itemPrice,
      itemImage,
      itemCapturedImage
    );
    console.log("isValid", isValidInput);
    if (!isValidInput) {
      return;
    } else {
      const PostObjectSecond = {
        id: new Date().valueOf(),
        description: itemDescription.value,
        title: itemTitle.value,
        type: itemType.value,
        price: itemPrice.value,
        image: itemImage.value || itemCapturedImage.src,
        isPublished: (isPublishedCheck.checked = true),
        dateCreated: new Date().toString(),
        artist: localStorage.getItem("nameArtist"),
      };
      items.push(PostObjectSecond);
      const card = createCardItem(PostObjectSecond);
      itemsContainer.append(card);
      console.log(items);
      updateItems();
      close();
    }
  };
  closeBtn.style.display = "block";
  addBtn.style.display = "block";
  saveBtn.style.display = "none";
  addBtn.addEventListener("click", addNewItem);
}
