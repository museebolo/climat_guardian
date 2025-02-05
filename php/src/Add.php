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

        $data = json_decode(file_get_contents("php://input"), true);


        $user = getallheaders()['Authorization'];

        if (!isset($user['Authorization'])) {
            return output($response, ['Erreur' => 'Non-autorisé N°1'], 401);
        }

        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

        if (!is_array($data) || !isset($data['username']) || !isset($data['password'])) {
            return output($response, ['error' => 'Données invalides'], 400);
        }

        $decoded = JWT::decode($user, new Key($_ENV['JWT_SECRET'], 'HS256'));
        if ($decoded->role !== 'web_user')
            return output($response, ['Erreur' => 'Non-autorisé N°2'], 401);

        $user = callAPI(
            'POST',
            $_ENV['POSTGREST_API'] . '/users',
            [
                'username' => $data['username'],
                'password' => $hashedPassword
            ],
            [
                "Authorization" => "Bearer $decoded->token",
                "Content-Type" => "application/json"
            ]
        );


        if ($user === false)
            return output($response, ['error' =>
                $_ENV['DETAILED_ERRORS'] === 'true' ?
                    "Connexion à l'API impossible" :
                    'Erreur inconnue'
            ], 500);


        return output(
            $response,
            [
                ['username' => $data['username']],
                ['password' => $hashedPassword],
                ['token' => $decoded]
            ]
        );
    }


}