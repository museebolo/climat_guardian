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

        // check if the esp's ip is provided
        if (!isset($data['password']) || !isset($data['username']))
            return output($response, ['Erreur' => 'Il manque des informations, veuillez fournir un mot de passe et un username'], 400);

        // check if the user is authenticated
        $user = getallheaders()['Authorization'];
        if (!isset($user))
            return output($response, ['Erreur' => 'Non-autorisé'], 401);

        // remove the Bearer prefix
        $user = substr($user, 7);

        // test if the user is web_user
        $decoded = JWT::decode($user, new Key($_ENV['JWT_SECRET'], 'HS256'));
        if ($decoded->role !== 'web_user')
            return output($response, ['Erreur' => 'Non-autorisé'], 401);

        // Hachage du mot de passe
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

        $api_response = callAPI(
            method: 'POST',
            url: $_ENV['POSTGREST_API'] . '/users',
            data: [
                'username' => $data['username'],
                'password' => $hashedPassword,
            ],
            headers:[
                "Authorization: Bearer $user",
                "Content-Type: application/json"
            ],
        );

        if ($api_response === false) {
            if ($_ENV['DETAILED_ERRORS'] === 'true') {
                return output($response, ['Erreur' => "Connexion à l'API impossible"], 500);
            } else {
                return output($response, ['Erreur' => "Erreur inconnue"], 500);
            }
        }
        $api_response = json_decode($api_response, true);
        if (isset($api_response['code'])) {
            return output($response, ['Erreur' => $api_response['message']], 400);
        }

        return output(
            $response,
            [
                'username' => $data['username']
            ],
        );
    }
}
