<?php

namespace App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Add
{
    public function __invoke(Request $request, Response $response, mixed $args): Response
    {
       $data = json_decode(file_get_contents("php://input"), true );

       $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

       if (!isset($data['username']) || !isset($data['password']))
           return output($response, ['error' => 'Entrées requise'], 400);

       $token = JWT::encode(['role' => 'web_login', 'exp' => time()], $_ENV['JWT_SECRET'], 'HS256');
       $user = callAPI('POST', $_ENV['POSTGREST_API'] . '/user', [], ["Authorization" => "Bearer $token"]);

        if ($user === false)
            return output($response, ['error' =>
                $_ENV['DETAILED_ERRORS'] === 'true' ?
                    "Connexion à l'API impossible":
                    'Erreur inconnue N°1'
            ], 500);
        $user = json_decode($user, true);
        if (isset($user["message"]))
            return output($response, ['error' =>
                $_ENV['DETAILED_ERRORS'] === 'true' ?
                    $user :
                    'Erreur inconnue N°2'
            ], 500);

        return output($response, ['token' => $token]);
    }
}