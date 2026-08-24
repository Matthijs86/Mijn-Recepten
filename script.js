javascript
// ======================================
// MIJN RECEPTEN
// COMPLETE JAVASCRIPT
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

const favorietenTekst =
    document.getElementById("favorietenTekst");

const lijstTitel =
    document.getElementById("lijstTitel");

const sorteerInput =
    document.getElementById("sorteerInput");

const allesWissenKnop =
    document.getElementById("allesWissenKnop");

const opslagKnop =
    document.getElementById("opslagKnop");

const terugzettenKnop =
    document.getElementById("terugzettenKnop");

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
// OPSLAG
// ======================================

const OPSLAG_NAAM =
    "mijnRecepten";

const BACKUP_NAAM =
    "mijnReceptenBackup";


let recepten = [];

let actieveCategorie =
    "alles";

let alleenFavorieten =
    false;

let bewerkIndex =
    null;


// ======================================
// CATEGORIEËN
// ======================================

const categorieen = [

    {
        naam: "Ontbijt",
        icoon: "🍳",
        kleur: "#e5a91c"
    },

    {
        naam: "Kip",
        icoon: "🍗",
        kleur: "#d66b4b"
    },

    {
        naam: "Vis",
        icoon: "🐟",
        kleur: "#3288c7"
    },

    {
        naam: "Vlees",
        icoon: "🥩",
        kleur: "#b84c54"
    },

    {
        naam: "Slowcook",
        icoon: "🥘",
        kleur: "#8b5bb5"
    },

    {
        naam: "Soep",
        icoon: "🍲",
        kleur: "#dc813d"
    },

    {
        naam: "BBQ",
        icoon: "🔥",
        kleur: "#d95b35"
    },

    {
        naam: "Groente bijgerechten",
        icoon: "🥦",
        kleur: "#55a65a"
    },

    {
        naam: "Aardappel bijgerechten",
        icoon: "🥔",
        kleur: "#c49a59"
    },

    {
        naam: "Italiaans",
        icoon: "🇮🇹",
        kleur: "#4c9b63"
    },

    {
        naam: "Indiaas",
        icoon: "🍛",
        kleur: "#d46b38"
    },

    {
        naam: "Aziatisch",
        icoon: "🥢",
        kleur: "#c75269"
    },

    {
        naam: "Burgers/hotdogs en sandwiches",
        icoon: "🍔",
        kleur: "#a76a3d"
    },

    {
        naam: "Snacks",
        icoon: "🍟",
        kleur: "#d29a32"
    },

    {
        naam: "Pasta's",
        icoon: "🍝",
        kleur: "#d6a33d"
    },

    {
        naam: "Afrikaans",
        icoon: "🌍",
        kleur: "#7c7650"
    },

    {
        naam: "Mexicaans",
        icoon: "🌮",
        kleur: "#3d9a6c"
    },

    {
        naam: "Brood/Bakken",
        icoon: "🥖",
        kleur: "#bd7b42"
    },

    {
        naam: "Overige",
        icoon: "🍴",
        kleur: "#806f91"
    }

];


// ======================================
// CATEGORIE NORMALISEREN
// ======================================

function normaliseerCategorie(categorie) {

    if (!categorie) {
        return "Overige";
    }

    const tekst =
        String(categorie)
            .trim()
            .toLowerCase();

    const gevonden =
        categorieen.find(
            item =>
                item.naam
                    .toLowerCase() === tekst
        );

    return gevonden
        ? gevonden.naam
        : "Overige";
}


// ======================================
// CATEGORIE GEGEVENS
// ======================================

function krijgCategorieGegevens(naam) {

    const gevonden =
        categorieen.find(
            categorie =>
                categorie.naam === naam
        );

    return gevonden || {

        naam: "Overige",

        icoon: "🍴",

        kleur: "#806f91"

    };

}


// ======================================
// NORMAAL OPSLAAN
// ======================================

function slaOp() {

    try {

        localStorage.setItem(
            OPSLAG_NAAM,
            JSON.stringify(recepten)
        );

        return true;

    } catch (fout) {

        console.error(
            "Opslaan mislukt:",
            fout
        );

        alert(
            "De recepten konden niet worden opgeslagen."
        );

        return false;

    }

}


