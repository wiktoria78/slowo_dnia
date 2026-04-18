# Podstawowe Reguły Projektu — Słowo Dnia

## 1. Zasady Techniczne

### 1.1 Architektura Systemu

Zgodnie ze specyfikacją architektoniczną, system opiera się na nowoczesnej architekturze SPA bez backendu:

- **Brak backendu** — Dane w local JSON (`src/data/words.json`)
- **Stan w localStorage** — Używać `useLocalStorage` hook
- **React Context** — Do zarządzania stanem aplikacji

### 1.2 Tech Stack

| Warstwa | Technologia |
|---------|-------------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Animacje | Framer Motion |
| Routing | React Router v6 |
| Hosting | GitHub Pages |

### 1.3 Struktura Projektu

```
src/
├── data/             # words.json (1388 słów)
├── hooks/            # useWordOfDay, useFavorites, useLocalStorage
├── context/          # AppContext.jsx + components/
│   ├── AppContext.jsx
│   └── components/
│       ├── WordCard.jsx
│       └── ShareButton.jsx
├── pages/            # Home, Archive, Favorites
├── App.jsx
├── main.jsx
└── index.css
```

---

## 2. Zasady Deweloperskie

### 2.1 Zasady Kodowania
1. **KISS** — Keep It Simple, Stupid
2. **DRY** — Don't Repeat Yourself
3. **Modularność** — Małe, wielokrotnego użytku komponenty
4. **Czystość** — Brak niepotrzebnych komentarzy (chyba że wymagane)
5. **Typowanie** — TypeScript lub JSDoc dla złożonych funkcji

### 2.2 Nazewnictwo
| Typ | Konwencja | Przykład |
|-----|-----------|----------|
| Komponenty | PascalCase | `WordCard.jsx` |
| Hooki | camelCase z `use` | `useWordOfDay.js` |
| Pliki danych | snake_case | `words.json` |
| Klasy CSS | kebab-case | `.word-card` |

### 2.3 Importy
```javascript
// Najpierw zewnętrzne
import React from 'react';
import { motion } from 'framer-motion';

// Potem wewnętrzne
import WordCard from './context/components/WordCard';
import { useWordOfDay } from './hooks/useWordOfDay';

// Na końcu style
import './index.css';
```

---

## 3. Word Schema

Definicja zgodna ze specyfikacją architektoniczną:

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
  
}
```

---

## 4. Algorytm Słowa Dnia

Zgodnie z designem systemowym:

```javascript
const START_DATE = new Date('2026-04-13');

const getDaysElapsed = (startDate) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  return Math.floor((now - start) / (1000 * 60 * 60 * 24));
};

const getWordOfDay = (words) => {
  const days = getDaysElapsed(START_DATE);
  if (days < 0) return words[0];
  if (days >= words.length) return null;
  return words[days];
};
```

**Zasady:**
- Data startowa: 2026-04-13
- To samo słowo dla wszystkich użytkowników w danym dniu
- Po wyczerpaniu słów (1388 dni) wyświetla komunikat "Archiwum"
- Używany również w Archive.jsx do wyświetlania historii

---

## 5. Zasady UI/UX

### 5.1 Design Principles
- **Minimalizm** — Czysto, skupione na słowie
- **Estetyka** — Piękna typografia = core experience
- **Mobile-first** — 70%+ ruchu z mobile
- **Viral** — Łatwe udostępnianie
- **Premium feel** — Dopracowane detale

### 5.2 Color Palette
| Element | Kolor | Hex |
|---------|-------|-----|
| Primary | Deep Burgundy | #722F37 |
| Secondary | Gold | #C9A227 |
| Background | Cream | #FDF5E6 |
| Surface | White | #FFFFFF |
| Text | Dark Gray | #2C2C2C |
| Accent | Forest Green | #228B22 |

### 5.3 Typography
| Element | Font | Waga |
|---------|------|------|
| Słowo hero | Playfair Display | 700 |
| Definicja | Merriweather | 400 |
| Przykłady | Merriweather | 400 italic |
| UI | Inter | 500 |

### 5.4 Responsive Breakpoints
- **Mobile** < 640px
- **Tablet** 640px - 1024px
- **Desktop** > 1024px

---

## 6. Funkcjonalności MVP (MoSCoW)

### MUST HAVE
- [x] Wyświetlanie słowa dnia
- [x] Baza 1388 pięknych słów
- [x] Definicja + przykłady
- [x] Słowo na dziś (data-based)
- [x] Zapis ulubionych (localStorage)

### SHOULD HAVE
- [x] Archiwum poprzednich słów
- [x] Share na social media
- [x] Wyszukiwarka słów

### COULD HAVE
- [ ] Quiz/ćwiczenia
- [ ] Newsletter email
- [ ] TTS (text-to-speech)

### WON'T HAVE (MVP)
- [ ] User accounts
- [ ] Forum społeczności

---

## 7. Zasady Testowania

### 7.1 Test Scenariusze
| Scenariusz | Oczekiwany wynik |
|------------|------------------|
| Pierwsza wizyta | Widzę słowo dnia |
| Odświeżenie (inny dzień) | Inne słowo |
| Zapis ulubionego | Po odświeżeniu nadal jest |
| Share button | Generuje obraz/link |
| Mobile view | Pięknie wygląda |

### 7.2 Narzędzia
- **Unit** — Vitest
- **Component** — React Testing Library
- **Manual** — UX, content

---

## 8. Deployment

### 8.1 GitHub Pages
```bash
npm run build
npx gh-pages -d dist
```

### 8.2 Zmienne środowiskowe
```
VITE_APP_URL=https://username.github.io/slowo-dnia
```

---

## 9. Definicja Ukończenia MVP

- [x] Widok słowa dnia działa
- [x] 1388 pięknych słów w bazie
- [x] Definicje i przykłady wyświetlane
- [x] Zapis ulubionych działa (localStorage)
- [x] Archiwum poprzednich słów
- [x] Share na social media
- [x] Mobile responsive
- [x] Piękna typografia i design
- [x] Deploy na GitHub Pages

---

## 10. Koszty (MVP)

| Pozycja | Koszt |
|---------|-------|
| GitHub Pages | $0 |
| Domain (.pl) | ~50 PLN/rok |
| Google Fonts | $0 |
| **RAZEM** | **~50 PLN** |

---

## 11. Referencje Dokumentów

- [docs/architecture/system-design.md](docs/architecture/system-design.md) — Specyfikacja architektoniczna
- [docs/AGENTS.md](docs/AGENTS.md) — Reguły agenta AI
- [docs/README.md](docs/README.md) — Dokumentacja projektu
- [docs/biznes/mvp-scoping.md](docs/biznes/mvp-scoping.md) — Zakres MVP
- [docs/biznes/tech-stack.md](docs/biznes/tech-stack.md) — Tech Stack