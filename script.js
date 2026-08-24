// ======================================
// MIJN RECEPTEN
// JAVASCRIPT
// ======================================


// ======================================
// OPSLAG
// ======================================

const OPSLAG_NAAM = "mijnRecepten";

let recepten = [];

let actieveCategorie = "Alles";

let alleenFavorieten = false;

let bewerkIndex = null;


// ======================================
// CATEGORIEËN
// ======================================

const categorieen = [

    {
        naam: "Ontbijt",
        icoon: "🍳"
    },

    {
        naam: "Kip",
        icoon: "🍗"
    },

    {
        naam: "Vis",
        icoon: "🐟"
    },

    {
        naam: "Vlees",
        icoon: "🥩"
    },

    {
        naam: "Slowcook",
        icoon: "🍲"
    },

    {
        naam: "Soep",
        icoon: "🥣"
    },

    {
        naam: "BBQ",
        icoon: "🔥"
    },

    {
        naam: "Groente bijgerechten",
        icoon: "🥦"
    },

    {
        naam: "Aardappel bijgerechten",
        icoon: "🥔"
    },

    {
        naam: "Italiaans",
        icoon: "🍕"
    },

    {
        naam: "Indiaas",
        icoon: "🍛"
    },

    {
        naam: "Aziatisch",
        icoon: "🥢"
    },

    {
        naam: "Burgers / Hotdogs",
        icoon: "🍔"
    },

    {
        naam: "Sandwiches",
        icoon: "🥪"
    },

    {
        naam: "Snacks",
        icoon: "🍟"
    },

    {
        naam: "Pasta's",
        icoon: "🍝"
    },

    {
        naam: "Afrikaans",
        icoon: "🌍"
    },

    {
        naam: "Mexicaans",
        icoon: "🌮"
    },

    {
        naam: "Brood / Bakken",
        icoon: "🥖"
    },

    {
        naam: "Overige",
        icoon: "🍴"
    }

];


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

const zoekWisKnop =
    document.getElementById("zoekWisKnop");

const zoekMelding =
    document.getElementById("zoekMelding");

const receptenLijst =
    document.getElementById("receptenLijst");

const legeLijst =
    document.getElementById("legeLijst");

const aantalRecepten =
    document.getElementById("aantalRecepten");

const aantalFavorieten =
    document.getElementById("aantalFavorieten");

const aantalRecent =
    document.getElementById("aantalRecent");

const categorieKnoppen =
    document.getElementById("categorieKnoppen");

const alleReceptenKnop =
    document.getElementById("alleReceptenKnop");

const favorietenKnop =
    document.getElementById("favorietenKnop");

const sorteerInput =
    document.getElementById("sorteerInput");

const lijstTitel =
    document.getElementById("lijstTitel");

const allesWissenKnop =
    document.getElementById("allesWissenKnop");

const naarToevoegenKnop =
    document.getElementById("naarToevoegenKnop");

const naarBeheerKnop =
    document.getElementById("naarBeheerKnop");

const toevoegenSectie =
    document.getElementById("toevoegenSectie");

const beheerSectie =
    document.getElementById("beheerSectie");

const receptenSectie =
    document.getElementById("receptenSectie");


// ======================================
// LADEN
// ======================================

function laadRecepten() {

    const opgeslagen =
        localStorage.getItem(OPSLAG_NAAM);

    if (!opgeslagen) {

        recepten = [];

        return;

    }

    try {

        recepten =
            JSON.parse(opgeslagen);

        if (!Array.isArray(recepten)) {

            recepten = [];

        }

    } catch (fout) {

        console.error(
            "Recepten konden niet worden geladen:",
            fout
        );

        recepten = [];

    }

}


// ======================================
// OPSLAAN
// ======================================

function bewaarRecepten() {

    localStorage.setItem(
        OPSLAG_NAAM,
        JSON.stringify(recepten)
    );

}


// ======================================
// CATEGORIE SELECT
// ======================================

function vulCategorieSelect() {

    categorieInput.innerHTML = `
        <option value="">
            Kies een categorie
        </option>
    `;

    categorieen.forEach(categorie => {

        const optie =
            document.createElement("option");

        optie.value =
            categorie.naam;

        optie.textContent =
            `${categorie.icoon} ${categorie.naam}`;

        categorieInput.appendChild(optie);

    });

}


// ======================================
// CATEGORIE KNOPPEN
// ======================================

