<?php

namespace App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Esp {
    public function __invoke(Request $request, Response $response, mixed $args): Response {
        $data = json_decode(file_get_contents("php://input"), true);

        // check if the esp's ip is provided
        if (!isset($data['ip']))
            return output($response, ['error' => 'IP is required'], 400);

        // check if the user is authenticated
        $user = getallheaders()['Authorization'];
        if (!isset($user))
            return output($response, ['error' => 'Unauthorized'], 401);

        // remove the Bearer prefix
        $user = substr($user, 7);

        // test if the user is web_user
        $decoded = JWT::decode($user, new Key($_ENV['JWT_SECRET'], 'HS256'));
        if ($decoded->role !== 'web_user')
            return output($response, ['error' => 'Unauthorized'], 401);

        // Generate a token for the esp
        $token = JWT::encode(['role' => 'esp32', 'ip' => $data['ip']], $_ENV['JWT_SECRET'], 'HS256');

        return output($response, ['token' => $token]);
    }
}