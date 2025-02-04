<?php

namespace App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Delete {
    public function __invoke(Request $request, Response $response, mixed $args): Response {
        die("test");
    }
}