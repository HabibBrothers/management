import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
import { footer } from "./footer.js";

const ship = d.createElement("div");

const main = d.createElement("main").setAttribute({ class: "main" });
const h1 = d.createElement("h1", "জাহাজ হিসাব");

const container = d
  .createElement("div")
  .setAttribute({ class: "container" });

const shah = d.createElement(
  "div",
  d
    .createElement("img")
    .setAttribute({ alt: "shah", src: "./assets/img/shah.png" }),
  { class: "item", cement: "shah" }
);

const scan = d.createElement(
  "div",
  d
    .createElement("img")
    .setAttribute({ alt: "scan", src: "./assets/img/scan.png" }),
  { class: "item", cement: "scan" }
);

const crown = d.createElement(
  "div",
  d.createElement("img").setAttribute({
    alt: "crown",
    src: "./assets/img/crown.png",
  }),
  { class: "item", cement: "crown" }
);

const premier = d.createElement(
  "div",
  d.createElement("img").setAttribute({
    alt: "crown",
    src: "./assets/img/premier.png",
  }),
  { class: "item", cement: "premier" }
);

container.append(shah, scan, crown, premier);
main.append(h1, container);

ship.append(header, main, footer);

const cements = {
  1: "shah",
  2: "scan",
  3: "crown",
  4: "premier",
};

ship.onload = () => {
  header.onload();
  footer.onload();
  header.page = "ship";
  for (let x in cements) {
    document.querySelector(`.item[cement=${cements[x]}]`).onclick =
      () => {
        header.cement = cements[x];
        window.location = "#/shipTable";
      };
  }
};

export { ship };
