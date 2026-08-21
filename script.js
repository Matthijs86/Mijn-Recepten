// ======================================
// MIJN RECEPTEN - JAVASCRIPT
// ======================================


// ======================================
// OPSLAG
// ======================================

const OPSLAG_NAAM = "mijnRecepten";

const OPSLAG_BACKUP = "mijnReceptenBackup";

const OPSLAG_VERSIE = "mijnReceptenVersie";

const HUIDIGE_OPSLAG_VERSIE = 2;


// ======================================
// ELEMENTEN
// ======================================

const naamInput =
    document.getElementById("naamInput");

const urlInput =
    document.getElementById("urlInput");

const categorieInput =
    document.getElementById("categorieInput");

const notitieInput =
    document.getElementById("notitieInput");

const favorietInput =
    document.getElementById("favorietInput");

const opslaanKnop =
    document.getElementById("opslaanKnop");

const zoekInput =
    document.getElementById("zoekInput");

const receptenLijst =
    document.getElementById("receptenLijst");

const legeLijst =
    document.getElementById("legeLijst");

const zoekMelding =
    document.getElementById("zoekMelding");

const aantalRecepten =
    document.getElementById("aantalRecepten");

const lijstTitel =
    document.getElementById("lijstTitel");

const allesWissenKnop =
    document.getElementById("allesWissenKnop");

const favorietenKnop =
    document.getElementById("favorietenKnop");

const allesKnop =
    document.getElementById("allesKnop");

const categorieKnoppen =
    document.querySelectorAll(".categorie-knop");


// ======================================
// FILTER STATUS
// ======================================

let huidigeCategorie = null;

let alleenFavorieten = false;


// ======================================
// RECEPTEN LADEN
// ======================================

function receptenLaden() {

    try {

        const opgeslagenData =
            localStorage.getItem(
                OPSLAG_NAAM
            );


        // ----------------------------------
        // NORMALE OPSLAG
        // ----------------------------------

        if (opgeslagenData) {

            const ingelezenRecepten =
                JSON.parse(
                    opgeslagenData
                );


            if (
                Array.isArray(
                    ingelezenRecepten
                )
            ) {

                return ingelezenRecepten;

            }

        }


        // ----------------------------------
        // BACK-UP PROBEREN
        // ----------------------------------

        const backupData =
            localStorage.getItem(
                OPSLAG_BACKUP
            );


        if (backupData) {

            const backupRecepten =
                JSON.parse(
                    backupData
                );


            if (
                Array.isArray(
                    backupRecepten
                )
            ) {

                console.log(
                    "Mijn Recepten: back-up geladen."
                );

                return backupRecepten;

            }

        }


        return [];

    } catch (error) {

        console.error(
            "Fout bij laden recepten:",
            error
        );


        // ----------------------------------
        // BACK-UP ALS EXTRA VEILIGHEID
        // ----------------------------------

        try {

            const backupData =
                localStorage.getItem(
                    OPSLAG_BACKUP
                );


            if (backupData) {

                const backupRecepten =
                    JSON.parse(
                        backupData
                    );


                if (
                    Array.isArray(
                        backupRecepten
                    )
                ) {

                    return backupRecepten;

                }

            }

        } catch (backupError) {

            console.error(
                "Back-up kon niet worden geladen:",
                backupError
            );

        }


        alert(
            "De opgeslagen recepten konden niet worden geladen."
        );


        return [];

    }

}


let recepten =
    receptenLaden();


// ======================================
// RECEPTEN CONTROLEREN / MIGREREN
// ======================================

function receptenMigreren() {

    let gewijzigd = false;


    recepten =
        recepten.map(
            recept => {

                const nieuwRecept = {

                    id:
                        recept.id ||
                        (
                            Date.now() +
                            Math.random()
                        ),

                    naam:
                        typeof recept.naam ===
                        "string"

                            ? recept.naam

                            : "",

                    url:
                        typeof recept.url ===
                        "string"

                            ? recept.url

                            : "",

                    categorie:
                        typeof recept.categorie ===
                        "string"

                            ? recept.categorie

                            : "Overig",

                    notitie:
                        typeof recept.notitie ===
                        "string"

                            ? recept.notitie

                            : "",

                    favoriet:
                        recept.favoriet === true,

                    datum:
                        recept.datum ||
                        new Date().toISOString()

                };


                if (
                    JSON.stringify(
                        nieuwRecept
                    ) !==
                    JSON.stringify(
                        recept
                    )
                ) {

                    gewijzigd = true;

                }


                return nieuwRecept;

            }
        );


    const opgeslagenVersie =
        Number(
            localStorage.getItem(
                OPSLAG_VERSIE
            )
        ) || 1;


    if (
        opgeslagenVersie !==
        HUIDIGE_OPSLAG_VERSIE
    ) {

        gewijzigd = true;

    }


    if (gewijzigd) {

        receptenOpslaan();

    }


    localStorage.setItem(
        OPSLAG_VERSIE,
        String(
            HUIDIGE_OPSLAG_VERSIE
        )
    );

}


