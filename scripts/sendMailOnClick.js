sendMailButton = $(".sendMailButton")

function SendMail() {
    let filter = window.filter
    let fiches = filter.filteredFiches
    console.log(fiches)
  //window.location.href =
    "mailto:user@example.com?subject=Fiches Non Conformes&body=Bonjour,%0DSuite a une vérification des fiches métier nous avons pu voir que certaines des fiches dont vous etes le référent ne sont pas conforme.%0DVoici une liste exhaustive des fiches que vous devez remettre en règle dans les plus bref délai :%0D";
}

sendMailButton.click(function(){
    SendMail()
});