// ======================================
// MIJN RECEPTEN
// COMPLETE JAVASCRIPT
// ======================================


// ======================================
// OPSLAG
// ======================================

const OPSLAG_NAAM = "mijnRecepten";
const OPSLAG_BACKUP = "mijnReceptenBackup";
const OPSLAG_VERSIE = "mijnReceptenVersie";

const HUIDIGE_OPSLAG_VERSIE = 3;


// ======================================
// 20 CATEGORIEËN
// ======================================

const CATEGORIEEN = [

    // Type gerecht
    "Vis",
    "Vlees",
    "Kip",
    "Groente bijgerechten",
    "Aardappel bijgerechten",
    "Snacks",
    "Burgers en Sandwiches",
    "Brood/Bakken",
    "Pasta's",
    "Soepen",
    "Slowcook",
    "Ontbijt",

    // Wereldkeukens
    "Aziatisch",
    "Indiaas",
    "Italiaans",
    "Nederlands",
    "Engels",
    "Mexicaans",
    "Latin",
    "Afrikaans"

];


// ======================================
// ELEMENTEN
// ======================================

const toevoegenKnop =
    document.getElementById("toevoegenKnop");

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

const annulerenKnop =
    document.getElementById("annulerenKnop");

const formulierTitel =
    document.getElementById("formulierTitel");

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

const categorieTitel =
    document.getElementById("categorieTitel");

const categorieKnoppen =
    document.querySelectorAll(
        ".categorie-knop"
    );


// ======================================
// VARIABELEN
// ======================================

let recepten = [];

let huidigeCategorie = null;

let alleenFavorieten = false;

let receptDatWordtBewerkt = null;


// ======================================
// START
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        receptenLaden();

        receptenMigreren();

        formulierNormaalMaken();

        formulierVerbergen();

        categorieKnoppenInstellen();

        categorieTellingenBijwerken();

        receptenWeergeven();

    }
);


// ======================================
// RECEPTEN LADEN
// ======================================

function receptenLaden() {

    try {

        const opgeslagen =
            localStorage.getItem(
                OPSLAG_NAAM
            );


        if (opgeslagen) {

            recepten =
                JSON.parse(
                    opgeslagen
                );

        } else {

            const backup =
                localStorage.getItem(
                    OPSLAG_BACKUP
                );


            if (backup) {

                recepten =
                    JSON.parse(
                        backup
                    );

            } else {

                recepten = [];

            }

        }


        if (!Array.isArray(recepten)) {

            recepten = [];

        }

    } catch (fout) {

        console.error(
            "Fout bij laden van recepten:",
            fout
        );

        recepten = [];

    }

}


// ======================================
// RECEPTEN MIGREREN
// ======================================

function receptenMigreren() {

    let aangepast = false;


    recepten =
        recepten.map(
            function (recept) {

                const nieuwRecept = {

                    id:
                        recept.id ||
                        Date.now() +
                        Math.random(),

                    naam:
                        recept.naam ||
                        "Naamloos recept",

                    url:
                        recept.url ||
                        "",

                    categorie:
                        recept.categorie ||
                        "Vis",

                    notitie:
                        recept.notitie ||
                        "",

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

                    aangepast = true;

                }


                return nieuwRecept;

            }
        );


    if (
        aangepast ||
        !localStorage.getItem(
            OPSLAG_VERSIE
        )
    ) {

        receptenOpslaan();

    }


    localStorage.setItem(
        OPSLAG_VERSIE,
        HUIDIGE_OPSLAG_VERSIE
    );

}


// ======================================
// OPSLAAN
// ======================================

function receptenOpslaan() {

    try {

        const huidigeData =
            localStorage.getItem(
                OPSLAG_NAAM
            );


        if (huidigeData) {

            localStorage.setItem(
                OPSLAG_BACKUP,
                huidigeData
            );

        }


        localStorage.setItem(
            OPSLAG_NAAM,
            JSON.stringify(
                recepten
            )
        );


        localStorage.setItem(
            OPSLAG_VERSIE,
            HUIDIGE_OPSLAG_VERSIE
        );


    } catch (fout) {

        console.error(
            "Opslaan mislukt:",
            fout
        );

        alert(
            "De recepten konden niet worden opgeslagen."
        );

    }

}


