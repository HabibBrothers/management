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
import { giveTake } from "../../modules/giveTake.js";
import { giveTakeAdd } from "../../modules/giveTakeAdd.js";
import { giveTakeAdd2 } from "../../modules/giveTakeAdd2.js";

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

window.hashchange = async () => {
  if (pages.page[window.location.hash.toString().replace("#/", "")]) {
    if (
      window.location.hash.toString().replace("#/", "") == "logout"
    ) {
      delete localStorage["com.infc.agency.habib-brother's.login"];
      pages.root = "login";
      pages.page = {};
      let data = await window.indexedDB.deleteDatabase(
        "com.infc.agency.habib-brother's"
      );
      d.render("root", login.init());
      return;
    }
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

// check if the browser supports serviceWorker at all
if ("serviceWorker" in navigator) {
  // wait for the page to load
  window.addEventListener("load", async () => {
    // register the service worker from the file specified
    const registration = await navigator.serviceWorker.register(
      "./sw.js"
    );

    registration.addEventListener("updatefound", () => {
      if (registration.installing) {
        // wait until the new Service worker is actually installed (ready to take over)
        registration.installing.addEventListener(
          "statechange",
          () => {
            if (registration.waiting) {
              // if there's an existing controller (previous Service Worker), show the prompt
              if (navigator.serviceWorker.controller) {
                console.log("Service Worker Updata found");
              } else {
                console.log(
                  "Service Worker initialized for the first time"
                );
              }
            }
          }
        );
      }
    });

    let refreshing = false;

    // detect controller change and refresh the page
    navigator.serviceWorker.addEventListener(
      "controllerchange",
      () => {
        if (!refreshing) {
          window.location.reload();
          refreshing = true;
        }
      }
    );
  });
}
