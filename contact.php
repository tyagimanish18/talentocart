<?php
require_once __DIR__ . '/includes/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Please submit the contact form.']);
    exit;
}

$input = [];
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';

if (stripos($contentType, 'application/json') !== false) {
    $raw = file_get_contents('php://input');
    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        http_response_code(400);
        echo json_encode([
            'error' => 'Invalid form data received.',
            'errors' => ['form' => 'Could not read the submitted data. Please try again.'],
        ]);
        exit;
    }
    $input = $decoded;
} else {
    $input = $_POST;
}

$name = trim((string) ($input['name'] ?? ''));
$email = trim((string) ($input['email'] ?? ''));
$phone = trim((string) ($input['phone'] ?? ''));
$company = trim((string) ($input['company'] ?? ''));
$service = trim((string) ($input['service'] ?? ''));
$message = trim((string) ($input['message'] ?? ''));

$errors = [];

if ($name === '') {
    $errors['name'] = 'Please enter your name.';
} elseif (strlen($name) < 2) {
    $errors['name'] = 'Name must be at least 2 characters.';
} elseif (strlen($name) > 120) {
    $errors['name'] = 'Name is too long.';
}

if ($email === '') {
    $errors['email'] = 'Please enter your email.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid email address.';
}

if ($phone !== '' && strlen($phone) > 40) {
    $errors['phone'] = 'Phone number is too long.';
}

if ($company !== '' && strlen($company) > 160) {
    $errors['company'] = 'Company name is too long.';
}

if ($message === '') {
    $errors['message'] = 'Please enter a message.';
} elseif (strlen($message) < 10) {
    $errors['message'] = 'Message must be at least 10 characters.';
} elseif (strlen($message) > 2000) {
    $errors['message'] = 'Message is too long (max 2000 characters).';
}

if ($errors !== []) {
    http_response_code(400);
    echo json_encode([
        'error' => 'Please fix the highlighted fields and try again.',
        'errors' => $errors,
    ]);
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
    'status' => 'new',
    'notes' => '',
    'created_at' => gmdate('c'),
    'updated_at' => gmdate('c'),
    'ip' => $_SERVER['REMOTE_ADDR'] ?? null,
];

if (!tc_add_lead($lead)) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Could not save your message right now. Please try again or email info@talentocart.com.',
        'errors' => ['form' => 'Server could not save the lead.'],
    ]);
    exit;
}

echo json_encode(['ok' => true, 'id' => $lead['id']]);
