import { MainPage } from "./index.js";
import { PhotographerPage } from "./photographer.js";

export const fetchData = async function () {
  try {
    const res = await fetch("/src/data/data.json");
    if (!res.ok) throw new Error("Problem getting data");
    const data = await res.json();

    if (window.location.pathname.includes("photographer.html")) {
      PhotographerPage(data);
    } else {
      MainPage(data);
    }
  } catch (err) {
    console.error(err);
  }
};
