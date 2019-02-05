<?php
include('../../integration/RandomUser.php');
include('../../components/LoremIpsum.php');

use integration\RandomUser;
use components\LoremIpsum;

$ru = new RandomUser();
$lipsum = new LoremIpsum();

$groups = ["today", "yesterday"];
$ranges = ["minutes", "days", "weeks", "months", "years"];
$status = ["online","away","offline","busy"];
$mails = [];

foreach ($groups as $index => $group) {
    $count = rand(2, 6);
    $response = $ru->getMultipleUsers($count);
    $users = $response->results;

    $mail = ["group" => $group];
    foreach ($users as $user) {
        $time = rand(2, 59);
        $range = rand(0, 4);

        $mail["items"][] = [
            "id" => uniqid(),
            "time" => "{$time} {$ranges[$range]} ago",
            "subject" => $lipsum->words(rand(3, 10)),
            "body" => $lipsum->sentences(rand(2, 5), ['p']),
            "from" => [
                "name" => "{$user->name->first} {$user->name->last}",
                "email" => $user->email,
                "status" => $status[rand(0, 3)],
                "picture" => $user->picture->thumbnail
            ]];
    }

    $mails[] = $mail;
}

echo  json_encode($mails);
