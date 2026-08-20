# Stairwise backend — leads API

A small Django service that receives contact/quote requests and discount-popup
emails from the static site, stores them, notifies you on your phone, and gives
you a **secret dashboard link** so you never have to log into a server to see
who reached out.

## What it does
- `POST /api/contact/` — quote form submissions → `ContactRequest`
- `POST /api/lead/` — discount-popup emails → `DiscountLead`
- `GET  /dashboard/<SECRET_DASHBOARD_TOKEN>/` — private, no-login dashboard with
  counts + recent submissions (auto-refreshes every 60s; open it on your phone)
- `GET  /admin/` — full Django admin (mark requests contacted/booked, search, export)
- **Notifications** on every new submission via Discord webhook (instant phone
  push, free) and/or email — configure whichever you have.

## Run locally
```bash
cd backend
python3 -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # then edit .env
python manage.py migrate
python manage.py createsuperuser   # for /admin/
python manage.py runserver 127.0.0.1:8010
```

Point the site at the API by setting, before `js/main.js` loads:
```html
<script>window.STAIRWISE_API_BASE = "http://127.0.0.1:8010/api";</script>
```
In production, the front-end default `"/api"` works if nginx serves the static
site and proxies `/api/` + `/dashboard/` to this app on the same domain.

## Get phone notifications (recommended: Discord webhook, free)
1. In any Discord server: Channel → Edit → Integrations → Webhooks → New Webhook → Copy URL.
2. Put it in `.env` as `DISCORD_WEBHOOK_URL=...`.
3. Install the Discord app on your phone — you'll get a push for every lead.

Email alerts: set `EMAIL_HOST`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`, and
`ADMIN_EMAIL` in `.env`.

## Your secret dashboard
Set a long random `SECRET_DASHBOARD_TOKEN` in `.env`, then bookmark:
`https://api.stairwisemove.com/dashboard/<that-token>/`
Anyone without the exact token gets a 404. Keep the link private.

## Notes
- SQLite by default (`db.sqlite3`), fine for this volume.
- The API endpoints are CSRF-exempt (JSON) and CORS-limited to the origins in
  `CORS_ALLOWED_ORIGINS`.
- `.env`, `db.sqlite3`, and `.venv/` are gitignored — never commit secrets.
- Serve in production with `gunicorn stairwise_api.wsgi` behind nginx (TLS).
