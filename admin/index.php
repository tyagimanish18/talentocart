<?php
require_once __DIR__ . '/../includes/bootstrap.php';

tc_start_session();

if (tc_is_logged_in()) {
    header('Location: dashboard.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim((string) ($_POST['email'] ?? ''));
    $password = (string) ($_POST['password'] ?? '');
    $config = tc_config();

    if (
        strcasecmp($email, (string) $config['admin_email']) === 0 &&
        hash_equals((string) $config['admin_password'], $password)
    ) {
        $_SESSION['tc_admin'] = true;
        $_SESSION['tc_admin_email'] = $email;
        header('Location: dashboard.php');
        exit;
    }

    $error = 'Invalid email or password.';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin login | Talentocart</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../assets/css/styles.css" />
</head>
<body>
  <main class="admin-shell">
    <div class="hero-glow" aria-hidden="true"></div>
    <div class="site-grid" aria-hidden="true"></div>

    <div class="admin-card">
      <a href="../index.html" class="brand">talento<span>cart</span></a>
      <h1>Admin login</h1>
      <p class="muted">Sign in to view contact form leads.</p>

      <form method="post" class="admin-form" autocomplete="on">
        <label>
          <span>Email</span>
          <input class="input-field" type="email" name="email" required placeholder="info@talentocart.com" />
        </label>
        <label>
          <span>Password</span>
          <input class="input-field" type="password" name="password" required placeholder="••••••••" />
        </label>
        <button class="btn-primary" type="submit">Sign in</button>
        <?php if ($error !== ''): ?>
          <p class="form-error"><?= tc_e($error) ?></p>
        <?php endif; ?>
      </form>
    </div>
  </main>
</body>
</html>
