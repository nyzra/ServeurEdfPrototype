<?php

include("config\database.php");
header('Content-Type: text/html; charset=utf-8');

global $db;

//on ne garde que les tables des 2 dernieres semaine
$sql_drop = "DROP TABLE IF EXISTS info_fiche_1 ;"; // on supprime la semaine 1
$db->prepare($sql_drop);
$sql_rename = "ALTER TABLE info_fiche_2 RENAME info_fiche_1 ;"; // on la remplace par la semaine 2
$db->prepare($sql_rename);
$sql_create = 'CREATE TABLE `edf`.`info_fiche_2` 
( `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, `Tranche` VARCHAR(255) NULL DEFAULT NULL , `Localisation` VARCHAR(255) NULL DEFAULT NULL , `Batiment` VARCHAR(255) NULL DEFAULT NULL ,
`Niveau` VARCHAR(255) NULL DEFAULT NULL , `NumLocal` VARCHAR(255) NULL DEFAULT NULL , `NumDemande` VARCHAR(255) , 
`NomColis` VARCHAR(255) NULL DEFAULT NULL , `DateDebut` VARCHAR(255) NULL DEFAULT NULL , `DateFin` VARCHAR(255) NULL DEFAULT NULL ,
`DCC` VARCHAR(255) NULL DEFAULT NULL , `Materiel` VARCHAR(255) NULL DEFAULT NULL , `Conformite` VARCHAR(255) NULL DEFAULT NULL ,
`Motif` VARCHAR(255) NULL DEFAULT NULL , `Précision` VARCHAR(255) NULL DEFAULT NULL , `Metier` VARCHAR(255) NULL DEFAULT NULL,
`Contact` TEXT(6000) NULL DEFAULT NULL ) ENGINE = InnoDB;'; // on crée une nouvelle table pour la semaine 3
$db->prepare($sql_create);
try {
  $db->exec($sql_drop);
  $db->exec($sql_rename);
  $db->exec($sql_create);
} catch (Exception $e) {
  echo $e;
}


require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

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



$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
$reader->setReadFilter(new MyReadFilter());
$reader->setReadDataOnly(true);
$reader->setLoadSheetsOnly(["Feuil1"]);
$spreadsheet = $reader->load($_FILES['file']['tmp_name']);

$d = $spreadsheet->getSheet(0)->toArray();


$sheetData = $spreadsheet->getActiveSheet()->toArray();

$i = 1;
unset($sheetData[0]);

$Metiers = "\bMMCR\b|\bA2P\b|\bSAE\b|\bEC\b|\bSLT\b|\bIPE\b|\bLEVAGE\b|\bLNU\b|\bPS\b|\bSPR\b|\bESSAI\b|\bConduite\b|\bAMT\b|\bEDF KD\b|\bGC\b|\bMEEI\b|\bEDF MECA\b|\bEDF\b|\bAUTO\b|\bCA\b|\bKD\b|\bARDATEM\b";

foreach ($sheetData as $t) {
  // on affiche toute les données de la table (test pour l'instant, objectif : on insert toutes les données dans la table);
  // on commence a 10 pour ne pas avoir les lignes vides du début du fichier
  if ($i > 10) {
    if (preg_match("/CONTACT :(.*$)/", $t[15], $matches)) {
      if (preg_match_all("/ {$Metiers} /", $matches[1], $out, PREG_PATTERN_ORDER)) {
        $pro = "[";
        foreach ($out[0] as $metier) {
          $pro = $pro . '"' . $metier . '", ';
        }
        $pro = substr($pro, 0, -2) . "]";
        $contact = preg_replace("/{$Metiers}|\./", "", $matches[1]);
        $contact = preg_replace("/(?<![a-zA-ZÀ-ú\d\/-])|[^\w\/-]|[\/]{2,}|[\/-](?=[^\w\/-])/", ' ', $contact);
        $contact = preg_replace('/[\s]{2,}/', ' ', $contact);
        $contact = preg_replace('/^\s*/', '', $contact);
        $contact = preg_replace('/\s*$/', '', $contact);
      }
    } else {
      $pro = '["NULL"]';
    }

    $sql_insert = "INSERT INTO `info_fiche_2`(`Tranche`, `Localisation`, `Batiment`, `Niveau`, `NumLocal`, `NumDemande`, `NomColis`, `DateDebut`,
  `DateFin`, `DCC`, `Materiel`, `Conformite`, `Motif`, `Précision`, `Metier`, `Contact`) 
  VALUES (" . '"' . $t[1] . '"' . "," . '"' . $t[2] . '"' . "," . '"' . $t[3] . '"' . "," . '"' . $t[4] . '"' . "," . '"' . $t[5] . '"' . "," . '"' . $t[6] . '"' . "," . '"' . $t[7] . '"' . "," . '"' . $t[8] . '"' . "," . $t[9] . "," . '"' . $t[10] . '"' . "," . '"' . $t[11] . '"' . "," . '"' . $t[12] . '"' . "," . '"' . $t[13] . '"' . "," . '"' . $t[14] . '"' . "," . "'" . $pro . "'" . "," . '"' . $contact . '"' . ")";
    $db->prepare($sql_insert);
    try {
      $db->exec($sql_insert);
    } catch (Exception $e) {
      echo $e ;
    }
  }
  $i++;
}
$sql = "SELECT Tranche, Localisation, Batiment, Niveau, NumLocal, NumDemande, NomColis, DateDebut, DateFin, DCC, Materiel, Conformite, Motif, Précision, Metier, Contact FROM info_fiche_2";
$result = $db->query($sql);
$emparray = array();
$data=$result->fetchAll(PDO::FETCH_ASSOC);
$data=json_encode($data);
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
$data=preg_replace("/\\\\\"/","\"",$data);
$data=preg_replace("/\"\[/","[",$data);
$data=preg_replace("/\]\"/","]",$data);
$myfile = fopen("Data/Data.json", "w");
fwrite($myfile, $data);
fclose($myfile);

?>