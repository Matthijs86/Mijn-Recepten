// ======================================
// MIJN RECEPTEN - SERVICE WORKER
// ======================================


// ======================================
// VERSIE
// ======================================

// Verhoog dit nummer wanneer je een nieuwe
// versie van de app online zet.

const CACHE_NAME = "mijn-recepten-v17";


// ======================================
// APP BESTANDEN
// ======================================

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

        console.log(
            "Mijn Recepten: nieuwe Service Worker installeren..."
        );


        event.waitUntil(

            caches
                .open(CACHE_NAME)
                .then(cache => {

                    return cache.addAll(
                        APP_BESTANDEN
                    );

                })

        );


        // Nieuwe versie mag direct actief worden.

        self.skipWaiting();

    }
);


// ======================================
// ACTIVEREN
// ======================================

self.addEventListener(
    "activate",
    event => {

        console.log(
            "Mijn Recepten: Service Worker geactiveerd."
        );


        event.waitUntil(

            caches
                .keys()
                .then(cacheNamen => {

                    return Promise.all(

                        cacheNamen
                            .filter(
                                cacheNaam => {

                                    return (
                                        cacheNaam.startsWith(
                                            "mijn-recepten-"
                                        ) &&
                                        cacheNaam !==
                                            CACHE_NAME
                                    );

                                }
                            )
                            .map(
                                oudeCache => {

                                    console.log(
                                        "Oude cache verwijderen:",
                                        oudeCache
                                    );

                                    return caches.delete(
                                        oudeCache
                                    );

                                }
                            )

                    );

                })
                .then(() => {

                    return self.clients.claim();

                })

        );

    }
);


// ======================================
// BESTANDEN OPHALEN
// ======================================

self.addEventListener(
    "fetch",
    event => {

        // Alleen GET-verzoeken behandelen.

        if (
            event.request.method !==
            "GET"
        ) {

            return;

        }


        event.respondWith(

            caches
                .match(event.request)
                .then(cachedResponse => {

                    // ----------------------------------
                    // CACHE GEVONDEN
                    // ----------------------------------

                    if (cachedResponse) {

                        return cachedResponse;

                    }


                    // ----------------------------------
                    // NIET IN CACHE
                    // ----------------------------------

                    return fetch(
                        event.request
                    )
                    .then(response => {

                        // Alleen geldige responses cachen.

                        if (
                            !response ||
                            response.status !== 200 ||
                            response.type ===
                                "opaque"
                        ) {

                            return response;

                        }


                        const responseKopie =
                            response.clone();


                        caches
                            .open(CACHE_NAME)
                            .then(cache => {

                                cache.put(
                                    event.request,
                                    responseKopie
                                );

                            });


                        return response;

                    });

                })

        );

    }
);
