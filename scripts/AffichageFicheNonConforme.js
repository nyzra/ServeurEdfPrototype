import { getFichesNonConformes, createFicheNonConforme } from "./getFiches"

let filter = window.filter

let fiches = getFichesNonConformes()
filter.notFilterFiches = fiches

function showFichesFiltered() {
    $(".containerFiches").empty()
    let fiches = filter.filteredFiches
    let fichesHTML = fiches.map(fiche => createFicheNonConforme(fiche))
    fichesHTML.forEach(ficheHTML => {
        $(".containerFiches").append(ficheHTML)
    });
}

filter.handler= showFichesFiltered
