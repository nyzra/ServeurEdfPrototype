let links = $(".sendReseachArgument")

links.each((index, elenemt) => {
    elenemt.addEventListener('click',  function(e)  {
        let oldLink = elenemt.getAttribute("href");
        let newLink=oldLink+"?filter="+$(".metierChoice p.active").text() // la dernière partie est le code pour selectionner le filtre selectionnée
        elenemt.setAttribute("href",newLink)
    })
})