<?php

use Psr\Http\Message\ResponseInterface as Response;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

/**
 * @param array<string, mixed> $messages
 */
function output(Response $response, array $messages, int $code = 200): Response {
    $response->getBody()->write(json_encode($messages));
    return $response->withHeader('Content-Type', 'application/json')->withStatus($code);
}

/**
 * @param array<string, mixed> $data
 * @param array<string> $headers
 */
function callAPI(string $method, string $url, array $data = [], array $headers = []): bool|string {
    $ch = curl_init();

    switch ($method) {
        case "POST":
            curl_setopt($ch, CURLOPT_POST, 1);

            if (!empty($data))
                curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            break;
        case "PUT":
            curl_setopt($ch, CURLOPT_PUT, 1);
            break;
        default:
            if ($data)
                $url = sprintf("%s?%s", $url, http_build_query($data));
    }

    // Optional Authentication:
    foreach ($headers as $value)
        curl_setopt($ch, CURLOPT_HTTPHEADER, array($value));

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($ch);

    curl_close($ch);

    return $result;
}
