<?php

namespace App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Firebase\JWT\JWT;

class Login {
    public function __invoke(Request $request, Response $response, mixed $args): Response {
        $data = json_decode(file_get_contents("php://input"), true);

        // Check if the username and password are provided
        if (!isset($data['username']) || !isset($data['password']))
            return output($response, ['error' => 'Username and password are required'], 400);

        // Generate a token and use it to get the user
        $token = JWT::encode(['role' => 'web_login', 'exp' => time()], $_ENV['JWT_SECRET'], 'HS256');
        $user = callAPI('GET', $_ENV['POSTGREST_API'] . "/users?username=eq.{$data['username']}&limit=1&select=password,id", [], ["Authorization: Bearer $token"]);

        // Check if the answer is valid
        if ($user === false)
            return output($response, ['error' =>
                $_ENV['DEBUG'] === 'true' ?
                    'Unable to connect to the API' :
                    'Unknown error'
            ], 500);
        $user = json_decode($user, true);
        if (isset($user["message"]))
            return output($response, ['error' =>
                $_ENV['DEBUG'] === 'true' ?
                    $user :
                    'Unknown error'
            ], 500);

        if (empty($user))
            return output($response, ['error' => 
                $_ENV['DEBUG'] === 'true' ?
                    'Unknown user' :
                    'Invalid username or password'
            ], 401);
        if (!password_verify($data['password'], $user[0]['password']))
            return output($response, ['error' =>
                $_ENV['DEBUG'] === 'true' ?
                    'Invalid password' :
                    'Invalid username or password'
            ], 401);

        // Generate a token for the user that expires at midnight
        $payload = [
            'role' => 'web_user',
            'id' => $user[0]['id'],
            'exp' => strtotime('tomorrow midnight')
        ];
        $token = JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');

        return output($response, ['token' => $token]);
    }
}