// ======================================
// RECEPTEN OPSLAAN
// ======================================

function receptenOpslaan() {

    try {

        // ----------------------------------
        // HUIDIGE DATA ALS BACK-UP OPSLAAN
        // ----------------------------------

        const huidigeOpslag =
            localStorage.getItem(
                OPSLAG_NAAM
            );


        if (huidigeOpslag) {

            localStorage.setItem(
                OPSLAG_BACKUP,
                huidigeOpslag
            );

        }


        // ----------------------------------
        // NIEUWE DATA OPSLAAN
        // ----------------------------------

        localStorage.setItem(
            OPSLAG_NAAM,
            JSON.stringify(
                recepten
            )
        );


        localStorage.setItem(
            OPSLAG_VERSIE,
            String(
                HUIDIGE_OPSLAG_VERSIE
            )
        );


        console.log(
            "Mijn Recepten: opgeslagen."
        );


    } catch (error) {

        console.error(
            "Fout bij opslaan recepten:",
            error
        );


        alert(
            "De recepten konden niet worden opgeslagen. Controleer de browseropslag."
        );

    }

}


// ======================================
// FORMULIER LEEGMAKEN
// ======================================

function formulierLeegmaken() {

    naamInput.value = "";

    urlInput.value = "";

    categorieInput.value = "";

    notitieInput.value = "";

    favorietInput.checked = false;

}


// ======================================
// URL CONTROLEREN
// ======================================

function geldigeUrl(url) {

    try {

        const gemaakteUrl =
            new URL(url);


        return (
            gemaakteUrl.protocol ===
                "http:" ||

            gemaakteUrl.protocol ===
                "https:"
        );

    } catch {

        return false;

    }

}


// ======================================
// RECEPT TOEVOEGEN
// ======================================

function receptToevoegen() {

    const naam =
        naamInput.value.trim();

    const url =
        urlInput.value.trim();

    const categorie =
        categorieInput.value;

    const notitie =
        notitieInput.value.trim();

    const favoriet =
        favorietInput.checked;


    // ----------------------------------
    // NAAM CONTROLEREN
    // ----------------------------------

    if (!naam) {

        alert(
            "Vul eerst een naam voor het recept in."
        );

        naamInput.focus();

        return;

    }


    // ----------------------------------
    // URL CONTROLEREN
    // ----------------------------------

    if (!url) {

        alert(
            "Vul eerst de link naar het recept in."
        );

        urlInput.focus();

        return;

    }


    if (!geldigeUrl(url)) {

        alert(
            "Vul een geldige website-link in."
        );

        urlInput.focus();

        return;

    }


    // ----------------------------------
    // CATEGORIE CONTROLEREN
    // ----------------------------------

    if (!categorie) {

        alert(
            "Kies eerst een categorie."
        );

        categorieInput.focus();

        return;

    }


    // ----------------------------------
    // NIEUW RECEPT MAKEN
    // ----------------------------------

    const nieuwRecept = {

        id:
            Date.now() +
            Math.random(),

        naam:
            naam,

        url:
            url,

        categorie:
            categorie,

        notitie:
            notitie,

        favoriet:
            favoriet,

        datum:
            new Date().toISOString()

    };


    // ----------------------------------
    // TOEVOEGEN AAN LIJST
    // ----------------------------------

    recepten.unshift(
        nieuwRecept
    );


    // ----------------------------------
    // OPSLAAN
    // ----------------------------------

    receptenOpslaan();


    // ----------------------------------
    // FORMULIER RESETTEN
    // ----------------------------------

    formulierLeegmaken();


    // ----------------------------------
    // LIJST BIJWERKEN
    // ----------------------------------

    receptenWeergeven();


    // ----------------------------------
    // MELDING
    // ----------------------------------

    console.log(
        "Recept toegevoegd:",
        nieuwRecept.naam
    );

}


