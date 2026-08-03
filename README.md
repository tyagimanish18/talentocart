# Talentocart

Creative tech website for **Talentocart** — hire software engineers across stacks, on-demand developers, software services, and India payroll partnership.

## Features

- Marketing site with services, tech stacks, and contact form
- Contact submissions saved to a local SQLite database
- Admin login at `/admin` to view all leads at `/admin/dashboard`

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin access

Configure credentials in `.env.local`:

```env
ADMIN_EMAIL=info@talentocart.com
ADMIN_PASSWORD=your-strong-password
AUTH_SECRET=long-random-secret
```

Then visit `/admin` and sign in.

## Contact details

- Email: info@talentocart.com
- Mobile: +91 99270 82079
- Address: Noida · Ghaziabad

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm start` — run production server
- `npm run lint` — lint