function maakCategorieKnoppen() {

    categorieKnoppen.innerHTML = "";

    categorieen.forEach(categorie => {

        const knop =
            document.createElement("button");

        knop.type = "button";

        knop.className =
            "categorie-knop";

        if (
            actieveCategorie ===
            categorie.naam
        ) {

            knop.classList.add("actief");

        }

        const aantal =
            recepten.filter(
                recept =>
                    recept.categorie ===
                    categorie.naam
            ).length;

        knop.innerHTML = `

            <span class="categorie-icoon">
                ${categorie.icoon}
            </span>

            <span class="categorie-naam">
                ${categorie.naam}
            </span>

            <span class="categorie-aantal">
                ${aantal} recept${aantal === 1 ? "" : "en"}
            </span>

        `;


        knop.addEventListener(
            "click",
            () => {

                actieveCategorie =
                    categorie.naam;

                alleenFavorieten =
                    false;

                updateAllesKnop();

                renderAlles();

                scrollNaarRecepten();

            }
        );


        categorieKnoppen.appendChild(knop);

    });

}


// ======================================
// ALLES KNOP
// ======================================

alleReceptenKnop.addEventListener(
    "click",
    () => {

        actieveCategorie =
            "Alles";

        alleenFavorieten =
            false;

        updateAllesKnop();

        renderAlles();

        scrollNaarRecepten();

    }
);


function updateAllesKnop() {

    if (
        actieveCategorie === "Alles" &&
        !alleenFavorieten
    ) {

        alleReceptenKnop.classList.add(
            "actief"
        );

    } else {

        alleReceptenKnop.classList.remove(
            "actief"
        );

    }

}


// ======================================
// FAVORIETEN
// ======================================

favorietenKnop.addEventListener(
    "click",
    () => {

        alleenFavorieten =
            !alleenFavorieten;

        actieveCategorie =
            "Alles";

        updateAllesKnop();

        renderAlles();

        scrollNaarRecepten();

    }
);


// ======================================
// RECEPT TOEVOEGEN
// ======================================

opslaanKnop.addEventListener(
    "click",
    slaReceptOp
);


function slaReceptOp() {

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
            "Vul eerst de naam van het recept in."
        );

        naamInput.focus();

        return;

    }


    if (!url) {

        alert(
            "Vul de link naar het recept in."
        );

        urlInput.focus();

        return;

    }


    if (!categorie) {

        alert(
            "Kies een categorie."
        );

        categorieInput.focus();

        return;

    }


    if (bewerkIndex !== null) {

        const bestaand =
            recepten[bewerkIndex];

        recepten[bewerkIndex] = {

            ...bestaand,

            naam,
            url,
            categorie,
            notitie,
            favoriet

        };

        bewerkIndex = null;

        opslaanKnop.textContent =
            "🍳 Recept opslaan";

    } else {

        recepten.push({

            id:
                Date.now(),

            naam,

            url,

            categorie,

            notitie,

            favoriet,

            datum:
                new Date().toISOString()

        });

    }


    bewaarRecepten();

    leegFormulier();

    maakCategorieKnoppen();

    renderAlles();

    alert(
        "Recept succesvol opgeslagen! 🍴"
    );

}


// ======================================
// FORMULIER LEGEN
// ======================================

function leegFormulier() {

    naamInput.value = "";

    urlInput.value = "";

    categorieInput.value = "";

    notitieInput.value = "";

    favorietInput.checked = false;

}


// ======================================
// RECEPTEN FILTEREN
// ======================================

function krijgGefilterdeRecepten() {

    let resultaat =
        [...recepten];


    if (actieveCategorie !== "Alles") {

        resultaat =
            resultaat.filter(
                recept =>
                    recept.categorie ===
                    actieveCategorie
            );

    }


    if (alleenFavorieten) {

        resultaat =
            resultaat.filter(
                recept =>
                    recept.favoriet === true
            );

    }


    const zoekterm =
        zoekInput.value
            .trim()
            .toLowerCase();


    if (zoekterm) {

        resultaat =
            resultaat.filter(
                recept => {

                    const tekst = `

                        ${recept.naam}

                        ${recept.categorie}

                        ${recept.notitie}

                    `.toLowerCase();

                    return tekst.includes(
                        zoekterm
                    );

                }
            );

    }


    return sorteerRecepten(
        resultaat
    );

}


// ======================================
// SORTEREN
// ======================================

