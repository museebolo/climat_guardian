<?php

header('Content-type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$request = $_SERVER['REQUEST_URI'];

switch ($request) {
    case 'dashboard/users':
        // Route if adding user
        if ($method == 'POST') {
            $username = $_POST['username'];
            $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
            require __DIR__ . '/postgrest/users';

        // Route if editing user
        } elseif ($method == 'PATCH') {
            $username = $_POST['username'];
            $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
            require __DIR__ . '/postgrest/users';
        }
        break;
}