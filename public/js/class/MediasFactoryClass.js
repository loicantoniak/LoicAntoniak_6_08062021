import { firstName } from "../functions.js";

export class MediasFatory {
  setMedia(
    id,
    photographerId,
    title,
    src,
    tags,
    likes,
    date,
    price,
    photographerName
  ) {
    let media;
    if (src.includes(".jpg")) {
      const image = new Image();
      image.id = id;
      image.photographerId = photographerId;
      image.title = title;
      image.src = src;
      image.tags = tags;
      image.likes = likes;
      image.date = date;
      image.price = price;
      image.photographerName = photographerName;

      media = image;
    }

    if (src.includes(".mp4")) {
      const video = new Video();
      video.id = id;
      video.photographerId = photographerId;
      video.title = title;
      video.src = src;
      video.tags = tags;
      video.likes = likes;
      video.date = date;
      video.price = price;
      video.photographerName = photographerName;

      media = video;
    }

    return media;
  }

  /**
   * Create Media's list dom elements on thue photographer page
   */
  setMediaListDomElements = (media) => {
    const phographerMediaListContainer = document.querySelector(
      ".photographer_mediaList"
    );

    let html = `<li class="photographer_mediaCard" data-filter=${this.tags}>
    <figure class="photographer_mediaCard-mediacontainer">
      <figcaption>
        <h3>${this.title}</h3>
        <div class="photographer_mediaCard-like">
          <p>${this.likes}</p>
          <i class="far fa-heart"></i>
        </div>
      </figcaption>
    </figure>
    </li>`;

    phographerMediaListContainer.insertAdjacentHTML("beforeend", html);

    const mediaContainer = document.querySelectorAll(
      ".photographer_mediaCard-mediacontainer"
    );
    mediaContainer[mediaContainer.length - 1].prepend(media);
  };
}

export class Image extends MediasFatory {
  createDomElt() {
    const image = document.createElement("img");
    image.classList = "photographer_mediaCard-media";
    image.setAttribute(
      "src",
      `./public/assets/medias/${firstName(this.photographerName)}/${this.src}`
    );
    image.setAttribute("alt", `${this.title}, closeup view`);
    image.setAttribute("data-id", `${this.id}`);
    image.setAttribute("role", "button");
    this.setMediaListDomElements(image);
  }
}

export class Video extends MediasFatory {
  createDomElt() {
    const video = document.createElement("video");
    video.classList = "photographer_mediaCard-media";
    video.setAttribute(
      "src",
      `./public/assets/medias/${firstName(this.photographerName)}/${this.src}`
    );
    video.setAttribute("alt", `${this.title}, closeup view`);
    video.setAttribute("data-id", `${this.id}`);
    video.setAttribute("role", "button");
    this.setMediaListDomElements(video);
  }
}
