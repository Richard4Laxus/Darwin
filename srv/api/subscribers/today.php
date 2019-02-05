<?php
include('../../integration/RandomUser.php');
include('../../components/LoremIpsum.php');

use integration\RandomUser;

$ru = new RandomUser();

$networks = ["facebook", "twitter", "youtube"];
$status = ["online","away","offline","busy"];
$count = (isset($_GET['n']) && is_int($_GET['n'])) ? $_GET['n'] : rand(40, 80);

$response = $ru->getMultipleUsers($count);
$users = $response->results;
$subscribers = [];

foreach ($users as $user) {
    $network = rand(0, 2);

    $subscribers[] = [
        "origin" => $networks[$network],
        "user" => [
            "name" => "{$user->name->first} {$user->name->last}",
            "email" => $user->email,
            "picture" => $user->picture->thumbnail,
            "status" => $status[rand(0, 3)]
        ],
        "location" => $user->location
    ];
}

echo  json_encode(["data" => $subscribers]);
