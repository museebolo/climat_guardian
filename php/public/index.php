<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../lib.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

// Set up the router
$app = AppFactory::create();
$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);

# the router is used to require the php files
$app->post('/login', App\Login::class);
$app->post('/esp', function (Request $request, Response $response, $args) {
    require __DIR__ . '/../private/esp.php';
    return $response;
});

$app->run();

