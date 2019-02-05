<?php
include('./integration/MailChimp.php');
include('./models/SubscribeModel.php');

use \integration\MailChimp;
use \models\SubscribeModel;

define("LIST_ID", "82a79d73f3"); // paste your own values, please remove the brackets
define("API_KEY", "829bc0293b68085b939769d5fdd27ca0-us13");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!empty($_POST['Subscribe'])) {
        $chimp = new MailChimp(API_KEY);
        $model = new SubscribeModel($_POST['Subscribe']);

        if ($model->isValid()) {
            $result = $chimp->subscribeToList(LIST_ID, $model->email);

            if ($result->result) {
                echo json_encode([
                    "result" => true,
                    "message" => "You are now subscribe to our newsletter"
                ]);
            } else {
                echo json_encode([
                    "result" => false,
                    "message" => $result->error,
                    "errors" => [ "email" => $result->error ]
                ]);
            }
        } else {
            echo json_encode([
                "result" => false,
                "message" => "Errors found",
                "errors" => $model->errors
            ]);
        }
    }
}
