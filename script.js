// ======================================
// MIJN RECEPTEN
// SCRIPT.JS
// KOOK / NEON / SKATER STYLE
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

const zoekWisKnop =
    document.getElementById("zoekWisKnop");

const receptenLijst =
    document.getElementById("receptenLijst");

const legeLijst =
    document.getElementById("legeLijst");

const zoekMelding =
    document.getElementById("zoekMelding");

const aantalRecepten =
    document.getElementById("aantalRecepten");

const aantalFavorieten =
    document.getElementById("aantalFavorieten");

const aantalRecent =
    document.getElementById("aantalRecent");

const lijstTitel =
    document.getElementById("lijstTitel");

const categorieKnoppen =
    document.getElementById("categorieKnoppen");

const alleReceptenKnop =
    document.getElementById("alleReceptenKnop");

const favorietenKnop =
    document.getElementById("favorietenKnop");

const sorteerInput =
    document.getElementById("sorteerInput");

const allesWissenKnop =
    document.getElementById("allesWissenKnop");


// ======================================
// OPSLAG
// ======================================

const OPSLAG_NAAM =
    "mijnRecepten";


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
        icoon: "🥘"
    },

    {
        naam: "Soep",
        icoon: "🍲"
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
        icoon: "🇮🇹"
    },

    {
        naam: "Indiaas",
        icoon: "🇮🇳"
    },

    {
        naam: "Aziatisch",
        icoon: "🥢"
    },

    {
        naam: "Burgers / Hotdogs / Sandwiches",
        icoon: "🍔"
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
        icoon: "🍞"
    },

    {
        naam: "Overige",
        icoon: "📦"
    }

];


// ======================================
// VARIABELEN
// ======================================

let recepten = [];

let actieveCategorie = "";

let alleenFavorieten = false;

let bewerkIndex = -1;


// ======================================
// LADEN UIT LOCALSTORAGE
// ======================================

