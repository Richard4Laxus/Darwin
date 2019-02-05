<?php

$months = ['jan', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
$today = getdate();
$day = $today['mday'];
$mon = $today['mon'];
$year = $today['year'];

$networks = ["facebook", "twitter", "youtube"];
$subscribers = [];

$time = isset($_GET["time"]) ? $_GET["time"] : "tm";

switch ($time) {
    case "lm":
        $endDay = cal_days_in_month(CAL_GREGORIAN, ($mon > 1) ? $mon - 1 : 12, ($mon > 1) ? $year : $year - 1);
        break;
    case "ty":
        $endDay = $mon;
        break;
    default:
        $endDay = $day <= 10 ? cal_days_in_month(CAL_GREGORIAN, $mon, $year) : $day;
        break;
}

foreach ($networks as $network) {
    $persons = [];

    for ($day = 1; $day <= $endDay; ++$day) {
        $label = $time == "ty" ? $months[$day - 1] : $day;
        $persons[$label] = rand(0, 99) - (int)($day / 2) + rand(0, $day);
    }

    $subscribers[] = [
        "label" => $network,
        "subscribers" => $persons
    ];
}

echo  json_encode($subscribers);
