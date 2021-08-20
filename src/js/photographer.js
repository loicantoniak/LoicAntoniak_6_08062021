import { Photographer } from "./class/PhotographerClass.js";
import ModalForm from "./modalForm.js";

export const PhotographerPage = (data) => {
  data.photographers.forEach((photographer) => {
    if (photographer.id === Number(urlParam.get("id"))) {
      PhotographerHeader(photographer);
      ModalForm(photographer);
    }
  });
};

export const urlParam = new URLSearchParams(window.location.search);

const PhotographerHeader = (data) => {
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
