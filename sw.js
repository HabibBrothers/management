const company = "com.riseup.";
const appName = "habib-brother's-management";
const version = "[2.0]";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(company + appName + version).then((cache) =>
      cache.addAll([
        // lib
        "./lib/custom-password.js",
        "./lib/dom.js",
        "./lib/firebase-analytics.js",
        "./lib/firebase-app.js",
        "./lib/firebase-auth.js",
        "./lib/firebase-firestore.js",
        "./lib/idb.js",
        "./",
        "./index.html",
        "./logo.png",
        "./logo196.png",
        "./signup.html",
        "./assets/css/app.css",
        "./assets/fonts/SolaimanLipi_29-05-06.ttf",
        "./assets/fonts/SolaimanLipi_Bold_10-03-12.ttf",
        "./assets/fonts/SolaimanLipi.eot",
        "./assets/fonts/SolaimanLipi.ttf",
        "./assets/img/crown.png",
        "./assets/img/edit.svg",
        "./assets/img/premier.png",
        "./assets/img/rainy-day.png",
        "./assets/img/scan.png",
        "./assets/img/shah.png",
        "./assets/img/view.svg",
        "./assets/js/app.js",
        "./modules/footer.js",
        "./modules/giveTake.js",
        "./modules/giveTakeAdd.js",
        "./modules/giveTakeAdd2.js",
        "./modules/header.js",
        "./modules/home.js",
        "./modules/input.js",
        "./modules/labour.js",
        "./modules/labourAdd.js",
        "./modules/labourTable.js",
        "./modules/loading.js",
        "./modules/login.js",
        "./modules/pages.js",
        "./modules/ship.js",
        "./modules/shipAdd.js",
        "./modules/shipTable.js",
        "./modules/signup.js",
        "./modules/truck.js",
        "./modules/truckAdd.js",
      ])
    )
  );
});

self.addEventListener("fetch", (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches
      .match(e.request)
      .then((response) => response || fetch(e.request))
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
