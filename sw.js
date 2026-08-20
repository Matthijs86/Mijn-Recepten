// ======================================
// MIJN RECEPTEN - SERVICE WORKER
// ======================================

const CACHE_NAME = "mijn-recepten-v3";

const APP_BESTANDEN = [
    "/Mijn-Recepten/",
    "/Mijn-Recepten/index.html",
    "/Mijn-Recepten/style.css",
    "/Mijn-Recepten/script.js",
    "/Mijn-Recepten/manifest.json",
    "/Mijn-Recepten/icon-192x192.png",
    "/Mijn-Recepten/icon-512x512.png"
];


// ======================================
// INSTALLEREN
// ======================================

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches.open(CACHE_NAME)
                .then(cache => {

                    return cache.addAll(
                        APP_BESTANDEN
                    );

                })

        );

        self.skipWaiting();

    }
);


// ======================================
// ACTIVEREN
// ======================================

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches.keys()
                .then(cacheNamen => {

                    return Promise.all(

                        cacheNamen
                            .filter(
                                naam =>
                                    naam !== CACHE_NAME
                            )
                            .map(
                                naam =>
                                    caches.delete(naam)
                            )

                    );

                })

        );

        self.clients.claim();

    }
);


// ======================================
// BESTANDEN OPHALEN
// ======================================

self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches.match(event.request)
                .then(cachedResponse => {

                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    return fetch(event.request);

                })

        );

    }
);