function sorteerRecepten(lijst) {

    const sortering =
        sorteerInput.value;


    if (
        sortering === "alfabetisch"
    ) {

        return lijst.sort(
            (a, b) =>
                a.naam.localeCompare(
                    b.naam,
                    "nl"
                )
        );

    }


    if (
        sortering === "oudste"
    ) {

        return lijst.sort(
            (a, b) =>
                new Date(a.datum) -
                new Date(b.datum)
        );

    }


    if (
        sortering === "favorieten"
    ) {

        return lijst.sort(
            (a, b) => {

                if (
                    a.favoriet ===
                    b.favoriet
                ) {

                    return new Date(b.datum) -
                        new Date(a.datum);

                }

                return b.favoriet - a.favoriet;

            }
        );

    }


    return lijst.sort(
        (a, b) =>
            new Date(b.datum) -
            new Date(a.datum)
    );

}


// ======================================
// RENDER
// ======================================

function renderAlles() {

    maakCategorieKnoppen();

    updateDashboard();

    renderRecepten();

    updateTitel();

}


// ======================================
// RECEPTEN TONEN
// ======================================

function renderRecepten() {

    receptenLijst.innerHTML = "";

    const lijst =
        krijgGefilterdeRecepten();


    if (lijst.length === 0) {

        receptenLijst.innerHTML = "";

        legeLijst.style.display =
            "block";

        if (recepten.length === 0) {

            legeLijst.textContent =
                "Nog geen recepten toegevoegd.";

        } else {

            legeLijst.textContent =
                "Geen recepten gevonden met deze selectie.";

        }

        zoekMelding.textContent = "";

        return;

    }


    legeLijst.style.display =
        "none";


    if (zoekInput.value.trim()) {

        zoekMelding.textContent =
            `${lijst.length} recept${lijst.length === 1 ? "" : "en"} gevonden.`;

    } else {

        zoekMelding.textContent = "";

    }


    lijst.forEach(
        recept => {

            const origineleIndex =
                recepten.findIndex(
                    item =>
                        item.id ===
                        recept.id
                );

            receptenLijst.appendChild(
                maakReceptKaart(
                    recept,
                    origineleIndex
                )
            );

        }
    );

}


// ======================================
// RECEPT KAART
// ======================================

function maakReceptKaart(
    recept,
    index
) {

    const kaart =
        document.createElement("article");

    kaart.className =
        "recept-kaart";


    const bovenkant =
        document.createElement("div");

    bovenkant.className =
        "recept-bovenkant";


    const titel =
        document.createElement("h3");

    titel.textContent =
        recept.naam;


    const favoriet =
        document.createElement("button");

    favoriet.type =
        "button";

    favoriet.className =
        "favoriet-knop";

    favoriet.textContent =
        recept.favoriet
            ? "❤️"
            : "🤍";

    favoriet.title =
        recept.favoriet
            ? "Verwijder uit favorieten"
            : "Voeg toe aan favorieten";


    favoriet.addEventListener(
        "click",
        () => {

            recepten[index].favoriet =
                !recept.favoriet;

            bewaarRecepten();

            renderAlles();

        }
    );


    bovenkant.appendChild(titel);

    bovenkant.appendChild(favoriet);


    const categorie =
        document.createElement("span");

    categorie.className =
        "recept-categorie";

    const categorieInfo =
        categorieen.find(
            item =>
                item.naam ===
                recept.categorie
        );

    categorie.textContent =
        categorieInfo
            ? `${categorieInfo.icoon} ${recept.categorie}`
            : recept.categorie;


    const notitie =
        document.createElement("p");

    notitie.className =
        "recept-notitie";


    if (recept.notitie) {

        notitie.textContent =
            recept.notitie;

    } else {

        notitie.textContent =
            "Geen eigen notitie toegevoegd.";

        notitie.classList.add(
            "geen-notitie"
        );

    }


    const acties =
        document.createElement("div");

    acties.className =
        "recept-acties";


    const bekijken =
        document.createElement("a");

    bekijken.className =
        "bekijk-knop";

    bekijken.href =
        recept.url;

    bekijken.target =
        "_blank";

    bekijken.rel =
        "noopener noreferrer";

    bekijken.textContent =
        "🔗 Bekijk recept";


    const bewerken =
        document.createElement("button");

    bewerken.type =
        "button";

    bewerken.className =
        "bewerk-knop";

    bewerken.textContent =
        "✏️ Bewerken";


    bewerken.addEventListener(
        "click",
        () => {

            bewerkRecept(index);

        }
    );


    const verwijderen =
        document.createElement("button");

    verwijderen.type =
        "button";

    verwijderen.className =
        "verwijder-knop";

    verwijderen.textContent =
        "🗑️ Verwijderen";


    verwijderen.addEventListener(
        "click",
        () => {

            verwijderRecept(index);

        }
    );


    acties.appendChild(
        bekijken
    );

    acties.appendChild(
        bewerken
    );

    acties.appendChild(
        verwijderen
    );


    kaart.appendChild(
        bovenkant
    );

    kaart.appendChild(
        categorie
    );

    kaart.appendChild(
        notitie
    );

    kaart.appendChild(
        acties
    );


    return kaart;

}


