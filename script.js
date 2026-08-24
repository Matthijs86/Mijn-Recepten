// ======================================
// MIJN RECEPTEN
// JAVASCRIPT
// OPTIE 7 + 8 TOEGEVOEGD
// ======================================


// ======================================
// OPSLAG
// ======================================

const OPSLAG_NAAM = "mijnRecepten";

let recepten = [];


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

const allesWissenKnop =
    document.getElementById("allesWissenKnop");

const favorietenKnop =
    document.getElementById("favorietenKnop");

const categorieKnoppen =
    document.getElementById("categorieKnoppen");

const alleReceptenKnop =
    document.getElementById("alleReceptenKnop");

const sorteerInput =
    document.getElementById("sorteerInput");

const exporteerKnop =
    document.getElementById("exporteerKnop");

const importeerKnop =
    document.getElementById("importeerKnop");

const importBestand =
    document.getElementById("importBestand");


// ======================================
// CATEGORIEËN
// ======================================

const categorieen = [

    {
        naam: "Ontbijt",
        icoon: "🥐"
    },

    {
        naam: "Lunch",
        icoon: "🥪"
    },

    {
        naam: "Diner",
        icoon: "🍽️"
    },

    {
        naam: "Pasta",
        icoon: "🍝"
    },

    {
        naam: "Kip",
        icoon: "🍗"
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
        naam: "Salade",
        icoon: "🥗"
    },

    {
        naam: "Snack",
        icoon: "🍟"
    },

    {
        naam: "Dessert",
        icoon: "🍰"
    },

    {
        naam: "Overig",
        icoon: "🍴"
    }

];


// ======================================
// STATUS
// ======================================

let actieveCategorie = "";

let alleenFavorieten = false;

let bewerkIndex = -1;


// ======================================
// OPSLAG LADEN
// ======================================

function laadRecepten() {

    try {

        const opgeslagen =
            localStorage.getItem(OPSLAG_NAAM);

        if (!opgeslagen) {

            recepten = [];

            return;
        }

        const data =
            JSON.parse(opgeslagen);

        if (Array.isArray(data)) {

            recepten =
                normaliseerRecepten(data);

            return;
        }

        // Extra bescherming wanneer
        // de opslag ooit als object
        // werd opgeslagen.

        if (
            data &&
            Array.isArray(data.recepten)
        ) {

            recepten =
                normaliseerRecepten(
                    data.recepten
                );

            return;
        }

        recepten = [];

    } catch (fout) {

        console.error(
            "Fout bij laden recepten:",
            fout
        );

        recepten = [];
    }
}


// ======================================
// RECEPTEN NORMALISEREN
// ======================================

function normaliseerRecepten(lijst) {

    return lijst.map(
        (recept, index) => {

            const datum =
                recept.datum ||
                recept.aangemaakt ||
                recept.createdAt ||
                new Date().toISOString();

            return {

                id:
                    recept.id ||
                    Date.now() + index,

                naam:
                    recept.naam ||
                    recept.titel ||
                    "",

                url:
                    recept.url ||
                    recept.link ||
                    "",

                categorie:
                    recept.categorie ||
                    "Overig",

                notitie:
                    recept.notitie ||
                    "",

                favoriet:
                    Boolean(
                        recept.favoriet
                    ),

                datum:
                    datum
            };

        }
    );
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
// CATEGORIE SELECT VULLEN
// ======================================

function vulCategorieSelect() {

    categorieInput.innerHTML = `
        <option value="">
            Kies een categorie
        </option>
    `;

    categorieen.forEach(
        categorie => {

            const option =
                document.createElement("option");

            option.value =
                categorie.naam;

            option.textContent =
                categorie.naam;

            categorieInput.appendChild(
                option
            );
        }
    );
}


// ======================================
// CATEGORIE KNOPPEN
// ======================================

function toonCategorieKnoppen() {

    categorieKnoppen.innerHTML = "";

    categorieen.forEach(
        categorie => {

            const aantal =
                recepten.filter(
                    recept =>
                        recept.categorie ===
                        categorie.naam
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
                    ${escapeHtml(categorie.naam)}
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

                    zoekInput.value = "";

                    zoekWisKnop.style.display =
                        "none";

                    render();

                }
            );

            categorieKnoppen.appendChild(
                knop
            );

        }
    );
}


