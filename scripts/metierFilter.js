let metierFilter = $(".metierChoice")
let searchParams = new URLSearchParams(window.location.search)
let metiers=metierFilter.children()

for(let i=0;i<metiers.length;i++){

    var div = metiers[i]

    div.addEventListener("click", function ()  {
        for(let y=0; y<metiers.length;y++){
            metiers[y].classList.remove("active");
        }
        this.classList.add("active")

        filter.metierChoice=this.innerHTML

    })
}

let correctArgument=false
if (searchParams.has("filter") ){
    for(let i=0;i<metiers.length;i++){
        if(metiers[i].innerHTML===searchParams.get("filter")){
             metiers[i].classList.add("active")
             correctArgument=true
            }
    }
    if(!correctArgument){
        metiers[0].classList.add("active")
    }
    filter.metierChoice=$(".metierChoice p.active").text()
}