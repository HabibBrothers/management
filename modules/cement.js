import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
import { footer } from "./footer.js";

const cement = d.createElement("div");

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
  { class: "item" }
);

const scan = d.createElement(
  "div",
  d
    .createElement("img")
    .setAttribute({ alt: "scan", src: "./assets/img/scan.png" }),
  { class: "item" }
);

const crown = d.createElement(
  "div",
  d.createElement("img").setAttribute({
    alt: "crown",
    src: "./assets/img/crown.png",
  }),
  { class: "item" }
);

const premier = d.createElement(
  "div",
  d.createElement("img").setAttribute({
    alt: "crown",
    src: "./assets/img/premier.png",
  }),
  { class: "item" }
);

container.append(shah, scan, crown, premier);
main.append(h1, container);

cement.append(header, main, footer);

export { cement };
