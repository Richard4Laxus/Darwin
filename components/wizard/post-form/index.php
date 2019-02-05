<?php
// Wait 1 sec, just to simulate a process
sleep(1);

// Do whatever you need with the data
// The response must be JSON, it must include a "result" attribute. You can include whatever you need to process on the client.
echo json_encode([
    "result" => true, // if something goes wrong, result should be false
    "data" => [
        "note" => "Include any additional data you might use on client"
    ]
]);
