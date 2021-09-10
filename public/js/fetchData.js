import { mainPage } from "./index.js";
import { photographerPage } from "./photographer.js";

const url = "data.json";

export const fetchData = async function () {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Problem getting data");
    const data = await res.json();
    
    if (window.location.pathname.includes("photographer.html")) {
      photographerPage(data);
    } else {
      mainPage(data.photographers);
    }
  } catch (err) {
    console.error(err);
  }
};
