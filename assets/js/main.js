import d from "../js/NTechDOM.js";
import { app } from "../../modules/app.js";

d.render("root", app);

window.closeDiv = (q) => {
  document.querySelector(q).style.display = "none";
};
