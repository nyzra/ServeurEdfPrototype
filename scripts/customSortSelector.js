import {CreateCustomSelector } from "./customSelect.js"

CreateCustomSelector("parameter")
filter.filterChoice = $(".select-selected.parameterSort ").text()

let customSelectElement = $(".custom-select.parameter ")
customSelectElement.each((index, value) => {
    let children = value.children
    for (let i = 0; i < children.length; i++) {
        var div = children[i]
        if (div.className.includes("select-items")) {
            for (let y = 0; y < div.children.length; y++) {
                div.children[y].addEventListener("click", () => {
                    filter.filterChoice = $(".select-selected.parameterSort ").text()
                })
            }
        }
    }
})
