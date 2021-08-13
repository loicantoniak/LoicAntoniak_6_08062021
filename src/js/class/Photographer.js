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

  createPhotographerDomElements = () => {
    const photographersListContainer =
      document.querySelector(".photographers-list");

    let html = `<article class="profile__container">
      <a class="profile__identity" href="#">
        <div class="profile__image">
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

    photographersListContainer.insertAdjacentHTML("beforeend", html);
  };
}
