<h2 class="mt-4"><i class="fas fa-credit-card icon"></i><span>Hello from Server! Step 3,</span></h2>

<div class="alert alert-primary alert-thin">
    You can serve any content you like with your call
</div>

<table class="table table-responsive table-bordered">
    <thead>
        <tr>
            <th>User</th>
            <th>Address</th>
            <th>Message</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
<?php
include('../../../srv/integration/RandomUser.php');
include('../../../srv/components/LoremIpsum.php');

use integration\RandomUser;
use components\LoremIpsum;

$ru = new RandomUser();
$lipsum = new LoremIpsum();

$ranges = ["minutes", "days", "weeks", "months"];
$response = $ru->getMultipleUsers(4);
$users = $response->results;

foreach ($users as $user) {
    $time = rand(2, 59);
    $range = rand(0, 3);
?>
    <tr>
        <td>
            <div class="media">
                <img src="<?= $user->picture->thumbnail ?>" class="rounded-circle mr-3 shadow" alt="">
                <div class="media-body">
                    <p class="my-0 bold text-capitalize"><?= "{$user->name->first} {$user->name->last}" ?></p>
                    <p class="small color-2 alpha-6 my-0"><?= $user->email ?></p>
                </div>
            </div>
        </td>
        <td><?= $user->location->street ?></td>
        <td><?= $lipsum->words(rand(3, 10)) ?></td>
        <td><span class="small"><?= "{$time} {$ranges[$range]} ago" ?></span></td>
    </tr>
<?php } // foreach users ?>
    </tbody>
</table>
