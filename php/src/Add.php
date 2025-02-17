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
        $headers = getallheaders();
        if (!isset($headers['Authorization'])) {
            return output($response, ['Erreur' => 'Non-autorisé (headers)'], 401);
        }

        try {
            $authHeader = $headers['Authorization'] ?? '';
            $jwt = str_replace('Bearer ', '', $authHeader);

            $decodedToken = JWT::decode($jwt, new Key($_ENV['JWT_SECRET'], 'HS256'));
        } catch (\Exception $e) {
            return output($response, ['Erreur' => 'Token invalide'], 401);
        }



        if (!isset($decodedToken->role) || $decodedToken->role !== 'web_user') {
            return output($response, ['Erreur' => 'Non-autorisé (rôle)'], 401);
        }

        echo($jwt);

        $data = json_decode(file_get_contents("php://input"), true);
        if (!is_array($data) || !isset($data['username']) || !isset($data['password'])) {
            return output($response, ['Erreur' => 'Données invalides'], 400);
        }

        // Hachage du mot de passe
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

        $user = callAPI(
            method: 'POST',
            url: $_ENV['POSTGREST_API'] . '/users',
            headers:[
                "Authorization" => "Bearer " . $jwt,
                "Content-Type" => "application/json"
            ],
            data: [
                'username' => $data['username'],
                $hashedPassword,
            ]
        );

        if ($user === false) {
            if ($_ENV['DETAILED_ERRORS'] === 'true') {
                return output($response, ['Erreur' => "Connexion à l'API impossible"], 500);
            } else {
                return output($response, ['Erreur' => "Erreur inconnue"], 500);
            }
        }

        if (isset($user['error'])) {
            return output($response, ['Erreur' => $user['error']], 400);
        }

        return output(
            $response,
            [
                'username' => $data['username']
            ],
        );
    }
}
