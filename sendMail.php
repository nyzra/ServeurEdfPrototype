<?php

require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
   $account="CompteTemporaireEdf@outlook.fr";
   $password="Compte_Temporaire_Edf1!";
   $to="sauronlucas@gmil.com";
   $from="vishal@vishal.com";
   $from_name="Vishal G.V";
   $msg="<strong>This is a bold text.</strong>"; // HTML message
   $subject="HTML message";

    $mail = new PHPMailer();
    $mail->IsSmtp();
    $mail->SMTPDebug = 2;

    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'tls';
    $mail->Host = "smtp.office365.com";
    $mail->Port = 587; 

    $mail->IsHTML(true);
    $mail->Username= $account;
    $mail->Password= $password;
    $mail->setFrom($account);
    $mail->From = $from;
   $mail->FromName= $from_name;
    $mail->Subject = $subject;
    $mail->Body = $msg;
    $mail->AddAddress($to);


if(!$mail->send()){
   echo "Mailer Error: " . $mail->ErrorInfo;
  }else{
   echo "E-Mail has been sent";
  }
?>