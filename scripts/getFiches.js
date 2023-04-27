let data = []
let old = []

async function  loadData(){
    const response =  await fetch('../Data/data.json')
    var json =  await response.json()
    data=json
    const response2 =  await fetch('../Data/oldData.json')
    var json2 =  await response2.json()
    old=json2

}

function getFiches(){
    return data
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
    data.forEach(fiche => {
        old.forEach(oldFiche =>{
            if(fiche["NumDemande"]=== oldFiche["NumDemande"] && fiche["Conformite"]==="Oui" && oldFiche["Conformite"] ==="Non" ){
                fichesMisesAJours.push(fiche)
            }
        })
    })
    return fichesMisesAJours
}

function getFichesConformes() {
    return data.filter(fiche => fiche["Conformite"] === "Oui")
        ;
}

function getFichesNonConformes() {
    return data.filter(fiche => fiche["Conformite"] === "Non")
        ;
}

function getfiches1Semaine() {

    return data.filter(fiche => fiche["Conformite"] === "Oui" && dateNonconformeDans1semaine(fiche["DateFin"]))
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
    return data.filter(fiche => fiche["Conformite"] === "Oui" && dateNonConformeDans2Semaine(fiche["DateFin"]))
        ;
}


export { getFiches,getfiches2semaines, getfiches1Semaine, getFichesConformes,getFichesNonConformes ,createFicheNonConforme ,CreateFicheConforme ,loadData ,getFicheMisesAJour}
