<?php

namespace App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Add {
    public function __invoke(Request $request, Response $response, mixed $args): Response {
        $message = "Appel de la page fonctionnel";
        echo "<script>alert('$message');</script>";

        return $response;
    }
}