// ======================================
// BACK-UP MAKEN
// ======================================

function maakBackup() {

    if (recepten.length === 0) {

        alert(
            "Er zijn geen recepten om op te slaan."
        );

        return;

    }


    const bevestiging =
        confirm(
            "Wil je een reservekopie van je huidige recepten maken?\n\nJe huidige reservekopie wordt vervangen."
        );


    if (!bevestiging) {
        return;
    }


    try {

        const backup = {

            datum:
                new Date().toISOString(),

            recepten:
                recepten

        };


        localStorage.setItem(
            BACKUP_NAAM,
            JSON.stringify(backup)
        );


        alert(
            "✅ Reservekopie is opgeslagen."
        );

    } catch (fout) {

        console.error(
            "Back-up maken mislukt:",
            fout
        );

        alert(
            "De reservekopie kon niet worden gemaakt."
        );

    }

}


// ======================================
// BACK-UP TERUGZETTEN
// ======================================

function zetBackupTerug() {

    const backupData =
        localStorage.getItem(
            BACKUP_NAAM
        );


    if (!backupData) {

        alert(
            "Er is nog geen reservekopie beschikbaar."
        );

        return;

    }


    let backup;


    try {

        backup =
            JSON.parse(
                backupData
            );

    } catch (fout) {

        alert(
            "De reservekopie is beschadigd en kan niet worden teruggezet."
        );

        return;

    }


    if (
        !backup ||
        !Array.isArray(
            backup.recepten
        )
    ) {

        alert(
            "De reservekopie is ongeldig."
        );

        return;

    }


    const datum =
        backup.datum
            ? new Date(
                backup.datum
            ).toLocaleString(
                "nl-NL"
            )
            : "onbekend";


    const bevestiging =
        confirm(
            `Weet je zeker dat je de reservekopie van ${datum} wilt terugzetten?\n\nJe huidige recepten worden vervangen door de reservekopie.`
        );


    if (!bevestiging) {
        return;
    }


    recepten =
        backup.recepten.map(
            recept => ({

                ...recept,

                categorie:
                    normaliseerCategorie(
                        recept.categorie
                    ),

                favoriet:
                    Boolean(
                        recept.favoriet
                    ),

                datum:
                    recept.datum ||
                    new Date().toISOString()

            })
        );


    slaOp();


    actieveCategorie =
        "alles";

    alleenFavorieten =
        false;

    zoekInput.value =
        "";

    zoekMelding.textContent =
        "";

    zoekWisKnop.style.display =
        "none";


    formulierLeegmaken();


    render();


    alert(
        "✅ De reservekopie is teruggezet."
    );

}


// ======================================
// RECEPTEN LADEN
// ======================================

