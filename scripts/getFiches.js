let S1 = []
let S2 = []
let S3 = []
let S4 = []
let S5 = []
let S6 = []
let S7 = []
let S8 = []

let S1gohst = []
let S2gohst = []
let S3gohst = []
let S4gohst = []
let S5gohst = []
let S6gohst = []
let S7gohst = []
let S8gohst = []



async function loadData() {
    S1 = await loadJson('Data/S1.json')
    S1gohst = S1.filter(fiche => {
        return fiche["NomColis"] === "Ecart pirate"
    })

    S1 = S1.filter(fiche => {
        return fiche["NomColis"] != "Ecart pirate"
    })


    S2 = await loadJson('Data/S2.json')
    S2gohst = S2.filter(fiche => {
        return fiche["NomColis"] === "Ecart pirate"
    })
    S2 = S2.filter(fiche => {
        return fiche["NomColis"] != "Ecart pirate"
    })


    S3 = await loadJson('Data/S3.json')
    S3gohst = S3.filter(fiche => {
        return fiche["NomColis"] === "Ecart pirate"
    })
    S3 = S3.filter(fiche => {
        return fiche["NomColis"] != "Ecart pirate"
    })


    S4 = await loadJson('Data/S4.json')
    S4gohst = S4.filter(fiche => {
        return fiche["NomColis"] != "Ecart pirate"
    })
    S4 = S4.filter(fiche => {
        return fiche["NomColis"] != "Ecart pirate"
    })
 

    S5 = await loadJson('Data/S5.json')
    S5gohst = S5.filter(fiche => {
        return fiche["NomColis"] != "Ecart pirate"
    })
    S5 = S5.filter(fiche => {
        return fiche["NomColis"] != "Ecart pirate"
    })


    S6 = await loadJson('Data/S6.json')
    S6gohst =  S6.filter(fiche => {
        return fiche["NomColis"] != "Ecart pirate"
    })
    S6 = S6.filter(fiche => {
        return fiche["NomColis"] != "Ecart pirate"
    })


    S7 = await loadJson('Data/S7.json')
    S7gohst =  S7.filter(fiche => {
        return fiche["NomColis"] != "Ecart pirate"
    })

    S7 = S7.filter(fiche => {
        return fiche["NomColis"] != "Ecart pirate"
    })

    S8 = await loadJson('Data/S8.json')
    S8gohst =  S8.filter(fiche => {
        return fiche["NomColis"] === "Ecart pirate"
    })
    S8 = S8.filter(fiche => {
        return fiche["NomColis"] != "Ecart pirate"
    })
    
}


async function loadJson(name) {
    const response = await fetch(name)
    var json = await response.json()

    return json
}

function getFiches() {

    return S8
}

function getFichesFantomes(){
    return S8gohst
}

function getAllWeks() {
    return [S8, S7, S6, S5, S4, S3, S2, S1]
}
function CreateFicheConforme(infosFiches) {
    return `<div class="fiche"> \
<div class="nomColis">\
    <p>${infosFiches["NomColis"]}</p>\
</div>\
<div class="numDemande">\
    <p class="fitsize" >Demande numéro :</p>\
    <p>${infosFiches["NumDemande"]}</p>\
</div>\
<div class="ligneInfo">\
    <div class="caractéristiquesFiche">\
\
        <p>Responsable</p>\
        <div class="affichageInfo">\
            <p>${infosFiches["Contact"]}</p>\
        </div>\
    </div>\
    <div class="caractéristiquesFiche">\
\
        <p>Dates</p>\
        <div class="affichageInfo">\
            <p>${infosFiches["DateDebut"]} - ${infosFiches["DateFin"]}</p>\
        </div>\
    </div>\
</div>\
<div class="ligneInfo">\
    <div class="caractéristiquesFiche">\
\
        <p>DCC</p>\
        <div class="affichageInfo">\
            <p>${infosFiches["DCC"]}</p>\
        </div>\
    </div>\
    <div class="caractéristiquesFiche">\
\
        <p>Numero de local</p>\
        <div class="affichageInfo">\
            <p>${infosFiches["NumLocal"]}</p>\
        </div>\
    </div>\
</div>\
</div>`
}

