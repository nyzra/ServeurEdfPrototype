sendMailButton = $(".sendMailButton")

function trouverDemandesParContact(data, contact) {
  let demandesParContact = [];
  data.forEach(function (demande) {
    if (demande.Contact === contact) {
      demandesParContact.push(demande);
    }
  });
  return demandesParContact;
}
function inverserNomPrenom(str) {
  const nomPrenom = str.split(" ");
  if (nomPrenom.length > 1) {
    let nom = nomPrenom.find((np) => np === np.toUpperCase());
    let prenom = nomPrenom.find((np) => np !== nom).toLowerCase();

    if (nom && prenom) {
      return `${nom} ${prenom}`
    } else {
      return str
    }
  } else {
    return str
  }

}
function contactToMail(contact) {
  noms = inverserNomPrenom(contact)
  var noms = noms.split(' ');
  if (noms.length > 1) {
    var prenom = noms[1].toLowerCase();
    var nom = noms[0].toLowerCase();

    return `${nom}.${prenom}@edf.fr`;
  } else {
    return "erreur d'abréviation"
  }

}

function SendMail() {
  let fiches = window.filter.filteredFiches
  var tabContact = []
  fiches.forEach(e => {
    tabContact.push(e.Contact)
  })
  tabContact = Array.from(new Set(tabContact))
  console.log(tabContact)
  tabContact.forEach(c => {
    var Fichecontact = trouverDemandesParContact(fiches, c)
    mail = contactToMail(Fichecontact[0].Contact)
    console.log(mail)
    var bodyMail = "Bonjour,%0DSuite a une vérification des fiches métier nous avons pu voir que certaines des fiches dont vous etes le référent ne sont pas conforme.%0DVoici une liste exhaustive des fiches que vous devez remettre en règle dans les plus bref délai :%0D"
    Fichecontact.forEach(element => {
      let information = ""
      information += '%09- Nom du colis :' + element.NomColis + '%0D'
      information += '%09%09- Numéro de la demande :' + element.NumDemande + '%0D'
      information += '%09%09- Datant de :' + element.DateDebut + 'et expirant le :' + element.DateFin + '%0D'
      information += '%09%09- DCC :' + element.DCC + '%0D'
      information += '%09%09- situé dans le local :' + element.NumLocal + '%0D'
      bodyMail += information
    });
    window.location.href ="mailto:" + mail + "?subject=Fiches Non Conformes&body=" + bodyMail
  })

}

sendMailButton.click(function () {
  SendMail()
});