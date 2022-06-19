import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
import { footer } from "./footer.js";

const labour = d.createElement("div");

const main = d.createElement("main").setAttribute({ class: "main" });
const h1 = d.createElement("h1", "লেভার হিসাব");

const container = d
  .createElement("div")
  .setAttribute({ class: "container" });

const shah = d.createElement(
  "div",
  d
    .createElement("img")
    .setAttribute({ alt: "shah", src: "./assets/img/shah.png" }),
  { class: "item", onclick: "window.location='#/labourShah'" }
);

const scan = d.createElement(
  "div",
  d
    .createElement("img")
    .setAttribute({ alt: "scan", src: "./assets/img/scan.png" }),
  { class: "item", onclick: "window.location='#/labourScan'" }
);

const crown = d.createElement(
  "div",
  d.createElement("img").setAttribute({
    alt: "crown",
    src: "./assets/img/crown.png",
  }),
  { class: "item", onclick: "window.location='#/labourCrown'" }
);

const premier = d.createElement(
  "div",
  d.createElement("img").setAttribute({
    alt: "crown",
    src: "./assets/img/premier.png",
  }),
  { class: "item", onclick: "window.location='#/labourPremier'" }
);

container.append(shah, scan, crown, premier);
main.append(h1, container);

labour.append(header, main, footer);

labour.onload = () => {
  header.onload();
  footer.onload();
};

export { labour };
