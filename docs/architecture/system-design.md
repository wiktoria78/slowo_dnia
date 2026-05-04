# Słowo Dnia — Specyfikacja Techniczna

> Specyfikacja architektoniczna projektu "Słowo Dnia" — aplikacji do codziennej nauki pięknych polskich słów.

**Wersja:** 1.0  
**Status:** APPROVED  
**Data:** 2026-03-15

---

## 1. Przegląd Architektury

### 1.1 Architektura Aplikacji

Aplikacja "Słowo Dnia" została zaprojektowana jako progresywna aplikacja webowa (PWA) bez backendu, z danymi przechowywanymi lokalnie. Architektura opiera się na nowoczesnym stacku React z Vite, zapewniającym szybką nawigację i optymalne ładowanie.

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │   Home   │  │ Archive  │  │Favorites │  │ WordCard │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘    │
└───────┼────────────┼─────────────┼─────────────┼───────────┘
        │            │             │             │
┌───────┴────────────┴─────────────┴─────────────┴───────────┐
│                    Business Logic Layer                    │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────┐   │
│  │ useWordOfDay   │  │ useFavorites   │  │useLocalSt. │   │
│  └────────┬───────┘  └────────┬───────┘  └─────┬──────┘   │
└───────────┼───────────────────┼───────────────┼───────────┘
            │                   │               │
┌───────────┴───────────────────┴───────────────┴───────────┐
│                      Data Layer                            │
│  ┌────────────────┐  ┌────────────────────────────────┐  │
│  │  words.json    │  │      localStorage              │  │
│  │  (100 słów)   │  │  (ulubione, preferencje)       │  │
│  └────────────────┘  └────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Specyfikacja Techniczna

### 2.1 Tech Stack

| Warstwa | Technologia | Wersja | Uzasadnienie |
|---------|-------------|--------|--------------|
| Framework | React | 18.3.x | Najpopularniejszy, dojrzały ekosystem |
| Bundler | Vite | 6.x | Szybki dev server, optymalny bundle |
| Styling | Tailwind CSS | 3.4.x | Utility-first, mały CSS bundle |
| Animacje | Framer Motion | 11.x | React-native animacje |
| Routing | React Router | 6.x | Standard SPA routing |
| State | React Context + localStorage | - | Wymaga prostego state management |
| Hosting | Vercel | - | Darmowy, CDN, SSL |

### 2.2 Struktura Projektu

```
src/
├── data/                    # Dane statyczne
│   └── words.json          # Baza 100 pięknych słów
│
├── hooks/                   # Logika biznesowa (custom hooks)
│   ├── useWordOfDay.js     # Algorytm słowa dnia
│   ├── useFavorites.js    # Operacje na ulubionych
│   └── useLocalStorage.js  # Wrapper localStorage
│
├── context/                # Globalny stan
│   ├── AppContext.jsx      # Provider kontekstu
│   └── components/         # Komponenty kontekstowe
│       ├── WordCard.jsx    # Karta słowa
│       └── ShareButton.jsx # Przycisk share
│
├── pages/                  # Widoki (routes)
│   ├── Home.jsx            # Strona główna
│   ├── Archive.jsx        # Archiwum + wyszukiwarka
│   └── Favorites.jsx       # Ulubione
│
├── App.jsx                # Główny komponent (routing)
├── main.jsx               # Entry point
└── index.css              # Globalne style + CSS variables
```

### 2.3 Word Schema

Definicja struktury danych słowa zgodna z JSON schema:

```typescript
interface Word {
  id: number;              // Unikalny identyfikator (1-100)
  word: string;           // Słowo (np. "Dyletant")
  definition: string;     // Definicja (np. "Osoba zajmująca się...")
  examples: string[];     // Przykłady użycia (1-3)
  etymology: string;      // Etymologia
  partOfSpeech: string;   // Część mowy
  category: string;      // Kategoria (np. "charakterystyka osoby")
  synonyms: string[];    // Synonimy (1-3)
  
}
```

---

## 3. Algorytm Słowa Dnia

### 3.1 Specyfikacja Algorytmu

Algorytm deterministycznie wybiera słowo na podstawie daty:

```
START_DATE = 2026-04-13

word_index = floor((current_date - START_DATE) / 1 dzień) % words_count
```

### 3.2 Zasady Działania

1. **Determinizm** — to samo słowo dla wszystkich użytkowników w danym dniu
2. **Kolejność** — słowa wyświetlane w ustalonej kolejności (id 1 → 100)
  3. **Cykliczność** — po wyczerpaniu wszystkich słów (100 dni) wyświetlane archiwum
4. **Fallback** — przed datą startową wyświetlane słowo #1

### 3.3 Implementacja

