import { firstName } from "./functions.js";

let currentSlide = 0;
let maxSlide;

/**
 * Dom Elements
 */
const header = document.querySelector("header");
const main = document.querySelector(".photographer_content");
const body = document.querySelector("body");
const lightbox = document.querySelector(".photographer_lightbox");
const btnClose = document.querySelector(".photographer_carousel_btn--close");
const nextBtn = document.querySelector(".photographer_carousel_btn--next");
const previousBtn = document.querySelector(
  ".photographer_carousel_btn--previous"
);

btnClose && btnClose.addEventListener("click", closeCarousel);
nextBtn && nextBtn.addEventListener("click", nextSlide);
previousBtn && previousBtn.addEventListener("click", previousSlide);

document.addEventListener("keydown", function (e) {
  const keyCode = e.keyCode;

  if (lightbox && lightbox.getAttribute("aria-hidden") === "false") {
    keyCode === 37 && previousSlide();
    keyCode === 39 && nextSlide();
    keyCode === 27 && closeCarousel();
  }
});

export const carouselMedia = (photographer, medias) => {
  const mediaCards = document.querySelectorAll(".photographer_mediaCard-media");

  mediaCards.forEach((card) => {
    card.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        openCarouselMedia(e, photographer, medias);
      }
    });
    card.addEventListener("click", (e) =>
      openCarouselMedia(e, photographer, medias)
    );
  });
};

function openCarouselMedia(e, photographer, medias) {
  lightbox.style.display = "block";
  currentSlide = getCurrentIndex(medias, e);
  getCarouselMediaDomElements(photographer, medias);
  lightbox.setAttribute("aria-hidden", false);
  lightbox.setAttribute("aria-modal", true);
  main.setAttribute("aria-hidden", true);
  main.style.display = "none";
  header.setAttribute("aria-hidden", true);
  body.classList.add("no-scroll");
}

const getCarouselMediaDomElements = (photographer, medias) => {
  const carouselMedia = document.querySelector(".photographer_carousel-medias");
  deleteMediaListCarousel(carouselMedia);

  let html = ``;

  medias.forEach((media, i) => {
    html += `<div class="slide slide--${
      i + 1
    }"><div class="slide_mediaContainer">`;
    if (media?.image) {
      html += `<img src="./public/assets/medias/${firstName(
        photographer.name
      )}/${media.image}" alt="${media.description}" data-id=${media.id}>`;
    } else if (media?.video) {
      html += `<video src="./public/assets/medias//${firstName(
        photographer.name
      )}/${media.video}" alt="${media.description}" data-id=${
        media.id
      } controls></video>`;
    } else {
      return null;
    }

    html += `<p>${media.title}</p></div></div>`;
  });

  carouselMedia.insertAdjacentHTML("beforeend", html);
  maxSlide = medias.length - 1;
  addTranslation();
  disabledCarouselButton();
};

const addTranslation = () => {
  const slide = document.querySelectorAll(".slide");

  slide.forEach((s, i) => {
    s.style.transform = `translate(${100 * (i - currentSlide)}%,-50%)`;
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

const disabledCarouselButton = () => {
  currentSlide === maxSlide
    ? nextBtn.classList.add("btn-disabled")
    : nextBtn.classList.remove("btn-disabled");

  currentSlide === 0
    ? previousBtn.classList.add("btn-disabled")
    : previousBtn.classList.remove("btn-disabled");
};

function closeCarousel() {
  lightbox.style.display = "none";
  main.style.display = "block";
  lightbox.setAttribute("aria-hidden", true);
  lightbox.setAttribute("aria-modal", false);
  main.setAttribute("aria-hidden", false);
  header.setAttribute("aria-hidden", false);
  body.classList.remove("no-scroll");
  nextBtn.classList.remove("btn-disabled");
  previousBtn.classList.remove("btn-disabled");
}

function nextSlide() {
  currentSlide === maxSlide ? (currentSlide = maxSlide) : currentSlide++;
  disabledCarouselButton();

  const slide = document.querySelectorAll(".slide");
  slide.forEach((s, i) => {
    s.style.transform = `translate(${100 * (i - currentSlide)}%, -50%)`;
  });
}

function previousSlide() {
  currentSlide === 0 ? (currentSlide = 0) : currentSlide--;

  disabledCarouselButton();
  const slide = document.querySelectorAll(".slide");
  slide.forEach((s, i) => {
    s.style.transform = `translate(${100 * (i - currentSlide)}%, -50%)`;
  });
}
