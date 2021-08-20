import { Photographer } from "./class/Photographer.js";

export const PhotographerPage = (data) => {
  PhotographerHeader(data);
};

const urlParam = new URLSearchParams(window.location.search);

const PhotographerHeader = (data) => {
  data.photographers.forEach((photographer) => {
    if (photographer.id === Number(urlParam.get("id"))) {
      new Photographer(
        photographer.id,
        photographer.name,
        photographer.portrait,
        photographer.city,
        photographer.country,
        photographer.tags,
        photographer.tagline,
        photographer.price
      ).setPhotographerHeaderDomElements();
    }
  });
};