function laadRecepten() {

    const opgeslagen =
        localStorage.getItem(
            OPSLAG_NAAM
        );


    if (!opgeslagen) {

        recepten = [];

        return;

    }


    try {

        recepten =
            JSON.parse(
                opgeslagen
            );


        if (
            !Array.isArray(
                recepten
            )
        ) {

            recepten = [];

        }

    } catch (fout) {

        console.error(
            "Recepten konden niet worden geladen:",
            fout
        );

        recepten = [];

    }


    recepten =
        recepten.map(
            recept => ({

                ...recept,

                categorie:
                    normaliseerCategorie(
                        recept.categorie
                    ),

                favoriet:
                    Boolean(
                        recept.favoriet
                    ),

                datum:
                    recept.datum ||
                    new Date().toISOString()

            })
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
                document.createElement(
                    "option"
                );


            option.value =
                categorie.naam;


            option.textContent =
                `${categorie.icoon} ${categorie.naam}`;


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

    categorieKnoppen.innerHTML =
        "";


    categorieen.forEach(
        categorie => {

            const aantal =
                recepten.filter(
                    recept =>
                        normaliseerCategorie(
                            recept.categorie
                        ) === categorie.naam
                ).length;


            const knop =
                document.createElement(
                    "button"
                );


            knop.type =
                "button";


            knop.className =
                "categorie-knop";


            if (
                actieveCategorie ===
                    categorie.naam &&
                !alleenFavorieten
            ) {

                knop.classList.add(
                    "actief"
                );

            }


            knop.style.setProperty(
                "--categorie-kleur",
                categorie.kleur
            );


            knop.innerHTML = `

                <span class="categorie-icoon">
                    ${categorie.icoon}
                </span>

                <span class="categorie-naam">
                    ${categorie.naam}
                </span>

                <span class="categorie-aantal">
                    ${aantal}
                    ${aantal === 1
                        ? "recept"
                        : "recepten"}
                </span>

            `;


            knop.addEventListener(
                "click",
                () => {

                    actieveCategorie =
                        categorie.naam;

                    alleenFavorieten =
                        false;

                    alleReceptenKnop
                        .classList.remove(
                            "actief"
                        );

                    render();

                    scrollNaarRecepten();

                }
            );


            categorieKnoppen.appendChild(
                knop
            );

        }
    );

}


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
        );


    aantalFavorieten.textContent =
        favorieten.length;


    const nu =
        new Date();


    const weekGeleden =
        new Date();


    weekGeleden.setDate(
        nu.getDate() - 7
    );


    const recent =
        recepten.filter(
            recept => {

                const datum =
                    new Date(
                        recept.datum
                    );

                return (
                    !isNaN(datum) &&
                    datum >= weekGeleden
                );

            }
        );


    aantalRecent.textContent =
        recent.length;


    if (favorieten.length === 0) {

        favorietenTekst.textContent =
            "Je hebt nog geen favoriete recepten";

    } else {

        favorietenTekst.textContent =
            `${favorieten.length} favoriete ${
                favorieten.length === 1
                    ? "recept"
                    : "recepten"
            }`;

    }

}


// ======================================
// FILTEREN
// ======================================

function krijgGefilterdeRecepten() {

    let resultaat =
        [...recepten];


    if (alleenFavorieten) {

        resultaat =
            resultaat.filter(
                recept =>
                    recept.favoriet
            );

    }


    if (
        actieveCategorie !==
        "alles"
    ) {

        resultaat =
            resultaat.filter(
                recept =>
                    normaliseerCategorie(
                        recept.categorie
                    ) === actieveCategorie
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


                    return (
                        naam.includes(
                            zoekterm
                        ) ||
                        categorie.includes(
                            zoekterm
                        ) ||
                        notitie.includes(
                            zoekterm
                        )
                    );

                }
            );

    }


    const sorteer =
        sorteerInput.value;


    if (
        sorteer ===
        "nieuwste"
    ) {

        resultaat.sort(
            (a, b) =>
                new Date(b.datum) -
                new Date(a.datum)
        );

    }

    else if (
        sorteer ===
        "oudste"
    ) {

        resultaat.sort(
            (a, b) =>
                new Date(a.datum) -
                new Date(b.datum)
        );

    }

    else if (
        sorteer ===
        "alfabetisch"
    ) {

        resultaat.sort(
            (a, b) =>
                String(a.naam)
                    .localeCompare(
                        String(b.naam),
                        "nl"
                    )
        );

    }

    else if (
        sorteer ===
        "favorieten"
    ) {

        resultaat.sort(
            (a, b) =>
                Number(b.favoriet) -
                Number(a.favoriet)
        );

    }


    return resultaat;

}


// ======================================
// RECEPTEN TONEN
// ======================================

function toonRecepten() {

    const resultaat =
        krijgGefilterdeRecepten();


    receptenLijst.innerHTML =
        "";


    if (alleenFavorieten) {

        lijstTitel.textContent =
            "❤️ Mijn favorieten";

    }

    else if (
        actieveCategorie !==
        "alles"
    ) {

        const categorie =
            krijgCategorieGegevens(
                actieveCategorie
            );


        lijstTitel.textContent =
            `${categorie.icoon} ${categorie.naam}`;

    }

    else if (
        zoekInput.value.trim()
    ) {

        lijstTitel.textContent =
            "🔎 Zoekresultaten";

    }

    else {

        lijstTitel.textContent =
            "🍴 Mijn recepten";

    }


    if (
        resultaat.length ===
        0
    ) {

        legeLijst.style.display =
            "block";


        if (
            zoekInput.value.trim()
        ) {

            legeLijst.textContent =
                "🔎 Geen recepten gevonden voor deze zoekopdracht.";

        }

        else if (
            alleenFavorieten
        ) {

            legeLijst.textContent =
                "❤️ Je hebt nog geen favoriete recepten.";

        }

        else if (
            actieveCategorie !==
            "alles"
        ) {

            legeLijst.textContent =
                "📂 In deze categorie staan nog geen recepten.";

        }

        else {

            legeLijst.textContent =
                "Nog geen recepten toegevoegd.";

        }


        return;

    }


    legeLijst.style.display =
        "none";


    resultaat.forEach(
        recept => {

            const index =
                recepten.indexOf(
                    recept
                );


            receptenLijst.appendChild(
                maakReceptKaart(
                    recept,
                    index
                )
            );

        }
    );

}


