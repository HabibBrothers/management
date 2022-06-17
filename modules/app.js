import d from "../assets/js/NTechDOM.js";
import { header } from "./header.js";
import { footer } from "./footer.js";
const app = d.createElement("div");

const main = d.createElement("main").setAttribute({ class: ["main", "home"] });

const weather = d
  .createElement("div")
  .setAttribute({ id: "ww2022", class: "weather" });

const weatherImg = d.createElement(
  "div",
  d
    .createElement("img")
    .setAttribute({ alt: "weather", src: "./assets/img/rainy-day.png" }),
  { class: "weatherImg" }
);

weather.append(weatherImg);
const services = d.createElement("div").setAttribute({ class: "services" });

const item = d.createElement("div").setAttribute({ class: "item" });
item.append(
  d.createElement(
    "div",
    d.createElement("img").setAttribute({ src: "./assets/img/home.svg" }),
    {
      class: "icon",
    }
  ),
  d.createElement("div", "লেভার", { class: "title" })
);
services.append(item, item, item, item);
app.onload = () => {
  d.post("https://srv2.weatherwidget.org/data/", {
    v: 1.2,
    a: '{"t":"horizontal","lang":"bn","ids":["wl10573"],"cl_bkg":"#FFFFFF","cl_font":"#000000","cl_cloud":"#d4d4d4","cl_persp":"#2196F3","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722","sl_sot":"celcius","sl_ics":"one_a","font":"Arial"}',
    u: "https://2ua.org/bgd/chandpur_sadar_upazila/map/|||Chandpur Sadar Upazila map, Bangladesh",
    i: false,
    g: 0,
    id: "ww2022",
  }).then((res) => {
    let {
      a: { html, jsCode },
    } = JSON.parse(res);
    document.querySelector("#ww2022").innerHTML = html;
  });
};
main.append(weather, services);
app.append(header, main, footer);
export { app };