// ======================================
// BEWERKEN
// ======================================

function bewerkRecept(index) {

    const recept =
        recepten[index];

    if (!recept) {
        return;
    }


    bewerkIndex =
        index;


    naamInput.value =
        recept.naam || "";

    urlInput.value =
        recept.url || "";

    categorieInput.value =
        recept.categorie || "";

    notitieInput.value =
        recept.notitie || "";

    favorietInput.checked =
        recept.favoriet === true;


    opslaanKnop.textContent =
        "💾 Recept wijzigen";


    toevoegenSectie.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });


    naamInput.focus();

}


// ======================================
// VERWIJDEREN
// ======================================

function verwijderRecept(index) {

    const recept =
        recepten[index];

    if (!recept) {
        return;
    }


    const akkoord =
        confirm(
            `Weet je zeker dat je "${recept.naam}" wilt verwijderen?`
        );


    if (!akkoord) {
        return;
    }


    recepten.splice(
        index,
        1
    );


    bewaarRecepten();

    renderAlles();

}


// ======================================
// ALLES WISSEN
// ======================================

allesWissenKnop.addEventListener(
    "click",
    () => {

        if (recepten.length === 0) {

            alert(
                "Er zijn geen recepten om te wissen."
            );

            return;

        }


        const akkoord =
            confirm(
                "Weet je zeker dat je ALLE recepten wilt verwijderen?\n\nDit kan niet ongedaan worden gemaakt."
            );


        if (!akkoord) {
            return;
        }


        recepten = [];

        bewaarRecepten();

        actieveCategorie =
            "Alles";

        alleenFavorieten =
            false;

        leegFormulier();

        renderAlles();

    }
);


// ======================================
// ZOEKEN
// ======================================

zoekInput.addEventListener(
    "input",
    () => {

        updateZoekKnop();

        renderRecepten();

        updateTitel();

    }
);


zoekWisKnop.addEventListener(
    "click",
    () => {

        zoekInput.value = "";

        updateZoekKnop();

        renderRecepten();

        updateTitel();

        zoekInput.focus();

    }
);


function updateZoekKnop() {

    if (
        zoekInput.value.trim()
    ) {

        zoekWisKnop.style.display =
            "block";

    } else {

        zoekWisKnop.style.display =
            "none";

    }

}


// ======================================
// SORTEREN
// ======================================

sorteerInput.addEventListener(
    "change",
    () => {

        renderRecepten();

    }
);


// ======================================
// DASHBOARD
// ======================================

function updateDashboard() {

    aantalRecepten.textContent =
        recepten.length;


    aantalFavorieten.textContent =
        recepten.filter(
            recept =>
                recept.favoriet === true
        ).length;


    const nu =
        new Date();

    const weekGeleden =
        new Date(
            nu.getTime() -
            7 * 24 * 60 * 60 * 1000
        );


    const recent =
        recepten.filter(
            recept =>
                new Date(recept.datum) >=
                weekGeleden
        ).length;


    aantalRecent.textContent =
        recent;

}


// ======================================
// TITEL
// ======================================

function updateTitel() {

    if (alleenFavorieten) {

        lijstTitel.textContent =
            "❤️ Mijn favorieten";

        return;

    }


    if (
        actieveCategorie !==
        "Alles"
    ) {

        const info =
            categorieen.find(
                item =>
                    item.naam ===
                    actieveCategorie
            );

        lijstTitel.textContent =
            info
                ? `${info.icoon} ${info.naam}`
                : actieveCategorie;

        return;

    }


    if (zoekInput.value.trim()) {

        lijstTitel.textContent =
            "🔎 Zoekresultaten";

        return;

    }


    lijstTitel.textContent =
        "🍴 Mijn recepten";

}


// ======================================
// SCROLL NAAR RECEPTEN
// ======================================

function scrollNaarRecepten() {

    setTimeout(
        () => {

            receptenSectie.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        },
        50
    );

}


// ======================================
// SNELMENU → TOEVOEGEN
// ======================================

naarToevoegenKnop.addEventListener(
    "click",
    () => {

        toevoegenSectie.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


// ======================================
// SNELMENU → BEHEER
// ======================================

naarBeheerKnop.addEventListener(
    "click",
    () => {

        beheerSectie.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


// ======================================
// START APP
// ======================================

laadRecepten();

vulCategorieSelect();

maakCategorieKnoppen();

renderAlles();

updateZoekKnop();