// ======================================
// FILTEREN
// ======================================

function krijgGefilterdeRecepten() {

    let resultaat =
        [...recepten];


    // Favorieten

    if (alleenFavorieten) {

        resultaat =
            resultaat.filter(
                recept =>
                    recept.favoriet === true
            );
    }


    // Categorie

    if (actieveCategorie) {

        resultaat =
            resultaat.filter(
                recept =>
                    recept.categorie ===
                    actieveCategorie
            );
    }


    // Zoeken

    const zoekterm =
        zoekInput.value
            .trim()
            .toLowerCase();

    if (zoekterm) {

        resultaat =
            resultaat.filter(
                recept => {

                    const tekst = [

                        recept.naam,
                        recept.categorie,
                        recept.notitie

                    ]
                        .join(" ")
                        .toLowerCase();

                    return tekst.includes(
                        zoekterm
                    );
                }
            );
    }


    // Sorteren

    const sorteer =
        sorteerInput.value;


    if (sorteer === "nieuwste") {

        resultaat.sort(
            (a, b) =>
                new Date(b.datum) -
                new Date(a.datum)
        );
    }


    if (sorteer === "oudste") {

        resultaat.sort(
            (a, b) =>
                new Date(a.datum) -
                new Date(b.datum)
        );
    }


    if (sorteer === "alfabetisch") {

        resultaat.sort(
            (a, b) =>
                a.naam.localeCompare(
                    b.naam,
                    "nl",
                    {
                        sensitivity: "base"
                    }
                )
        );
    }


    if (sorteer === "favorieten") {

        resultaat.sort(
            (a, b) => {

                if (
                    a.favoriet &&
                    !b.favoriet
                ) {

                    return -1;
                }

                if (
                    !a.favoriet &&
                    b.favoriet
                ) {

                    return 1;
                }

                return a.naam.localeCompare(
                    b.naam,
                    "nl",
                    {
                        sensitivity: "base"
                    }
                );

            }
        );
    }


    return resultaat;
}


// ======================================
// RENDER
// ======================================

