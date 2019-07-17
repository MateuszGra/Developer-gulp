<?php
$to      = 'mxgrabowski@gmail.com';
$subject = 'Formularz kontakt.';

$name    = $_POST['name'];
$email   = $_POST['email'];
$message = $_POST['message'];

$message_body.="Imię: $name\n";
$message_body.="Adres email: $email\n";
$message_body.=$message;
$headers .= 'Content-Type: text/html; charset=utf-8';
mail($to, $subject, $message_body);
?>   
