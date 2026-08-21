// ======================================
// MIJN RECEPTEN - JAVASCRIPT
// ======================================
// Neon / Skater / Metal Style
// ======================================


// ======================================
// OPSLAG
// ======================================

const OPSLAG_NAAM = "mijnRecepten";

const OPSLAG_BACKUP = "mijnReceptenBackup";

const OPSLAG_VERSIE = "mijnReceptenVersie";

const HUIDIGE_OPSLAG_VERSIE = 3;


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
// HUIDIGE FILTER
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
        // NORMALE OPSLAG BESTAAT
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
        // GEEN NORMALE OPSLAG
        // PROBEER BACKUP
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
                    "Recepten hersteld vanuit backup."
                );


                // Backup terugzetten als hoofdopslag

                localStorage.setItem(
                    OPSLAG_NAAM,
                    JSON.stringify(
                        backupRecepten
                    )
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
        // BACKUP PROBEREN
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
                {

                    console.log(
                        "Recepten hersteld vanuit backup."
                    );


                    localStorage.setItem(
                        OPSLAG_NAAM,
                        JSON.stringify(
                            backupRecepten
                        )
                    );


                    return backupRecepten;

                }

            }

        } catch (backupError) {

            console.error(
                "Backup kon niet worden geladen:",
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
// RECEPTEN MIGREREN
// ======================================
// Zorgt ervoor dat oude recepten
// geschikt blijven voor nieuwe versies.
// ======================================

function receptenMigreren() {

    let gewijzigd = false;


    recepten =
        recepten.map(
            (recept, index) => {

                const nieuwRecept = {

                    id:
                        recept.id ||
                        Date.now() +
                        index +
                        Math.random(),

                    naam:
                        typeof recept.naam === "string"
                            ? recept.naam
                            : "",

                    url:
                        typeof recept.url === "string"
                            ? recept.url
                            : "",

                    categorie:
                        typeof recept.categorie === "string"
                            ? recept.categorie
                            : "Overig",

                    notitie:
                        typeof recept.notitie === "string"
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

        const huidigeOpslag =
            localStorage.getItem(
                OPSLAG_NAAM
            );


        // ----------------------------------
        // BACKUP MAKEN
        // ----------------------------------

        if (
            huidigeOpslag &&
            huidigeOpslag !==
                JSON.stringify(recepten)
        ) {

            localStorage.setItem(
                OPSLAG_BACKUP,
                huidigeOpslag
            );

        }


        // ----------------------------------
        // NIEUWE OPSLAG
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
            "Recepten opgeslagen."
        );

    } catch (error) {

        console.error(
            "Fout bij opslaan:",
            error
        );


        alert(
            "De recepten konden niet worden opgeslagen. Controleer of browseropslag beschikbaar is."
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
    // TOEVOEGEN AAN BEGIN LIJST
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
    // LIJST VERNIEUWEN
    // ----------------------------------

    receptenWeergeven();


    // Focus terug naar naamveld

    naamInput.focus();

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
            "De naam van het recept mag niet leeg zijn."
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


    const categorieen = [
        "Pasta",
        "Kip",
        "Vlees",
        "Vis",
        "Slowcook",
        "Fastfood",
        "Ontbijt",
        "Bakken",
        "Overig"
    ];


    const categorieTekst =
        categorieen
            .map(
                (item, index) =>
                    `${index + 1}. ${item}`
            )
            .join("\n");


    const gekozenCategorie =
        prompt(
            `Kies categorie:\n\n${categorieTekst}\n\nVoer het nummer in:`,
            String(
                categorieen.indexOf(
                    recept.categorie
                ) + 1
            )
        );


    if (
        gekozenCategorie === null
    ) {

        return;

    }


    const categorieIndex =
        Number(
            gekozenCategorie
        ) - 1;


    if (
        categorieIndex < 0 ||
        categorieIndex >=
            categorieen.length
    ) {

        alert(
            "Ongeldige categorie."
        );

        return;

    }


    const favorietKeuze =
        confirm(
            "Moet dit recept een favoriet zijn?\n\nOK = Ja\nAnnuleren = Nee"
        );


    // ----------------------------------
    // RECEPT BIJWERKEN
    // ----------------------------------

    recepten =
        recepten.map(
            item => {

                if (
                    item.id !==
                    recept.id
                ) {

                    return item;

                }


                return {

                    ...item,

                    naam:
                        naam,

                    url:
                        url,

                    categorie:
                        categorieen[
                            categorieIndex
                        ],

                    notitie:
                        nieuweNotitie.trim(),

                    favoriet:
                        favorietKeuze

                };

            }
        );


    receptenOpslaan();

    receptenWeergeven();

}


// ======================================
// RECEPT VERWIJDEREN
// ======================================

function receptVerwijderen(recept) {

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


// ======================================
// FAVORIET AAN / UIT
// ======================================

function favorietWisselen(recept) {

    recepten =
        recepten.map(
            item => {

                if (
                    item.id !==
                    recept.id
                ) {

                    return item;

                }


                return {

                    ...item,

                    favoriet:
                        !item.favoriet

                };

            }
        );


    receptenOpslaan();

    receptenWeergeven();

}


// ======================================
// RECEPTEN WEERGEVEN
// ======================================

function receptenWeergeven() {

    receptenLijst.innerHTML =
        "";


    const zoekterm =
        zoekInput.value
            .toLowerCase()
            .trim();


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


    // ----------------------------------
    // KAARTEN MAKEN
    // ----------------------------------

    gefilterdeRecepten.forEach(
        recept => {

            const kaart =
                document.createElement(
                    "article"
                );

            kaart.className =
                "recept-kaart";


            // --------------------------
            // KOP
            // --------------------------

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


            // --------------------------
            // CATEGORIE
            // --------------------------

            const categorie =
                document.createElement(
                    "span"
                );

            categorie.className =
                "categorie";

            categorie.textContent =
                recept.categorie;


            // --------------------------
            // NOTITIE
            // --------------------------

            if (recept.notitie) {

                const notitie =
                    document.createElement(
                        "div"
                    );

                notitie.className =
                    "recept-notitie";

                notitie.textContent =
                    recept.notitie;


                kaart.appendChild(
                    notitie
                );

            }


            // --------------------------
            // ACTIES
            // --------------------------

            const acties =
                document.createElement(
                    "div"
                );

            acties.className =
                "recept-acties";


            // --------------------------
            // OPENEN
            // --------------------------

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


            // --------------------------
            // BEWERKEN
            // --------------------------

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


            // --------------------------
            // FAVORIET
            // --------------------------

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

                    favorietWisselen(
                        recept
                    );

                }
            );


            // --------------------------
            // VERWIJDEREN
            // --------------------------

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

                    receptVerwijderen(
                        recept
                    );

                }
            );


            // --------------------------
            // KNOPPEN TOEVOEGEN
            // --------------------------

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


            // --------------------------
            // KAART OPBOUWEN
            // --------------------------

            kaart.appendChild(
                kop
            );

            kaart.appendChild(
                categorie
            );

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


                // Alle categorieknoppen
                // eerst uitzetten

                categorieKnoppen.forEach(
                    andereKnop => {

                        andereKnop.classList.remove(
                            "actief"
                        );

                    }
                );


                // Gekozen categorie
                // activeren

                knop.classList.add(
                    "actief"
                );


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


        categorieKnoppen.forEach(
            knop => {

                knop.classList.remove(
                    "actief"
                );

            }
        );


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


        categorieKnoppen.forEach(
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


        categorieKnoppen.forEach(
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
// ENTER = OPSLAAN
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


        recepten = [];


        receptenOpslaan();


        receptenWeergeven();

    }
);


// ======================================
// PAGINA VERLATEN
// ======================================
// Voor extra zekerheid wordt de data
// nogmaals gecontroleerd voordat de
// pagina wordt verlaten.
// ======================================

window.addEventListener(
    "beforeunload",
    () => {

        try {

            localStorage.setItem(
                OPSLAG_NAAM,
                JSON.stringify(
                    recepten
                )
            );

        } catch (error) {

            console.error(
                "Kon recepten niet veiligstellen:",
                error
            );

        }

    }
);


// ======================================
// START
// ======================================

receptenMigreren();

receptenWeergeven();

console.log(
    "Mijn Recepten gestart."
);
