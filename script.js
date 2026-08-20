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

const filterInput =
    document.getElementById("filterInput");

const receptenLijst =
    document.getElementById("receptenLijst");

const legeLijst =
    document.getElementById("legeLijst");

const aantalRecepten =
    document.getElementById("aantalRecepten");

const allesWissenKnop =
    document.getElementById("allesWissenKnop");


// ======================================
// OPSLAG
// ======================================

const OPSLAG_NAAM =
    "mijnRecepten";

let recepten =
    JSON.parse(localStorage.getItem(OPSLAG_NAAM)) || [];


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
// NIEUW RECEPT
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


    // Controle

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


    // URL controleren

    try {

        new URL(url);

    } catch {

        alert(
            "Vul een geldige URL in."
        );

        urlInput.focus();

        return;
    }


    // Nieuw recept maken

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


    // Toevoegen

    recepten.unshift(nieuwRecept);


    // Opslaan

    receptenOpslaan();


    // Formulier leegmaken

    formulierLeegmaken();


    // Lijst opnieuw tonen

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


    const categorie =
        filterInput.value;


    const gefilterdeRecepten =
        recepten.filter(recept => {

            const komtOvereenMetZoekterm =
                recept.naam
                    .toLowerCase()
                    .includes(zoekterm) ||

                recept.notitie
                    .toLowerCase()
                    .includes(zoekterm);


            const komtOvereenMetCategorie =
                categorie === "alle" ||
                recept.categorie === categorie;


            return (
                komtOvereenMetZoekterm &&
                komtOvereenMetCategorie
            );

        });


    // Aantal

    aantalRecepten.textContent =
        `${gefilterdeRecepten.length} recept${
            gefilterdeRecepten.length === 1
                ? ""
                : "en"
        }`;


    // Geen recepten

    if (gefilterdeRecepten.length === 0) {

        legeLijst.style.display = "block";

        if (recepten.length > 0) {

            legeLijst.querySelector("h3").textContent =
                "Geen recepten gevonden";

            legeLijst.querySelector("p").textContent =
                "Probeer een andere zoekterm of categorie.";

        } else {

            legeLijst.querySelector("h3").textContent =
                "Nog geen recepten";

            legeLijst.querySelector("p").textContent =
                "Voeg hierboven je eerste recept toe.";
        }

        return;
    }


    legeLijst.style.display = "none";


    // Recepten maken

    gefilterdeRecepten.forEach(recept => {

        const kaart =
            document.createElement("article");

        kaart.className =
            "recept-kaart";


        // Kop

        const kop =
            document.createElement("div");

        kop.className =
            "recept-kop";


        const naam =
            document.createElement("h3");

        naam.className =
            "recept-naam";

        naam.textContent =
            recept.naam;


        const favoriet =
            document.createElement("span");

        favoriet.className =
            "favoriet";

        favoriet.textContent =
            recept.favoriet
                ? "⭐"
                : "";


        kop.appendChild(naam);
        kop.appendChild(favoriet);


        // Categorie

        const categorieElement =
            document.createElement("span");

        categorieElement.className =
            "categorie";

        categorieElement.textContent =
            recept.categorie;


        // Notitie

        const notitie =
            document.createElement("div");

        notitie.className =
            "recept-notitie";

        if (recept.notitie) {

            notitie.textContent =
                recept.notitie;

        }


        // Acties

        const acties =
            document.createElement("div");

        acties.className =
            "recept-acties";


        // Openen

        const openKnop =
            document.createElement("button");

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


        // Favoriet

        const favorietKnop =
            document.createElement("button");

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


        // Verwijderen

        const verwijderKnop =
            document.createElement("button");

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
                            item.id !== recept.id
                    );


                receptenOpslaan();

                receptenWeergeven();

            }
        );


        acties.appendChild(openKnop);
        acties.appendChild(favorietKnop);
        acties.appendChild(verwijderKnop);


        // Kaart samenstellen

        kaart.appendChild(kop);

        kaart.appendChild(categorieElement);

        if (recept.notitie) {
            kaart.appendChild(notitie);
        }

        kaart.appendChild(acties);


        receptenLijst.appendChild(kaart);

    });

}


// ======================================
// ALLES WISSEN
// ======================================

function allesWissen() {

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


// ======================================
// EVENT LISTENERS
// ======================================

opslaanKnop.addEventListener(
    "click",
    receptToevoegen
);


allesWissenKnop.addEventListener(
    "click",
    allesWissen
);


zoekInput.addEventListener(
    "input",
    receptenWeergeven
);


filterInput.addEventListener(
    "change",
    receptenWeergeven
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