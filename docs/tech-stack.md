# WF_Tech_Stack_Audit — Słowo Dnia

## Cel

Audyt i optymalizacja stacku technologicznego dla projektu "Słowo Dnia" pod kątem szybkości developmentu, niskich kosztów i skalowalności dla solo-deva.

---

## 1. Rekomendowany Tech Stack

### 1.1 Stack MVP

| Warstwa | Technologia | Uzasadnienie |
|---------|-------------|--------------|
| **Frontend** | React + Vite | Szybki start, hot reload |
| **Styling** | Tailwind CSS | Szybki development, mały bundle |
| **Fonts** | Google Fonts (Playfair, Merriweather) | Piękna typografia |
| **State** | React Context + localStorage | Prosty, bez backendu |
| **Routing** | React Router v6 | Standard |
| **Animacje** | Framer Motion | Smooth, beautiful |
| **Hosting** | Vercel | Free tier, CDN, SSL |
| **Domain** | slowodnia.pl | Brand |

### 1.2 Stack v2 (Po MVP)

| Warstwa | Technologia | Dodatkowe |
|---------|-------------|-----------|
| **Database** | Supabase | Auth, DB, Realtime |
| **Email** | Resend + React Email | Transakcyjne |
| **Analytics** | Plausible | Privacy-first |
| **Payments** | Stripe | Subskrypcje |
| **Push** | Web Push | Powiadomienia |

---

## 2. Struktura Projektu

### 2.1 Katalogi i Pliki

```
slowo-dnia/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── og-image.png
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Input.jsx
│   │   ├── WordCard.jsx
│   │   ├── Definition.jsx
│   │   ├── Examples.jsx
│   │   ├── FavoriteButton.jsx
│   │   ├── ShareButton.jsx
│   │   ├── ArchiveList.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Newsletter.jsx
│   ├── data/
│   │   └── words.json
│   ├── hooks/
│   │   ├── useWordOfDay.js
│   │   ├── useFavorites.js
│   │   └── useLocalStorage.js
│   ├── context/
│   │   └── AppContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Archive.jsx
│   │   ├── Favorites.jsx
│   │   └── NotFound.jsx
│   ├── lib/
│   │   └── utils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

### 2.2 Kluczowe Zależności (package.json)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "framer-motion": "^10.16.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

---

## 3. Konfiguracja

### 3.1 Vite Config

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 3000,
  },
});
```

### 3.2 Tailwind Config

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#722F37',
        secondary: '#C9A227',
        background: '#FDF5E6',
        surface: '#FFFFFF',
        accent: '#228B22',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Merriweather', 'serif'],
        ui: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

---

## 4. Data Structure

### 4.1 Word Schema

```typescript
interface Word {
  id: number;
  word: string;
  definition: string;
  examples: string[];
  etymology: string;
  partOfSpeech: string;
  category: string;
  synonyms: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
}
```

### 4.2 Przykładowe Dane (words.json)

```json
[
  {
    "id": 1,
    "word": "dyletant",
    "definition": "osoba zajmująca się czymś bez wymaganych kwalifikacji; amator",
    "examples": [
      "Ten dyletant wziął się za naprawę samochodu i tylko pogorszył sprawę.",
      "Nie jestem dyletantem - studiowałem to przez pięć lat."
    ],
    "etymology": "od włoskiego dilettante, z łaciny dilectare = rozkoszować się",
    "partOfSpeech": "rzeczownik, rodzaj męski",
    "category": "charakterystyka osoby",
    "synonyms": ["amator", "laik"],
    "difficulty": "easy"
  }
]
```

---

## 5. Kluczowe Funkcje

### 5.1 Word of Day Algorithm

```javascript
// src/hooks/useWordOfDay.js
export const useWordOfDay = (words) => {
  const getWordOfDay = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const index = dayOfYear % words.length;
    return words[index];
  };

  const getRandomWord = () => {
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  };

  return { getWordOfDay, getRandomWord };
};
```

### 5.2 LocalStorage Hook

```javascript
// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
```

---

## 6. Deployment

### 6.1 Vercel Setup

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Environment variables
VITE_APP_URL=https://slowodnia.pl
```

### 6.2 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 7. Narzędzia Deweloperskie

### 7.1 Development Tools

| Narzędzie | Cel | Alternatywa |
|-----------|-----|-------------|
| **VS Code** | IDE | WebStorm |
| **ESLint** | Linting | StandardJS |
| **Prettier** | Formatowanie | - |
| **GitHub** | Version control | GitLab |
| **Figma** | Design | Canva |

### 7.2 Analytics & Monitoring

| Narzędzie | Cel | Cost |
|-----------|-----|------|
| **Plausible** | Analytics | €10/mies |
| **Sentry** | Error tracking | Free tier |
| **Vercel Analytics** | Performance | Free |

---

## 8. Koszty Stacku

### 8.1 MVP (Miesiąc 1-3)

| Pozycja | Koszt |
|---------|-------|
| Vercel (hosting) | $0 |
| Domain (.pl) | ~50 PLN/rok |
| Google Fonts | $0 |
| **Razem** | **~50 PLN/rok** |

### 8.2 v2 (Miesiąc 4-12)

| Pozycja | Koszt |
|---------|-------|
| Vercel Pro | $20/mies |
| Supabase | $0/mies (free tier) |
| Stripe | 2% + 0.50 PLN |
| Resend | $0/mies (free tier) |
| Plausible | €10/mies |
| Domain | ~50 PLN/rok |
| **Razem** | **~300 PLN/mies** |

---

## 9. Bezpieczeństwo

### 9.1 Best Practices

| Praktyka | Implementacja |
|----------|---------------|
| **HTTPS** | Vercel SSL (auto) |
| **CSP** | Meta tags |
| **Sanitization** | DOMPurify dla user input |
| **Secrets** | ENV variables |
| **Rate limiting** | Vercel Edge |

---

## 10. Co Dalej?

| Status | Krok |
|--------|------|
| ✅ | Wybrano Słowo Dnia |
| ✅ | WF_Kill_The_Idea — PROCEED |
| ✅ | WF_ICP_Persona — COMPLETE |
| ✅ | WF_MVP_Scoping — COMPLETE |
| ✅ | WF_Competitor_Audit — COMPLETE |
| ✅ | WF_GTM_Strategy — COMPLETE |
| ✅ | WF_Monetization_Strategy — COMPLETE |
| ✅ | **WF_Tech_Stack — TEN DOKUMENT** |
| ⏳ | WF_Resource_Analysis |

---

_Dokument przygotowany w ramach workflow WF_Tech_Stack_Audit._  
_Wersja: 1.0 | Data: 2026-03-21 | Autor: SaaS Architect & Business Auditor_