// ======================================
// FORMULIER TONEN
// ======================================

function formulierTonen() {

    const formulier =
        document.getElementById(
            "formulier"
        );


    if (!formulier) {
        return;
    }


    formulier.hidden = false;


    setTimeout(
        function () {

            formulier.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


            if (
                naamInput
            ) {

                naamInput.focus();

            }

        },
        50
    );

}


// ======================================
// FORMULIER VERBERGEN
// ======================================

function formulierVerbergen() {

    const formulier =
        document.getElementById(
            "formulier"
        );


    if (!formulier) {
        return;
    }


    formulier.hidden = true;

}


// ======================================
// FORMULIER LEEGMAKEN
// ======================================

function formulierLeegmaken() {

    if (naamInput) {

        naamInput.value = "";

    }


    if (urlInput) {

        urlInput.value = "";

    }


    if (categorieInput) {

        categorieInput.value = "";

    }


    if (notitieInput) {

        notitieInput.value = "";

    }


    if (favorietInput) {

        favorietInput.checked = false;

    }


    receptDatWordtBewerkt = null;

}


// ======================================
// FORMULIER NORMAAL
// ======================================

function formulierNormaalMaken() {

    formulierLeegmaken();


    if (formulierTitel) {

        formulierTitel.textContent =
            "Recept toevoegen";

    }


    if (opslaanKnop) {

        opslaanKnop.textContent =
            "+ Recept opslaan";

    }


    if (annulerenKnop) {

        annulerenKnop.hidden =
            true;

    }

}


// ======================================
// URL CONTROLEREN
// ======================================

function geldigeUrl(url) {

    try {

        const controle =
            new URL(url);


        return (
            controle.protocol ===
                "http:" ||
            controle.protocol ===
                "https:"
        );

    } catch {

        return false;

    }

}


// ======================================
// RECEPT TOEVOEGEN / BEWERKEN
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
            "Vul een receptnaam in."
        );

        naamInput.focus();

        return;

    }


    // ----------------------------------
    // URL CONTROLEREN
    // ----------------------------------

    if (!url) {

        alert(
            "Vul een receptlink in."
        );

        urlInput.focus();

        return;

    }


    if (!geldigeUrl(url)) {

        alert(
            "Vul een geldige link in die begint met http:// of https://."
        );

        urlInput.focus();

        return;

    }


    // ----------------------------------
    // CATEGORIE CONTROLEREN
    // ----------------------------------

    if (
        !CATEGORIEEN.includes(
            categorie
        )
    ) {

        alert(
            "Kies een geldige categorie."
        );

        categorieInput.focus();

        return;

    }


    // ==================================
    // BESTAAND RECEPT BEWERKEN
    // ==================================

    if (
        receptDatWordtBewerkt !== null
    ) {

        const index =
            recepten.findIndex(
                function (recept) {

                    return (
                        recept.id ===
                        receptDatWordtBewerkt
                    );

                }
            );


        if (index !== -1) {

            recepten[index].naam =
                naam;

            recepten[index].url =
                url;

            recepten[index].categorie =
                categorie;

            recepten[index].notitie =
                notitie;

            recepten[index].favoriet =
                favoriet;

        }

    }


    // ==================================
    // NIEUW RECEPT
    // ==================================

    else {

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


        recepten.unshift(
            nieuwRecept
        );

    }


    // ==================================
    // OPSLAAN
    // ==================================

    receptenOpslaan();

    categorieTellingenBijwerken();

    formulierNormaalMaken();

    formulierVerbergen();

    receptenWeergeven();

}


// ======================================
// RECEPT BEWERKEN
// ======================================

