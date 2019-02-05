<?php

function sorter($key) {
    return function ($a, $b) use ($key) {
        return -$a[$key] + $b[$key];
    };
}

$titles = ["How DashCore can help you boost your solution", "A new way to develop for the web", "Installing and configuring DashCore template"];
$ranges = ["years", "months", "days"];
$count = count($titles);
$videos = [];
$higher = 0;

for ($i = 0; $i < $count; ++$i) {
    $time = rand(2, 12);
    $views = rand(230000, 4000000);

    $videos[] = [
        "title" => $titles[$i],
        "date" => "{$time} {$ranges[rand(0, 2)]} ago",
        "views" => $views,
        "likes" => rand(50000, 500000),
        "percentage" => 0
    ];

    if ($views > $higher) $higher = $views;
}

foreach ($videos as $i => $video) {
    $videos[$i]["percentage"] = round(($videos[$i]["views"] / $higher) * 100);
}

usort ($videos, sorter('views'));

echo json_encode($videos);
