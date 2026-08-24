// ======================================
// MIJN RECEPTEN
// JAVASCRIPT
// ======================================


// ======================================
// OPSLAG
// ======================================

const OPSLAG_NAAM =
    "mijnRecepten";


// ======================================
// CATEGORIEËN
// ======================================

const CATEGORIEEN = [

    {
        waarde: "kip",
        naam: "Kip",
        icoon: "🍗"
    },

    {
        waarde: "vlees",
        naam: "Vlees",
        icoon: "🥩"
    },

    {
        waarde: "vis",
        naam: "Vis",
        icoon: "🐟"
    },

    {
        waarde: "pastas",
        naam: "Pasta's",
        icoon: "🍝"
    },

    {
        waarde: "italiaans",
        naam: "Italiaans",
        icoon: "🇮🇹"
    },

    {
        waarde: "slowcook",
        naam: "Slowcook",
        icoon: "🍲"
    },

    {
        waarde: "indiaans",
        naam: "Indiaans",
        icoon: "🇮🇳"
    },

    {
        waarde: "aziatisch",
        naam: "Aziatisch",
        icoon: "🥢"
    },

    {
        waarde: "afrikaans",
        naam: "Afrikaans",
        icoon: "🌍"
    },

    {
        waarde: "burgers-sandwiches",
        naam: "Burgers/Sandwiches",
        icoon: "🍔"
    },

    {
        waarde: "potato",
        naam: "Potato gerechten",
        icoon: "🥔"
    },

    {
        waarde: "bijgerechten",
        naam: "Bijgerechten",
        icoon: "🥗"
    },

    {
        waarde: "brood-bakken",
        naam: "Brood Bakken",
        icoon: "🍞"
    },

    {
        waarde: "mexicaans",
        naam: "Mexicaans",
        icoon: "🌮"
    },

    {
        waarde: "soepen",
        naam: "Soepen",
        icoon: "🍲"
    }

];


// ======================================
// ELEMENTEN
// ======================================

const naamInput =
    document.getElementById(
        "naamInput"
    );

const urlInput =
    document.getElementById(
        "urlInput"
    );

const categorieInput =
    document.getElementById(
        "categorieInput"
    );

const notitieInput =
    document.getElementById(
        "notitieInput"
    );

const favorietInput =
    document.getElementById(
        "favorietInput"
    );

const opslaanKnop =
    document.getElementById(
        "opslaanKnop"
    );

const zoekInput =
    document.getElementById(
        "zoekInput"
    );

const receptenLijst =
    document.getElementById(
        "receptenLijst"
    );

const legeLijst =
    document.getElementById(
        "legeLijst"
    );

const zoekMelding =
    document.getElementById(
        "zoekMelding"
    );

const aantalRecepten =
    document.getElementById(
        "aantalRecepten"
    );

const aantalFavorieten =
    document.getElementById(
        "aantalFavorieten"
    );

const lijstTitel =
    document.getElementById(
        "lijstTitel"
    );

const allesWissenKnop =
    document.getElementById(
        "allesWissenKnop"
    );

const favorietenKnop =
    document.getElementById(
        "favorietenKnop"
    );

const categorieKnoppen =
    document.getElementById(
        "categorieKnoppen"
    );


// ======================================
// DATA
// ======================================

function receptenLaden() {

    try {

        const opgeslagen =
            localStorage.getItem(
                OPSLAG_NAAM
            );

        if (!opgeslagen) {
            return [];
        }

        const data =
            JSON.parse(
                opgeslagen
            );

        return Array.isArray(data)
            ? data
            : [];

    } catch (error) {

        console.error(
            "Fout bij laden recepten:",
            error
        );

        return [];

    }

}


let recepten =
    receptenLaden();


let geselecteerdeCategorie =
    "";


let alleenFavorieten =
    false;


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
// ID
// ======================================

function nieuwId() {

    return (
        Date.now() +
        Math.random()
    );

}


// ======================================
// CATEGORIE NAAM
// ======================================

function categorieGegevens(
    waarde
) {

    return CATEGORIEEN.find(
        categorie =>
            categorie.waarde ===
            waarde
    );

}


// ======================================
// CATEGORIE SELECT VULLEN
// ======================================

function categorieSelectVullen() {

    categorieInput.innerHTML = "";

    const eersteOptie =
        document.createElement(
            "option"
        );

    eersteOptie.value = "";

    eersteOptie.textContent =
        "Kies een categorie";

    categorieInput.appendChild(
        eersteOptie
    );


    CATEGORIEEN.forEach(
        categorie => {

            const optie =
                document.createElement(
                    "option"
                );

            optie.value =
                categorie.waarde;

            optie.textContent =
                `${categorie.icoon} ${categorie.naam}`;

            categorieInput.appendChild(
                optie
            );

        }
    );

}


// ======================================
// CATEGORIE KNOPPEN
// ======================================

