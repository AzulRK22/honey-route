# 🐝 HoneyRoute --- Apiary Intelligence Platform

### Powered by EcoVentus

> **2nd Place --- Huawei Developer Competition LATAM (Brasil) 2025**

HoneyRoute is a mobile-first, offline-capable PWA designed to help
beekeepers monitor hive health, identify risks, and make better field
decisions --- including in low-connectivity rural environments.

The product combines hive management, camera-assisted health analysis,
alerts, environmental context, actionable recommendations, multilingual
support, and offline-first synchronization.

------------------------------------------------------------------------

## 🚀 Overview

HoneyRoute helps smallholder beekeepers and cooperative administrators
detect hive issues such as Varroa risk, receive AI-assisted
recommendations, and log actions even when connectivity is unreliable.

It is designed around three real operating constraints:

-   **Field usability** --- fast, mobile-first interactions around
    apiaries.
-   **Low connectivity** --- local persistence and synchronization when
    connectivity returns.
-   **Decision support** --- translating observations into
    understandable risks and recommended actions.

------------------------------------------------------------------------

## 🧩 Key Features

-   📸 **Photo-based analysis** --- capture or upload hive images for
    health-risk analysis.
-   ⚠️ **Alert system** --- severity-filtered alerts and resolution
    tracking.
-   🐝 **Hive management** --- create, view, and track hives with
    history and operational indicators.
-   🌍 **Map view** --- visualize apiaries and risk zones.
-   🌐 **Bilingual experience** --- English and ES-MX localization.
-   📶 **Offline-first workflows** --- local persistence, queued
    actions, and synchronization.
-   🔐 **Privacy-aware access** --- consent-based camera and location
    permissions.
-   💡 **Actionable recommendations** --- translate observed conditions
    into useful next steps.

------------------------------------------------------------------------

## 🧭 System Flow

``` text
Capture / upload hive image
            ↓
      Risk analysis
            ↓
   Low / Medium / High
            ↓
Actionable recommendations
            ↓
      User logs action
            ↓
     Local persistence
            ↓
 Synchronize when online
```

------------------------------------------------------------------------

## 🛠️ Tech Stack

  -----------------------------------------------------------------------
  Layer                               Technology
  ----------------------------------- -----------------------------------
  Frontend                            **Next.js · React · TypeScript ·
                                      Tailwind CSS**

  Backend                             **NestJS · Node.js · TypeScript ·
                                      REST APIs**

  Architecture                        **pnpm workspaces · Turborepo**

  Analysis                            **Hive image risk-analysis API /
                                      mock analysis workflow**

  Offline                             **Service Workers · IndexedDB queue
                                      system**

  i18n                                **English base · ES-MX
                                      localization**

  Engineering                         **GitHub Actions · Husky ·
                                      lint-staged · Commitlint ·
                                      Prettier**
  -----------------------------------------------------------------------

> Tailwind v3 is intentionally pinned for project stability.

------------------------------------------------------------------------

## 🧠 UX & Design

HoneyRoute was designed as a mobile-first field product rather than a
desktop dashboard adapted to smaller screens.

-   22 responsive interfaces designed in Figma.
-   8pt spacing grid.
-   Accessible contrast and inclusive copy.
-   Reusable Buttons, Cards, Tabs, Toasts, Modals, and Badges.
-   Visible keyboard focus.
-   44×44 touch targets.
-   WCAG 2.2 AA-oriented interaction patterns.
-   Clear severity and feedback states.

------------------------------------------------------------------------

## 🧩 Repository Structure

``` text
honey-route/
├── frontend/      # Next.js app, Tailwind, i18n and offline behavior
├── backend/       # NestJS API and analysis handlers
├── docs/          # SRS, design specifications and brand documentation
├── scripts/       # Development and automation utilities
└── .github/       # CI workflows
```

The frontend and backend live in the same pnpm/Turborepo workspace but
can be developed independently.

------------------------------------------------------------------------

## 📋 Requirements

### Required

-   Node.js 20
-   pnpm 9.x
-   Git

### Recommended

-   VS Code

### Optional

Docker Desktop is only required when running local services such as
Postgres or Redis.

``` bash
brew install --cask docker
```

For Node.js with `nvm`:

``` bash
echo "20" > .nvmrc
nvm use
```

For pnpm:

``` bash
corepack disable
npm i -g pnpm@9.7.0
```

------------------------------------------------------------------------

## ⚙️ Installation

``` bash
git clone https://github.com/AzulRK22/honey-route.git
cd honey-route
pnpm install
```

If the project scaffolds need to be generated for a first-time setup:

``` bash
pnpm bootstrap
```

------------------------------------------------------------------------

## 🔐 Environment Variables

### Frontend

``` bash
cp frontend/.env.example frontend/.env.local
```

Example:

``` env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=HoneyRoute
NEXT_PUBLIC_DEFAULT_LOCALE=en
```

### Backend

``` bash
cp backend/.env.example backend/.env
```

Example:

