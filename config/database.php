<?php
define('HOST', 'localhost');
define('DB_NAME', 'edf');
define('USER', 'root');
define('PASS', '');
try{
    global $db;
    $db = new PDO("mysql:host=" . HOST . "; dbname=" . DB_NAME , USER , PASS);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
}catch(Exception $e){
    echo $e;
}

?>