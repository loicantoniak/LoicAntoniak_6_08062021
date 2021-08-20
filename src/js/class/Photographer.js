export class Photographer {
  constructor(id, name, portrait, city, country, tags, tagline, price) {
    this.id = id;
    this.name = name;
    this.portrait = portrait;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.tags = tags;
    this.price = price;
  }

  setProfileDomElements = () => {
    const profileListContainer = document.querySelector(".profile-list");

    let html = `<article class="profile__container">
      <a class="profile__identity" href="photographer.html?id=${this.id}">
        <div class="portrait">
          <img src="/src/assets/medias/Photographers ID Photos/${this.portrait}" alt="Photographe affilié au site Fisheye : ${this.name}" />
      </div>
      <h2>${this.name}</h2>
    </a>
    <p class="profile__city">${this.city}, ${this.country}</p>
    <p class="profile__tagline">${this.tagline}</p>
    <p class="profile__price">${this.price}€/jour</p>
    <div class="profile__tags">`;

    this.tags.forEach((tag) => {
      html += `<button class="btn btn-tag" data-filter=${tag}>#${tag}</button>`;
    });

    html += `</div>
  </article>`;

    profileListContainer.insertAdjacentHTML("beforeend", html);
  };

  setPhotographerHeaderDomElements = () => {
    const photographerHeaderContainer = document.querySelector(
      ".photographer_header"
    );

    let html = `<div class="photographer_info">
      <div class="photographer_title">
      <h1 class="photographer_name">${this.name}</h1>
        <button class="btn btn-primary btn-contact">Contactez-moi</button>
      </div>
      <h2 class="photographer_location">${this.city}, ${this.country}</h2>
      <p class="photographer_tagline">${this.tagline}</p>
    <div class="photographer_tags">`;

    this.tags.forEach((tag) => {
      html += `<button class="btn btn-tag" data-filter=${tag}>#${tag}</button>`;
    });

    html += `</div>
    </div>
    
    <div class="portrait portrait-responsive">
      <img src="/src/assets/medias/Photographers ID Photos/${this.portrait}" alt="Photographe affilié au site Fisheye : ${this.name}" />
    </div>`;

    photographerHeaderContainer.insertAdjacentHTML("beforeend", html);
  };
}
