<?php
require_once __DIR__ . '/../includes/bootstrap.php';
tc_require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: dashboard.php');
    exit;
}

$token = (string) ($_POST['csrf'] ?? '');
if (!tc_verify_csrf($token)) {
    header('Location: dashboard.php?error=' . rawurlencode('Security check failed. Please try again.'));
    exit;
}

$action = (string) ($_POST['action'] ?? '');
$id = trim((string) ($_POST['id'] ?? ''));
$filter = trim((string) ($_POST['filter'] ?? 'all'));

if ($id === '') {
    header('Location: dashboard.php?error=' . rawurlencode('Lead not found.'));
    exit;
}

$redirect = 'dashboard.php';
if (in_array($filter, ['all', 'new', 'contacted', 'closed'], true) && $filter !== 'all') {
    $redirect .= '?status=' . rawurlencode($filter);
}

if ($action === 'delete') {
    if (!tc_delete_lead($id)) {
        header('Location: ' . $redirect . (str_contains($redirect, '?') ? '&' : '?') . 'error=' . rawurlencode('Could not delete lead.'));
        exit;
    }
    header('Location: ' . $redirect . (str_contains($redirect, '?') ? '&' : '?') . 'ok=' . rawurlencode('Lead deleted.'));
    exit;
}

if ($action === 'update') {
    $status = strtolower(trim((string) ($_POST['status'] ?? 'new')));
    $notes = trim((string) ($_POST['notes'] ?? ''));

    if (!in_array($status, ['new', 'contacted', 'closed'], true)) {
        header('Location: ' . $redirect . (str_contains($redirect, '?') ? '&' : '?') . 'error=' . rawurlencode('Invalid status.'));
        exit;
    }

    if (strlen($notes) > 2000) {
        header('Location: ' . $redirect . (str_contains($redirect, '?') ? '&' : '?') . 'error=' . rawurlencode('Notes are too long.'));
        exit;
    }

    $ok = tc_update_lead($id, [
        'status' => $status,
        'notes' => $notes,
        'updated_at' => gmdate('c'),
    ]);

    if (!$ok) {
        header('Location: ' . $redirect . (str_contains($redirect, '?') ? '&' : '?') . 'error=' . rawurlencode('Could not update lead.'));
        exit;
    }

    header('Location: ' . $redirect . (str_contains($redirect, '?') ? '&' : '?') . 'ok=' . rawurlencode('Lead updated.'));
    exit;
}

header('Location: dashboard.php?error=' . rawurlencode('Unknown action.'));
exit;
