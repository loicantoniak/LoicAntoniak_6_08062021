import { MediasFatory } from "./class/MediasFactoryClass.js";
import { Photographer } from "./class/PhotographerClass.js";
import { filteringMediaByTags, displayMedia } from "./filterTags.js";
import { likesCounterDomElements, likesMedia } from "./likes.js";
import modalForm from "./modalForm.js";
import { sortMedia } from "./sort.js";
import {carouselMedia} from "./carousel.js"

export const urlParam = new URLSearchParams(window.location.search);

export const photographerPage = (data) => {
  data.photographers.forEach((photographer) => {
    if (photographer.id === Number(urlParam.get("id"))) {
      const mediasByPhotographer = data.media
        .filter((media) => media.photographerId === photographer.id)
        .sort((a, b) => b.likes - a.likes);
      photographerHeader(photographer);
      modalForm(photographer);
      pageTitleTagByPhotographer(photographer);
      addSelectedAllTagsButton();
      filteringMediaByTags(mediasByPhotographer);
      likesCounterDomElements(photographer, mediasByPhotographer);
      updatePhotographerPage(photographer, mediasByPhotographer);
      sortMedia(photographer, mediasByPhotographer);
    }
  });
};

const photographerHeader = (data) => {
  new Photographer(
    data.id,
    data.name,
    data.portrait,
    data.city,
    data.country,
    data.tags,
    data.tagline,
    data.price
  ).setPhotographerHeaderDomElements();
};

const pageTitleTagByPhotographer = (data) => {
  const title = document.querySelector("title");
  title.innerHTML = `FishEye - ${data.name}`;
};

const photographerMediaList = (photographer, medias) => {
  medias.forEach((media) => {
    new MediasFatory()
      .setMedia(
        media.id,
        media.photographerId,
        media.title,
        media?.image || media?.video,
        media.tags,
        media.likes,
        media.date,
        media.price,
        photographer.name
      )
      .createDomElt();
  });
};

const addSelectedAllTagsButton = () => {
  const photographerTagsList = document.querySelector(".photographer_tags");
  let html = `<button class="btn btn-tag btn-tag--active" data-filter=all>#all</button>`;

  photographerTagsList.insertAdjacentHTML("afterbegin", html);
};

export const updatePhotographerPage = (photographer, medias) => {
  const selectedTag = document.querySelector(".btn-tag--active");
  photographerMediaList(photographer, medias);
  selectedTag && displayMedia(selectedTag, medias);
  likesMedia();
  carouselMedia(photographer, medias)
};
