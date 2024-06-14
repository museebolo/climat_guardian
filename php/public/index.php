<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

$app = AppFactory::create();
$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);

# the router is use to require the php files
$app->post('/login', function (Request $request, Response $response, $args) {
    require __DIR__ . '/../private/login.php';
    return $response;
});
$app->post('/esp', function (Request $request, Response $response, $args) {
    require __DIR__ . '/../private/esp.php';
    return $response;
});

$app->run();