// ======================================
// RECEPT BEWERKEN
// ======================================

function receptBewerken(recept) {

    const nieuweNaam =
        prompt(
            "Naam van het recept:",
            recept.naam
        );


    if (
        nieuweNaam === null
    ) {

        return;

    }


    const naam =
        nieuweNaam.trim();


    if (!naam) {

        alert(
            "De naam mag niet leeg zijn."
        );

        return;

    }


    const nieuweUrl =
        prompt(
            "Link naar het recept:",
            recept.url
        );


    if (
        nieuweUrl === null
    ) {

        return;

    }


    const url =
        nieuweUrl.trim();


    if (!geldigeUrl(url)) {

        alert(
            "Vul een geldige website-link in."
        );

        return;

    }


    const nieuweNotitie =
        prompt(
            "Eigen notitie:",
            recept.notitie || ""
        );


    if (
        nieuweNotitie === null
    ) {

        return;

    }


    // ----------------------------------
    // RECEPT BIJWERKEN
    // ----------------------------------

    recept.naam =
        naam;

    recept.url =
        url;

    recept.notitie =
        nieuweNotitie.trim();


    // ----------------------------------
    // OPSLAAN
    // ----------------------------------

    receptenOpslaan();

    receptenWeergeven();

}


// ======================================
// RECEPTEN WEERGEVEN
// ======================================

