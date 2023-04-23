import { getfiches1Semaine, CreateFicheConforme } from "./getFiches"

let filter = window.filter

let fiches = getfiches1Semaine()
filter.notFilterFiches = fiches

function showFichesFiltered() {
    $(".containerFiches").empty()
    let fiches = filter.filteredFiches
    let fichesHTML = fiches.map(fiche => CreateFicheConforme(fiche))
    fichesHTML.forEach(ficheHTML => {
        $(".containerFiches").append(ficheHTML)
    });
}

filter.handler= showFichesFiltered
