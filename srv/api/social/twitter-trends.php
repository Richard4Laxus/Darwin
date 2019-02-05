<?php
function sorter($key) {
    return function ($a, $b) use ($key) {
        return -$a[$key] + $b[$key];
    };
}

$topics_inventory = ["software", "marketing", "collaboration", "future"];
$hashtags_inventory = ["#welcometothefuture", "#genesis", "#templatestrend", "#successmatters"];

$tags = [
    "perfect", "finally", "design",
    "awesome", "hot", "fast",
    "better", "helpful", "theme",
    "world", "ready", "seriously",
    "help", "development", "awesome",
    "good", "unique", "enjoy"
];

$topics = [];
$hashtags = [];
$trends = [];

$higher_topic = 0;
$higher_hashtag = 0;

function generateRandomTags($tags) {
    $generatedTags = [];

    for ($i = 0; $i < rand(3, count($tags)/2); ++$i) {
        $generatedTags[] = ["label" => $tags[rand(0, count($tags) - 1)]];
    }

    return $generatedTags;
}

for ($i = 0; $i < 4; ++$i) {
    $topics_used = rand(7, 99);
    $hashtags_used = rand(7, 99);

    if ($topics_used > $higher_topic) $higher_topic = $topics_used;
    if ($hashtags_used > $higher_hashtag) $higher_hashtag = $hashtags_used;

    $topics[] = [
        "title" => $topics_inventory[$i],
        "tags" => generateRandomTags($tags),
        "used" => $topics_used
    ];

    $hashtags[] = [
        "title" => $hashtags_inventory[$i],
        "tags" => generateRandomTags($tags),
        "used" => $hashtags_used
    ];
}

foreach ($topics as $i => $topic) {
    $topics[$i]["percentage"] = round(($topics[$i]["used"] / $higher_topic) * 100);
}

foreach ($hashtags as $i => $hashtag) {
    $hashtags[$i]["percentage"] = round(($hashtags[$i]["used"] / $higher_hashtag) * 100);
}

usort ($topics, sorter('used'));
usort ($hashtags, sorter('used'));

$trends["topics"] = $topics;
$trends["hashtags"] = $hashtags;

echo json_encode($trends);
