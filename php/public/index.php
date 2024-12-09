<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../lib.php';

use Slim\Factory\AppFactory;



// Set up the router
$app = AppFactory::create();
$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);

# the router is used to require the php files
$app->post('/login', App\Login::class);
$app->post('/esp', App\Esp::class);

$app->run();