``` env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/honeyroute
REDIS_URL=redis://localhost:6379
JWT_SECRET=change-me
S3_ENDPOINT=
S3_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
```

For CI and production, configure secrets through **Settings → Secrets
and variables → Actions**.

Do not commit production credentials.

------------------------------------------------------------------------

## 🐳 Optional Local Services

If the backend workflow requires local Postgres/Redis services:

``` bash
docker compose up -d
```

Docker is not required for frontend-only development.

------------------------------------------------------------------------

## 💻 Development

Run frontend and backend together through Turbo:

``` bash
pnpm dev
```

Or independently:

``` bash
pnpm --filter frontend dev
pnpm --filter backend dev
```

Default URLs:

``` text
Frontend: http://localhost:3000
Backend:  http://localhost:3001
```

------------------------------------------------------------------------

## 📜 Scripts

### Root

``` bash
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm bootstrap
pnpm prepare
```

-   `pnpm dev` --- runs frontend and backend in parallel through Turbo.
-   `pnpm build` --- runs package builds.
-   `pnpm lint` --- runs package linting.
-   `pnpm test` --- runs available tests.
-   `pnpm bootstrap` --- creates project scaffolds when required.
-   `pnpm prepare` --- installs Husky Git hooks.

### Frontend

``` bash
pnpm --filter frontend dev
pnpm --filter frontend build
```

### Backend

``` bash
pnpm --filter backend dev
```

------------------------------------------------------------------------

## 🔬 Analysis Endpoints

Example mock endpoints:

``` text
POST /analysis
GET  /analysis/:jobId
```

Example flow:

``` text
POST /analysis
→ { jobId }

GET /analysis/:jobId
→ { status: "done", riskLevel: "medium" }
```

The mock analysis path makes it possible to exercise the complete
product workflow while keeping the analysis integration replaceable.

------------------------------------------------------------------------

## 📶 PWA & Offline Behavior

HoneyRoute is installable as a Progressive Web App.

The PWA configuration includes:

-   Service Worker support.
-   Production-only Service Worker registration.
-   Offline fallback at `/offline`.
-   App Router manifest.
-   Installable icons.
-   IndexedDB-backed offline workflows.
-   Synchronization when connectivity becomes available.

### Manifest

``` text
frontend/src/app/manifest.ts
```

Optional static manifest:

``` text
frontend/public/manifest.webmanifest
```

### Icons

``` text
frontend/public/icons/favicon.png
frontend/public/icons/apple-touch-icon.png
frontend/public/icons/maskable.png
frontend/public/icons/logo-honeyroute-amber-1024.png
```

------------------------------------------------------------------------

## 📱 Testing the Installable PWA

Service Worker behavior should be tested using a production build:

``` bash
pnpm --filter frontend build
pnpm --filter frontend start -H 0.0.0.0 -p 3002
```

To test from a phone:

``` bash
cloudflared tunnel --url http://localhost:3002
```

Then:

1.  Open the generated `https://<subdomain>.trycloudflare.com` URL.
2.  Verify the application loads correctly.
3.  Use **Add to Home Screen / Install app**.
4.  Test offline behavior and reconnection synchronization.

------------------------------------------------------------------------

## 🌿 Branch Flow & Collaboration

-   `main` --- stable releases.
-   `develop` --- feature integration.
-   `feat/<area>-<slug>` --- feature work.
-   `fix/<area>-<slug>` --- bug fixes.

### Commit Convention

``` text
feat:
fix:
chore:
docs:
refactor:
test:
```

### Pull Requests

Before opening a PR:

-   Run `pnpm lint`.
-   Run `pnpm build`.
-   Run relevant tests.
-   Verify visible keyboard focus and basic accessibility.
-   Update documentation when behavior changes.
-   Include screenshots for visible UI changes.
-   Ensure CI passes.

The intended merge strategy is feature/fix branches → `develop` using
Squash & Merge, then `develop` → `main` through a release/tag when
applicable.

------------------------------------------------------------------------

## 🔄 CI/CD

GitHub Actions workflows are separated by package paths so frontend and
backend work can be validated independently.

Relevant changes under:

``` text
frontend/**
backend/**
```

trigger the corresponding workflow.

Expected sequence:

``` text
install → lint/test → build
```

Workflow definitions live under:

``` text
.github/workflows/
```

------------------------------------------------------------------------

## 👩‍💻 Contributors

  Role                       Name
  -------------------------- ------------------------------
  Product & Front-End Lead   **Azul Grisel Ramírez Kuri**
  Backend & Data             **Héctor Valdés**

------------------------------------------------------------------------

## 🏆 Recognition

**2nd Place --- Huawei Developer Competition LATAM (Brasil) 2025**

HoneyRoute evolved from the broader EcoVentus sustainability work into a
focused product centered on apiary intelligence, low-connectivity field
use, and actionable decision support.

------------------------------------------------------------------------

## 📸 Demo

**Live demo:** https://honeyroute.netlify.app/onboarding

------------------------------------------------------------------------

## 📄 License

© 2025 HoneyRoute --- Powered by EcoVentus. All rights reserved.
