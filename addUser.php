<?php
	require("connection.php");
	
	$connection = new Connection();
	
	$link = $connection->connect();
	
	$email = $_POST['email'];
	
	$subject = ($_POST['subject']) ? "subject='".$_POST['subject']."'," : "";

	$message = ($_POST['message']) ? "message='".$_POST['message']."'," : "";	
	
	$position = ($_POST['position']) ? "position='".$_POST['position']."'," : "";	 

	$query = "insert into customers set email='$email', $subject $message $position createdtime=NOW(), updatetime=NOW()";

	mysqli_query($link, $query);
	
	if(mysqli_error($link)){
		echo json_encode([ "result" => false,
                    "message" => "An error ocurred, try again",
                    "errors" => ["email" => "An error ocurred, try again"]
                ]);
	}
	else
		echo json_encode([
                    "result" => true,
                    "message" => "Thank you"
                ]);