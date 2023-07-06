# Outil de visualisation de données pour le challenge Megawatt'UTT

Dans le cadre du challenge Megawatt'UTT Organisé par l'Université de Technologie de Troyes en collaboration avec EDF nous avons développé un outil afin de faciliter la gestion des entreposages de matériel.
<div align="center">
<img src="/images/UTT_couleur.png" width="277" height="100" />
<img src="/images/logo-edf.svg" width="176" height="75" />
<img src="/images/Logo-Junior-Conseil-utt-fond-transparent.png" width="200" height="75" />
</div>

## Pour commencer

### Installation

Actuellement notre soution est capable de touner sur un serveur local.
Pour cela il est necessaire d'en téléchager un disponible sur [wampserver.com](https://www.wampserver.com/)

Suite a l'instalation il est neccesaire de téléchager les fichiers de ce dépot github et de le placer dans le dossier www de l'instalation wamp.
#### Configuration supplémentaire

Afin que notre projet soit fonctionel il neccesite deux étapes suplémentaires :

* Accèder au fichier php.ini 

<div align="center"><img src="/images/php_ini.png" height=300 /> </div>

Modifier la ligne :

~~upload_max_filesize = 2M~~ => upload_max_filesize = 100M

- Accèder au phpMyAdmin

<div align="center"><img src="/images/PHP my admin.png" height=300 /> </div>


Se connecter à l'aide du nom d'utilisateur root et aucun mot de passe puis créer une base de donnée nommé EDF.


## Démarrage

Pour démarer notre outil il est neccesaire de lancer notre seveur local wamp à chaque démarage de notre ordinateur.
Il suffit ensuite d'accèder a notre site en tapant localhost dans la bare de recherche de notre navigateur.

## Importation des données 

L'importation des données qui seront traité par le site se font sur la page _dragAndDrop_.

Si le fichier exel est trop volumineux cela causera une erreur et aucune donnée ne sera importé.


## Fabriqué avec
<div align="center"><img src="/images/html css js.png" height=300 /> </div>




