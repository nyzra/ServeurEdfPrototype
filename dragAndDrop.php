<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Glisser-déposer un fichier Excel</title>
  <link rel="stylesheet" href="css/loader.css">
  <link rel="stylesheet" href="css/main.css">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.3/xlsx.full.min.js"></script>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">

</head>

<body>
  <nav data-include="nav"></nav>
 
  <form method="post" accept="xlsx" action="upload.php" enctype='multipart/form-data'>
    <div id="drop_zone">
      <h1>Glisser-déposer un fichier Excel</h1>
      <input type="submit" onclick="" id="sub_butt" value="Envoyer le fichier">
    </div>
    <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" name="file" id="file"
      required multiple style="display:none" />
    
  </form>
  <div class="hide lds-ring "><div class="hide"></div><div class="hide"></div><div class="hide"></div><div class="hide"></div></div>
  <script>
    var drop_zone = document.getElementById('drop_zone');
    var sub_butt = document.getElementById('sub_butt');
    var elems = document.querySelectorAll('body *');
    var hidding = document.querySelectorAll('.hide')
    // Ajoutez un gestionnaire d'événements pour l'événement "dragover"
    drop_zone.addEventListener('dragover', function (e) {
      e.preventDefault();
    });

    // Ajoutez un gestionnaire d'événements pour l'événement "drop"
    drop_zone.addEventListener('drop', function (e) {
      e.preventDefault();
      document.getElementById("file").files = e.dataTransfer.files;
    });

    sub_butt.addEventListener('click', function (e) {
      console.log(document.getElementById("file").files.length);
      if(document.getElementById("file").files.length != 0){
      elems.forEach(elem => {
        elem.classList.add('hide');
      })
      hidding.forEach(x => {
        x.classList.remove('hide');
      })
    }
    })
  </script>
 <script src="scripts/jquery-3.6.4.js" type="text/javascript"></script>

    <script src="scripts/includeElements.js"></script>
</body>

</html>