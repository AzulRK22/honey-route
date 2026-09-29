# 🐝 HoneyRoute

### Apiary Intelligence Platform · Powered by EcoVentus

> **2nd Place — Huawei Developer Competition LATAM 2025**

HoneyRoute is a mobile-first, offline-capable PWA designed to help beekeepers monitor hive health, identify risks, and make better field decisions — including in low-connectivity environments.

The product combines hive management, camera-assisted observations, alerts, environmental context, and actionable recommendations in an accessible multilingual experience.

---

## The problem

Beekeepers often work in rural environments where connectivity is unreliable and important hive information is fragmented across manual observations, photos, environmental conditions, and historical records.

HoneyRoute explores how a digital product can bring those signals together without assuming constant connectivity.

---

## Key features

- 📸 Camera-assisted hive health analysis
- ⚠️ Risk alerts with severity and resolution tracking
- 🐝 Hive management with history and operational indicators
- 🗺️ Apiary and risk-zone visualization
- 🌐 English and Spanish localization
- 📶 Offline-first workflows and synchronization
- 🔐 Consent-based camera and location access
- 💡 Actionable recommendations based on observed hive conditions

---

## Product approach

HoneyRoute was designed around three constraints:

### Field usability

The primary experience is mobile-first and designed for quick interaction while working around apiaries.

### Low connectivity

Core workflows are designed to remain useful when network connectivity is limited, with local persistence and synchronization when connectivity returns.

### Decision support

The goal is not simply to collect hive information, but to translate observations into understandable risks and recommended actions.

---

## Tech stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- PWA / Service Workers
- IndexedDB
- i18n

### Backend

- Node.js / TypeScript
- NestJS
- REST APIs

### Engineering

- pnpm workspaces
- Turborepo
- GitHub Actions
- Husky
- lint-staged
- Commitlint

---

## Architecture

```text
honey-route/
├── frontend/      # Next.js application and offline experience
├── backend/       # API and analysis services
├── docs/          # Product and engineering documentation
├── scripts/       # Development and automation utilities
└── .github/       # CI workflows