function createFicheNonConforme(infosFiches) {
    return `<div class="fiche"> \
<div class="nomColis">\
    <p>${infosFiches["NomColis"]}</p>\
</div>\
<div class="numDemande">\
    <p class="fitsize" >Demande numéro :</p>\
    <p>${infosFiches["NumDemande"]}</p>\
</div>\
<div class="ligneInfo">\
    <div class="caractéristiquesFiche">\
\
        <p>Responsable</p>\
        <div class="affichageInfo">\
            <p>${infosFiches["Contact"]}</p>\
        </div>\
    </div>\
    <div class="caractéristiquesFiche">\
\
        <p>Dates</p>\
        <div class="affichageInfo">\
            <p>${infosFiches["DateDebut"]} - ${infosFiches["DateFin"]}</p>\
        </div>\
    </div>\
</div>\
<div class="ligneInfo">\
    <div class="caractéristiquesFiche">\
\
        <p>DCC</p>\
        <div class="affichageInfo">\
            <p>${infosFiches["DCC"]}</p>\
        </div>\
    </div>\
    <div class="caractéristiquesFiche">\
\
        <p>Numero de local</p>\
        <div class="affichageInfo">\
            <p>${infosFiches["NumLocal"]}</p>\
        </div>\
    </div>\
</div>\
<div class="raisonFiche">\
<div class="raisonTitle">\
<p>Raison de la non confirmité</p>\
</div>\
<div class="raison">\
<p>${infosFiches["Motif"]}</p>\
</div>\
</div>\
</div>`
}
function CreateFicheFantomes(infosFiches) {
    return `<div class="fiche"> \
<div class="nomColis">\
    <p>${infosFiches["NomColis"]}</p>\
</div>\
<div class="ligneInfo">\
    <div class="caractéristiquesFiche">\
\
        <p>Batiment</p>\
        <div class="affichageInfo">\
            <p>${infosFiches["Batiment"]}</p>\
        </div>\
    </div>\
    <div class="caractéristiquesFiche">\
\
        <p>Niveau</p>\
        <div class="affichageInfo">\
            <p>${infosFiches["Niveau"]}</p>\
        </div>\
    </div>\
</div>\
<div class="ligneInfo">\
    <div class="caractéristiquesFiche">\
\
        <p>Precision</p>\
        <div class="affichageInfo">\
            <p>${infosFiches["Precision"]}</p>\
        </div>\
    </div>\
    <div class="caractéristiquesFiche">\
\
        <p>Numero de local</p>\
        <div class="affichageInfo">\
            <p>${infosFiches["NumLocal"]}</p>\
        </div>\
    </div>\
</div>\
</div>`
}

function getFicheMisesAJour() {
    let fichesMisesAJours = []
    getFiches().forEach(fiche => {
        S7.forEach(oldFiche => {
            if (fiche["NumDemande"] === oldFiche["NumDemande"] && fiche["Conformite"] === "Oui" && oldFiche["Conformite"] === "Non") {
                fichesMisesAJours.push(fiche)
            }
        })
    })
    return fichesMisesAJours
}

function getFichesConformes() {
    return getFiches().filter(fiche => fiche["Conformite"] === "Oui")
        ;
}

function getFichesNonConformes() {
    return getFiches().filter(fiche => fiche["Conformite"] === "Non")
        ;
}

function getfiches1Semaine() {

    return getFiches().filter(fiche => fiche["Conformite"] === "Oui" && dateNonconformeDans1semaine(fiche["DateFin"]))
        ;
}
function ficheNonConformeDansXSemaine(date, NbSemaine) {
    let nbJours = NbSemaine * 7
    var DateToRow = date.split("/")
    var date = new Date(DateToRow[1] + "/" + DateToRow[0] + "/" + DateToRow[2])
    const today = new Date()

    const diffTime = (date - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


    return nbJours - 6 - today.getDay() <= diffDays && diffDays <= nbJours - today.getDay()
}


function dateNonconformeDans1semaine(date) {
    return ficheNonConformeDansXSemaine(date, 1)
}

function dateNonConformeDans2Semaine(date) {
    return ficheNonConformeDansXSemaine(date, 2)
}


function getfiches2semaines() {
    return getFiches().filter(fiche => fiche["Conformite"] === "Oui" && dateNonConformeDans2Semaine(fiche["DateFin"]))
        ;
}


export {getFichesFantomes,CreateFicheFantomes,getAllWeks, getFiches, getfiches2semaines, getfiches1Semaine, getFichesConformes, getFichesNonConformes, createFicheNonConforme, CreateFicheConforme, loadData, getFicheMisesAJour }
