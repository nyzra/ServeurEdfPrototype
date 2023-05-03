import { getFicheMisesAJour, CreateFicheConforme ,loadData } from "./getFiches.js"
await loadData()
let filter = window.filter

filter.notFilterFiches = getFicheMisesAJour()

function showFichesFiltered() {
    console.log("on affiche")
    $(".containerFiches").empty()
    let fiches = filter.filteredFiches
    let fichesHTML = fiches.map(fiche => CreateFicheConforme(fiche))
    fichesHTML.forEach(ficheHTML => {
        $(".containerFiches").append(ficheHTML)
    });
}

filter.handler= showFichesFiltered

showFichesFiltered() 