<?php
include('../../integration/RandomUser.php');
include('../../components/LoremIpsum.php');

use integration\RandomUser;
use components\LoremIpsum;

$ru = new RandomUser();
$lipsum = new LoremIpsum();

$groups = ["today", "yesterday", "older"];
$ranges = ["mins", "days"];
$status = ["online","away","offline","busy"];
$messages = [];
$count = is_int($_GET['n']) ? $_GET['n'] : 5;

$response = $ru->getMultipleUsers($count);
$users = $response->results;

foreach ($users as $user) {
    $time = rand(2, 59);
    $range = rand(0, 1);

    $messages[] = [
        "time" => "{$time} {$ranges[$range]} ago",
        "message" => $lipsum->words(rand(3, 8)),
        "from" => [
            "name" => "{$user->name->first} {$user->name->last}",
            "email" => $user->email,
            "status" => $status[rand(0, 3)],
            "picture" => $user->picture->thumbnail
        ]];
}

echo  json_encode($messages);