function receptBewerken(id) {

    const recept =
        recepten.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!recept) {
        return;
    }


    // Formulier zichtbaar maken
    formulierTonen();


    receptDatWordtBewerkt =
        id;


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


    if (formulierTitel) {

        formulierTitel.textContent =
            "Recept bewerken";

    }


    if (opslaanKnop) {

        opslaanKnop.textContent =
            "💾 Wijzigingen opslaan";

    }


    if (annulerenKnop) {

        annulerenKnop.hidden =
            false;

    }

}


// ======================================
// BEWERKEN ANNULEREN
// ======================================

function bewerkenAnnuleren() {

    formulierNormaalMaken();

    formulierVerbergen();

}


// ======================================
// RECEPT VERWIJDEREN
// ======================================

function receptVerwijderen(id) {

    const recept =
        recepten.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!recept) {
        return;
    }


    const bevestiging =
        confirm(
            'Weet je zeker dat je "' +
            recept.naam +
            '" wilt verwijderen?'
        );


    if (!bevestiging) {
        return;
    }


    recepten =
        recepten.filter(
            function (item) {

                return item.id !== id;

            }
        );


    receptenOpslaan();

    categorieTellingenBijwerken();

    receptenWeergeven();

}


// ======================================
// FAVORIET WISSELEN
// ======================================

function favorietWisselen(id) {

    const recept =
        recepten.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!recept) {
        return;
    }


    recept.favoriet =
        !recept.favoriet;


    receptenOpslaan();

    categorieTellingenBijwerken();

    receptenWeergeven();

}


// ======================================
// CATEGORIEKNOPPEN
// ======================================

function categorieKnoppenInstellen() {

    categorieKnoppen.forEach(
        function (knop) {

            knop.addEventListener(
                "click",
                function () {

                    const categorie =
                        knop.dataset.categorie;


                    huidigeCategorie =
                        categorie;

                    alleenFavorieten =
                        false;


                    knoppenBijwerken();

                    receptenWeergeven();

                    scrollNaarRecepten();

                }
            );

        }
    );


    knoppenBijwerken();

}


// ======================================
// CATEGORIE AANTALLEN
// ======================================

function categorieTellingenBijwerken() {

    categorieKnoppen.forEach(
        function (knop) {

            const categorie =
                knop.dataset.categorie;


            const aantal =
                recepten.filter(
                    function (recept) {

                        return (
                            recept.categorie ===
                            categorie
                        );

                    }
                ).length;


            if (
                !knop.dataset.origineleTekst
            ) {

                knop.dataset.origineleTekst =
                    knop.textContent.trim();

            }


            const origineleTekst =
                knop.dataset.origineleTekst;


            knop.textContent =
                origineleTekst +
                " (" +
                aantal +
                ")";

        }
    );


    // ==================================
    // FAVORIETEN
    // ==================================

    if (favorietenKnop) {

        const aantalFavorieten =
            recepten.filter(
                function (recept) {

                    return (
                        recept.favoriet ===
                        true
                    );

                }
            ).length;


        favorietenKnop.textContent =
            "⭐ Favorieten (" +
            aantalFavorieten +
            ")";

    }


    // ==================================
    // ALLE RECEPTEN
    // ==================================

    if (allesKnop) {

        allesKnop.textContent =
            "📖 Alle recepten (" +
            recepten.length +
            ")";

    }


    if (categorieTitel) {

        categorieTitel.textContent =
            "🍽️ Categorieën";

    }

}


// ======================================
// KNOPPEN ACTIEF MAKEN
// ======================================

function knoppenBijwerken() {

    categorieKnoppen.forEach(
        function (knop) {

            knop.classList.toggle(
                "actief",
                !alleenFavorieten &&
                huidigeCategorie ===
                knop.dataset.categorie
            );

        }
    );


    if (favorietenKnop) {

        favorietenKnop.classList.toggle(
            "actief",
            alleenFavorieten
        );

    }


    if (allesKnop) {

        allesKnop.classList.toggle(
            "actief",
            huidigeCategorie === null &&
            !alleenFavorieten
        );

    }

}


