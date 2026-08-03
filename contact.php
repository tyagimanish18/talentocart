<?php
require_once __DIR__ . '/includes/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = [];
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';

if (stripos($contentType, 'application/json') !== false) {
    $raw = file_get_contents('php://input');
    $decoded = json_decode($raw, true);
    $input = is_array($decoded) ? $decoded : [];
} else {
    $input = $_POST;
}

$name = trim((string) ($input['name'] ?? ''));
$email = trim((string) ($input['email'] ?? ''));
$phone = trim((string) ($input['phone'] ?? ''));
$company = trim((string) ($input['company'] ?? ''));
$service = trim((string) ($input['service'] ?? ''));
$message = trim((string) ($input['message'] ?? ''));

if (strlen($name) < 2 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($message) < 10) {
    http_response_code(400);
    echo json_encode(['error' => 'Please check the form and try again.']);
    exit;
}

$lead = [
    'id' => bin2hex(random_bytes(8)),
    'name' => $name,
    'email' => $email,
    'phone' => $phone !== '' ? $phone : null,
    'company' => $company !== '' ? $company : null,
    'service' => $service !== '' ? $service : null,
    'message' => $message,
    'created_at' => gmdate('c'),
    'ip' => $_SERVER['REMOTE_ADDR'] ?? null,
];

if (!tc_add_lead($lead)) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not save your message. Please try again.']);
    exit;
}

echo json_encode(['ok' => true, 'id' => $lead['id']]);
