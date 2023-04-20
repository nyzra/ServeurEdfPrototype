let links = $(".sendReseachArgument")

links.each((index, elenemt) => {
    elenemt.onclick = () => {
        let oldLink = elenemt.getAttribute("href");
        console.log($(".metierFilter").text())
        let newLink=oldLink+"?filter="+$(".metierFilter").text() // la dernière partie est le code pour selectionner le filtre selectionnée
        elenemt.setAttribute("href",newLink)
    }
})