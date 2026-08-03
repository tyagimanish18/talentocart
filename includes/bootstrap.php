<?php

function tc_config(): array
{
    static $config = null;
    if ($config !== null) {
        return $config;
    }

    $local = __DIR__ . '/config.local.php';
    $example = __DIR__ . '/config.example.php';

    if (is_file($local)) {
        $config = require $local;
    } elseif (is_file($example)) {
        $config = require $example;
    } else {
        $config = [
            'admin_email' => 'info@talentocart.com',
            'admin_password' => 'Talentocart@2026',
            'company_email' => 'info@talentocart.com',
        ];
    }

    return $config;
}

function tc_data_dir(): string
{
    $dir = dirname(__DIR__) . '/data';
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    return $dir;
}

function tc_leads_file(): string
{
    return tc_data_dir() . '/leads.json';
}

function tc_read_leads(): array
{
    $file = tc_leads_file();
    if (!is_file($file)) {
        return [];
    }

    $raw = file_get_contents($file);
    if ($raw === false || trim($raw) === '') {
        return [];
    }

    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function tc_save_leads(array $leads): bool
{
    $file = tc_leads_file();
    $json = json_encode(array_values($leads), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    return file_put_contents($file, $json . PHP_EOL, LOCK_EX) !== false;
}

function tc_add_lead(array $lead): bool
{
    $leads = tc_read_leads();
    array_unshift($leads, $lead);
    return tc_save_leads($leads);
}

function tc_start_session(): void
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }
}

function tc_is_logged_in(): bool
{
    tc_start_session();
    return !empty($_SESSION['tc_admin']);
}

function tc_require_login(): void
{
    if (!tc_is_logged_in()) {
        header('Location: index.php');
        exit;
    }
}

function tc_e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}
