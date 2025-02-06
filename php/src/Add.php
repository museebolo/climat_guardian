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
            return output($response, ['Erreur' => 'Non-autorisé'], 401);
        }

        $token = JWT::encode(['role' => 'web_user'], $_ENV['JWT_SECRET'], 'HS256');

        try {
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
        } catch (\Exception $e) {
            return output($response, ['Erreur' => 'Token invalide'], 401);
        }

        if (!isset($decoded->role) || $decoded->role !== 'web_user') {
            return output($response, ['Erreur' => 'Non-autorisé'], 401);
        }

        $data = json_decode(file_get_contents("php://input"), true);
        if (!is_array($data) || !isset($data['username']) || !isset($data['password'])) {
            return output($response, ['Erreur' => 'Données invalides'], 400);
        }

        // Hachage du mot de passe
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

        $user = callAPI(
            'POST',
            $_ENV['POSTGREST_API'] . '/users',
            [
                'username' => $data['username'],
                'password' => $hashedPassword
            ],
            [
                "Authorization" => "Bearer " . $token,
                "Content-Type" => "application/json"
            ]
        );

        if ($user === false) {
            if ($_ENV['DETAILED_ERRORS'] === 'true') {
                return output($response, ['Erreur' => "Connexion à l'API impossible"], 500);
            } else {
                return output($response, ['Erreur' => "Erreur inconnue"], 500);
            }
        }

        // Retour de la réponse sans le mot de passe haché pour des raisons de sécurité
        return output(
            $response,
            [
                'username' => $data['username'],
                'password' => $hashedPassword,
            ],
        );
    }
}