function categorieKnoppenWeergeven() {

    categorieKnoppen.innerHTML = "";


    CATEGORIEEN.forEach(
        categorie => {

            const knop =
                document.createElement(
                    "button"
                );

            knop.type = "button";

            knop.className =
                "categorie-knop";


            if (
                geselecteerdeCategorie ===
                categorie.waarde
            ) {

                knop.classList.add(
                    "actief"
                );

            }


            knop.innerHTML = `

                <span class="categorie-icoon">
                    ${categorie.icoon}
                </span>

                <span class="categorie-naam">
                    ${categorie.naam}
                </span>

            `;


            knop.addEventListener(
                "click",
                () => {

                    if (
                        geselecteerdeCategorie ===
                        categorie.waarde
                    ) {

                        geselecteerdeCategorie =
                            "";

                    } else {

                        geselecteerdeCategorie =
                            categorie.waarde;

                    }


                    alleenFavorieten =
                        false;

                    favorietenKnop.classList
                        .remove("actief");

                    categorieKnoppenWeergeven();

                    receptenWeergeven();

                }
            );


            categorieKnoppen.appendChild(
                knop
            );

        }
    );

}


// ======================================
// RECEPTEN FILTEREN
// ======================================

function receptenFilteren() {

    let resultaat =
        [...recepten];


    // Categorie

    if (geselecteerdeCategorie) {

        resultaat =
            resultaat.filter(
                recept =>
                    recept.categorie ===
                    geselecteerdeCategorie
            );

    }


    // Favorieten

    if (alleenFavorieten) {

        resultaat =
            resultaat.filter(
                recept =>
                    recept.favoriet === true
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

                    const naam =
                        recept.naam
                            ?.toLowerCase() ||
                        "";

                    const categorie =
                        categorieGegevens(
                            recept.categorie
                        );

                    const categorieNaam =
                        categorie
                            ?.naam
                            .toLowerCase() ||
                        "";

                    const notitie =
                        recept.notitie
                            ?.toLowerCase() ||
                        "";


                    return (

                        naam.includes(
                            zoekterm
                        )

                        ||

                        categorieNaam.includes(
                            zoekterm
                        )

                        ||

                        notitie.includes(
                            zoekterm
                        )

                    );

                }
            );

    }


    return resultaat;

}


// ======================================
// TITEL BIJWERKEN
// ======================================

function titelBijwerken() {

    if (alleenFavorieten) {

        lijstTitel.textContent =
            "❤️ Mijn favorieten";

        return;

    }


    if (geselecteerdeCategorie) {

        const categorie =
            categorieGegevens(
                geselecteerdeCategorie
            );

        if (categorie) {

            lijstTitel.textContent =
                `${categorie.icoon} ${categorie.naam}`;

            return;

        }

    }


    lijstTitel.textContent =
        "🍴 Mijn recepten";

}


// ======================================
// RECEPTEN WEERGEVEN
// ======================================

function receptenWeergeven() {

    receptenLijst.innerHTML = "";


    const lijst =
        receptenFilteren();


    titelBijwerken();


    // Statistieken

    aantalRecepten.textContent =
        recepten.length;


    aantalFavorieten.textContent =
        recepten.filter(
            recept =>
                recept.favoriet === true
        ).length;


    // Zoekmelding

    const zoekterm =
        zoekInput.value.trim();


    if (zoekterm) {

        zoekMelding.textContent =
            `${lijst.length} resultaat${
                lijst.length === 1
                    ? ""
                    : "en"
            }`;

    } else {

        zoekMelding.textContent =
            "";

    }


    // Lege lijst

    legeLijst.style.display =
        lijst.length === 0
            ? "block"
            : "none";


    if (lijst.length === 0) {

        if (zoekterm) {

            legeLijst.textContent =
                "🔎 Geen recepten gevonden.";

        }

        else if (alleenFavorieten) {

            legeLijst.textContent =
                "❤️ Je hebt nog geen favoriete recepten.";

        }

        else if (geselecteerdeCategorie) {

            const categorie =
                categorieGegevens(
                    geselecteerdeCategorie
                );

            legeLijst.textContent =
                `Nog geen recepten in ${
                    categorie?.naam || "deze categorie"
                }.`;

        }

        else {

            legeLijst.textContent =
                "Nog geen recepten toegevoegd.";

        }

    }


    lijst.forEach(
        recept => {

            const kaart =
                document.createElement(
                    "article"
                );

            kaart.className =
                "recept-kaart";


            // ==================================
            // BOVENKANT
            // ==================================

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

            favoriet.type = "button";

            favoriet.className =
                "favoriet-knop";


            favoriet.textContent =
                recept.favoriet
                    ? "❤️"
                    : "🤍";


            favoriet.title =
                recept.favoriet
                    ? "Verwijder uit favorieten"
                    : "Toevoegen aan favorieten";


            favoriet.addEventListener(
                "click",
                () => {

                    recept.favoriet =
                        !recept.favoriet;

                    receptenOpslaan();

                    receptenWeergeven();

                }
            );


            bovenkant.appendChild(
                titel
            );

            bovenkant.appendChild(
                favoriet
            );


            // ==================================
            // CATEGORIE
            // ==================================

            const categorie =
                categorieGegevens(
                    recept.categorie
                );


            const categorieLabel =
                document.createElement(
                    "span"
                );

            categorieLabel.className =
                "recept-categorie";


            categorieLabel.textContent =
                categorie
                    ? `${categorie.icoon} ${categorie.naam}`
                    : "🍽️ Overig";


            // ==================================
            // NOTITIE
            // ==================================

            const notitie =
                document.createElement(
                    "p"
                );

            notitie.className =
                "recept-notitie";


            if (recept.notitie) {

                notitie.textContent =
                    recept.notitie;

            } else {

                notitie.textContent =
                    "Geen notitie toegevoegd.";

                notitie.classList.add(
                    "geen-notitie"
                );

            }


            // ==================================
            // ACTIES
            // ==================================

            const acties =
                document.createElement(
                    "div"
                );

            acties.className =
                "recept-acties";


            // Link

            if (recept.url) {

                const bekijkKnop =
                    document.createElement(
                        "a"
                    );

                bekijkKnop.href =
                    recept.url;

                bekijkKnop.target =
                    "_blank";

                bekijkKnop.rel =
                    "noopener noreferrer";

                bekijkKnop.className =
                    "bekijk-knop";

                bekijkKnop.textContent =
                    "🔗 Recept bekijken";

                acties.appendChild(
                    bekijkKnop
                );

            }


            // Bewerken

            const bewerkKnop =
                document.createElement(
                    "button"
                );

            bewerkKnop.type = "button";

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


            // Verwijderen

            const verwijderKnop =
                document.createElement(
                    "button"
                );

            verwijderKnop.type = "button";

            verwijderKnop.className =
                "verwijder-knop";

            verwijderKnop.textContent =
                "🗑️";


            verwijderKnop.title =
                "Recept verwijderen";


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


            receptenLijst.appendChild(
                kaart
            );

        }
    );

}


