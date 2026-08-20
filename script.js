// ======================================
// MIJN RECEPTEN - JAVASCRIPT
// ======================================


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

const categorieKnoppen =
    document.querySelectorAll(".categorie-knop");


// ======================================
// OPSLAG
// ======================================

const OPSLAG_NAAM =
    "mijnRecepten";

let recepten =
    JSON.parse(
        localStorage.getItem(OPSLAG_NAAM)
    ) || [];


// ======================================
// HUIDIGE FILTER
// ======================================

let huidigeCategorie = null;

let alleenFavorieten = false;


// ======================================
// OPSLAAN
// ======================================

function receptenOpslaan() {

    localStorage.setItem(
        OPSLAG_NAAM,
        JSON.stringify(recepten)
    );
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


    if (!naam) {

        alert(
            "Vul eerst een naam voor het recept in."
        );

        naamInput.focus();

        return;
    }


    if (!url) {

        alert(
            "Vul eerst de link naar het recept in."
        );

        urlInput.focus();

        return;
    }


    if (!categorie) {

        alert(
            "Kies eerst een categorie."
        );

        categorieInput.focus();

        return;
    }


    try {

        new URL(url);

    } catch {

        alert(
            "Vul een geldige URL in."
        );

        urlInput.focus();

        return;
    }


    const nieuwRecept = {

        id:
            Date.now(),

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


    recepten.unshift(
        nieuwRecept
    );


    receptenOpslaan();

    formulierLeegmaken();

    receptenWeergeven();
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

    naamInput.focus();
}


// ======================================
// RECEPTEN WEERGEVEN
// ======================================

function receptenWeergeven() {

    receptenLijst.innerHTML = "";


    const zoekterm =
        zoekInput.value
            .toLowerCase()
            .trim();


    // ----------------------------------
    // NOG GEEN FILTER?
    // ----------------------------------

    const heeftFilter =
        zoekterm !== "" ||
        huidigeCategorie !== null ||
        alleenFavorieten;


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
        recepten.filter(recept => {


            const komtOvereenMetZoekterm =
                !zoekterm ||

                recept.naam
                    .toLowerCase()
                    .includes(zoekterm) ||

                recept.notitie
                    .toLowerCase()
                    .includes(zoekterm);


            const komtOvereenMetCategorie =
                !huidigeCategorie ||

                recept.categorie ===
                    huidigeCategorie;


            const komtOvereenMetFavoriet =
                !alleenFavorieten ||

                recept.favoriet;


            return (

                komtOvereenMetZoekterm &&

                komtOvereenMetCategorie &&

                komtOvereenMetFavoriet

            );

        });


    // ----------------------------------
    // TITEL
    // ----------------------------------

    if (alleenFavorieten) {

        lijstTitel.textContent =
            "⭐ Favorieten";

    } else if (huidigeCategorie) {

        lijstTitel.textContent =
            huidigeCategorie;

    } else {

        lijstTitel.textContent =
            "Zoekresultaten";

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
    // KAARTEN
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

            const notitie =
                document.createElement(
                    "div"
                );

            notitie.className =
                "recept-notitie";


            if (recept.notitie) {

                notitie.textContent =
                    recept.notitie;

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
            // FAVORIET
            // --------------------------

            const favorietKnop =
                document.createElement(
                    "button"
                );

            favorietKnop.textContent =
                recept.favoriet
                    ? "⭐ Verwijder favoriet"
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


            // --------------------------
            // KNOPPEN TOEVOEGEN
            // --------------------------

            acties.appendChild(
                openKnop
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


            if (recept.notitie) {

                kaart.appendChild(
                    notitie
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


        categorieKnoppen
            .forEach(
                knop => {

                    knop.classList.remove(
                        "actief"
                    );

                }
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


        receptenWeergeven();

    }
);


// ======================================
// OPSLAAN
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

        if (recepten.length === 0) {

            alert(
                "Er staan nog geen recepten in de lijst."
            );

            return;
        }


        const bevestiging =
            confirm(
                "Weet je zeker dat je ALLE opgeslagen recepten wilt verwijderen?"
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
// ENTER = OPSLAAN
// ======================================

naamInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            event.preventDefault();

            receptToevoegen();

        }

    }
);


// ======================================
// START
// ======================================

receptenWeergeven();
