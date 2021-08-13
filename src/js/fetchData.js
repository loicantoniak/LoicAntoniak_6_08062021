import { createMainPage, createPhotographerPage } from "./index.js";

const fetchData = async function () {
  try {
    const res = await fetch("/src/data/data.json");
    if (!res.ok) throw new Error("Problem getting data");
    const data = await res.json();

    if (window.location.pathname.includes("photographer.html")) {
      createPhotographerPage(data);
    } else {
      createMainPage(data);
    }
  } catch (err) {
    console.error(err);
  }
};

export { fetchData };
