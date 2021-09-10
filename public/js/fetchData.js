import { mainPage } from "./index.js";
import { photographerPage } from "./photographer.js";

<<<<<<< HEAD
const url = "../data.json";
=======
const url = "../../data.json";
>>>>>>> 50c3ba694e3fafeb1fde18a9a8bb612eb36fdcac

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
