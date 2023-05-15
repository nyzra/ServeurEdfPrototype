import { getfiches1Semaine, CreateFicheConforme ,loadData } from "./getFiches.js"
await loadData()
let filter = window.filter

let fiches = getfiches1Semaine()
console.log(fiches)
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
showFichesFiltered()