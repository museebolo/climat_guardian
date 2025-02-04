<?php

header('Content-type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$request = $_SERVER['REQUEST_URI'];

switch ($request) {
    case 'dashboard/users':
        // Route if adding user
        if ($method == 'POST') {

            $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
            require __DIR__ . 'dashboard/addUser.php';

        // Route if editing user
        } elseif ($method == 'PATCH') {

            $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
            require __DIR__ . 'dashboard/editUser.php';
        }
        break;
}