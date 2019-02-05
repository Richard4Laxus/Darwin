<?php
include('../../integration/RandomUser.php');

use integration\RandomUser;

$ru = new RandomUser();

$networks = ["facebook","twitter","youtube"];
$ranges = ["mins", "hours"];
$subscribers = [];
$response = $ru->getMultipleUsers(4);

$users = $response->results;

foreach ($users as $user) {
    $time = rand(1, 23);
    $range = rand(0, 1);

    $subscribers[] = [
        "date" => "{$time} {$ranges[$range]} ago",
        "network" => $networks[rand(0, 2)],
        "user" => [
            "name" => "{$user->name->first} {$user->name->last}",
            "email" => $user->email,
            "picture" => $user->picture->thumbnail
        ]];
}

echo  json_encode($subscribers);
