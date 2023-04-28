import { getfiches2semaines, CreateFicheConforme ,loadData} from "./getFiches"
await loadData()
let filter = window.filter

let fiches = getfiches2semaines()
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