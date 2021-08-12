"use strict";

const listProfilesContainer = document.querySelector(".listProfiles");

const renderPhotographer = (data) => {
  const html = `<article class="profil__container">
    <a class="profil__identity" href="#">
      <div class="profil__image">
        <img src="/src/assets/medias/Photographers ID Photos/${
          data.portrait
        }" alt="Photographe affilié au site Fisheye : ${data.name}" />
    </div>
    <h2>${data.name}</h2>
  </a>
  <p class="profil__city">${data.city}, ${data.country}</p>
  <p class="profil__tagline">${data.tagline}</p>
  <p class="profil__price">${data.price}€/jour</p>
  <div class="profil__tags">
  ${data.tags.map((tag) => `<button class="btn btn-tag">#${tag}</button>`)}
  </div>
</article>`;

  listProfilesContainer.insertAdjacentHTML("beforeend", html);
};

const photographers = async function () {
  try {
    const res = await fetch("/src/data/data.json");
    if (!res.ok) throw new Error("Problem getting data");
    const data = await res.json();
    data.photographers.forEach((photographer) =>
      renderPhotographer(photographer)
    );
  } catch (err) {
    console.error(err);
  }
};

photographers();
