import { getFichesConformes, CreateFicheConforme ,loadData } from "./getFiches"
await loadData()
let filter = window.filter

filter.notFilterFiches = getFichesConformes()

function showFichesFiltered() {
    $(".containerFiches").empty()
    let fiches = filter.filteredFiches
    let fichesHTML = fiches.map(fiche => CreateFicheConforme(fiche))
    fichesHTML.forEach(ficheHTML => {
        $(".containerFiches").append(ficheHTML)
    });
}

filter.handler= showFichesFiltered

getFichesConformes()