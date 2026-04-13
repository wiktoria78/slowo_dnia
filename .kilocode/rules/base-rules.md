# Podstawowe Reguły Projektu — Słowo Dnia

## 1. Zasady Techniczne

### 1.1 Architektura MVP
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
├── components/    # Komponenty UI
├── data/          # words.json
├── hooks/         # useWordOfDay, useFavorites, useLocalStorage
├── context/       # AppContext.jsx
├── pages/         # Home, Archive, Favorites
├── lib/           # utils.js
└── App.jsx
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
import WordCard from './components/WordCard';
import { useWordOfDay } from './hooks/useWordOfDay';

// Na końcu style
import './index.css';
```

---

## 3. Word Schema

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

---

## 4. Algorytm Słowa Dnia

```javascript
const getWordOfDay = (words) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const index = dayOfYear % words.length;
  return words[index];
};
```

**Zasady:**
- To samo słowo dla wszystkich użytkowników w danym dniu
- Zmiana o północy (UTC+1 dla Polski)
- Opcja "losuj" dla nowego słowa

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
- [ ] Wyświetlanie słowa dnia
- [ ] Baza 100 pięknych słów
- [ ] Definicja + przykłady
- [ ] Słowo na dziś (data-based)
- [ ] Zapis ulubionych (localStorage)

### SHOULD HAVE
- [ ] Archiwum poprzednich słów
- [ ] Share na social media
- [ ] Wyszukiwarka słów

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

## 9. Definition of Done (MVP)

- [ ] Widok słowa dnia działa
- [ ] 100 pięknych słów w bazie
- [ ] Definicje i przykłady wyświetlane
- [ ] Zapis ulubionych działa (localStorage)
- [ ] Archiwum poprzednich słów
- [ ] Share na social media
- [ ] Mobile responsive
- [ ] Piękna typografia i design
- [ ] Deploy na GitHub Pages

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

- [docs/README.md](../docs/README.md) — Dokumentacja projektu
- [docs/biznes/mvp-scoping.md](../docs/biznes/mvp-scoping.md) — Zakres MVP
- [docs/biznes/tech-stack.md](../docs/biznes/tech-stack.md) — Tech Stack
- [docs/AGENTS.md](../docs/AGENTS.md) — Reguły agenta AI
