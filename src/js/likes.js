export const likesCounterDomElements = (photographer, medias) => {
  const aside = document.querySelector("aside");
  let counter = 0;

  medias.forEach((media) => {
    counter += media.likes;
  });

  let html = `<div class="counter-container">
    <p class="counter">${counter}</p> 
    <i class="far fa-heart fas"></i>
  </div>
  <p>${photographer.price}€ / jour</p>`;
  aside.insertAdjacentHTML("afterbegin", html);
};

export const likesMedia = () => {
  const heartElemnts = document.querySelectorAll(".fa-heart");
  const counter = document.querySelector(".counter");
  for (const heart of heartElemnts) {
    heart.addEventListener("click", function () {
      heart.classList.toggle("fas");
      heart.classList.contains("fas")
        ? heart.previousElementSibling.textContent++ && counter.textContent++
        : heart.previousElementSibling.textContent-- && counter.textContent--;
    });
  }
};
