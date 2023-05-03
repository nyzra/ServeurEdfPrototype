import { CreateFicheFantomes ,loadData ,getFichesFantomes} from "./getFiches.js"
await loadData()
let filter = window.filter

function showFichesFiltered() {
    $(".containerFiches").empty()
    let fiches = getFichesFantomes()

    let fichesHTML = fiches.map(fiche => CreateFicheFantomes(fiche))
    fichesHTML.forEach(ficheHTML => {
        $(".containerFiches").append(ficheHTML)
    });
}

filter.handler= showFichesFiltered

showFichesFiltered()