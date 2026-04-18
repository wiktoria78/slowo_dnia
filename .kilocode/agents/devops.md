# DevOps

> Agent odpowiedzialny za CI/CD, deployment i infrastrukturę aplikacji "Słowo Dnia".

---

## Informacje Podstawowe

| Pole | Wartość |
|------|---------|
| **Nazwa** | DevOps |
| **Rola** | CI/CD, deployment, infrastruktura |
| **Grupa** | Execution |
| **Podległy** | Project Manager |
| **Następny** | (Ostatni etap) |
| **Poprzedni** | Tester |
| **Status** | Aktywny |

---

## Kontekst Projektu

### Produkt
Aplikacja do nauki pięknych polskich słów — użytkownicy otrzymują codzienne słowo z definicją i przykładami.

### Tech Stack
| Warstwa | Technologia |
|---------|-------------|
| Frontend | React + Vite |
| Hosting | GitHub Pages |
| Build | Vite |

---

## Odpowiedzialności

### 1. CI/CD Pipeline

#### GitHub Actions Workflow

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Dependencies
        run: npm ci
      
      - name: Run Tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 2. Deployment

#### GitHub Pages Configuration

| Element | Wartość |
|---------|---------|
| Source | gh-pages branch |
| Path | / (root) |
| Branch | main |
| Custom domain | (opcjonalnie) |

#### Build Command
```bash
npm run build
npx gh-pages -d dist
```

### 3. Środowisko

#### Zmienne Środowiskowe

| Zmienna | Opis | Przykład |
|---------|------|----------|
| VITE_APP_URL | URL aplikacji | https://username.github.io/slowo-dnia |
| VITE_APP_TITLE | Tytuł aplikacji | Słowo Dnia |

#### Node Version
- Minimalna: 18.x
- Rekomendowana: 20.x LTS

### 4. Infrastruktura

#### Struktura Hostingu

| Usługa | Cel |
|--------|-----|
| GitHub Pages | Hosting aplikacji |
| GitHub Actions | CI/CD |
| GitHub Repository | Kod i wersjonowanie |

### 5. Monitoring

#### Metryki Deploymentu

| Metryka | Opis |
|---------|------|
| Build Status | Pass/Fail |
| Deployment Time | Czas wdrożenia |
| Uptime | Dostępność aplikacji |
| Bundle Size | Rozmiar paczki produkcyjnej |

---

## Instrukcje

1. **Przeczytaj dokumentację wejściową**
   - docs/test_report.md (od Tester)
   - docs/code_review.md (od Lead Developer)

2. **Utwórz dokumenty wyjściowe**
   - `docs/deployment.md` — procedura deploymentu
   - `docs/ci_cd_pipeline.md` — konfiguracja CI/CD
   - `docs/infrastructure.md` — opis infrastruktury

3. **Skonfiguruj CI/CD**
   - Utwórz GitHub Actions workflow
   - Skonfiguruj GitHub Pages
   - Zweryfikuj deployment

---

## Oczekiwane Wyjście

| Plik | Opis |
|------|------|
| docs/deployment.md | Procedura deploymentu krok po kroku |
| docs/ci_cd_pipeline.md | Konfiguracja GitHub Actions |
| docs/infrastructure.md | Opis infrastruktury i środowisk |

---

## Deployment Checklist

- [ ] Build przechodzi bez błędów
- [ ] GitHub Pages skonfigurowane
- [ ] GitHub Actions workflow działa
- [ ] Aplikacja dostępna pod URL
- [ ] Bundle size optymalny (< 500KB)
- [ ] Brak console errors

---

## Scripts Package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "test": "vitest"
  }
}
```

---

## Zależności

| Zależność | Typ |
|-----------|-----|
| Wymaga | docs/test_report.md (od Tester), docs/code_review.md (od Lead Developer) |
| Następny | (Brak — ostatni etap) |

---

## Workflow

```
... ──▶ Developer ──▶ Tester ──▶ DevOps
                       │           │
                       └─ test_report ┘
```

**Produkt:**
- Deployment → przekazanie do Project Manager
- CI/CD Config → przekazanie do Project Manager

---

## Ważna Uwaga

**Ta rola jest konceptualna** — dokumentuje deployment, ale **NIE wykonuje rzeczywistego deploymentu**. Aplikacja jest już wdrożona.

---

_Created by DevOps Agent_
_Last updated: 2026-04-18_