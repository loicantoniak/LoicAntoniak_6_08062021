import { firstName } from "./functions.js";

let currentSlide;
let maxSlide;

export const carouselMedia = (photographer, medias) => {
  const lightbox = document.querySelector(".photographer_lightbox");
  const mediaCards = document.querySelectorAll(".photographer_mediaCard-media");

  mediaCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      lightbox.style.display = "block";
      currentSlide = getCurrentIndex(medias, e);
      getCarouselMediaDomElements(photographer, medias);
    });
  });
};

const getCarouselMediaDomElements = (photographer, medias) => {
  const carousel = document.querySelector(".photographer_carousel");
  deleteMediaListCarousel(carousel);

  let html = `<button class="photographer_carousel_btn photographer_carousel_btn--close">
  <img src="/src/assets/Icons/close-carousel.svg" alt="close-carousel" /> 
</button>

  <button class="photographer_carousel_btn photographer_carousel_btn--previous">
  <i class="fas fa-chevron-left" role="img"></i>
</button>`;

  medias.forEach((media, i) => {
    html += `<div class="slide slide--${i + 1}"><div class="slide_mediaContainer">`;
    if (media?.image) {
      html += `<img src="/src/assets/medias/${firstName(photographer.name)}/${
        media.image
      }" alt="${media.title}" data-id=${media.id}>`;
    } else if (media?.video) {
      html += `<video src="/src/assets/medias//${firstName(
        photographer.name
      )}/${media.video}" alt="${media.title}" data-id=${
        media.id
      } controls></video>`;
    } else {
      return null;
    }

    html += `<p>${media.title}</p></div></div>`;
  });

  html += `<button class="photographer_carousel_btn photographer_carousel_btn--next">
  <i class="fas fa-chevron-right" role="img"></i>
</button>`;

  carousel.insertAdjacentHTML("beforeend", html);
  maxSlide = medias.length - 1;
  addTranslation();
  closeCarousel();
  previousSlide();
  nextSlide();
};

const addTranslation = () => {
  const slide = document.querySelectorAll(".slide");

  slide.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
  });
};

const getCurrentIndex = (medias, e) => {
  return medias.findIndex((media) => media.id === Number(e.target.dataset.id));
};

const deleteMediaListCarousel = (element) => {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
};

const closeCarousel = () => {
  const lightbox = document.querySelector(".photographer_lightbox");
  const btnClose = lightbox.querySelector(".photographer_carousel_btn--close");
  btnClose.addEventListener("click", function () {
    lightbox.style.display = "none";
  });
};

const nextSlide = () => {
  const nextBtn = document.querySelector(".photographer_carousel_btn--next");

  nextBtn.addEventListener("click", function () {
    if (currentSlide === maxSlide) {
      currentSlide = maxSlide;
    } else {
      currentSlide++;
    }

    const slide = document.querySelectorAll(".slide");
    slide.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
    });
  });
};

const previousSlide = () => {
  const previousBtn = document.querySelector(
    ".photographer_carousel_btn--previous"
  );


  previousBtn.addEventListener("click", function () {
    if (currentSlide === 0) {
      currentSlide = 0;
    } else {
      currentSlide--;
    }

    const slide = document.querySelectorAll(".slide");
    slide.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
    });
  });
};