function render() {

    toonCategorieKnoppen();

    updateDashboard();

    const lijst =
        krijgGefilterdeRecepten();

    receptenLijst.innerHTML = "";


    // Titel

    if (alleenFavorieten) {

        lijstTitel.textContent =
            "❤️ Mijn favorieten";

    } else if (actieveCategorie) {

        lijstTitel.textContent =
            actieveCategorie;

    } else {

        lijstTitel.textContent =
            "🍴 Mijn recepten";
    }


    // Zoekmelding

    const zoekterm =
        zoekInput.value.trim();

    if (zoekterm) {

        zoekMelding.textContent =
            `${lijst.length} recept(en) gevonden voor "${zoekterm}"`;

        zoekWisKnop.style.display =
            "block";

    } else {

        zoekMelding.textContent =
            "";

        zoekWisKnop.style.display =
            "none";
    }


    // Lege lijst

    if (lijst.length === 0) {

        legeLijst.style.display =
            "block";

        if (recepten.length === 0) {

            legeLijst.textContent =
                "Nog geen recepten toegevoegd.";

        } else {

            legeLijst.textContent =
                "Geen recepten gevonden.";
        }

    } else {

        legeLijst.style.display =
            "none";
    }


    // Recepten tekenen

    lijst.forEach(
        recept => {

            const origineleIndex =
                recepten.findIndex(
                    item =>
                        item.id === recept.id
                );

            receptenLijst.appendChild(
                maakReceptKaart(
                    recept,
                    origineleIndex
                )
            );
        }
    );


    // Alles knop

    alleReceptenKnop.classList.toggle(
        "actief",
        !actieveCategorie &&
        !alleenFavorieten
    );


    // Favorieten knop

    favorietenKnop.classList.toggle(
        "actief",
        alleenFavorieten
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

    favoriet.type = "button";

    favoriet.className =
        "favoriet-knop";

    favoriet.title =
        "Favoriet wijzigen";

    favoriet.setAttribute(
        "aria-label",
        "Favoriet wijzigen"
    );

    favoriet.textContent =
        recept.favoriet
            ? "❤️"
            : "🤍";


    favoriet.addEventListener(
        "click",
        () => {

            recepten[index].favoriet =
                !recepten[index].favoriet;

            bewaarRecepten();

            render();

        }
    );


    bovenkant.appendChild(titel);
    bovenkant.appendChild(favoriet);


    const categorie =
        document.createElement("span");

    categorie.className =
        "recept-categorie";

    categorie.textContent =
        recept.categorie;


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


    // Bekijk

    const bekijk =
        document.createElement("a");

    bekijk.className =
        "bekijk-knop";

    bekijk.textContent =
        "🔗 Bekijk recept";

    bekijk.href =
        recept.url;

    bekijk.target =
        "_blank";

    bekijk.rel =
        "noopener noreferrer";


    // Bewerk

    const bewerk =
        document.createElement("button");

    bewerk.type = "button";

    bewerk.className =
        "bewerk-knop";

    bewerk.textContent =
        "✏️ Bewerk";

    bewerk.addEventListener(
        "click",
        () => {

            bewerkRecept(index);

        }
    );


    // KOPIËREN — OPTIE 7

    const kopieer =
        document.createElement("button");

    kopieer.type = "button";

    kopieer.className =
        "kopieer-knop";

    kopieer.textContent =
        "📋 Kopieer";

    kopieer.title =
        "Maak een kopie van dit recept";

    kopieer.addEventListener(
        "click",
        () => {

            dupliceerRecept(index);

        }
    );


    // Verwijderen

    const verwijderen =
        document.createElement("button");

    verwijderen.type = "button";

    verwijderen.className =
        "verwijder-knop";

    verwijderen.textContent =
        "🗑️ Verwijder";

    verwijderen.addEventListener(
        "click",
        () => {

            verwijderRecept(index);

        }
    );


    acties.appendChild(bekijk);
    acties.appendChild(bewerk);
    acties.appendChild(kopieer);
    acties.appendChild(verwijderen);


    kaart.appendChild(bovenkant);
    kaart.appendChild(categorie);
    kaart.appendChild(notitie);
    kaart.appendChild(acties);


    return kaart;
}


// ======================================
// RECEPT TOEVOEGEN
// ======================================

function voegReceptToe() {

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


    // Bewerken

    if (bewerkIndex !== -1) {

        recepten[bewerkIndex] = {

            ...recepten[bewerkIndex],

            naam:
                naam,

            url:
                url,

            categorie:
                categorie,

            notitie:
                notitie,

            favoriet:
                favoriet
        };


        bewerkIndex = -1;

        opslaanKnop.textContent =
            "🍳 Recept opslaan";

        bewaarRecepten();

        leegFormulier();

        render();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        return;
    }


    // Nieuw recept

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


    bewaarRecepten();

    leegFormulier();

    actieveCategorie = "";

    alleenFavorieten = false;

    sorteerInput.value =
        "nieuwste";

    render();

}


// ======================================
// RECEPT BEWERKEN
// ======================================

function bewerkRecept(index) {

    const recept =
        recepten[index];

    if (!recept) {
        return;
    }


    naamInput.value =
        recept.naam;

    urlInput.value =
        recept.url;

    categorieInput.value =
        recept.categorie;

    notitieInput.value =
        recept.notitie;

    favorietInput.checked =
        recept.favoriet;


    bewerkIndex =
        index;


    opslaanKnop.textContent =
        "💾 Wijzigingen opslaan";


    document
        .querySelector(".toevoegen-section")
        .scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


    naamInput.focus();
}


// ======================================
// RECEPT DUPLICEREN
// OPTIE 7
// ======================================

function dupliceerRecept(index) {

    const origineel =
        recepten[index];

    if (!origineel) {
        return;
    }


    const kopie = {

        id:
            Date.now(),

        naam:
            `${origineel.naam} (kopie)`,

        url:
            origineel.url,

        categorie:
            origineel.categorie,

        notitie:
            origineel.notitie,

        favoriet:
            origineel.favoriet,

        datum:
            new Date().toISOString()
    };


    recepten.unshift(
        kopie
    );


    bewaarRecepten();

    actieveCategorie = "";

    alleenFavorieten = false;

    sorteerInput.value =
        "nieuwste";

    render();


    // Kort bevestigingsbericht

    zoekMelding.textContent =
        `📋 "${origineel.naam}" is gekopieerd.`;

    setTimeout(
        () => {

            if (!zoekInput.value) {

                zoekMelding.textContent =
                    "";
            }

        },
        2500
    );
}


// ======================================
// RECEPT VERWIJDEREN
// ======================================

function verwijderRecept(index) {

    const recept =
        recepten[index];

    if (!recept) {
        return;
    }


    const bevestiging =
        confirm(
            `Weet je zeker dat je "${recept.naam}" wilt verwijderen?`
        );


    if (!bevestiging) {
        return;
    }


    recepten.splice(
        index,
        1
    );


    bewaarRecepten();

    render();
}


// ======================================
// FORMULIER LEGEN
// ======================================

function leegFormulier() {

    naamInput.value =
        "";

    urlInput.value =
        "";

    categorieInput.value =
        "";

    notitieInput.value =
        "";

    favorietInput.checked =
        false;

    bewerkIndex =
        -1;

    opslaanKnop.textContent =
        "🍳 Recept opslaan";
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
            "";

        zoekInput.value =
            "";

        render();

    }
);


