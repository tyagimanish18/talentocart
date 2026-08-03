<?php
require_once __DIR__ . '/../includes/bootstrap.php';
tc_require_login();

$filter = strtolower(trim((string) ($_GET['status'] ?? 'all')));
if (!in_array($filter, ['all', 'new', 'contacted', 'closed'], true)) {
    $filter = 'all';
}

$flashOk = trim((string) ($_GET['ok'] ?? ''));
$flashError = trim((string) ($_GET['error'] ?? ''));

$allLeads = array_map('tc_normalize_lead', tc_read_leads());
$counts = ['all' => count($allLeads), 'new' => 0, 'contacted' => 0, 'closed' => 0];
foreach ($allLeads as $lead) {
    $status = $lead['status'] ?? 'new';
    if (isset($counts[$status])) {
        $counts[$status]++;
    }
}

$leads = $filter === 'all'
    ? $allLeads
    : array_values(array_filter(
        $allLeads,
        static fn(array $lead): bool => ($lead['status'] ?? 'new') === $filter
    ));

$total = count($leads);
$csrf = tc_csrf_token();

function tc_status_label(string $status): string
{
    return match ($status) {
        'contacted' => 'Contacted',
        'closed' => 'Closed',
        default => 'New',
    };
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Leads dashboard | Talentocart</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Sora:wght@300;400;500;600;700&family=Unbounded:wght@500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../assets/css/styles.css" />
</head>
<body>
  <div class="noise" aria-hidden="true"></div>
  <main class="dashboard">
    <div class="dashboard-header">
      <div>
        <p class="logo">
          <span class="logo-mark" aria-hidden="true"></span>
          Talentocart
        </p>
        <h1>Manage leads</h1>
        <p class="muted mono"><?= (int) $counts['all'] ?> total · <?= (int) $counts['new'] ?> new</p>
      </div>
      <div class="dashboard-actions">
        <a class="btn-line" href="../index.html">View site</a>
        <a class="btn-solid" href="logout.php">Sign out</a>
      </div>
    </div>

    <?php if ($flashOk !== ''): ?>
      <p class="flash flash-ok"><?= tc_e($flashOk) ?></p>
    <?php endif; ?>
    <?php if ($flashError !== ''): ?>
      <p class="flash flash-error"><?= tc_e($flashError) ?></p>
    <?php endif; ?>

    <div class="lead-filters">
      <?php
        $filters = [
          'all' => 'All (' . $counts['all'] . ')',
          'new' => 'New (' . $counts['new'] . ')',
          'contacted' => 'Contacted (' . $counts['contacted'] . ')',
          'closed' => 'Closed (' . $counts['closed'] . ')',
        ];
        foreach ($filters as $key => $label):
      ?>
        <a class="filter-chip<?= $filter === $key ? ' is-active' : '' ?>" href="dashboard.php<?= $key === 'all' ? '' : '?status=' . rawurlencode($key) ?>">
          <?= tc_e($label) ?>
        </a>
      <?php endforeach; ?>
    </div>

    <?php if ($total === 0): ?>
      <div class="empty-state">
        <h2><?= $filter === 'all' ? 'No leads yet' : 'No leads in this status' ?></h2>
        <p class="muted">
          <?= $filter === 'all'
            ? 'Submissions from the contact form will show up here.'
            : 'Try another filter, or wait for new form submissions.' ?>
        </p>
      </div>
    <?php else: ?>
      <div class="lead-list">
        <?php foreach ($leads as $lead): ?>
          <?php
            $id = (string) ($lead['id'] ?? '');
            $status = (string) ($lead['status'] ?? 'new');
            $when = $lead['created_at'] ?? '';
            try {
                $dt = new DateTimeImmutable((string) $when);
                $whenLabel = $dt->setTimezone(new DateTimeZone('Asia/Kolkata'))->format('d M Y, h:i A');
            } catch (Exception $e) {
                $whenLabel = (string) $when;
            }
          ?>
          <article class="lead-card status-<?= tc_e($status) ?>">
            <div class="lead-card-top">
              <div>
                <h2><?= tc_e($lead['name'] ?? '') ?></h2>
                <p class="muted mono"><?= tc_e($whenLabel) ?></p>
              </div>
              <span class="status-pill status-<?= tc_e($status) ?>"><?= tc_e(tc_status_label($status)) ?></span>
            </div>

            <div class="lead-meta">
              <div>
                <span class="meta-label">Email</span>
                <a class="lime-link" href="mailto:<?= tc_e($lead['email'] ?? '') ?>"><?= tc_e($lead['email'] ?? '') ?></a>
              </div>
              <div>
                <span class="meta-label">Phone</span>
                <span><?= tc_e($lead['phone'] ?? '—') ?></span>
              </div>
              <div>
                <span class="meta-label">Company</span>
                <span><?= tc_e($lead['company'] ?? '—') ?></span>
              </div>
              <div>
                <span class="meta-label">Service</span>
                <span><?= tc_e($lead['service'] ?? '—') ?></span>
              </div>
            </div>

            <div class="lead-message">
              <span class="meta-label">Message</span>
              <p><?= nl2br(tc_e($lead['message'] ?? '')) ?></p>
            </div>

            <form class="lead-manage" method="post" action="lead-action.php">
              <input type="hidden" name="csrf" value="<?= tc_e($csrf) ?>" />
              <input type="hidden" name="id" value="<?= tc_e($id) ?>" />
              <input type="hidden" name="filter" value="<?= tc_e($filter) ?>" />

              <label>
                <span>Status</span>
                <select name="status">
                  <option value="new" <?= $status === 'new' ? 'selected' : '' ?>>New</option>
                  <option value="contacted" <?= $status === 'contacted' ? 'selected' : '' ?>>Contacted</option>
                  <option value="closed" <?= $status === 'closed' ? 'selected' : '' ?>>Closed</option>
                </select>
              </label>

              <label class="full">
                <span>Internal notes</span>
                <textarea name="notes" rows="3" placeholder="Add follow-up notes..."><?= tc_e($lead['notes'] ?? '') ?></textarea>
              </label>

              <div class="lead-actions">
                <button class="btn-solid" type="submit" name="action" value="update">Save changes</button>
                <button
                  class="btn-danger"
                  type="submit"
                  name="action"
                  value="delete"
                  onclick="return confirm('Delete this lead permanently?');"
                >
                  Delete
                </button>
              </div>
            </form>
          </article>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </main>
</body>
</html>
