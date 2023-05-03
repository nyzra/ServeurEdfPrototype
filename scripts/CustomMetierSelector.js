import {CreateCustomSelector } from "./customSelect.js"

let filter = window.filter

CreateCustomSelector("metier")
filter.metierChoice=$(".select-selected.metierFilter").text()

let customSelectElement = $(".custom-select.metier")

    customSelectElement.each((index, value) => {
        let children = value.children
        
        for (let i = 0; i < children.length; i++) {
            var div = children[i]

            if (div.className.includes("select-items")) {
                for (let y = 0; y < div.children.length; y++) {
                    div.children[y].addEventListener("click", () => {
                        filter.metierChoice=$(".select-selected.metierFilter").text()
                    })
                }
            }
        }
    })
