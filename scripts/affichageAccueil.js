import { getFichesConformes,getFichesNonConformes, getfiches1Semaine,getfiches2semaines} from "./getFiches"

let filter = window.filter

function showFichesFiltered() {
    $(".circle.GreenBackground").empty()
    $(".circle.RedBackground").empty()
    $(".circle.OrangeBackground").empty()
    $(".circle.DarkOrangeBackground").empty()

    
    filter.notFilterFiches =getFichesConformes()
    $(".circle.GreenBackground").append(`<p>${filter.filteredFiches.length } </p>`)

    
    filter.notFilterFiches = getFichesNonConformes()
    $(".circle.RedBackground").append(`<p>${filter.filteredFiches.length } </p>`)


    filter.notFilterFiches = getfiches1Semaine()
    $(".circle.OrangeBackground").append(`<p>${filter.filteredFiches.length } </p>`)


    filter.notFilterFiches = getfiches2semaines()
    $(".circle.DarkOrangeBackground").append(`<p>${filter.filteredFiches.length } </p>`)


}


filter.handler= showFichesFiltered