// ======================================
// RECEPT BEWERKEN
// ======================================

function receptBewerken(
    recept
) {

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
        "💾 Wijziging opslaan";


    opslaanKnop.dataset.bewerkId =
        recept.id;


    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });


    naamInput.focus();

}


// ======================================
// FORMULIER LEGEN
// ======================================

function formulierLeegmaken() {

    naamInput.value = "";

    urlInput.value = "";

    categorieInput.value = "";

    notitieInput.value = "";

    favorietInput.checked =
        false;


    delete opslaanKnop.dataset.bewerkId;


    opslaanKnop.textContent =
        "🍳 Recept opslaan";

}


// ======================================
// RECEPT OPSLAAN
// ======================================

opslaanKnop.addEventListener(
    "click",
    () => {

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


        // Naam

        if (!naam) {

            alert(
                "Vul een naam voor het recept in."
            );

            naamInput.focus();

            return;

        }


        // Categorie

        if (!categorie) {

            alert(
                "Kies een categorie."
            );

            categorieInput.focus();

            return;

        }


        // URL

        if (
            url &&
            !/^https?:\/\//i.test(url)
        ) {

            alert(
                "Vul een geldige link in die begint met https://"
            );

            urlInput.focus();

            return;

        }


        const bewerkId =
            opslaanKnop.dataset.bewerkId;


        // ==================================
        // BEWERKEN
        // ==================================

        if (bewerkId) {

            const recept =
                recepten.find(
                    item =>
                        String(item.id) ===
                        String(bewerkId)
                );


            if (recept) {

                recept.naam =
                    naam;

                recept.url =
                    url;

                recept.categorie =
                    categorie;

                recept.notitie =
                    notitie;

                recept.favoriet =
                    favoriet;

            }

        }

        // ==================================
        // NIEUW
        // ==================================

        else {

            recepten.push({

                id:
                    nieuwId(),

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

                aangemaakt:
                    new Date().toISOString()

            });

        }


        receptenOpslaan();

        formulierLeegmaken();

        receptenWeergeven();

    }
);


// ======================================
// ZOEKEN
// ======================================

zoekInput.addEventListener(
    "input",
    () => {

        receptenWeergeven();

    }
);


// ======================================
// FAVORIETEN
// ======================================

favorietenKnop.addEventListener(
    "click",
    () => {

        alleenFavorieten =
            !alleenFavorieten;


        geselecteerdeCategorie =
            "";


        favorietenKnop.classList.toggle(
            "actief",
            alleenFavorieten
        );


        categorieKnoppenWeergeven();

        receptenWeergeven();

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
                "Er staan nog geen recepten in je app."
            );

            return;

        }


        const bevestiging =
            confirm(
                "Weet je zeker dat je ALLE recepten wilt verwijderen?\n\nDeze actie kan niet automatisch worden teruggedraaid."
            );


        if (!bevestiging) {
            return;
        }


        recepten = [];


        receptenOpslaan();


        geselecteerdeCategorie =
            "";

        alleenFavorieten =
            false;


        favorietenKnop.classList.remove(
            "actief"
        );


        categorieKnoppenWeergeven();

        receptenWeergeven();

    }
);


// ======================================
// START
// ======================================

categorieSelectVullen();

categorieKnoppenWeergeven();

receptenWeergeven();
