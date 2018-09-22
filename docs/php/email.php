<?php
	//Initialize the variables 
	$name = $_POST["user_name"];
	$email = $_POST["user_mail"];
	$msg = $_POST["user_msg"];
	$adminMail = "ramandkavininvestments@gmail.com";
	
	//Send the email
	mail($adminMail, "Test", $msg);
?>