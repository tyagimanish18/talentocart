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
  <link rel="stylesheet" href="../assets/css/styles.css?v=3" />
</head>
<body class="admin-body">
  <main class="dashboard">
    <header class="dash-bar">
      <div>
        <a class="logo" href="../index.html">
          <span class="logo-mark" aria-hidden="true"></span>
          Talentocart
        </a>
        <h1 class="dash-title">Manage leads</h1>
        <p class="dash-sub"><?= (int) $counts['all'] ?> total · <?= (int) $counts['new'] ?> new</p>
      </div>
      <div class="dashboard-actions">
        <a class="btn-line btn-compact" href="../index.html">View site</a>
        <a class="btn-solid btn-compact" href="logout.php">Sign out</a>
      </div>
    </header>

    <?php if ($flashOk !== ''): ?>
      <p class="flash flash-ok"><?= tc_e($flashOk) ?></p>
    <?php endif; ?>
    <?php if ($flashError !== ''): ?>
      <p class="flash flash-error"><?= tc_e($flashError) ?></p>
    <?php endif; ?>

    <nav class="filter-bar" aria-label="Filter leads">
      <?php
        $filters = [
          'all' => ['All', $counts['all']],
          'new' => ['New', $counts['new']],
          'contacted' => ['Contacted', $counts['contacted']],
          'closed' => ['Closed', $counts['closed']],
        ];
        foreach ($filters as $key => [$label, $count]):
      ?>
        <a
          class="filter-tab<?= $filter === $key ? ' is-active' : '' ?>"
          href="dashboard.php<?= $key === 'all' ? '' : '?status=' . rawurlencode($key) ?>"
        >
          <span><?= tc_e($label) ?></span>
          <strong><?= (int) $count ?></strong>
        </a>
      <?php endforeach; ?>
    </nav>

    <?php if ($total === 0): ?>
      <div class="empty-state">
        <p class="empty-title"><?= $filter === 'all' ? 'No leads yet' : 'No leads in this status' ?></p>
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
          <article class="lead-card is-<?= tc_e($status) ?>">
            <div class="lead-main">
              <div class="lead-identity">
                <div class="lead-identity-row">
                  <p class="lead-name"><?= tc_e($lead['name'] ?? '') ?></p>
                  <span class="status-pill is-<?= tc_e($status) ?>"><?= tc_e(tc_status_label($status)) ?></span>
                </div>
                <p class="lead-time"><?= tc_e($whenLabel) ?></p>
              </div>

              <dl class="lead-details">
                <div>
                  <dt>Email</dt>
                  <dd><a href="mailto:<?= tc_e($lead['email'] ?? '') ?>"><?= tc_e($lead['email'] ?? '') ?></a></dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd><?= tc_e($lead['phone'] ?? '—') ?></dd>
                </div>
                <div>
                  <dt>Company</dt>
                  <dd><?= tc_e($lead['company'] ?? '—') ?></dd>
                </div>
                <div>
                  <dt>Service</dt>
                  <dd><?= tc_e($lead['service'] ?? '—') ?></dd>
                </div>
              </dl>

              <div class="lead-message-block">
                <p class="meta-label">Message</p>
                <p class="lead-message-text"><?= nl2br(tc_e($lead['message'] ?? '')) ?></p>
              </div>
            </div>

            <form class="lead-manage" method="post" action="lead-action.php">
              <p class="manage-label">Update this lead</p>
              <input type="hidden" name="csrf" value="<?= tc_e($csrf) ?>" />
              <input type="hidden" name="id" value="<?= tc_e($id) ?>" />
              <input type="hidden" name="filter" value="<?= tc_e($filter) ?>" />

              <div class="manage-grid">
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
              </div>

              <div class="lead-actions">
                <button class="btn-solid btn-compact" type="submit" name="action" value="update">Save changes</button>
                <button
                  class="btn-danger btn-compact"
                  type="submit"
                  name="action"
                  value="delete"
                  onclick="return confirm('Delete this lead permanently?');"
                >
                  Delete lead
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