// ======================================
// RECEPTKAART
// ======================================

function maakReceptKaart(
    recept,
    index
) {

    const kaart =
        document.createElement(
            "article"
        );


    kaart.className =
        "recept-kaart";


    const categorie =
        krijgCategorieGegevens(
            normaliseerCategorie(
                recept.categorie
            )
        );


    kaart.style.setProperty(
        "--categorie-kleur",
        categorie.kleur
    );


    const bovenkant =
        document.createElement(
            "div"
        );


    bovenkant.className =
        "recept-bovenkant";


    const titel =
        document.createElement(
            "h3"
        );


    titel.textContent =
        recept.naam;


    const favoriet =
        document.createElement(
            "button"
        );


    favoriet.type =
        "button";


    favoriet.className =
        "favoriet-knop";


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
                !recept.favoriet;

            slaOp();

            render();

        }
    );


    bovenkant.appendChild(
        titel
    );

    bovenkant.appendChild(
        favoriet
    );


    const categorieLabel =
        document.createElement(
            "span"
        );


    categorieLabel.className =
        "recept-categorie";


    categorieLabel.textContent =
        `${categorie.icoon} ${categorie.naam}`;


    const notitie =
        document.createElement(
            "div"
        );


    notitie.className =
        "recept-notitie";


    if (
        recept.notitie &&
        recept.notitie.trim()
    ) {

        const label =
            document.createElement(
                "span"
            );


        label.className =
            "notitie-label";


        label.textContent =
            "💡 MIJN NOTITIE";


        const tekst =
            document.createElement(
                "span"
            );


        tekst.textContent =
            recept.notitie;


        notitie.appendChild(
            label
        );

        notitie.appendChild(
            tekst
        );

    }

    else {

        notitie.classList.add(
            "geen-notitie"
        );

    }


    const acties =
        document.createElement(
            "div"
        );


    acties.className =
        "recept-acties";


    const bekijken =
        document.createElement(
            "a"
        );


    bekijken.className =
        "bekijk-knop";


    bekijken.href =
        recept.url;


    bekijken.target =
        "_blank";


    bekijken.rel =
        "noopener noreferrer";


    bekijken.textContent =
        "🌐 Bekijk recept ↗";


    const bewerken =
        document.createElement(
            "button"
        );


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
        document.createElement(
            "button"
        );


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
        categorieLabel
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
// RECEPT OPSLAAN
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


    if (!naam) {

        alert(
            "Vul eerst een naam van het recept in."
        );

        naamInput.focus();

        return;

    }


    if (!url) {

        alert(
            "Vul eerst een link naar het recept in."
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


    if (bewerkIndex !== null) {

        const bevestiging =
            confirm(
                `Wil je de wijzigingen aan "${naam}" opslaan?`
            );


        if (!bevestiging) {
            return;
        }


        recepten[bewerkIndex] = {

            ...recepten[bewerkIndex],

            naam: naam,

            url: url,

            categorie:
                normaliseerCategorie(
                    categorie
                ),

            notitie: notitie,

            favoriet: favoriet

        };


        bewerkIndex =
            null;


        opslaanKnop.textContent =
            "🍳 Recept opslaan";

    }

    else {

        recepten.push({

            id:
                Date.now(),

            naam: naam,

            url: url,

            categorie:
                normaliseerCategorie(
                    categorie
                ),

            notitie: notitie,

            favoriet: favoriet,

            datum:
                new Date().toISOString()

        });

    }


    if (
        !slaOp()
    ) {

        return;

    }


    formulierLeegmaken();

    render();


    scrollNaarRecepten();

}


// ======================================
// FORMULIER LEEGMAKEN
// ======================================

function formulierLeegmaken() {

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
        null;


    opslaanKnop.textContent =
        "🍳 Recept opslaan";

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
        recept.naam || "";


    urlInput.value =
        recept.url || "";


    categorieInput.value =
        normaliseerCategorie(
            recept.categorie
        );


    notitieInput.value =
        recept.notitie || "";


    favorietInput.checked =
        Boolean(
            recept.favoriet
        );


    bewerkIndex =
        index;


    opslaanKnop.textContent =
        "💾 Wijzigingen opslaan";


    toevoegenSectie.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });


    setTimeout(
        () => {
            naamInput.focus();
        },
        400
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


    slaOp();

    render();

}