// ======================================
// ALLE RECEPTEN
// ======================================

alleReceptenKnop.addEventListener(
    "click",
    () => {

        actieveCategorie =
            "";

        alleenFavorieten =
            false;

        zoekInput.value =
            "";

        render();

    }
);


// ======================================
// ZOEKEN
// ======================================

zoekInput.addEventListener(
    "input",
    () => {

        render();

    }
);


// ======================================
// ZOEKEN WISSEN
// ======================================

zoekWisKnop.addEventListener(
    "click",
    () => {

        zoekInput.value =
            "";

        render();

        zoekInput.focus();

    }
);


// ======================================
// SORTEREN
// ======================================

sorteerInput.addEventListener(
    "change",
    () => {

        render();

    }
);


// ======================================
// OPSLAAN KNOP
// ======================================

opslaanKnop.addEventListener(
    "click",
    voegReceptToe
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


        const bevestiging =
            confirm(
                `Weet je zeker dat je ALLE ${recepten.length} recepten wilt verwijderen?\n\nDeze actie kan niet automatisch worden teruggedraaid.`
            );


        if (!bevestiging) {
            return;
        }


        recepten = [];

        bewaarRecepten();

        actieveCategorie =
            "";

        alleenFavorieten =
            false;

        zoekInput.value =
            "";

        render();

    }
);


// ======================================
// DASHBOARD
// ======================================

function updateDashboard() {

    aantalRecepten.textContent =
        recepten.length;


    const favorieten =
        recepten.filter(
            recept =>
                recept.favoriet
        ).length;

    aantalFavorieten.textContent =
        favorieten;


    const nu =
        new Date();

    const weekGeleden =
        new Date(
            nu.getTime() -
            7 * 24 * 60 * 60 * 1000
        );


    const recent =
        recepten.filter(
            recept => {

                const datum =
                    new Date(
                        recept.datum
                    );

                return datum >=
                    weekGeleden;
            }
        ).length;


    aantalRecent.textContent =
        recent;
}


// ======================================
// EXPORTEREN
// OPTIE 8
// ======================================

exporteerKnop.addEventListener(
    "click",
    exporteerRecepten
);


