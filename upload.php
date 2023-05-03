<?php
use Box\Spout\Reader\Common\Creator\ReaderEntityFactory;
include("config\database.php");
header('Content-Type: text/html; charset=utf-8');

global $db;

//on ne garde que les tables des 8 dernieres semaine
function renameEXL(){
  global $db;
  for ($i=1;$i<8;$i++){
    $sql_drop = "DROP TABLE IF EXISTS S".$i.";"; // on supprime la semaine i
    $db->prepare($sql_drop);
    $sql_rename = "ALTER TABLE S".($i+1)." RENAME S".$i.";"; // on la remplace par la semaine i+1
    $db->prepare($sql_rename);
    try {
      $db->exec($sql_drop);
      $db->exec($sql_rename);
    } catch (Exception $e) {
      echo $e;
    }
  }
}
function create(){
  global $db;
  for ($i=1;$i<9;$i++){
    $sql_create = 'CREATE TABLE If NOT EXISTS `edf`.`S'.$i.'` 
    ( `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, `Tranche` VARCHAR(255) NULL DEFAULT NULL , `Localisation` VARCHAR(255) NULL DEFAULT NULL , `Batiment` VARCHAR(255) NULL DEFAULT NULL ,
    `Niveau` VARCHAR(255) NULL DEFAULT NULL , `NumLocal` VARCHAR(255) NULL DEFAULT NULL , `NumDemande` VARCHAR(255) , 
    `NomColis` VARCHAR(255) NULL DEFAULT NULL , `DateDebut` VARCHAR(255) NULL DEFAULT NULL , `DateFin` VARCHAR(255) NULL DEFAULT NULL ,
    `DCC` VARCHAR(255) NULL DEFAULT NULL , `Materiel` VARCHAR(255) NULL DEFAULT NULL , `Conformite` VARCHAR(255) NULL DEFAULT NULL ,
    `Motif` VARCHAR(255) NULL DEFAULT NULL , `Precision` VARCHAR(255) NULL DEFAULT NULL , `Metier` VARCHAR(255) NULL DEFAULT NULL,
    `Contact` TEXT(6000) NULL DEFAULT NULL, `MailEnvoye` BOOLEAN DEFAULT false ) ENGINE = InnoDB;'; // on crée une nouvelle table pour la semaine 3
    $db->prepare($sql_create);
    try {
      $db->exec($sql_create);
    } catch (Exception $e) {
      echo $e;
    }
  }
  
}
create();
renameEXL();
$sql_create = 'CREATE TABLE `edf`.`S8` 
( `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, `Tranche` VARCHAR(255) NULL DEFAULT NULL , `Localisation` VARCHAR(255) NULL DEFAULT NULL , `Batiment` VARCHAR(255) NULL DEFAULT NULL ,
`Niveau` VARCHAR(255) NULL DEFAULT NULL , `NumLocal` VARCHAR(255) NULL DEFAULT NULL , `NumDemande` VARCHAR(255) , 
`NomColis` VARCHAR(255) NULL DEFAULT NULL , `DateDebut` VARCHAR(255) NULL DEFAULT NULL , `DateFin` VARCHAR(255) NULL DEFAULT NULL ,
`DCC` VARCHAR(255) NULL DEFAULT NULL , `Materiel` VARCHAR(255) NULL DEFAULT NULL , `Conformite` VARCHAR(255) NULL DEFAULT NULL ,
`Motif` VARCHAR(255) NULL DEFAULT NULL , `Precision` VARCHAR(255) NULL DEFAULT NULL , `Metier` VARCHAR(255) NULL DEFAULT NULL,
`Contact` TEXT(6000) NULL DEFAULT NULL, `MailEnvoye` BOOLEAN DEFAULT false ) ENGINE = InnoDB;'; // on crée une nouvelle table pour la semaine 3
$db->prepare($sql_create);
try {
  $db->exec($sql_create);
} catch (Exception $e) {
  echo $e;
}

require 'vendor/autoload.php';

class MyReadFilter implements \PhpOffice\PhpSpreadsheet\Reader\IReadFilter
{

  public function readCell($columnAddress, $row, $worksheetName = '')
  {
    // Read title row and rows 20 - 30
    if ($row > 10) {
      return true;
    }
    return false;
  }
}



/*$reader = new \PhpOffice\ 
$reader->setReadFilter(new MyReadFilter());
$reader->setReadDataOnly(true);
$reader->setLoadSheetsOnly(["Feuil1"]);
$spreadsheet = $reader->load($_FILES['file']['tmp_name']);*/


$path = 'data/movies-100.xlsx';
# open the file
$reader = ReaderEntityFactory::createXLSXReader();
$reader->open($_FILES['file']['tmp_name']);
# read each cell of each row of each sheet


$i = 1;


$Metiers = "\bMMCR\b|\bA2P\b|\bSAE\b|\bEC\b|\bSLT\b|\bIPE\b|\bLEVAGE\b|\bLNU\b|\bPS\b|\bSPR\b|\bESSAI\b|\bConduite\b|\bAMT\b|\bEDF KD\b|\bGC\b|\bMEEI\b|\bEDF MECA\b|\bEDF\b|\bAUTO\b|\bCA\b|\bKD\b|\bARDATEM\b";
foreach ($reader->getSheetIterator() as $sheet) {
  foreach ($sheet->getRowIterator() as $row) {
    $t=[];
       // on affiche toute les données de la table (test pour l'instant, objectif : on insert toutes les données dans la table);
  // on commence a 10 pour ne pas avoir les lignes vides du début du fichier
  foreach ($row->getCells() as $cell) {
    array_push($t,  $cell->getValue() );
}
foreach($t as &$information){
  // on elève les guillemet pour éviter tout problème
  if(is_string($information) ){
    $information= str_replace('"', '', $information);
  }

}
  if ($i > 10) {
    if (preg_match("/CONTACT :(.*$)/", $t[15], $matches)) {
      if (preg_match_all("/ {$Metiers} /", $matches[1], $out, PREG_PATTERN_ORDER)) {
        $pro = "[";
        foreach ($out[0] as $metier) {
          $pro = $pro . '"' . $metier . '", ';
        }
        $pro = substr($pro, 0, -2) . "]";
        $contact = preg_replace("/{$Metiers}|\./", "", $matches[1]);

        $contact = preg_match_all("/(([a-zA-Zà-ÿ]+)\s?([a-zA-Zà-ÿ\+)?\s?([a-zA-Zà-ÿ]+)?\s?([0-9]+)?\s?[-\/\\\]?){1,2}/u", $contact, $matches);
        if($matches[2][0]=='EL'){
          $contact = $matches[2][1].' '.$matches[3][1].' '.$matches[4][1];
        }else{
          $contact = $matches[2][0].' '.$matches[3][0].' '.$matches[4][0];
        }
        //$contact = preg_replace("/(?<![a-zA-ZÀ-ú\d\/-])|[^\w\/-]|[\/]{2,}|[\/-](?=[^\w\/-])/", ' ', $contact);
        $contact = preg_replace('/\s(OU|ou)\s.*/', '', $contact);
        $contact = preg_replace('/[\s]{2,}/', ' ', $contact);
        $contact = preg_replace('/^\s*/', '', $contact);
        $contact = preg_replace('/\s*$/', '', $contact);
        $contact = preg_replace('/[0-9]/', '',$contact);
        $contact = preg_replace('/\s$/','',$contact);
        //echo $contact.'<br>';
      }
    } else {
      $pro = '["NULL"]';
    }
    if($t[6]=="Ecart pirate"){
      $sql_insert = "INSERT INTO `S8`(`Tranche`, `Localisation`, `Batiment`, `Niveau`, `NumLocal`, `NumDemande`, `NomColis`,`Motif`, `Precision`,  `Contact`) 
      VALUES (" . '"' . $t[1] . '"' . "," . '"' . $t[2] . '"' . "," . '"' . $t[3] . '"' . "," . '"' . $t[4] . '"' . "," . '"' . $t[5] . '"' . "," . '"' . $t[6] . '"' . "," . '"' . $t[7] . '"' . "," . '"' .$t[13] . '"' . "," . '"' . $t[14] . '"' . "," . '"' . $t[15] . '"' . ")";
    }
    else{
      $dateD=$t[8];
      $dateF=$t[9];
      $resultD=$dateD->format('d/m/Y');
      $resultF=$dateF->format('d/m/Y');
      $sql_insert = "INSERT INTO `S8`(`Tranche`, `Localisation`, `Batiment`, `Niveau`, `NumLocal`, `NumDemande`, `NomColis`, `DateDebut`,
    `DateFin`, `DCC`, `Materiel`, `Conformite`, `Motif`, `Precision`, `Metier`, `Contact`) 
    VALUES (" . '"' . $t[1] . '"' . "," . '"' . $t[2] . '"' . "," . '"' . $t[3] . '"' . "," . '"' . $t[4] . '"' . "," . '"' . $t[5] . '"' . "," . '"' . $t[6] . '"' . "," . '"' . $t[7] . '"' . "," . '"' . $resultD . '"' . "," . '"' . $resultF . '"' . "," . '"' . $t[10] . '"' . "," . '"' . $t[11] . '"' . "," . '"' . $t[12] . '"' . "," . '"' . $t[13] . '"' . "," . '"' . $t[14] . '"' . "," . "'" . $pro . "'" . "," . '"' . $contact . '"' . ")";
   
    }
       $db->prepare($sql_insert);
    try {
      $db->exec($sql_insert);
    } catch (Exception $e) {
      echo $e;
      // cretour a la page drang and drop + popup/alerte qui dit d'enlever les double guillement dans le fichier et si possible indiquer ou
    }
  }
  $i++;
      }
  }


function Export_csv($result){
  $data=$result->fetchAll(PDO::FETCH_ASSOC);
  $data=json_encode($data);
  $data=preg_replace("/\[\{/","[\n{",$data);
  $data=preg_replace("/\}/",",\n}",$data);
  $data=preg_replace("/,\"/",",\n\t\"",$data);
  $data=preg_replace("/\},/","},\n",$data);
  $data=preg_replace("/\{/","{\n\t",$data);
  $data=preg_replace("/,\n\}/","\n}",$data);
  $data=preg_replace("/\\\\\//","/",$data);
  $data=preg_replace("/\\\\u00e0/","à",$data);
  $data=preg_replace("/\\\\u00e2/","â",$data);
  $data=preg_replace("/\\\\u00e4/","ä",$data);
  $data=preg_replace("/\\\\u00e7/","ç",$data);
  $data=preg_replace("/\\\\u00e8/","è",$data);
  $data=preg_replace("/\\\\u00e9/","é",$data);
  $data=preg_replace("/\\\\u00ea/","ê",$data);
  $data=preg_replace("/\\\\u00eb/","ë",$data);
  $data=preg_replace("/\\\\u00ee/","î",$data);
  $data=preg_replace("/\\\\u00ef/","ï",$data);
  $data=preg_replace("/\\\\u00f4/","ô",$data);
  $data=preg_replace("/\\\\u00f6/","ö",$data);
  $data=preg_replace("/\\\\u00f9/","ù",$data);
  $data=preg_replace("/\\\\u00fb/","û",$data);
  $data=preg_replace("/\\\\u00fc/","ü",$data); 
  $data=preg_replace("/\\\\u00b2/","²",$data);
  $data=preg_replace("/\\\\u00b0/","°",$data);
  $data=preg_replace("/\\\\u2019/","'",$data);
  $data=preg_replace("/\\\\u00c9/","É",$data);
  $data=preg_replace("/\\\\\"/","\"",$data);
  $data=preg_replace("/\"\[/","[",$data);
  $data=preg_replace("/\]\"/","]",$data);
  return $data;
}
function export_json(){
  global $db;
  for($i=1;$i<9;$i++){
    $sql = "SELECT Tranche, Localisation, Batiment, Niveau, NumLocal, NumDemande, NomColis, DateDebut, DateFin, DCC, Materiel, Conformite, Motif, `Precision`, Metier, Contact ,MailEnvoye FROM S".$i."";
    $result = $db->query($sql);
    $data=Export_csv($result);
    $myfile = fopen("Data/S".$i.".json", "w");
    fwrite($myfile, $data);
    fclose($myfile);
  }
}
export_json();
header('location:index.html');
exit;

?>