function receptenWeergeven() {

    // ----------------------------------
    // LIJST LEEGMAKEN
    // ----------------------------------

    receptenLijst.innerHTML =
        "";


    // ----------------------------------
    // ZOEKTERM
    // ----------------------------------

    const zoekterm =
        zoekInput.value
            .toLowerCase()
            .trim();


    // ----------------------------------
    // CONTROLEREN OF ER EEN FILTER IS
    // ----------------------------------

    const heeftFilter =
        zoekterm !== "" ||
        huidigeCategorie !== null ||
        alleenFavorieten;


    // ----------------------------------
    // GEEN FILTER
    // ----------------------------------

    if (!heeftFilter) {

        zoekMelding.style.display =
            "block";

        legeLijst.style.display =
            "none";

        aantalRecepten.textContent =
            "0 recepten";

        lijstTitel.textContent =
            "Mijn recepten";

        return;

    }


    // ----------------------------------
    // ZOEKMELDING VERBERGEN
    // ----------------------------------

    zoekMelding.style.display =
        "none";


    // ----------------------------------
    // FILTEREN
    // ----------------------------------

    const gefilterdeRecepten =
        recepten.filter(
            recept => {

                const naam =
                    String(
                        recept.naam || ""
                    ).toLowerCase();


                const categorie =
                    String(
                        recept.categorie || ""
                    ).toLowerCase();


                const notitie =
                    String(
                        recept.notitie || ""
                    ).toLowerCase();


                const komtOvereenMetZoekterm =
                    !zoekterm ||

                    naam.includes(
                        zoekterm
                    ) ||

                    categorie.includes(
                        zoekterm
                    ) ||

                    notitie.includes(
                        zoekterm
                    );


                const komtOvereenMetCategorie =
                    !huidigeCategorie ||

                    recept.categorie ===
                        huidigeCategorie;


                const komtOvereenMetFavoriet =
                    !alleenFavorieten ||

                    recept.favoriet === true;


                return (
                    komtOvereenMetZoekterm &&
                    komtOvereenMetCategorie &&
                    komtOvereenMetFavoriet
                );

            }
        );


    // ----------------------------------
    // TITEL
    // ----------------------------------

    if (alleenFavorieten) {

        lijstTitel.textContent =
            "⭐ Favorieten";

    } else if (huidigeCategorie) {

        lijstTitel.textContent =
            `🍽️ ${huidigeCategorie}`;

    } else if (zoekterm) {

        lijstTitel.textContent =
            "🔎 Zoekresultaten";

    } else {

        lijstTitel.textContent =
            "Mijn recepten";

    }


    // ----------------------------------
    // AANTAL
    // ----------------------------------

    aantalRecepten.textContent =
        `${gefilterdeRecepten.length} recept${
            gefilterdeRecepten.length === 1
                ? ""
                : "en"
        }`;


    // ----------------------------------
    // GEEN RESULTATEN
    // ----------------------------------

    if (
        gefilterdeRecepten.length === 0
    ) {

        legeLijst.style.display =
            "block";

        return;

    }


    legeLijst.style.display =
        "none";


    // ==================================
    // KAARTEN MAKEN
    // ==================================

    gefilterdeRecepten.forEach(
        recept => {

            // ----------------------------------
            // KAART
            // ----------------------------------

            const kaart =
                document.createElement(
                    "article"
                );

            kaart.className =
                "recept-kaart";


            // ----------------------------------
            // KOP
            // ----------------------------------

            const kop =
                document.createElement(
                    "div"
                );

            kop.className =
                "recept-kop";


            const naam =
                document.createElement(
                    "h3"
                );

            naam.className =
                "recept-naam";

            naam.textContent =
                recept.naam;


            const favoriet =
                document.createElement(
                    "span"
                );

            favoriet.className =
                "favoriet";

            favoriet.textContent =
                recept.favoriet
                    ? "⭐"
                    : "";


            kop.appendChild(
                naam
            );

            kop.appendChild(
                favoriet
            );


            // ----------------------------------
            // CATEGORIE
            // ----------------------------------

            const categorie =
                document.createElement(
                    "span"
                );

            categorie.className =
                "categorie";

            categorie.textContent =
                recept.categorie;


            // ----------------------------------
            // NOTITIE
            // ----------------------------------

            let notitieElement = null;


            if (recept.notitie) {

                notitieElement =
                    document.createElement(
                        "div"
                    );

                notitieElement.className =
                    "recept-notitie";

                notitieElement.textContent =
                    recept.notitie;

            }


            // ----------------------------------
            // ACTIEKNOPPEN
            // ----------------------------------

            const acties =
                document.createElement(
                    "div"
                );

            acties.className =
                "recept-acties";


            // ==================================
            // OPENEN
            // ==================================

            const openKnop =
                document.createElement(
                    "button"
                );

            openKnop.className =
                "open-knop";

            openKnop.textContent =
                "🔗 Recept openen";


            openKnop.addEventListener(
                "click",
                () => {

                    window.open(
                        recept.url,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }
            );


            // ==================================
            // BEWERKEN
            // ==================================

            const bewerkKnop =
                document.createElement(
                    "button"
                );

            bewerkKnop.className =
                "bewerk-knop";

            bewerkKnop.textContent =
                "✏️ Bewerken";


            bewerkKnop.addEventListener(
                "click",
                () => {

                    receptBewerken(
                        recept
                    );

                }
            );


            // ==================================
            // FAVORIET
            // ==================================

            const favorietKnop =
                document.createElement(
                    "button"
                );

            favorietKnop.className =
                "favoriet-kaart-knop";


            favorietKnop.textContent =
                recept.favoriet
                    ? "⭐ Favoriet verwijderen"
                    : "☆ Favoriet";


            favorietKnop.addEventListener(
                "click",
                () => {

                    recept.favoriet =
                        !recept.favoriet;


                    receptenOpslaan();

                    receptenWeergeven();

                }
            );


            // ==================================
            // VERWIJDEREN
            // ==================================

            const verwijderKnop =
                document.createElement(
                    "button"
                );

            verwijderKnop.className =
                "verwijder-knop";

            verwijderKnop.textContent =
                "🗑️ Verwijderen";


            verwijderKnop.addEventListener(
                "click",
                () => {

                    const bevestiging =
                        confirm(
                            `Weet je zeker dat je "${recept.naam}" wilt verwijderen?`
                        );


                    if (!bevestiging) {

                        return;

                    }


                    recepten =
                        recepten.filter(
                            item =>
                                item.id !==
                                recept.id
                        );


                    receptenOpslaan();

                    receptenWeergeven();

                }
            );


            // ----------------------------------
            // KNOPPEN TOEVOEGEN
            // ----------------------------------

            acties.appendChild(
                openKnop
            );

            acties.appendChild(
                bewerkKnop
            );

            acties.appendChild(
                favorietKnop
            );

            acties.appendChild(
                verwijderKnop
            );


            // ----------------------------------
            // KAART OPBOUWEN
            // ----------------------------------

            kaart.appendChild(
                kop
            );

            kaart.appendChild(
                categorie
            );


            if (notitieElement) {

                kaart.appendChild(
                    notitieElement
                );

            }


            kaart.appendChild(
                acties
            );


            receptenLijst.appendChild(
                kaart
            );

        }
    );

}


// ======================================
// CATEGORIE KIEZEN
// ======================================

categorieKnoppen.forEach(
    knop => {

        knop.addEventListener(
            "click",
            () => {

                const categorie =
                    knop.dataset.categorie;


                huidigeCategorie =
                    categorie;

                alleenFavorieten =
                    false;


                zoekInput.value =
                    "";


                // --------------------------
                // CATEGORIE ACTIEF
                // --------------------------

                categorieKnoppen
                    .forEach(
                        andereKnop => {

                            andereKnop.classList
                                .remove(
                                    "actief"
                                );

                        }
                    );


                knop.classList.add(
                    "actief"
                );


                // --------------------------
                // FAVORIET UIT
                // --------------------------

                favorietenKnop.classList.remove(
                    "actief"
                );


                receptenWeergeven();

            }
        );

    }
);


// ======================================
// FAVORIETEN
// ======================================

favorietenKnop.addEventListener(
    "click",
    () => {

        huidigeCategorie =
            null;

        alleenFavorieten =
            true;


        zoekInput.value =
            "";


        // ----------------------------------
        // CATEGORIEKNOPPEN UIT
        // ----------------------------------

        categorieKnoppen
            .forEach(
                knop => {

                    knop.classList.remove(
                        "actief"
                    );

                }
            );


        // ----------------------------------
        // FAVORIET ACTIEF
        // ----------------------------------

        favorietenKnop.classList.add(
            "actief"
        );


        receptenWeergeven();

    }
);


// ======================================
// ALLE RECEPTEN
// ======================================

allesKnop.addEventListener(
    "click",
    () => {

        huidigeCategorie =
            null;

        alleenFavorieten =
            false;


        zoekInput.value =
            "";


        categorieKnoppen
            .forEach(
                knop => {

                    knop.classList.remove(
                        "actief"
                    );

                }
            );


        favorietenKnop.classList.remove(
            "actief"
        );


        receptenWeergeven();

    }
);


// ======================================
// ZOEKEN
// ======================================

zoekInput.addEventListener(
    "input",
    () => {

        huidigeCategorie =
            null;

        alleenFavorieten =
            false;


        categorieKnoppen
            .forEach(
                knop => {

                    knop.classList.remove(
                        "actief"
                    );

                }
            );


        favorietenKnop.classList.remove(
            "actief"
        );


        receptenWeergeven();

    }
);


// ======================================
// OPSLAAN KNOP
// ======================================

opslaanKnop.addEventListener(
    "click",
    receptToevoegen
);


// ======================================
// ALLES WISSEN
// ======================================

allesWissenKnop.addEventListener(
    "click",
    () => {

        if (
            recepten.length === 0
        ) {

            alert(
                "Er staan nog geen recepten in de lijst."
            );

            return;

        }


        const bevestiging =
            confirm(
                "Weet je zeker dat je ALLE opgeslagen recepten wilt verwijderen?\n\nDit kan niet automatisch worden teruggedraaid."
            );


        if (!bevestiging) {

            return;

        }


        // ----------------------------------
        // RECEPTEN WISSEN
        // ----------------------------------

        recepten = [];


        receptenOpslaan();


        // ----------------------------------
        // FILTERS RESETTEN
        // ----------------------------------

        huidigeCategorie =
            null;

        alleenFavorieten =
            false;

        zoekInput.value =
            "";


        categorieKnoppen
            .forEach(
                knop => {

                    knop.classList.remove(
                        "actief"
                    );

                }
            );


        favorietenKnop.classList.remove(
            "actief"
        );


        receptenWeergeven();

    }
);


// ======================================
// ENTER = RECEPT OPSLAAN
// ======================================

naamInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            receptToevoegen();

        }

    }
);


// ======================================
// FORMULIER VERZENDEN MET ENTER
// ======================================

urlInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            receptToevoegen();

        }

    }
);


// ======================================
// START
// ======================================

receptenMigreren();

receptenWeergeven();
