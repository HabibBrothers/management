import d from "./NTechDOM.js";
import { pages } from "../../modules/pages.js";
import { login } from "../../modules/login.js";
import { home } from "../../modules/home.js";
import { labour } from "../../modules/labour.js";
import { labourTable } from "../../modules/labourTable.js";
import { labourAdd } from "../../modules/labourAdd.js";
import { truck } from "../../modules/truck.js";
import { truckAdd } from "../../modules/truckAdd.js";
import { ship } from "../../modules/ship.js";
import { shipTable } from "../../modules/shipTable.js";
import { shipAdd } from "../../modules/shipAdd.js";

if (window.localStorage["com.infc.agency.habib-brother's.login"]) {
  pages.root = "home";
  pages.page = { ...pages.list };
  if (pages.page[window.location.hash.toString().replace("#/", "")]) {
    d.render(
      "root",
      eval(
        pages.page[window.location.hash.toString().replace("#/", "")]
      ).init()
    );
  } else {
    d.render("root", eval(pages.page[pages.root]));
  }
} else d.render("root", login);

window.hashchange = () => {
  if (pages.page[window.location.hash.toString().replace("#/", "")]) {
    d.render(
      "root",
      eval(
        pages.page[window.location.hash.toString().replace("#/", "")]
      ).init()
    );
  } else {
    d.render("root", eval(pages.page[pages.root]));
  }
};
window.addEventListener("hashchange", hashchange, false);

window.closeDiv = (q) => {
  document.querySelector(q).style.display = "none";
};
