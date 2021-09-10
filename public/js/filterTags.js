import { upperCaseFirst } from "./functions.js";

/**
 * DOM Elements
 */
const tagsList = document.querySelector(".tags-list");
const filterTags = document.getElementsByClassName("btn-tag");
const profilContainer = document.getElementsByClassName("profile__container");
const mediaContainer = document.getElementsByClassName(
  "photographer_mediaCard"
);

/**
 * Create DOM elements for the navigation list
 * @param {object} data
 */
export const filterTagsNavList = (data) => {
  let html = "";

  sortedTags(data).forEach((tag) => {
    html += `<button class="btn btn-tag" data-filter=${tag} aria-label="tag">#${upperCaseFirst(
      tag
    )}</button>`;
  });

  tagsList.insertAdjacentHTML("beforeend", html);
};

/**
 * Create tags list without duplicates
 * @param {object} data
 * @returns {array} unique tag array
 */
const getUniqueTagArr = (data) => {
  let tags = [];
  data.forEach((photographer) => tags.push(...photographer.tags));
  const uniqueTags = new Set(tags);
  return [...uniqueTags];
};

/**
 * Sort tags alphabetically
 * @param {object} data
 * @returns {array} unique tag array sort alphabetically for navigation
 */
const sortedTags = (data) => {
  let tags = getUniqueTagArr(data);

  return tags.sort();
};

/**
 * Filtering photographer by tags
 * @param {object} data
 */
export const filteringPhotographersByTags = (data) => {
  for (let tag of filterTags) {
    tag.addEventListener("click", (e) => {
      const activeTag = document.querySelector(".btn-tag--active");

      if (activeTag) {
        activeTag.classList.remove("btn-tag--active");
      }

      e.target.classList.add("btn-tag--active");

      displayPhotographer(e.target, data);
      updatedSelectedTag(e.target);
    });
  }
};

export const filteringMediaByTags = (media) => {
  for (let tag of filterTags) {
    tag.addEventListener("click", (e) => {
      const activeTag = document.querySelector(".btn-tag--active");

      if (activeTag) {
        activeTag.classList.remove("btn-tag--active");
      }

      e.target.classList.add("btn-tag--active");

      displayMedia(e.target, media);
    });
  }
};

/**
 * compare data attribute filter in tags of each media and show or hide media
 * @param {DOM element} elt
 * @param {object} data
 */
export const displayMedia = (elt, media) => {
  media.forEach((media, index) => {
    if(elt.dataset.filter !== "all") {
      if (media.tags.includes(elt.dataset.filter)) {
        mediaContainer[index].classList.remove("hide");
      } else {
        mediaContainer[index].classList.add("hide");
      }
    }
    else {
      mediaContainer[index].classList.remove("hide");
    }
   
  });
};

/**
 * compare data attribute filter in tags of each photographer and show or hide photographer
 * @param {DOM element} elt
 * @param {object} data
 */
const displayPhotographer = (elt, data) => {
  data.forEach((photographer, index) => {
    if (photographer.tags.includes(elt.dataset.filter)) {
      profilContainer[index].classList.remove("hide");
    } else {
      profilContainer[index].classList.add("hide");
    }
  });
};

/**
 * Update style of selectedTag
 * @param {DOM element} elt
 */
const updatedSelectedTag = (elt) => {
  const tags = document.querySelectorAll(".btn-tag");
  for (let tag of tags) {
    if (tag.dataset.filter === elt.dataset.filter) {
      tag.classList.add("btn-tag--active");
    } else {
      tag.classList.remove("btn-tag--active");
    }
  }
};
