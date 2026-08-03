# Talentocart (static + PHP)

Marketing website for Talentocart with a PHP contact form and admin leads dashboard. Built for shared hosting like **MilesWeb** (HTML/CSS/JS + PHP).

## What you get

- Creative tech landing page (`index.html`)
- Contact form posts to `contact.php` and saves leads in `data/leads.json`
- Admin login at `/admin/` to **manage** leads (status, notes, delete)

## MilesWeb deploy

1. In cPanel File Manager, open `public_html`
2. Upload these folders/files:
   - `index.html`
   - `contact.php`
   - `assets/`
   - `admin/`
   - `includes/`
   - `data/`
3. Copy `includes/config.example.php` → `includes/config.local.php`
4. Edit `includes/config.local.php` and set a strong `admin_password`
5. Make sure `data/` is writable by PHP (usually `755` or `775`)
6. Visit your domain, then open `/admin/` to log in

### Admin login (default before you change it)

- Email: `info@talentocart.com`
- Password: `Talentocart@2026`

Change the password immediately after upload.

## Local PHP test (optional)

```bash
php -S localhost:8080
```

Then open http://localhost:8080

## Contact details

- Email: info@talentocart.com
- Mobile: +91 99270 82079
- Address: Noida · Ghaziabad
