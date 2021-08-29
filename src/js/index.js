"use strict";

import { fetchData } from "./fetchData.js";
import { Photographer } from "./class/PhotographerClass.js";
import { filterTagsNavList, filteringPhotographersByTags } from "./filterTags.js";

fetchData();

export const mainPage = (data) => {
  profileMainList(data);
  filterTagsNavList(data);
  filteringPhotographersByTags(data);
};

const profileMainList = (data) => {
  data.forEach((photographer) => {
    new Photographer(
      photographer.id,
      photographer.name,
      photographer.portrait,
      photographer.city,
      photographer.country,
      photographer.tags,
      photographer.tagline,
      photographer.price
    ).setProfileDomElements();
  });
};