```javascript
// src/hooks/useWordOfDay.js
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
  if (days < 0) return words[0];           // Pre-start fallback
  if (days >= words.length) return null; // Archive mode
  return words[days];
};
```

---

## 4. Specyfikacja UI/UX

### 4.1 Design System

#### Color Palette

| Token | Nazwa | Hex (Light) | Hex (Dark) | Zastosowanie |
|-------|-------|-------------|------------|--------------|
| `--color-primary` | Deep Burgundy | #722F37 | #d6d3d1 | Słowo, przyciski, akcenty |
| `--color-secondary` | Gold | #C9A227 | #C9A227 | Nagłówki sekcji, tagi |
| `--color-background` | Cream | #FDF5E6 | #111111 | Tło strony |
| `--color-surface` | White | #FFFFFF | #1f1f1f | Karty, inputy |
| `--color-text` | Dark Gray | #1A1A1A | #f5f5f5 | Tekst główny |
| `--color-accent` | Forest Green | #228B22 | #d6d3d1 | Linki, success |

**Kolory specyficzne dla słów:**

| Token | Hex (Light) | Hex (Dark) | Zastosowanie |
|-------|-------------|------------|--------------|
| `text-word` | #722F37 | #B97A83 | Tytuł słowa (WordCard, Archive, Logo) |
| `text-primary` | #722F37 | #d6d3d1 | Elementy nawigacyjne |

#### Typography

| Element | Font | Waga | Rozmiar |
|---------|------|------|---------|
| Słowo (hero) | Playfair Display | 700 | 3rem (48px) |
| Definicja | Merriweather | 400 | 1.125rem (18px) |
| Przykłady | Merriweather | 400i | 1rem (16px) |
| UI elements | Inter | 500 | 0.875rem (14px) |

#### Responsive Breakpoints

| Breakpoint | Szerokość | Layout |
|------------|-----------|--------|
| Mobile | < 640px | Single column, touch-friendly |
| Tablet | 640-1024px | 2-column grid (archive) |
| Desktop | > 1024px | 3-column grid (archive) |

### 4.2 Komponenty

#### WordCard
- Słowo z part of speech
- Definicja
- Synonimy (inline)
- Rozwijane: Przykłady, Etymologia
- Akcje: Ulubione, Udostępnij

#### ShareButton
- Web Share API (mobile)
- Clipboard fallback (desktop)
- Visual feedback (copied state)

---

## 5. State Management

### 5.1 Stan Lokalny (localStorage)

```javascript
// Klucze localStorage
'slowo-dnia-favorites'  // Array<Word>
```

### 5.2 Custom Hooks

| Hook | Odpowiedzialność | API |
|------|------------------|-----|
| useLocalStorage | Wrapper localStorage | `[value, setValue]` |
| useFavorites | CRUD ulubionych | `{favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite}` |
| useWordOfDay | Logika słowa dnia | `{wordOfDay, loading, isFinished}` |

### 5.3 App Context

React Context zapewnia dostęp do ulubionych w całej aplikacji:

```jsx
<AppProvider>
  <App />
</AppProvider>

// usage
const { favorites, toggleFavorite } = useContext(AppContext);
```

---

## 6. Routing

| Path | Component | Opis |
|------|-----------|------|
| `/` | Home | Słowo dnia |
| `/archive` | Archive | Historia + wyszukiwarka |
| `/favorites` | Favorites | Zapisane słowa |

---

## 7. Deployment

### 7.1 Vercel

```bash
npm run build     # Produkcja
npx vercel deploy --prod  # Deploy
```

### 7.2 Konfiguracja Vite

```javascript
// vite.config.js
export default defineConfig({
  base: '/slowo-dnia/',
  build: { outDir: 'dist' }
});
```

---

## 8. Definicja Ukończenia (Definition of Done)

| ID | Kryterium | Weryfikacja |
|----|-----------|-------------|
| D1 | Słowo dnia wyświetlane | Test: odwiedzenie strony |
| D2 | 100 słów w bazie | Test: sprawdzenie words.json |
| D3 | Definicja + przykłady | Test: wyświetlenie słowa |
| D4 | Zapis ulubionych | Test: add → refresh → verify |
| D5 | Archiwum funkcjonalne | Test: przejście do /archive |
| D6 | Share działa | Test: kliknięcie share |
| D7 | Mobile responsive | Test: mobile viewport |
| D8 | Piękna typografia | Test: wizualna weryfikacja |
| D9 | Deploy OK | Test: dostęp przez URL |

---

## 9. Wymagania Niefunkcjonalne

### 9.1 Performance
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Bundle size < 150KB (gzipped)

### 9.2 Accessibility
- Kontrast AA (4.5:1 dla text)
- Keyboard navigation
- Screen reader compatible

### 9.3 Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

_Created: 2026-03-15 | Architecture Version: 1.0_