// ======================================
// SCROLL NAAR RECEPTEN
// ======================================

function scrollNaarRecepten() {

    const receptenSectie =
        document.querySelector(
            ".recepten"
        );


    if (!receptenSectie) {
        return;
    }


    setTimeout(
        function () {

            receptenSectie.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        },
        100
    );

}


// ======================================
// ALLE RECEPTEN
// ======================================

function toonAlleRecepten() {

    huidigeCategorie =
        null;

    alleenFavorieten =
        false;


    knoppenBijwerken();

    receptenWeergeven();

    scrollNaarRecepten();

}


// ======================================
// FAVORIETEN
// ======================================

function toonFavorieten() {

    huidigeCategorie =
        null;

    alleenFavorieten =
        true;


    knoppenBijwerken();

    receptenWeergeven();

    scrollNaarRecepten();

}


// ======================================
// RECEPTEN WEERGEVEN
// ======================================

function receptenWeergeven() {

    if (!receptenLijst) {
        return;
    }


    receptenLijst.innerHTML = "";


    const zoekterm =
        zoekInput
            ? zoekInput.value
                .trim()
                .toLowerCase()
            : "";


    const gefilterdeRecepten =
        recepten.filter(
            function (recept) {

                const naam =
                    String(
                        recept.naam
                    ).toLowerCase();

                const categorie =
                    String(
                        recept.categorie
                    ).toLowerCase();

                const notitie =
                    String(
                        recept.notitie
                    ).toLowerCase();


                const zoekMatch =
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


                const categorieMatch =
                    huidigeCategorie ===
                    null ||
                    recept.categorie ===
                    huidigeCategorie;


                const favorietMatch =
                    !alleenFavorieten ||
                    recept.favoriet ===
                    true;


                return (
                    zoekMatch &&
                    categorieMatch &&
                    favorietMatch
                );

            }
        );


    // ==================================
    // AANTAL RECEPTEN
    // ==================================

    if (aantalRecepten) {

        aantalRecepten.textContent =
            recepten.length === 1
                ? "1 recept"
                : recepten.length +
                  " recepten";

    }


    // ==================================
    // LIJSTTITEL
    // ==================================

    if (lijstTitel) {

        if (alleenFavorieten) {

            lijstTitel.textContent =
                "⭐ Mijn favorieten";

        }

        else if (
            huidigeCategorie !== null
        ) {

            lijstTitel.textContent =
                huidigeCategorie;

        }

        else {

            lijstTitel.textContent =
                "Mijn recepten";

        }

    }


    // ==================================
    // ZOEKMELDING
    // ==================================

    if (zoekMelding) {

        zoekMelding.hidden =
            true;

    }


    // ==================================
    // GEEN RESULTATEN
    // ==================================

    if (
        gefilterdeRecepten.length ===
        0
    ) {

        if (legeLijst) {

            legeLijst.hidden =
                false;

        }

        return;

    }


    if (legeLijst) {

        legeLijst.hidden =
            true;

    }


    // ==================================
    // RECEPTKAARTEN
    // ==================================

    gefilterdeRecepten.forEach(
        function (recept) {

            const kaart =
                document.createElement(
                    "article"
                );


            kaart.className =
                "recept-kaart";


            if (recept.favoriet) {

                kaart.classList.add(
                    "favoriet"
                );

            }


            // ==================================
            // TITEL
            // ==================================

            const titel =
                document.createElement(
                    "h3"
                );


            titel.textContent =
                recept.naam;


            // ==================================
            // CATEGORIE
            // ==================================

            const categorie =
                document.createElement(
                    "div"
                );


            categorie.className =
                "recept-categorie";


            categorie.textContent =
                recept.categorie;


            // ==================================
            // NOTITIE
            // ==================================

            const notitie =
                document.createElement(
                    "p"
                );


            notitie.className =
                "recept-notitie";


            notitie.textContent =
                recept.notitie;


            if (!recept.notitie) {

                notitie.hidden =
                    true;

            }


            // ==================================
            // RECEPT OPENEN
            // ==================================

            const link =
                document.createElement(
                    "a"
                );


            link.className =
                "recept-link";


            link.href =
                recept.url;


            link.target =
                "_blank";


            link.rel =
                "noopener noreferrer";


            link.textContent =
                "🍴 Recept openen";


            // ==================================
            // ACTIEKNOPPEN
            // ==================================

            const acties =
                document.createElement(
                    "div"
                );


            acties.className =
                "recept-acties";


            // ----------------------------------
            // FAVORIET
            // ----------------------------------

            const favorietKnop =
                document.createElement(
                    "button"
                );


            favorietKnop.type =
                "button";


            favorietKnop.className =
                "favoriet-knop";


            favorietKnop.textContent =
                recept.favoriet
                    ? "⭐ Favoriet"
                    : "☆ Favoriet";


            favorietKnop.addEventListener(
                "click",
                function () {

                    favorietWisselen(
                        recept.id
                    );

                }
            );


            // ----------------------------------
            // BEWERKEN
            // ----------------------------------

            const bewerkKnop =
                document.createElement(
                    "button"
                );


            bewerkKnop.type =
                "button";


            bewerkKnop.className =
                "bewerk-knop";


            bewerkKnop.textContent =
                "✏️ Bewerken";


            bewerkKnop.addEventListener(
                "click",
                function () {

                    receptBewerken(
                        recept.id
                    );

                }
            );


            // ----------------------------------
            // VERWIJDEREN
            // ----------------------------------

            const verwijderKnop =
                document.createElement(
                    "button"
                );


            verwijderKnop.type =
                "button";


            verwijderKnop.className =
                "verwijder-knop";


            verwijderKnop.textContent =
                "🗑️ Verwijderen";


            verwijderKnop.addEventListener(
                "click",
                function () {

                    receptVerwijderen(
                        recept.id
                    );

                }
            );


            // ==================================
            // ACTIES OPBOUWEN
            // ==================================

            acties.appendChild(
                favorietKnop
            );

            acties.appendChild(
                bewerkKnop
            );

            acties.appendChild(
                verwijderKnop
            );


            // ==================================
            // KAART OPBOUWEN
            // ==================================

            kaart.appendChild(
                titel
            );

            kaart.appendChild(
                categorie
            );

            kaart.appendChild(
                notitie
            );

            kaart.appendChild(
                link
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
// ZOEKEN
// ======================================

if (zoekInput) {

    zoekInput.addEventListener(
        "input",
        function () {

            receptenWeergeven();

        }
    );

}


// ======================================
// TOEVOEGEN KNOP
// ======================================

if (toevoegenKnop) {

    toevoegenKnop.addEventListener(
        "click",
        function () {

            formulierNormaalMaken();

            formulierTonen();

        }
    );

}


// ======================================
// OPSLAAN KNOP
// ======================================

if (opslaanKnop) {

    opslaanKnop.addEventListener(
        "click",
        function () {

            receptToevoegen();

        }
    );

}


// ======================================
// ANNULEREN KNOP
// ======================================

if (annulerenKnop) {

    annulerenKnop.addEventListener(
        "click",
        function () {

            bewerkenAnnuleren();

        }
    );

}


// ======================================
// FAVORIETEN KNOP
// ======================================

if (favorietenKnop) {

    favorietenKnop.addEventListener(
        "click",
        function () {

            toonFavorieten();

        }
    );

}


// ======================================
// ALLE RECEPTEN KNOP
// ======================================

if (allesKnop) {

    allesKnop.addEventListener(
        "click",
        function () {

            toonAlleRecepten();

        }
    );

}


// ======================================
// ALLES WISSEN
// ======================================

if (allesWissenKnop) {

    allesWissenKnop.addEventListener(
        "click",
        function () {

            allesWissen();

        }
    );

}


function allesWissen() {

    if (recepten.length === 0) {

        alert(
            "Er staan nog geen recepten in je lijst."
        );

        return;

    }


    const eersteBevestiging =
        confirm(
            "Weet je zeker dat je alle recepten wilt verwijderen?"
        );


    if (!eersteBevestiging) {
        return;
    }


    const tweedeBevestiging =
        confirm(
            "LET OP!\n\nAlle " +
            recepten.length +
            " recepten worden verwijderd.\n\nWeet je dit zeker?"
        );


    if (!tweedeBevestiging) {
        return;
    }


    // Eerst een backup maken
    localStorage.setItem(
        OPSLAG_BACKUP,
        JSON.stringify(
            recepten
        )
    );


    recepten = [];


    localStorage.removeItem(
        OPSLAG_NAAM
    );


    huidigeCategorie =
        null;

    alleenFavorieten =
        false;


    knoppenBijwerken();

    categorieTellingenBijwerken();

    formulierNormaalMaken();

    formulierVerbergen();

    receptenWeergeven();

}


// ======================================
// BACKUP MAKEN
// ======================================

function backupMaken() {

    try {

        localStorage.setItem(
            OPSLAG_BACKUP,
            JSON.stringify(
                recepten
            )
        );


        alert(
            "Backup succesvol gemaakt."
        );

    } catch (fout) {

        console.error(
            "Backup fout:",
            fout
        );

        alert(
            "De backup kon niet worden gemaakt."
        );

    }

}


// ======================================
// BACKUP TERUGZETTEN
// ======================================

function backupTerugzetten() {

    const backup =
        localStorage.getItem(
            OPSLAG_BACKUP
        );


    if (!backup) {

        alert(
            "Er is geen backup beschikbaar."
        );

        return;

    }


    if (
        !confirm(
            "Weet je zeker dat je de backup wilt terugzetten?\n\nJe huidige recepten worden vervangen."
        )
    ) {

        return;

    }


    try {

        const backupRecepten =
            JSON.parse(
                backup
            );


        if (
            !Array.isArray(
                backupRecepten
            )
        ) {

            throw new Error(
                "Ongeldige backup"
            );

        }


        recepten =
            backupRecepten;


        receptenMigreren();

        receptenOpslaan();

        categorieTellingenBijwerken();

        formulierNormaalMaken();

        formulierVerbergen();

        receptenWeergeven();


        alert(
            "Backup succesvol teruggezet."
        );


    } catch (fout) {

        console.error(
            "Backup terugzetten fout:",
            fout
        );

        alert(
            "De backup is ongeldig."
        );

    }

}


// ======================================
// RECEPTEN DOWNLOADEN
// ======================================

function receptenDownloaden() {

    if (recepten.length === 0) {

        alert(
            "Er zijn geen recepten om te downloaden."
        );

        return;

    }


    try {

        const exportData = {

            app:
                "Mijn Recepten",

            versie:
                HUIDIGE_OPSLAG_VERSIE,

            exportDatum:
                new Date().toISOString(),

            categorieen:
                CATEGORIEEN,

            aantalRecepten:
                recepten.length,

            recepten:
                recepten

        };


        const json =
            JSON.stringify(
                exportData,
                null,
                2
            );


        const blob =
            new Blob(
                [json],
                {
                    type:
                        "application/json;charset=utf-8"
                }
            );


        const downloadUrl =
            URL.createObjectURL(
                blob
            );


        const downloadLink =
            document.createElement(
                "a"
            );


        downloadLink.href =
            downloadUrl;


        downloadLink.download =
            "mijn-recepten-" +
            datumVoorBestand() +
            ".json";


        downloadLink.style.display =
            "none";


        document.body.appendChild(
            downloadLink
        );


        downloadLink.click();


        document.body.removeChild(
            downloadLink
        );


        setTimeout(
            function () {

                URL.revokeObjectURL(
                    downloadUrl
                );

            },
            1000
        );


    } catch (fout) {

        console.error(
            "Download fout:",
            fout
        );

        alert(
            "Het downloaden van de recepten is mislukt."
        );

    }

}


// ======================================
// DATUM VOOR BESTANDSNAAM
// ======================================

function datumVoorBestand() {

    const nu =
        new Date();


    const jaar =
        nu.getFullYear();


    const maand =
        String(
            nu.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const dag =
        String(
            nu.getDate()
        ).padStart(
            2,
            "0"
        );


    const uur =
        String(
            nu.getHours()
        ).padStart(
            2,
            "0"
        );


    const minuten =
        String(
            nu.getMinutes()
        ).padStart(
            2,
            "0"
        );


    return (
        jaar +
        "-" +
        maand +
        "-" +
        dag +
        "_" +
        uur +
        "-" +
        minuten
    );

}


// ======================================
// BACKUP IMPORTEREN
// ======================================

function backupImporteren(bestand) {

    if (!bestand) {
        return;
    }


    const reader =
        new FileReader();


    reader.onload =
        function (event) {

            try {

                const inhoud =
                    JSON.parse(
                        event.target.result
                    );


                let geimporteerdeRecepten;


                // Nieuwe export
                if (
                    inhoud &&
                    Array.isArray(
                        inhoud.recepten
                    )
                ) {

                    geimporteerdeRecepten =
                        inhoud.recepten;

                }

                // Oud formaat
                else if (
                    Array.isArray(
                        inhoud
                    )
                ) {

                    geimporteerdeRecepten =
                        inhoud;

                }

                else {

                    throw new Error(
                        "Geen geldige backup"
                    );

                }


                if (
                    !confirm(
                        "Weet je zeker dat je deze backup wilt importeren?\n\nJe huidige recepten worden vervangen."
                    )
                ) {

                    return;

                }


                recepten =
                    geimporteerdeRecepten;


                receptenMigreren();

                receptenOpslaan();

                categorieTellingenBijwerken();

                formulierNormaalMaken();

                formulierVerbergen();

                receptenWeergeven();


                alert(
                    "Backup succesvol geïmporteerd."
                );


            } catch (fout) {

                console.error(
                    "Import fout:",
                    fout
                );

                alert(
                    "Dit bestand is geen geldige Mijn-Recepten backup."
                );

            }

        };


    reader.onerror =
        function () {

            alert(
                "Het bestand kon niet worden gelezen."
            );

        };


    reader.readAsText(
        bestand
    );

}


// ======================================
// BACKUP BESTAND KIEZEN
// ======================================

function backupBestandKiezen() {

    const invoer =
        document.createElement(
            "input"
        );


    invoer.type =
        "file";


    invoer.accept =
        ".json,application/json";


    invoer.addEventListener(
        "change",
        function () {

            if (
                invoer.files &&
                invoer.files.length > 0
            ) {

                backupImporteren(
                    invoer.files[0]
                );

            }

        }
    );


    invoer.click();

}


// ======================================
// ENTER = OPSLAAN
// ======================================

[
    naamInput,
    urlInput
].forEach(
    function (veld) {

        if (!veld) {
            return;
        }


        veld.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    event.preventDefault();

                    receptToevoegen();

                }

            }
        );

    }
);


// ======================================
// GLOBALE FUNCTIES
// ======================================

window.receptToevoegen =
    receptToevoegen;

window.receptBewerken =
    receptBewerken;

window.receptVerwijderen =
    receptVerwijderen;

window.favorietWisselen =
    favorietWisselen;

window.bewerkenAnnuleren =
    bewerkenAnnuleren;

window.allesWissen =
    allesWissen;

window.toonAlleRecepten =
    toonAlleRecepten;

window.toonFavorieten =
    toonFavorieten;

window.backupMaken =
    backupMaken;

window.backupTerugzetten =
    backupTerugzetten;

window.receptenDownloaden =
    receptenDownloaden;

window.backupImporteren =
    backupImporteren;

window.backupBestandKiezen =
    backupBestandKiezen;

window.formulierTonen =
    formulierTonen;

window.formulierVerbergen =
    formulierVerbergen;


// ======================================
// EINDE SCRIPT
// ======================================
