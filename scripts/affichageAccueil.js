import { getFichesConformes,getFichesNonConformes, getfiches1Semaine,getfiches2semaines,loadData ,getFicheMisesAJour ,getFiches} from "./getFiches"
import { printGraph } from "./graph.js"
await loadData()
let filter = window.filter
let fiches = getFiches()
let fichesNonConformes=getFichesNonConformes()
let fichesConformes =getFichesConformes()
let fichesNonConformes1semaine = getfiches1Semaine()
let fichesNonConformes2semaine = getfiches2semaines()
let fichesMisesAJours = getFicheMisesAJour()
function showFichesFiltered() {
    $(".circle.GreenBackground").empty()
    $(".circle.RedBackground").empty()
    $(".circle.OrangeBackground").empty()
    $(".circle.DarkOrangeBackground").empty()
    $(".NumberUpdated").empty()

    
    filter.notFilterFiches =fichesConformes
    $(".circle.GreenBackground").append(`<p>${filter.filteredFiches.length } </p>`)

    
    filter.notFilterFiches = fichesNonConformes
    $(".circle.RedBackground").append(`<p>${filter.filteredFiches.length } </p>`)


    filter.notFilterFiches = fichesNonConformes1semaine
    $(".circle.OrangeBackground").append(`<p>${filter.filteredFiches.length } </p>`)


    filter.notFilterFiches = fichesNonConformes2semaine
    $(".circle.DarkOrangeBackground").append(`<p>${filter.filteredFiches.length } </p>`)

    filter.notFilterFiches = fichesMisesAJours
    
    $(".NumberUpdated").append(filter.filteredFiches.length)
    $(".NumberUpdated").append(" fiches mises a jours")

    filter.notFilterFiches = fiches
    printGraph(filter.filteredFiches)
}

filter.handler= showFichesFiltered

