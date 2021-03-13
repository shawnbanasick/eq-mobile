// self.importScripts('data/games.js');

// Files to cache
const cacheName = "eq-mobile-v1";
const appShellFiles = [
  "/eq-mobile/",
  "/eq-mobile/index.html",
  "/eq-mobile/favicon.ico",

  "/eq-mobile/src/angular-ui-router.min.js",
  "/eq-mobile/src/angular.min.js",
  "/eq-mobile/src/bootstrap.min.js",
  "/eq-mobile/src/htmlq.js",
  "/eq-mobile/src/jquery-dateFormat.min.js",
  "/eq-mobile/src/jquery-ui.min.js",
  "/eq-mobile/src/jquery.min.js",
  "/eq-mobile/src/jquery-ui.touch-punch.min.js",
  "/eq-mobile/src/jsonpath.js",
  "/eq-mobile/src/respond.min.js",
  "/eq-mobile/src/ui-bootstrap-custom-tpls.min.js",
  "/eq-mobile/src/underscore-min.js",
  "/eq-mobile/src/xml2json.min.js",

  "/eq-mobile/settings/config.xml",
  "/eq-mobile/settings/language.xml",
  "/eq-mobile/settings/map.xml",
  "/eq-mobile/settings/statements.xml",

  "/eq-mobile/fonts/glyphicons-halflings-regular.eot",
  "/eq-mobile/fonts/glyphicons-halflings-regular.svg",
  "/eq-mobile/fonts/glyphicons-halflings-regular.ttf",
  "/eq-mobile/fonts/glyphicons-halflings-regular.woff",

  "/eq-mobile/templates/dropEventText.html",
  "/eq-mobile/templates/empty.html",
  "/eq-mobile/templates/login.html",
  "/eq-mobile/templates/modal.html",
  "/eq-mobile/templates/print.html",
  "/eq-mobile/templates/root.html",
  "/eq-mobile/templates/step1.html",
  "/eq-mobile/templates/step2.html",
  "/eq-mobile/templates/step3.html",
  "/eq-mobile/templates/step4.html",
  "/eq-mobile/templates/step5.html",
  "/eq-mobile/templates/submit.html",
  "/eq-mobile/templates/thanks.html",

  "/eq-mobile/stylesheets/bootstrap.min.css",
  "/eq-mobile/stylesheets/htmlq.css",

  "/eq-mobile/touch-icon-ipad.png",
  "/eq-mobile/touch-icon-ipad-retina.png",
  "/eq-mobile/apple-launch-2048x2732.png",
  "/eq-mobile/apple-launch-1668x2388.png",
  "/eq-mobile/apple-launch-1668x2224.png",
];

// Installing Service Worker
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(appShellFiles);
    })()
  );
});

// Fetching content using Service Worker
self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) return r;
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});
