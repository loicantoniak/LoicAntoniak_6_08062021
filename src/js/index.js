// "use strict";
// const express = require("express");
// app.use("/src", express.static('./src'));

import { fetchData } from "./fetchData.js";
import { Photographer } from "./class/Photographer.js";
import { createFilterTagsNavList, filteringPhotographersByTags } from "./filterTags.js";

fetchData();

export const createMainPage = (data) => {
  createPhotographersMainList(data);
  createFilterTagsNavList(data);
  filteringPhotographersByTags(data);
};


export const createPhotographersMainList = (data) => {
  data.photographers.forEach((photographer) => {
    new Photographer(
      photographer.id,
      photographer.name,
      photographer.portrait,
      photographer.city,
      photographer.country,
      photographer.tags,
      photographer.tagline,
      photographer.price
    ).createPhotographerDomElements();
  });
};

export const createPhotographerPage = (data) => {
  console.log("fdfd");
};


