"use strict";

import { fetchData } from "./fetchData.js";
import { Photographer } from "./class/PhotographerClass.js";
import { FilterTagsNavList, filteringPhotographersByTags } from "./filterTags.js";

fetchData();

export const MainPage = (data) => {
  ProfileMainList(data);
  FilterTagsNavList(data);
  filteringPhotographersByTags(data);
};

const ProfileMainList = (data) => {
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





