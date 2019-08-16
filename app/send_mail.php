<?php

function response($text = '', $code = 200) {
	header_remove();
	http_response_code($code);
	header('Content-Type: application/json');
	header('Cache-Control: no-transform,public,max-age=300,s-maxage=900');
	header("Status: $code");
	echo json_encode(array('status' => $code < 300, 'message' => $text));
}

function send_error($text = '') {
	return response($text, 500);
}

function send_success($text = 'OK') {
	return response($text, 200);
}

$email       = $_POST['email'];
$name        = $_POST['name'];
$phone       = $_POST['phone'];

$sender = "admin@soho-noho.moscow";
ini_set("SMTP", "mail.soho-noho.moscow");
ini_set("sendmail_from", $sender);

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/plain; charset=utf-8\r\n";
$headers .= "From: ".$sender;
$message = "Имя: ".$name."\r\nE-mail: ".$email."\r\nТелефон: ".$phone;
// mail($sender, "Новая заявка с сайта Headword", $message, $headers);
mail('newflat@nikaestate.ru', "Новая заявка с сайта soho-noho.moscow", $message, $headers);
return send_success();
?>
