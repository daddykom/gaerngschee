# Deployment Spec

## Overview

Automated deployment of the main branch to the test server at `gaerngschee.collins.ch` via GitHub Actions.

## Infrastructure

| Component | Details |
|-----------|---------|
| Domain | `gaerngschee.collins.ch` |
| Frontend URL | `https://gaerngschee.collins.ch/` |
| API URL | `https://gaerngschee.collins.ch/api` |
| Hosting | Cyon.ch (Webhosting Double) |
| FTP User | `gaerngschee@collins.ch` |
| SSH User | `collinsc` |
| Database | `collinsc_gaerngscheetest` (MariaDB) |
| Deployment Path | `/home/collinsc/public_html/gaerngschee/` |

## Directory Structure on Server

```
/home/collinsc/public_html/gaerngschee/
├── frontend/              # Angular build output
│   └── (dist/frontend/browser/*)
├── api/                  # PHP Backend
│   ├── src/
│   ├── public/           # Document root for /api
│   ├── vendor/
│   └── phinx.php
├── db/                   # Database migrations
│   ├── migrations/
│   └── phinx.php
└── deploy.sh             # Restricted deployment script
```

## URL Routing

| URL | Points To | Purpose |
|-----|-----------|---------|
| `https://gaerngschee.collins.ch/` | `frontend/` | Frontend SPA |
| `https://gaerngschee.collins.ch/api` | `api/public/` | Backend API |

## Deployment Flow

### Trigger
- Push to `main` branch
- Manual workflow dispatch (future)

### Pipeline Steps

1. **Checkout** - Clone main branch
2. **Frontend Build** - `npm ci && nx build`
3. **Backend Prep** - `composer install --no-dev --prefer-dist`
4. **FTP Upload** - Upload artifacts to server
5. **SSH Deploy** - Run `phinx migrate` via restricted SSH

### FTP Upload Mapping

| Local | Remote |
|-------|--------|
| `dist/frontend/browser/*` | `/frontend/` |
| `backend/*` (without vendor) | `/api/` |
| `db/*` | `/db/` |

### SSH Command

Restricted SSH key in `authorized_keys`:
```
command="/home/collinsc/public_html/gaerngschee/deploy.sh",no-pty,no-agent-forwarding,no-X11-forwarding,no-port-forwarding ssh-rsa AAAA...
```

The `deploy.sh` script runs only:
```bash
cd /home/collinsc/public_html/gaerngschee
DB_HOST=localhost \
DB_USER=collinsc_gaerngscheetest \
DB_PASS=$DB_PASSWORD \
DB_NAME=collinsc_gaerngscheetest \
api/vendor/bin/phinx migrate -e production -c db/phinx.php
```

## GitHub Secrets

| Secret | Description |
|--------|-------------|
| `FTP_PASSWORD` | Password for `gaerngschee@collins.ch` |
| `DB_PASSWORD` | Password for `collinsc_gaerngscheetest` database |
| `SSH_DEPLOY_KEY` | Private key for restricted SSH deploy access |

## Security Considerations

### FTP User Restrictions
- FTP user `gaerngschee` has access only to `/home/collinsc/public_html/gaerngschee/`
- SFTP preferred over FTP for encryption

### SSH Restrictions
- Deploy key uses `command=` restriction - can only execute `deploy.sh`
- No shell access, no port forwarding, no agent forwarding
- Key is tied to specific public key in `authorized_keys`

### GitHub Actions
- Secrets stored encrypted in GitHub
- Secrets not logged in workflow output
- Workflow has no access to other repository permissions

## Implementation Checklist

### Server Setup (Manual)
- [x] Create FTP user `gaerngschee` with restricted path
- [x] Create deployment user SSH key
- [x] Configure `authorized_keys` with command restriction
- [ ] Create `deploy.sh` script
- [ ] Create initial directory structure

### GitHub Setup
- [ ] Add GitHub Secrets (FTP_PASSWORD, DB_PASSWORD, SSH_DEPLOY_KEY)
- [ ] Create `.github/workflows/deploy.yml`
- [ ] Test deployment

## Open Decisions

1. **vendor/ upload vs server install**: Currently planning to upload vendor (pre-built with `composer install --no-dev`)
2. **Rollback strategy**: Not yet defined - future enhancement

## Change Log

| Date | Change |
|------|--------|
| 2026-06-24 | Initial spec created |
