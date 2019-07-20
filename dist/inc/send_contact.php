<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../src/Exception.php';
require '../src/PHPMailer.php';
require '../src/SMTP.php';

$name = $_POST['name'];
$phone = $_POST['phone'];
$message = $_POST['message'];

$subject = "Formularz kontaktowy: $name";
$message_body = "<b>Formularz kontaktowy z twojej strony www</b>"."<br>";
$message_body.= "<b>Imię i nazwisko:</b> $name"."<br>";
$message_body.="<b>Numer telefonu lub adres email:</b> $phone"."<br>";
$message_body.="<b>Wiadomość:</b> $message";


$mail = new PHPMailer(true);
      try {
        $mail->SMTPDebug = 0;
        $mail->isSMTP();

        $mail->Host       = 'mail34.mydevil.net';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'webwolf@webwolf.usermd.net';
        $mail->Password   = 'J1wtucFVMnPYxHBOrqW3';
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 465;

        $mail->setFrom('webwolf@webwolf.usermd.net');
        $mail->addAddress('mxgrabowski@gmail.com');

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message_body;

        $mail->send();
        echo 'Message has been sent';
      } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
      }
?>   