function laadRecepten() {

    try {

        const opgeslagen =
            localStorage.getItem(OPSLAG_NAAM);

        if (opgeslagen) {

            recepten =
                JSON.parse(opgeslagen);

        } else {

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
// OPSLAAN IN LOCALSTORAGE
// ======================================

function bewaarRecepten() {

    localStorage.setItem(
        OPSLAG_NAAM,
        JSON.stringify(recepten)
    );

}


// ======================================
// UNIEKE ID MAKEN
// ======================================

function maakId() {

    return Date.now().toString() +
        Math.random()
            .toString(36)
            .substring(2);

}


// ======================================
// CATEGORIEËN IN FORMULIER
// ======================================

function laadCategorieSelect() {

    categorieInput.innerHTML = `
        <option value="">
            Kies een categorie
        </option>
    `;

    categorieen.forEach(categorie => {

        const option =
            document.createElement("option");

        option.value =
            categorie.naam;

        option.textContent =
            `${categorie.icoon} ${categorie.naam}`;

        categorieInput.appendChild(option);

    });

}


// ======================================
// CATEGORIE KNOPPEN
// ======================================

function laadCategorieKnoppen() {

    categorieKnoppen.innerHTML = "";

    categorieen.forEach(categorie => {

        const aantal =
            recepten.filter(
                recept =>
                    recept.categorie === categorie.naam
            ).length;

        const knop =
            document.createElement("button");

        knop.type = "button";

        knop.className =
            "categorie-knop";

        if (
            actieveCategorie ===
            categorie.naam &&
            !alleenFavorieten
        ) {

            knop.classList.add("actief");

        }

        knop.innerHTML = `

            <span class="categorie-icoon">
                ${categorie.icoon}
            </span>

            <span class="categorie-naam">
                ${categorie.naam}
            </span>

            <span class="categorie-aantal">
                ${aantal}
            </span>

        `;

        knop.addEventListener(
            "click",
            () => {

                actieveCategorie =
                    categorie.naam;

                alleenFavorieten = false;

                alleReceptenKnop
                    .classList.remove("actief");

                favorietenKnop
                    .classList.remove("actief");

                lijstTitel.textContent =
                    `${categorie.icoon} ${categorie.naam}`;

                laadCategorieKnoppen();

                toonRecepten();

            }
        );

        categorieKnoppen.appendChild(knop);

    });

}


// ======================================
// RECEPT TOEVOEGEN / BEWERKEN
// ======================================

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


    // ----------------------------------
    // CONTROLE
    // ----------------------------------

    if (!naam) {

        alert(
            "Vul eerst de naam van het recept in."
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


    // ----------------------------------
    // BEWERKEN
    // ----------------------------------

    if (bewerkIndex !== -1) {

        recepten[bewerkIndex].naam =
            naam;

        recepten[bewerkIndex].url =
            url;

        recepten[bewerkIndex].categorie =
            categorie;

        recepten[bewerkIndex].notitie =
            notitie;

        recepten[bewerkIndex].favoriet =
            favoriet;

        bewerkIndex = -1;

        opslaanKnop.textContent =
            "🍳 Recept opslaan";

    }

    // ----------------------------------
    // NIEUW RECEPT
    // ----------------------------------

    else {

        const nieuwRecept = {

            id: maakId(),

            naam: naam,

            url: url,

            categorie: categorie,

            notitie: notitie,

            favoriet: favoriet,

            aangemaakt:
                new Date().toISOString()

        };

        recepten.push(
            nieuwRecept
        );

    }


    // ----------------------------------
    // OPSLAAN
    // ----------------------------------

    bewaarRecepten();

    formulierLeegmaken();

    laadCategorieKnoppen();

    toonRecepten();

    updateDashboard();

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

    bewerkIndex = -1;

    opslaanKnop.textContent =
        "🍳 Recept opslaan";

}


// ======================================
// RECEPTEN TONEN
// ======================================

function toonRecepten() {

    let gefilterdeRecepten =
        [...recepten];


    // ----------------------------------
    // CATEGORIE FILTER
    // ----------------------------------

    if (actieveCategorie) {

        gefilterdeRecepten =
            gefilterdeRecepten.filter(
                recept =>
                    recept.categorie ===
                    actieveCategorie
            );

    }


    // ----------------------------------
    // FAVORIETEN FILTER
    // ----------------------------------

    if (alleenFavorieten) {

        gefilterdeRecepten =
            gefilterdeRecepten.filter(
                recept =>
                    recept.favoriet === true
            );

    }


    // ----------------------------------
    // ZOEKEN
    // ----------------------------------

    const zoekterm =
        zoekInput.value
            .trim()
            .toLowerCase();

    if (zoekterm) {

        gefilterdeRecepten =
            gefilterdeRecepten.filter(
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


    // ----------------------------------
    // SORTEREN
    // ----------------------------------

    const sortering =
        sorteerInput.value;


    if (sortering === "nieuwste") {

        gefilterdeRecepten.sort(
            (a, b) =>
                new Date(b.aangemaakt) -
                new Date(a.aangemaakt)
        );

    }


    if (sortering === "oudste") {

        gefilterdeRecepten.sort(
            (a, b) =>
                new Date(a.aangemaakt) -
                new Date(b.aangemaakt)
        );

    }


    if (sortering === "alfabetisch") {

        gefilterdeRecepten.sort(
            (a, b) =>
                a.naam.localeCompare(
                    b.naam,
                    "nl"
                )
        );

    }


    if (sortering === "favorieten") {

        gefilterdeRecepten.sort(
            (a, b) => {

                if (
                    a.favoriet ===
                    b.favoriet
                ) {

                    return a.naam.localeCompare(
                        b.naam,
                        "nl"
                    );

                }

                return a.favoriet ? -1 : 1;

            }
        );

    }


    // ----------------------------------
    // LIJST LEEGMAKEN
    // ----------------------------------

    receptenLijst.innerHTML = "";


    // ----------------------------------
    // GEEN RESULTATEN
    // ----------------------------------

    if (
        gefilterdeRecepten.length === 0
    ) {

        legeLijst.style.display =
            "block";

        if (recepten.length === 0) {

            legeLijst.textContent =
                "🍳 Nog geen recepten toegevoegd.";

        } else if (zoekterm) {

            legeLijst.textContent =
                "🔎 Geen recepten gevonden voor deze zoekopdracht.";

        } else if (alleenFavorieten) {

            legeLijst.textContent =
                "❤️ Je hebt nog geen favoriete recepten.";

        } else {

            legeLijst.textContent =
                "🍴 Geen recepten in deze categorie.";

        }

    } else {

        legeLijst.style.display =
            "none";

    }


    // ----------------------------------
    // RECEPTKAARTEN
    // ----------------------------------

    gefilterdeRecepten.forEach(
        recept => {

            const origineleIndex =
                recepten.findIndex(
                    item =>
                        item.id === recept.id
                );

            const kaart =
                maakReceptKaart(
                    recept,
                    origineleIndex
                );

            receptenLijst.appendChild(
                kaart
            );

        }
    );


    // ----------------------------------
    // ZOEKMELDING
    // ----------------------------------

    if (zoekterm) {

        zoekMelding.textContent =
            `${gefilterdeRecepten.length} resultaat${gefilterdeRecepten.length === 1 ? "" : "en"} gevonden`;

        zoekWisKnop.style.display =
            "block";

    } else {

        zoekMelding.textContent =
            "";

        zoekWisKnop.style.display =
            "none";

    }

}


// ======================================
// RECEPTKAART MAKEN
// ======================================

function maakReceptKaart(
    recept,
    index
) {

    const kaart =
        document.createElement("article");

    kaart.className =
        "recept-kaart";


    const favorietIcoon =
        recept.favoriet
            ? "❤️"
            : "🤍";


    const categorie =
        categorieen.find(
            item =>
                item.naam ===
                recept.categorie
        );


    const categorieIcoon =
        categorie
            ? categorie.icoon
            : "📂";


    kaart.innerHTML = `

        <div class="recept-bovenkant">

            <h3>
                ${escapeHtml(recept.naam)}
            </h3>

            <button
                type="button"
                class="favoriet-knop"
                title="Favoriet"
            >
                ${favorietIcoon}
            </button>

        </div>


        <span class="recept-categorie">

            ${categorieIcoon}

            ${escapeHtml(recept.categorie)}

        </span>


        <p class="recept-notitie
            ${recept.notitie
                ? ""
                : "geen-notitie"}">

            ${
                recept.notitie
                    ? escapeHtml(
                        recept.notitie
                    )
                    : "Geen eigen notitie toegevoegd."
            }

        </p>


        <div class="recept-acties">

            <a
                href="${escapeAttribute(recept.url)}"
                target="_blank"
                rel="noopener noreferrer"
                class="bekijk-knop"
            >
                🌐 Bekijk recept
            </a>


            <button
                type="button"
                class="bewerk-knop"
            >
                ✏️ Bewerken
            </button>


            <button
                type="button"
                class="verwijder-knop"
            >
                🗑️ Verwijderen
            </button>

        </div>

    `;


    // ==================================
    // FAVORIET
    // ==================================

    const favorietKnop =
        kaart.querySelector(
            ".favoriet-knop"
        );

    favorietKnop.addEventListener(
        "click",
        () => {

            recepten[index].favoriet =
                !recepten[index].favoriet;

            bewaarRecepten();

            laadCategorieKnoppen();

            toonRecepten();

            updateDashboard();

        }
    );


    // ==================================
    // BEWERKEN
    // ==================================

    const bewerkKnop =
        kaart.querySelector(
            ".bewerk-knop"
        );

    bewerkKnop.addEventListener(
        "click",
        () => {

            bewerkRecept(index);

        }
    );


    // ==================================
    // VERWIJDEREN
    // ==================================

    const verwijderKnop =
        kaart.querySelector(
            ".verwijder-knop"
        );

    verwijderKnop.addEventListener(
        "click",
        () => {

            verwijderRecept(index);

        }
    );


    return kaart;

}


// ======================================
// RECEPT BEWERKEN
// ======================================

function bewerkRecept(index) {

    const recept =
        recepten[index];

    if (!recept) return;


    naamInput.value =
        recept.naam;

    urlInput.value =
        recept.url;

    categorieInput.value =
        recept.categorie;

    notitieInput.value =
        recept.notitie || "";

    favorietInput.checked =
        recept.favoriet === true;


    bewerkIndex =
        index;


    opslaanKnop.textContent =
        "💾 Wijzigingen opslaan";


    document.querySelector(
        ".toevoegen-section"
    ).scrollIntoView({
        behavior: "smooth",
        block: "start"
    });


    naamInput.focus();

}


// ======================================
// RECEPT VERWIJDEREN
// ======================================

function verwijderRecept(index) {

    const recept =
        recepten[index];

    if (!recept) return;


    const bevestiging =
        confirm(
            `Weet je zeker dat je "${recept.naam}" wilt verwijderen?`
        );


    if (!bevestiging) return;


    recepten.splice(
        index,
        1
    );


    bewaarRecepten();

    laadCategorieKnoppen();

    toonRecepten();

    updateDashboard();

}


// ======================================
// ALLE RECEPTEN WISSEN
// ======================================

function allesWissen() {

    if (recepten.length === 0) {

        alert(
            "Er zijn geen recepten om te wissen."
        );

        return;

    }


    const bevestiging =
        confirm(
            "⚠️ Weet je zeker dat je ALLE recepten wilt wissen?\n\nDeze actie kan niet ongedaan worden gemaakt."
        );


    if (!bevestiging) return;


    recepten = [];


    bewaarRecepten();

    actieveCategorie = "";

    alleenFavorieten = false;


    alleReceptenKnop
        .classList.add("actief");

    favorietenKnop
        .classList.remove("actief");


    lijstTitel.textContent =
        "🍴 Mijn recepten";


    laadCategorieKnoppen();

    toonRecepten();

    updateDashboard();

}


// ======================================
// ALLE RECEPTEN
// ======================================

function toonAlleRecepten() {

    actieveCategorie = "";

    alleenFavorieten = false;


    alleReceptenKnop
        .classList.add("actief");

    favorietenKnop
        .classList.remove("actief");


    lijstTitel.textContent =
        "🍴 Mijn recepten";


    laadCategorieKnoppen();

    toonRecepten();

}


// ======================================
// FAVORIETEN
// ======================================

function toonFavorieten() {

    actieveCategorie = "";

    alleenFavorieten = true;


    alleReceptenKnop
        .classList.remove("actief");

    favorietenKnop
        .classList.add("actief");


    lijstTitel.textContent =
        "❤️ Mijn favorieten";


    laadCategorieKnoppen();

    toonRecepten();

}


// ======================================
// DASHBOARD BIJWERKEN
// ======================================

function updateDashboard() {

    // Totaal recepten

    aantalRecepten.textContent =
        recepten.length;


    // Totaal favorieten

    const favorieten =
        recepten.filter(
            recept =>
                recept.favoriet === true
        ).length;

    aantalFavorieten.textContent =
        favorieten;


    // ----------------------------------
    // RECEPTEN VAN DEZE WEEK
    // ----------------------------------

    const nu =
        new Date();

    const weekGeleden =
        new Date();

    weekGeleden.setDate(
        nu.getDate() - 7
    );


    const recenteRecepten =
        recepten.filter(
            recept => {

                if (!recept.aangemaakt) {
                    return false;
                }

                const datum =
                    new Date(
                        recept.aangemaakt
                    );

                return datum >= weekGeleden;

            }
        );


    aantalRecent.textContent =
        recenteRecepten.length;

}


// ======================================
// ZOEKEN
// ======================================

zoekInput.addEventListener(
    "input",
    () => {

        toonRecepten();

    }
);


// ======================================
// ZOEKOPDRACHT WISSEN
// ======================================

zoekWisKnop.addEventListener(
    "click",
    () => {

        zoekInput.value = "";

        toonRecepten();

        zoekInput.focus();

    }
);


// ======================================
// SORTEREN
// ======================================

sorteerInput.addEventListener(
    "change",
    () => {

        toonRecepten();

    }
);


// ======================================
// ALLES
// ======================================

alleReceptenKnop.addEventListener(
    "click",
    () => {

        toonAlleRecepten();

    }
);


// ======================================
// FAVORIETEN
// ======================================

favorietenKnop.addEventListener(
    "click",
    () => {

        toonFavorieten();

    }
);


// ======================================
// OPSLAAN
// ======================================

opslaanKnop.addEventListener(
    "click",
    () => {

        slaReceptOp();

    }
);


// ======================================
// ENTER BIJ NAAM
// ======================================

naamInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            urlInput.focus();

        }

    }
);


// ======================================
// ENTER BIJ URL
// ======================================

urlInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            categorieInput.focus();

        }

    }
);


// ======================================
// ALLES WISSEN
// ======================================

allesWissenKnop.addEventListener(
    "click",
    () => {

        allesWissen();

    }
);


// ======================================
// HTML VEILIG MAKEN
// ======================================

function escapeHtml(tekst) {

    if (tekst === undefined ||
        tekst === null) {

        return "";

    }


    return String(tekst)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


// ======================================
// URL VEILIG MAKEN
// ======================================

function escapeAttribute(tekst) {

    if (
        tekst === undefined ||
        tekst === null
    ) {

        return "";

    }


    return String(tekst)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        );

}


// ======================================
// START APP
// ======================================

function startApp() {

    laadRecepten();

    laadCategorieSelect();

    laadCategorieKnoppen();

    updateDashboard();

    toonRecepten();

}


// ======================================
// STARTEN
// ======================================

startApp();
