<?php
require_once __DIR__ . '/../includes/bootstrap.php';
tc_require_login();

$leads = tc_read_leads();
$total = count($leads);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Leads dashboard | Talentocart</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../assets/css/styles.css" />
</head>
<body>
  <main class="dashboard">
    <div class="dashboard-header">
      <div>
        <p class="brand">talento<span>cart</span></p>
        <h1>Leads dashboard</h1>
        <p class="muted mono"><?= (int) $total ?> lead<?= $total === 1 ? '' : 's' ?> captured from the contact form</p>
      </div>
      <div class="dashboard-actions">
        <a class="btn-ghost" href="../index.html">View site</a>
        <a class="btn-primary" href="logout.php">Sign out</a>
      </div>
    </div>

    <?php if ($total === 0): ?>
      <div class="empty-state">
        <h2>No leads yet</h2>
        <p class="muted">Submissions from the contact form will show up here.</p>
      </div>
    <?php else: ?>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>When</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Company</th>
              <th>Service</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($leads as $lead): ?>
              <?php
                $when = $lead['created_at'] ?? '';
                try {
                    $dt = new DateTimeImmutable((string) $when);
                    $whenLabel = $dt->setTimezone(new DateTimeZone('Asia/Kolkata'))->format('d M Y, h:i A');
                } catch (Exception $e) {
                    $whenLabel = (string) $when;
                }
              ?>
              <tr>
                <td class="nowrap muted"><?= tc_e($whenLabel) ?></td>
                <td><?= tc_e($lead['name'] ?? '') ?></td>
                <td>
                  <a class="lime-link" href="mailto:<?= tc_e($lead['email'] ?? '') ?>"><?= tc_e($lead['email'] ?? '') ?></a>
                  <?php if (!empty($lead['phone'])): ?>
                    <div class="muted"><?= tc_e($lead['phone']) ?></div>
                  <?php endif; ?>
                </td>
                <td class="muted"><?= tc_e($lead['company'] ?? '—') ?></td>
                <td class="muted"><?= tc_e($lead['service'] ?? '—') ?></td>
                <td><?= nl2br(tc_e($lead['message'] ?? '')) ?></td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    <?php endif; ?>
  </main>
</body>
</html>
