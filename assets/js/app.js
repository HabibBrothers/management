import d from "./NTechDOM.js";
import { pages } from "../../modules/pages.js";
import { login } from "../../modules/login.js";
import { home } from "../../modules/home.js";
import { labour } from "../../modules/labour.js";
import { labourShah } from "../../modules/labourShah.js";
import { labourShahAdd } from "../../modules/labourShahAdd.js";

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
