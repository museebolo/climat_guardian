<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$data = match ($_SERVER['REQUEST_METHOD']) {
        'GET' => $_GET,
        'POST' => json_decode(file_get_contents("php://input"), true),
        default => output(['error' => 'Unsupported method'], 405),
};

// check if the esp's ip is provided
if (!isset($data['ip']))
    output(['error' => 'IP is required'], 400);

// check if the user is authenticated
$user = getallheaders()['Authorization'];
if (!isset($user))
    output(['error' => 'Unauthorized'], 401);

// remove the Bearer prefix
$user = substr($user, 7);

// test if the user is web_user
$decoded = JWT::decode($user, new Key($_ENV['JWT_SECRET'], 'HS256'));
if ($decoded->role !== 'web_user')
    output(['error' => 'Unauthorized'], 401);

// Generate a token for the esp
$token = JWT::encode(['role' => 'esp32', 'ip' => $data['ip']], $_ENV['JWT_SECRET'], 'HS256');

output(['token' => $token], 200);