// ======================================
// ALLES WISSEN
// ======================================

function wisAlles() {

    if (
        recepten.length ===
        0
    ) {

        alert(
            "Er staan geen recepten in je kookboek."
        );

        return;

    }


    const bevestiging =
        confirm(
            "⚠️ LET OP\n\nWeet je zeker dat je ALLE recepten wilt verwijderen?\n\nDeze actie kan niet ongedaan worden gemaakt.\n\nMaak eventueel eerst een reservekopie via Beheer → Opslaan."
        );


    if (!bevestiging) {
        return;
    }


    recepten =
        [];


    slaOp();


    actieveCategorie =
        "alles";


    alleenFavorieten =
        false;


    zoekInput.value =
        "";


    zoekMelding.textContent =
        "";


    zoekWisKnop.style.display =
        "none";


    formulierLeegmaken();


    render();


    alert(
        "🗑️ Alle recepten zijn verwijderd."
    );

}


// ======================================
// ALLES TONEN
// ======================================

function toonAlles() {

    actieveCategorie =
        "alles";


    alleenFavorieten =
        false;


    alleReceptenKnop
        .classList.add(
            "actief"
        );


    render();

    scrollNaarRecepten();

}


// ======================================
// FAVORIETEN TONEN
// ======================================

function toonFavorieten() {

    alleenFavorieten =
        true;


    actieveCategorie =
        "alles";


    alleReceptenKnop
        .classList.remove(
            "actief"
        );


    render();

    scrollNaarRecepten();

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
        80
    );

}


// ======================================
// ZOEKEN
// ======================================

function verwerkZoekopdracht() {

    const heeftZoekterm =
        zoekInput.value
            .trim()
            .length > 0;


    zoekWisKnop.style.display =
        heeftZoekterm
            ? "block"
            : "none";


    if (heeftZoekterm) {

        const aantal =
            krijgGefilterdeRecepten()
                .length;


        zoekMelding.textContent =
            `${aantal} ${
                aantal === 1
                    ? "resultaat"
                    : "resultaten"
            }`;

    }

    else {

        zoekMelding.textContent =
            "";

    }


    render();

}


// ======================================
// ZOEKEN WISSEN
// ======================================

function wisZoekopdracht() {

    zoekInput.value =
        "";


    zoekWisKnop.style.display =
        "none";


    zoekMelding.textContent =
        "";


    render();

}


// ======================================
// NAVIGATIE
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
// EVENT LISTENERS
// ======================================

opslaanKnop.addEventListener(
    "click",
    slaReceptOp
);


opslagKnop.addEventListener(
    "click",
    maakBackup
);


terugzettenKnop.addEventListener(
    "click",
    zetBackupTerug
);


allesWissenKnop.addEventListener(
    "click",
    wisAlles
);


alleReceptenKnop.addEventListener(
    "click",
    toonAlles
);


favorietenKnop.addEventListener(
    "click",
    toonFavorieten
);


zoekInput.addEventListener(
    "input",
    verwerkZoekopdracht
);


zoekWisKnop.addEventListener(
    "click",
    wisZoekopdracht
);


sorteerInput.addEventListener(
    "change",
    render
);


// ======================================
// ENTER IN FORMULIER
// ======================================

naamInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Enter"
        ) {

            event.preventDefault();

            urlInput.focus();

        }

    }
);


// ======================================
// START APP
// ======================================

laadRecepten();

vulCategorieSelect();

render();



