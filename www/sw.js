const ORIGIN_URL = `${location.protocol}//${location.host}`;
const CACHE_NAME = "offline";
const OFFLINE_URL = "offline.html";
const CACHED_FILES = [
  OFFLINE_URL,
  `${ORIGIN_URL}/libraries/bootstrap-5.1.3/css/bootstrap.min.css`,
  `${ORIGIN_URL}/libraries/bootstrap-5.1.3/js/bootstrap.bundle.min.js`,
  `${ORIGIN_URL}/libraries/fontawesome-5.15.4/fontawesome.js`,
  `${ORIGIN_URL}/libraries/jquery-3.6.0/jquery-3.6.0.min.js`,
  `${ORIGIN_URL}/css/style.css`,
  `${ORIGIN_URL}/js/index.js`,
  `${ORIGIN_URL}/js/api.js`,
  `${ORIGIN_URL}/js/app.js`,
  `${ORIGIN_URL}/js/generator.js`,
  `${ORIGIN_URL}/js/header.js`,
  `${ORIGIN_URL}/js/native.js`,
  `${ORIGIN_URL}/img/logo.png`,
];

const sendOfflinePage = (resolve) => {
  caches.open(CACHE_NAME).then((cache) => {
    cache.match(OFFLINE_URL).then((cachedResponse) => {
      resolve(cachedResponse);
    });
  });
};

const respondWithFetchPromiseNavigate = (event) =>
  new Promise((resolve) => {
    event.preloadResponse
      .then((preloadResponse) => {
        if (preloadResponse) {
          resolve(preloadResponse);
        }

        fetch(event.request)
          .then((networkResponse) => {
            resolve(networkResponse);
          })
          .catch(() => sendOfflinePage(resolve));
      })
      .catch(() => sendOfflinePage(resolve));
  });

const fetchSW = (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(respondWithFetchPromiseNavigate(event));
  } else if (CACHED_FILES.includes(event.request.url)) {
    event.respondWith(caches.match(event.request));
  }
};

// 

const deleteOldCaches = () =>
  new Promise((resolve) => {
    caches.keys().then((keys) => {
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            caches.delete(key);
          }
        })
      ).finally(resolve);
    });
  });

const waitUntilActivatePromise = () =>
  new Promise((resolve) => {
    deleteOldCaches().then(() => {
      if ("navigationPreload" in self.registration) {
        self.registration.navigationPreload.enable().finally(resolve);
      }
    });
  });

const activate = (event) => {
  event.waitUntil(waitUntilActivatePromise());
  self.clients.claim();
};

// 

const waitUntilInstallationPromise = () =>
  new Promise((resolve) => {
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(CACHED_FILES).then(resolve);
    });
  });

const installSW = (event) => {
  event.waitUntil(waitUntilInstallationPromise());
  self.skipWaiting();
};

// 

self.addEventListener("install", installSW);
self.addEventListener("activate", activate);
self.addEventListener("fetch", fetchSW);
