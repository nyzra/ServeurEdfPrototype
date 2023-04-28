let S1 = []
let S2 = []
let S3 = []
let S4 = []
let S5 = []
let S6 = []
let S7 = []
let S8 = []


async function  loadData(){
     S1=await loadJson('../Data/S1.json')

     S2=await loadJson('../Data/S2.json')

     S3=await loadJson('../Data/S3.json')

     S4=await loadJson('../Data/S4.json')

     S5=await loadJson('../Data/S5.json')

     S6=await loadJson('../Data/S6.json')

     S7=await loadJson('../Data/S7.json')

     S8=await loadJson('../Data/S8.json')
}


async function loadJson(name){
    const response =  await fetch(name)
    var json =  await response.json()
    
    return json
}

function getFiches(){

    return S1
}

function getAllWeks(){
    return[S1,S2,S3,S4,S5,S6,S7,S8]
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
        <p>Charge calorifique</p>\
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
        <p>Charge calorifique</p>\
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

function getFicheMisesAJour(){
    let fichesMisesAJours = []
    S1.forEach(fiche => {
        S2.forEach(oldFiche =>{
            if(fiche["NumDemande"]=== oldFiche["NumDemande"] && fiche["Conformite"]==="Oui" && oldFiche["Conformite"] ==="Non" ){
                fichesMisesAJours.push(fiche)
            }
        })
    })
    return fichesMisesAJours
}

function getFichesConformes() {
    return S1.filter(fiche => fiche["Conformite"] === "Oui")
        ;
}

function getFichesNonConformes() {
    return S1.filter(fiche => fiche["Conformite"] === "Non")
        ;
}

function getfiches1Semaine() {

    return S1.filter(fiche => fiche["Conformite"] === "Oui" && dateNonconformeDans1semaine(fiche["DateFin"]))
        ;
}
function ficheNonConformeDansXSemaine(date, NbSemaine) {
    let nbJours = NbSemaine*7
    var DateToRow = date.split("/")
    var date = new Date(DateToRow[1] + "/" + DateToRow[0] + "/" + DateToRow[2])
    const today = new Date()

    const diffTime = (date-today );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


    return nbJours-6 - today.getDay() <= diffDays && diffDays <= nbJours - today.getDay() 
}


function dateNonconformeDans1semaine(date) {
    return ficheNonConformeDansXSemaine(date, 1)
}

function dateNonConformeDans2Semaine(date) {
    return ficheNonConformeDansXSemaine(date, 2)
}


function getfiches2semaines() {
    return S1.filter(fiche => fiche["Conformite"] === "Oui" && dateNonConformeDans2Semaine(fiche["DateFin"]))
        ;
}


export {getAllWeks, getFiches,getfiches2semaines, getfiches1Semaine, getFichesConformes,getFichesNonConformes ,createFicheNonConforme ,CreateFicheConforme ,loadData ,getFicheMisesAJour}
