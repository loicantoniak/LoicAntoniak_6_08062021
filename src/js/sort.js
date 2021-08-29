import { updatePhotographerPage } from "./photographer.js";

/**
 * DOM Elements
 */
const customSelect = document.querySelector(".custom-select");
const customOptions = document.querySelector(".custom-options");
const options = document.querySelectorAll(".custom-option");

export const sortMedia = (photographer, medias) => {
  setDropdownDomElement();

  const phographerMediaListContainer = document.querySelector(
    ".photographer_mediaList"
  );

  customSelect.addEventListener("click", function () {
    const selectedOption = customOptions.querySelector(".selected");
    const value = selectedOption.dataset.value;
    this.classList.toggle("open");
    if (!this.classList.contains("open")) {
      switch (value) {
        case "popularity":
          deleteMediaListDomElements(phographerMediaListContainer);
          sortingByPopularity(photographer, medias);
          break;

        case "title":
          deleteMediaListDomElements(phographerMediaListContainer);
          sortingByTitle(photographer, medias);
          break;

        case "date":
          deleteMediaListDomElements(phographerMediaListContainer);
          sortingByDate(photographer, medias);
          break;
      }
    }
  });
};

/**
 * Create interaction with custom dropdown Dom Elements
 */
const setDropdownDomElement = () => {
  for (const option of options) {
    option.addEventListener("click", function () {
      document
        .querySelector(".custom-hidden")
        .classList.remove("custom-hidden");

      if (!this.classList.contains("selected")) {
        this.parentNode
          .querySelector(".custom-option.selected")
          .classList.remove("selected");
        this.classList.add("selected", "custom-hidden");
        this.closest(".custom-select").querySelector(
          ".custom-select__trigger span"
        ).textContent = this.textContent;
      }
    });
  }

  window.addEventListener("click", function (e) {
    const select = document.querySelector(".custom-select");
    if (!select.contains(e.target)) {
      select.classList.remove("open");
    }
  });
};

/**
 * Remove oldChildren in dom
 * @param element
 */
const deleteMediaListDomElements = (element) => {
  const children = element.querySelectorAll("li");

  children.forEach((child) => {
    child.remove();
  });
};

export const sortingByPopularity = (photographer, medias) => {
  const mediasByPopularity = medias.sort((a, b) => b.likes - a.likes);
  updatePhotographerPage(photographer, mediasByPopularity);
};

export const sortingByTitle = (photographer, medias) => {
  const mediasByTitle = medias.sort((a, b) => {
    return a.title > b.title ? 1 : -1;
  });
  updatePhotographerPage(photographer, mediasByTitle);
};

export const sortingByDate = (photographer, medias) => {
  const mediasByDate = medias.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  updatePhotographerPage(photographer, mediasByDate);
};
