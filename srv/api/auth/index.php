<?php
include('../../integration/RandomUser.php');

use integration\RandomUser;

$ru = new RandomUser();
$result = $ru->getSingleUser();

$user = $result->results[0];

echo json_encode($user);
