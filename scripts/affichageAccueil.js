import { getFichesConformes,getFichesNonConformes, getfiches1Semaine ,getFichesFantomes,getfiches2semaines,loadData ,getFicheMisesAJour ,getFiches} from "./getFiches.js"
import { printGraph } from "./graph.js"
await loadData()

let filter = window.filter
let fiches = getFiches()

let fichesNonConformes=getFichesNonConformes()
let fichesConformes =getFichesConformes()
let fichesNonConformes1semaine = getfiches1Semaine()
let fichesNonConformes2semaine = getfiches2semaines()
let fichesMisesAJours = getFicheMisesAJour()
let fichesFantomes = getFichesFantomes()
function showFichesFiltered() {

    $(".nbConformes").empty()
    $(".nbNonConformes").empty()
    $(".nbNonConformes1Semaine").empty()
    $(".nbNonConformes2Semaine").empty()
    $(".nbMisAJour").empty()
    $(".nbPirates").empty()

    
    filter.notFilterFiches =fichesConformes
    $(".nbConformes").append(`${filter.filteredFiches.length } `)

    
    filter.notFilterFiches = fichesNonConformes
    $(".nbNonConformes").append(`${filter.filteredFiches.length } `)


    filter.notFilterFiches = fichesNonConformes1semaine
    $(".nbNonConformes1Semaine").append(`${filter.filteredFiches.length } `)


    filter.notFilterFiches = fichesNonConformes2semaine
    $(".nbNonConformes2Semaine").append(`${filter.filteredFiches.length } `)

    filter.notFilterFiches = fichesMisesAJours
    
    $(".nbMisAJour").append(`${filter.filteredFiches.length } `)


    $(".nbPirates").append(`${fichesFantomes.length } `)

    filter.notFilterFiches = fiches
    printGraph(filter.metierChoice);
}

filter.handler= showFichesFiltered
showFichesFiltered()