function exporteerRecepten() {

    if (recepten.length === 0) {

        alert(
            "Er zijn nog geen recepten om te exporteren."
        );

        return;
    }


    const exportData = {

        app:
            "Mijn Recepten",

        versie:
            1,

        exportDatum:
            new Date().toISOString(),

        recepten:
            recepten
    };


    const json =
        JSON.stringify(
            exportData,
            null,
            4
        );


    const bestand =
        new Blob(
            [json],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            bestand
        );


    const link =
        document.createElement("a");

    link.href =
        url;

    link.download =
        `mijn-recepten-backup-${datumVoorBestand()}.json`;


    document.body.appendChild(
        link
    );

    link.click();

    link.remove();


    URL.revokeObjectURL(
        url
    );
}


// ======================================
// DATUM VOOR BESTANDSNAAM
// ======================================

function datumVoorBestand() {

    const datum =
        new Date();

    const jaar =
        datum.getFullYear();

    const maand =
        String(
            datum.getMonth() + 1
        ).padStart(2, "0");

    const dag =
        String(
            datum.getDate()
        ).padStart(2, "0");


    return `${jaar}-${maand}-${dag}`;
}


// ======================================
// IMPORTEREN
// OPTIE 8
// ======================================

importeerKnop.addEventListener(
    "click",
    () => {

        importBestand.click();

    }
);


importBestand.addEventListener(
    "change",
    importeerRecepten
);


function importeerRecepten(event) {

    const bestand =
        event.target.files[0];


    if (!bestand) {
        return;
    }


    const reader =
        new FileReader();


    reader.onload =
        () => {

            try {

                const data =
                    JSON.parse(
                        reader.result
                    );


                let geïmporteerdeRecepten;


                if (
                    Array.isArray(data)
                ) {

                    geïmporteerdeRecepten =
                        data;

                } else if (
                    data &&
                    Array.isArray(
                        data.recepten
                    )
                ) {

                    geïmporteerdeRecepten =
                        data.recepten;

                } else {

                    throw new Error(
                        "Geen geldige recepten gevonden."
                    );
                }


                geïmporteerdeRecepten =
                    normaliseerRecepten(
                        geïmporteerdeRecepten
                    );


                if (
                    geïmporteerdeRecepten.length ===
                    0
                ) {

                    alert(
                        "Het bestand bevat geen recepten."
                    );

                    return;
                }


                const bevestiging =
                    confirm(
                        `${geïmporteerdeRecepten.length} recept(en) gevonden.\n\nOK = toevoegen aan je huidige recepten\nAnnuleren = stoppen`
                    );


                if (!bevestiging) {
                    return;
                }


                // Nieuwe unieke ID's geven

                const nieuweRecepten =
                    geïmporteerdeRecepten.map(
                        (recept, index) => ({

                            ...recept,

                            id:
                                Date.now() +
                                index +
                                Math.random(),

                            datum:
                                recept.datum ||
                                new Date().toISOString()

                        })
                    );


                recepten =
                    [
                        ...recepten,
                        ...nieuweRecepten
                    ];


                bewaarRecepten();

                actieveCategorie =
                    "";

                alleenFavorieten =
                    false;

                zoekInput.value =
                    "";

                sorteerInput.value =
                    "nieuwste";


                render();


                alert(
                    `✅ ${nieuweRecepten.length} recept(en) succesvol geïmporteerd.`
                );


            } catch (fout) {

                console.error(
                    "Importfout:",
                    fout
                );

                alert(
                    "❌ Dit bestand kon niet worden geïmporteerd.\n\nControleer of het een geldige Mijn Recepten-back-up is."
                );

            } finally {

                // Zorgen dat hetzelfde
                // bestand opnieuw gekozen
                // kan worden.

                importBestand.value =
                    "";

            }

        };


    reader.readAsText(
        bestand
    );
}


// ======================================
// HTML VEILIG MAKEN
// ======================================

function escapeHtml(tekst) {

    const div =
        document.createElement("div");

    div.textContent =
        tekst ?? "";

    return div.innerHTML;
}


// ======================================
// START APP
// ======================================

laadRecepten();

vulCategorieSelect();

render();


// ======================================
// SERVICE WORKER
// ======================================

if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register(
                    "sw.js"
                )
                .catch(
                    fout => {

                        console.error(
                            "Service worker fout:",
                            fout
                        );

                    }
                );

        }
    );
}
