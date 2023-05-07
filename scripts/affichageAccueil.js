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

    $(".circle.GreenBackground").empty()
    $(".circle.RedBackground").empty()
    $(".circle.OrangeBackground").empty()
    $(".circle.DarkOrangeBackground").empty()
    $(".circle.BlackBackground").empty()
    $(".NumberUpdated").empty()

    
    filter.notFilterFiches =fichesConformes
    $(".nbConformes").append(`<p>${filter.filteredFiches.length } </p>`)

    
    filter.notFilterFiches = fichesNonConformes
    $(".nbNonConformes").append(`<p>${filter.filteredFiches.length } </p>`)


    filter.notFilterFiches = fichesNonConformes1semaine
    $(".nbNonConformes1Semaine").append(`<p>${filter.filteredFiches.length } </p>`)


    filter.notFilterFiches = fichesNonConformes2semaine
    $(".nbNonConformes2Semaine").append(`<p>${filter.filteredFiches.length } </p>`)

    filter.notFilterFiches = fichesMisesAJours
    
    $(".nbMisAJour").append(`<p>${filter.filteredFiches.length } </p>`)


    $(".nbPirates").append(`<p>${fichesFantomes.length } </p>`)

    filter.notFilterFiches = fiches
    printGraph(filter.filteredFiches)
}

filter.handler= showFichesFiltered
showFichesFiltered()
