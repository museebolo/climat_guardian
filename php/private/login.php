<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../lib.php';

use Firebase\JWT\JWT;
use Symfony\Component\Dotenv\Dotenv;

$data = match ($_SERVER['REQUEST_METHOD']) {
	'GET' => $_GET,
	'POST' => json_decode(file_get_contents("php://input"), true),
	default => output(['error' => 'Unsupported method'], 405),
};

if (!isset($data['username']) || !isset($data['password']))
    output(['error' => 'Username and password are required'], 400);

// Load environment variables
$dotenv = new Dotenv();
$dotenv->load(__DIR__ . '/../.env');

// Generate a token and use it to get the user
$token = JWT::encode(['role' => 'web_login', 'exp' => time()], $_ENV['JWT_SECRET'], 'HS256');
$user = callAPI('GET', $_ENV['POSTGREST_API'] . "/users?username=eq.{$data['username']}&limit=1&select=password,id", [], ["Authorization: Bearer $token"]);

// Check if the answer is valid
if ($user === false)
	output(['error' => 
		$_ENV['DETAILED_ERRORS'] === 'true' ? 
			'Unable to connect to the API' :
			'Unknown error'
	], 500);
$user = json_decode($user, true);
if (isset($user["message"]))
    output(['error' => 
		$_ENV['DETAILED_ERRORS'] === 'true' ? 
			$user :
			'Unknown error'
	], 500);

if (empty($user))
    output(['error' => 'Unknown user'], 401);
if (!password_verify($data['password'], $user[0]['password']))
    output(['error' => 'Invalid password'], 401);

// Generate a token for the user that expires at midnight
$payload = [
    'role' => 'web_user',
    'id' => $user[0]['id'],
    'exp' => strtotime('tomorrow midnight')
];
$token = JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');

output(['token' => $token]);
