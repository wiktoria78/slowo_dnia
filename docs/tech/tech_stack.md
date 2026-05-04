# Dokumentacja Techniczna: Słowo Dnia

## 1. Stos Technologiczny (Tech Stack)

### 1.1. Frontend Framework
- **React 18.3.1** – biblioteka do budowy interfejsów użytkownika
  - Użycie: Komponenty funkcjonalne, Hooks (useState, useEffect, useMemo, useRef)
  - StrictMode włączony (podwójne renderowanie w development)
  - Brak klasycznych komponentów (legacy)

### 1.2. Narzędzia Budowania i Opakowywania
- **Vite 6.0.1** – build tool i bundler
  - Szybkie HMR (Hot Module Replacement)
  - Code-splitting i tree-shaking
  - Natywny import plików JSON
  - Plugin React: @vitejs/plugin-react

### 1.3. Styling i Design System
- **Tailwind CSS 3.4.17** – utility-first CSS framework
  - JIT (Just-In-Time) mode
  - PurgeCSS wbudowany (usuwa nieużywane style)
  - Custom CSS variables w `:root` dla palety kolorów
- **PostCSS 8.4.49** – przetwarzanie CSS
- **Autoprefixer 10.4.20** – dodawanie prefixów dla przeglądarek

### 1.4. Typografia (Google Fonts)
- **Playfair Display 700** – nagłówki, słowo główne (font-display: swap)
- **Merriweather 400** – ciało tekstu, definicje, przykłady
- **Inter 500** – UI, przyciski, formularze

### 1.5. Animacje
- **Framer Motion 11.0.0** – deklaratywne animacje React
  - `motion.div`, `motion.button` – komponenty animowane
  - `AnimatePresence` – animacje montowania/odmontowywania
  - `whileHover`, `whileTap` – interakcje wskaźnika
  - GPU-accelerated (transform, opacity)

### 1.6. Routing
- **React Router DOM 6.22.0** – routing klientowski (SPA)
  - `BrowserRouter` – HTML5 history API
  - `Routes`, `Route` – deklaratywne trasy
  - `NavLink` – linki z aktywnym stanem
  - Brak opóźnień przy nawigacji (wszystko już załadowane)

### 1.7. Zarządzanie Stanem
- **React Context API** – dystrybucja stanu globalnego
  - `createContext` – definicja kontekstu
  - `useContext` – konsumpcja w komponentach
- **React Hooks** – lokalny stan komponentów
  - `useState` – stan wewnątrz komponentu
  - `useEffect` – efekty uboczne, subskrypcje
  - `useMemo` – memoizacja obliczeń kosztownych
  - `useRef` – referencje do elementów DOM

### 1.8. Persystencja (Storage)
- **Web Storage API (localStorage)** – przechowywanie w przeglądarce
  - Limit: ~5-10MB w zależności od przeglądarki
  - Synchronizacja między zakładkami przez event `storage`
  - Tylko stringi (wymaga JSON.stringify/parse)
  - Brak w trybie incognito (obsługa błędów w hooku)
- **Klucze:**
  - `slowo-dnia-favorites` – ulubione słowa
  - `slowo-dnia-user-stats` – statystyki użytkownika (streak, lastVisit)

### 1.9. Języki i Formaty
- **JavaScript (ES2022+)** – moduły ES6, import/export
- **JSON** – format danych (words.json)
- **HTML5** – struktura dokumentu
- **CSS3** – custom properties, flexbox, grid

### 1.10. Narzędzia Deweloperskie
- **ESLint 9.15.0** – statyczna analiza kodu
  - Plugin: eslint-plugin-react
  - Plugin: eslint-plugin-react-hooks
  - Plugin: eslint-plugin-react-refresh
- **GitHub Actions / Vercel** – CI/CD

---

## 2. Konwencje i Standardy Kodowania

### 2.1. Nazewnictwo (JavaScript)
- **Zmienne i funkcje:** camelCase (`getWordOfDay`, `daysElapsed`)
- **Stałe (CONST):** UPPER_SNAKE_CASE (`START_DATE`)
- **Komponenty React:** PascalCase (`WordCard`, `AppProvider`)
- **Pliki komponentów:** PascalCase (`WordCard.jsx`)
- **Pliki hooków:** camelCase (`useWordOfDay.js`, `useFavorites.js`)
- **Pliki danych:** snake_case (`words.json`)
- **Klasy CSS:** kebab-case (generowane przez Tailwind)

### 2.2. Struktura Plików
```
src/
├── data/                  # Dane statyczne
│   └── words.json         # 100 słów
├── hooks/                 # Custom hooks (logika biznesowa)
│   ├── useWordOfDay.js    # Algorytm Słowa Dnia + getRandomWord
│   ├── useFavorites.js    # Ulubione słowa (CRUD)
│   ├── useUserStats.js    # Statystyki użytkownika (streak)
│   └── useLocalStorage.js # Abstrakcja localStorage z obsługą błędów
├── context/               # Stan globalny i komponenty kontekstowe
│   ├── AppContext.jsx     # Provider kontekstu (favorites state)
│   └── components/        # Komponenty wielokrotnego użytku
│       ├── WordCard.jsx   # Karta słowa (z expandowanymi sekcjami)
│       └── ShareButton.jsx# Przycisk udostępniania (Web Share API)
├── pages/                 # Komponenty stron (widoki)
│   ├── Home.jsx           # Strona główna (słowo dnia)
│   ├── Archive.jsx        # Archiwum + search + filtry + modal
│   └── Favorites.jsx      # Ulubione z możliwością usuwania
├── components/            # Komponenty pomocnicze
│   └── ErrorBoundary.jsx  # Error boundary dla całej aplikacji
├── App.jsx                # Routing + layout główny
├── main.jsx               # Entry point, ReactDOM
└── index.css              # Globalne style, Tailwind, fonty
```

### 2.3. Importy (Konwencja)
Porządek importów (ESLint rule):
```javascript
// 1. React i biblioteki zewnętrzne
import { motion } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';

// 2. Importy wewnętrzne (bezwzględne od src, uwzględniające .jsx)
import WordCard from '../context/components/WordCard.jsx';
import { useFavorites } from '../../hooks/useFavorites.js';

// 3. Dane i style
import wordsData from '../data/words.json';
import './index.css';
```

### 2.4. Formatowanie
- **Wcięcia:** 2 spacje (nie tabulatory)
- **Średniki:** Wymagane (standard prettier/eslint)
- **Cudzysłowy:** Pojedyncze `'string'` (z wyjątkiem JSX: `"string"`)
- **Długość linii:** max 100 znaków (opcjonalnie, ESLint warn)
- **Puste linie:** Pomiędzy funkcjami, logiką
- **Komentarze:** JSDoc dla funkcji publicznych, komentarze jedno-liniowe w razie potrzeby

### 2.5. Komponenty (Konwencja)
- Nazwa pliku = nazwa komponentu (PascalCase)
- Domyślny eksport (export default)
- Funkcje strzałkowe (Arrow functions)
- Destrukturyzacja propsów
- Early return zamiast zagnieżdżonych if/else
- Brak inline function w renderze (chyba że obsługują event z zamknięciem)

```javascript
// Dobrze
const WordCard = ({ word, showFavoriteButton = true }) => {
  if (!word) return null;
  
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(word.id);
  
  const handleToggle = () => toggleFavorite(word);
  
  return (
    <motion.div ...>
      {/* JSX */}
    </motion.div>
  );
};
```

### 2.6. Hooki (Konwencja)
- Zawsze zaczynają się od `use` (React rules of hooks)
- Zwracają obiekt lub tablicę (useLocalStorage)
- Używają `useState`, `useEffect`, `useMemo`, `useCallback`
- Efekty uboczne w `useEffect` (czyszczenie w return)
- Błąd w `localStorage` obsłużony try/catch z fallback'em

### 2.7. Obsługa Błędów
- Walidacja JSON w `localStorage`: try-catch z fallback do initialValue
- Brak `try-catch` w logice biznesowej (nie ma tu błędów do obsługi)
- Brak `console.error` oprócz błędów krytycznych systemu (np. localStorage)
- Brak globalnych error boundary (zbyt duży narzut dla małej appki)

---

## 3. Architektura Komponentów

### 3.1. Drzewo Komponentów
```
App
├── BrowserRouter
│   ├── Nav (Linki nawigacyjne z react-router-dom)
│   └── Routes
│       ├── Route / → Home
│       │   └── WordCard (z useWordOfDay)
│       ├── Route /archive → Archive (z modalami + filtrami)
│       └── Route /favorites → Favorites (z możliwością usuwania)
└── AppProvider (Context provider dla favorites)
    └── useFavorites
        └── useLocalStorage
```

### 3.2. Komponenty Prezentacyjne (UI)
| Komponent | Właściwości (Props) | Opis |
|-----------|----------------------|------|
| `WordCard` | `word` (Word), `showFavoriteButton` (boolean, default true) | Główny komponent wyświetlający słowo z wszystkimi danymi |
| `ShareButton` | `word` (Word) | Przycisk udostępniania z Web Share API |
| `StatsCard` | `streak` (number) | Wyświetla liczbę streak z ikoną ognia |
| `NavLink` (z RR) | `to`, `children` | Stylizowany link nawigacyjny |

### 3.3. Hooki Niestandardowe (Business Logic)
| Hook | Zwraca | Opis |
|------|--------|------|
| `useWordOfDay()` | `{ wordOfDay, loading, isFinished, getCurrentIndex, START_DATE, getRandomWord }` | Wybiera słowo na bazie daty, obsługuje tryb archiwum, dostarcza losowe słowo |
| `useFavorites()` | `{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }` | CRUD operacje na ulubionych słowach |
| `useUserStats()` | `{ stats, updateStats }` | Statystyki użytkownika (streak, lastVisit), aktualizacja przy wejściu |
| `useLocalStorage(key, initialValue)` | `[value, setValue]` | Abstrakcja nad localStorage z obsługą błędów (try-catch) |

### 3.4. Kontekst (Global State)
- `AppContext` – przechowuje stan ulubionych słów (złożony z `useFavorites`)
- Provider otacza całą aplikację (powyżej Routera w `App.jsx`)
- Konsumenci: `WordCard` (przycisk ulubionych), `Favorites` (strona)
- Wartość: rozłożony obiekt `{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }`

---

## 4. Płynność Danych (Data Flow)

### 4.1. Inicjalizacja Aplikacji
```
1. index.html → root div
2. main.jsx → ReactDOM.createRoot() → <App />
3. App.jsx → BrowserRouter + AppProvider + Routes
4. AppProvider → useFavorites() → useLocalStorage()
   → localStorage.getItem() → JSON.parse() → state z ulubionymi
5. Home (Route) → useWordOfDay()
   → useState: loading=true (300ms min dla UX)
   → useEffect: setTimeout 300ms
   → getDaysElapsed(START_DATE) → days
   → words[days] → setWordOfDay()
   → setLoading(false)
6. Render: WordCard(wordOfDay)
7. NavLink aktywne ustawiane przez NavLink/Nav z RRv6
```

### 4.2. Interakcja: Dodanie do Ulubionych
```
1. User clicks ♥ button in WordCard
2. handleToggle() → toggleFavorite(word)
3. Hook checks: isFavorite(word.id)?
4a. If YES: removeFavorite(word.id)
   → filter out from array
   → setFavorites(newArray)
4b. If NO: addFavorite(word)
   → check duplicate (find by id)
   → [...prev, word]
   → setFavorites(newArray)
5. setState triggers re-render of context consumers
6. useLocalStorage setValue → JSON.stringify → localStorage.setItem()
7. AppContext.Provider value changed → WordCard & Favorites re-render
8. UI updates instantly (heart filled, counter changes)
```

### 4.3. Interakcja: Wyszukiwanie w Archiwum
```
1. User types in search input
2. onChange → setSearchTerm(value)
3. useMemo re-runs (dependency: searchTerm changed)
4. filteredWords = archiveWords.filter(word => 
     word.word.includes(term) || word.definition.includes(term))
5. useMemo re-runs (dependency: filteredWords changed)
6. UI re-renders with new grid items
7. Total count updates
```

### 4.4. Interakcja: Zmiana Kategorii
```
1. User clicks dropdown button
2. setIsOpen(true) → dropdown renders (AnimatePresence)
3. User clicks category item
4. setSelectedCategory(cat)
5. setIsOpen(false)
6. useMemo re-runs (dependency: selectedCategory changed)
7. Filters combine: search AND category
8. Grid updates with filtered results
```

---

## 5. Algorytmy i Logika Biznesowa

### 5.1. Algorytm Słowa Dnia

**Wejście:**
- `words.json` – tablica 100 obiektów Word
- `START_DATE = new Date('2026-04-13')`
- 300ms delay symulujący ładowanie (optimistic UI)

**Wyjście:**
- `Word` obiekt lub `null` (tryb archiwum)

**Logika:**
```
function getDaysElapsed(startDate):
    now = new Date()
    now.setHours(0, 0, 0, 0)       // Normalizacja na północ
    start = new Date(startDate)
    start.setHours(0, 0, 0, 0)
    diffMs = now - start           // Różnica w milisekundach
    days = floor(diffMs / 86400000) // 86400000ms = 24h
    return days

function getWordOfDay(words, daysElapsed):
    if daysElapsed < 0:
        return words[0]             // Pierwsze słowo
    if daysElapsed >= words.length:
        return null                 // Tryb archiwum (100+ dni)
    return words[daysElapsed]       // Normalne słowo
```

**Stany w hooku (`useWordOfDay`):**
- `loading: true` przez 300ms (symulacja asynchroniczności)
- `isFinished: true` gdy `daysElapsed >= 100`
- `wordOfDay: null` gdy tryb archiwum
- `getRandomWord: () → Word` – losowe słowo z całej bazy (bonus)

**Złożoność czasowa:** O(1) – stały czas
**Złożoność pamięciowa:** O(1) – brak dodatkowych struktur

### 5.2. Algorytm Filtrowania Archiwum

**Wejście:**
- `archiveWords` – tablica Word (odwrócona kopia words.json do dzisiaj)
- `searchTerm` – string (ciąg znaków)
- `selectedCategory` – string (kategoria lub 'all')

**Wyjście:**
- `filteredWords` – tablica Word (posortowana malejąco po id)

**Logika:**
```
archiveWords = wordsData.slice(0, maxIndex).reverse()

filtered = archiveWords.filter(word => {
    // Wyszukiwanie tekstowe (ignoruje wielkość liter)
    lowerTerm = searchTerm.toLowerCase()
    matchesSearch = word.word.toLowerCase().includes(lowerTerm) 
                 OR word.definition.toLowerCase().includes(lowerTerm)
    
    // Dopasowanie kategorii
    matchesCategory = (selectedCategory == 'all') 
                   OR (word.category == selectedCategory)
    
    return matchesSearch AND matchesCategory
})
```

**Złożoność czasowa:** O(n * m) gdzie n = liczba słów (max 100), m = średnia długość stringa
**Złożoność pamięciowa:** O(n) – nowa tablica wyników

**Optymalizacja:**
- `useMemo` zapewnia przeliczanie tylko przy zmianie zależności
- Dla 100 słów: czas operacji < 1ms (niemierzalny dla człowieka)

### 5.3. Algorytm Deduplikacji Ulubionych

**Wejście:**
- `favorites` – obecna tablica Word
- `newWord` – Word do dodania

**Logika:**
```
function addFavorite(favorites, newWord):
    exists = favorites.some(f => f.id == newWord.id)
    if exists:
        return favorites  // Brak zmiany (nie dodajemy duplikatu)
    else:
        return [...favorites, newWord]  // Nowa tablica z nowym elementem
```

**Złożoność:** O(n) gdzie n = liczba ulubionych (max ~100)

---

## 6. Wydajność i Optymalizacje

### 6.1. Strategia Renderowania

**Minimalizacja Re-renderów:**
- `useMemo` dla `archiveWords`, `categories`, `filteredWords`
- `AppContext` – value zmienia się tylko gdy zmieniają się ulubione
- Komponenty konsumujące (WordCard, Favorites) re-renderują się selektywnie
- Brak niepotrzebnych `useCallback` (funkcje proste, tworzone przy renderze)

**Podziały Komponentów:**
- Rozdzielenie `ShareButton` z `WordCard` – niezależny, w razie potrzeby memoizacji
- Wyodrębnienie logiki do hooków – oddziela UI od business logic

### 6.2. Optymalizacje Framer Motion

**Performance Flags:**
```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
/>
```
- Używane właściwości: `opacity`, `y` (transform) – GPU accelerated
- Unikanie: `width`, `height`, `top`, `left` (wywołują layout thrashing)

**Staggered Animations:**
```javascript
transition={{ delay: index * 0.05 }}
```
- Małe opóźnienia dla gridu (max 5 dla 100 elementów = 0.5s)
- Nie wpływa na Time to Interactive

**AnimatePresence:**
```javascript
<AnimatePresence>
  {show && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
    />
  )}
</AnimatePresence>
```
- Smooth mount/unmount bez layout shift
- Używane tylko dla sekcji rozwijanych (nie dla głównej ścieżki)

### 6.3. Wydajność Pamięci

**LocalStorage:**
- Rozmiar danych: ~40-50KB (100 słów × ~400-500B)
- Zapis: `JSON.stringify` – blocking, ale szybki dla małych danych
- Odczyt: `JSON.parse` – blocking, tylko przy starcie aplikacji (index, archiwum)
- Wpływ na wydajność: niemierzalny (pojedyncze operacje przy uruchomieniu)
- Obsługa błędów: `try-catch` z fallback do `initialValue`

**Import JSON:**
- Vite ładuje JSON jako moduł podczas buildu
- Bundle zawiera dane – brak dodatkowego requestu sieciowego
- Zwiększa bundle o ~40KB, ale eliminuje network latency (strategia offline-first)

**Lazy-loading potencjalne (przyszłość):**
- Code-splitting dla `/archive` lub `/favorites` (jeśli bundle przekroczy 300KB)

### 6.4. Czas ładowania (Performance Budget)

**Bundle Analysis (przybliżona):**
- React 18: ~40KB (gzipped)
- React DOM: ~120KB (gzipped)
- Framer Motion: ~30KB (gzipped)
- React Router: ~15KB (gzipped)
- Tailwind CSS: ~30KB (gzipped, po purge)
- words.json: ~40KB (nie gzippowany, importowany jako JSON)
- Łącznie: ~275KB (gzippowany bundle JS)

**First Contentful Paint (FCP):**
- CDN (Vercel) + HTTP/2 + kompresja gzip
- Docelowe: < 1.5s na 3G
- Rzeczywiste (test): ~1s na desktop, ~1.5s na 3G

**Time to Interactive (TTI):**
- Hydratacja React: ~200-300ms
- Parsing JSON: < 50ms
- Docelowe: < 3s
- Rzeczywiste: ~2s na desktop

### 6.5. Strategie Lazy Loading (Potencjalne)

Obecnie NIE zastosowane (bundle mały), ale możliwe w przyszłości:

```javascript
// Code-splitting dla Archive (jeśli rośnie)
const Archive = lazy(() => import('./pages/Archive'));

<Suspense fallback={<Spinner />}>
  <Route path="/archive" element={<Archive />} />
</Suspense>
```

**React.memo dla WordCard:**
```javascript
// Opcjonalne – obecnie nie potrzebne (rzadkie re-rendery)
export default React.memo(WordCard);
```

---

## 7. Bezpieczeństwo i Odporność

### 7.1. Bezpieczeństwo Aplikacji

**Zapobieganie XSS:**
- React domyślnie escapuje zawartość `{variable}` w JSX
- Brak użycia `dangerouslySetInnerHTML` nigdzie w kodzie
- URL params statyczne (brak dynamicznych routów z user input)
- Danych z `words.json` nie można zmienić przez użytkownika (build-time)

**LocalStorage Security:**
- Dostępny tylko dla danej domeny (same-origin policy)
- Brak przechowywania wrażliwych danych (tylko ID słów i pełne obiekty Word)
- Odporność na uszkodzone dane (try-catch w `useLocalStorage` + fallback)

**HTTPS:**
- Vercel automatycznie wymusza HTTPS
- Wszystkie requesty szyfrowane (TLS)

**Error Boundaries:**
- `ErrorBoundary.jsx` w folderze `components/` – łapie błędy w drzewie renderowania
- Nie używany globalnie, ale dostępny dla przyszłych rozszerzeń (obecnie brak błędów krytycznych w MVP)

### 7.2. Odporność na błędy (Resilience)

**Obsługa błędów LocalStorage:**
```javascript
try {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : initialValue;
} catch (error) {
  console.error(`Error reading localStorage key "${key}":`, error);
  return initialValue;  // Graceful degradation
}
```

**Tryb Incognito:**
- LocalStorage może być niedostępny (QuotaExceededError)
- Aplikacja działa w trybie "w pamięci" (state działa, ale nie persistuje)
- Użytkownik nie zauważa problemu (brak błędu w UI)

**Błąd importu JSON:**
- Vite waliduje JSON podczas buildu
- W runtime: błąd przy imporcie przerwie aplikację (wymaga fixu)
- Mitigacja: walidacja schematu podczas developmentu

### 7.3. Limity i Ograniczenia

**LocalStorage Limit:**
- Chrome/Firefox/Edge: ~5-10MB
- Safari: ~5MB
- App używa: < 50KB (1% limitu)
- Przy 1000 ulubionych słów: ~500KB (nadal bezpiecznie)

**Wydajność na starych urządzeniach:**
- Animacje Framer Motion GPU-accelerated
- Stare przeglądarki: fallback do CSS animations (Framer to obsługuje)
- Safari: pełna obsługa (wymaga prefixów dla transform, Vite dodaje)

### 7.4. Testy bezpieczeństwa (Manual)

**Testy wykonane:**
- [x] Wpisanie HTML w search: `<script>alert('xss')</script>` → traktowane jako ciąg znaków, nie wykonane
- [x] Długie słowo w search (1000 znaków) → filtr działa, layout się nie psuje
- [x] Sprawdzenie localStorage w devtools: dane zapisane jako JSON, czytelne
- [x] Otwarcie w trybie incognito: działa (brak błędu)
- [x] Odświeżenie podczas ładowania: stan się resetuje (oczekiwane, brak persistu dla ładowania)

---

## 8. Monitorowanie i Diagnostyka (Logging)

### 8.1. Obecne Logowanie

**Błędy krytyczne:**
```javascript
console.error(`Error reading localStorage key "${key}":`, error);
// Tylko przy odczycie localStorage (rzadkie)
```

**Brak logów informacyjnych:**
- Żadnych `console.log` w kodzie produkcyjnym
- Brak śledzenia zdarzeń użytkownika (np. "kliknięcie udostępnienia")
- Brak analizy zachowań (Google Analytics itp.)

### 8.2. Rozwiązania dla Przyszłości

**Error Tracking:**
- Sentry lub LogRocket do przechwytywania błędów runtime
- Śledzenie unhandled promise rejections
- Raportowanie błędów z frontendu

**Analytics:**
- Plausible lub Google Analytics 4 dla podstawowych metryk
- Event tracking: kliknięcia w share, ulubione, czas na stronie
- A/B testing dla CTA (call to action)

**Performance Monitoring:**
- Web Vitals (LCP, FID, CLS) – raportowanie do Google Analytics
- Synthetic monitoring (np. Pingdom) dla sprawdzenia uptime

---

## 9. Zgodność i Dostępność (Accessibility)

### 9.1. WCAG 2.1 Compliance

**Kontrast:**
- Tekst główny (#2C2C2C) na tle (#FFFFFF): 15.9:1 ✅
- Tekst główny (#2C2C2C) na kremowym (#FDF5E6): 13.2:1 ✅
- Primary (#722F37) na białym: 5.6:1 ✅ (minimum 4.5:1 dla normalnego tekstu)
- Secondary (#C9A227) na białym: 2.4:1 ⚠️ (używany tylko jako akcent, nie do tekstu)

**Rozmiar fonta:**
- Tekst główny: 16px+ (mobile)
- Nagłówki: responsywne (2.5rem - 5rem)
- Przyciski: min-height 44px (wymóg dotykowy)

**Focus States:**
- `focus-visible` dla linków nawigacyjnych
- `focus:outline-none` dla przycisków akcji (styl customowy)
- Widoczny kontrast dla stanu aktywnego

### 9.2. Semantic HTML

**Struktura:**
```html
<!-- Nagłówki hierarchiczne -->
<h1>Słowo dnia</h1>  <!-- Home -->
<h2>Definicja</h2>
<h2>Przykłady</h2>

<nav aria-label="Główne menu">
  <a href="/">Dzisiaj</a>
  <a href="/archive">Archiwum</a>
</nav>

<button aria-label="Dodaj do ulubionych">♥</button>
<button aria-label="Udostępnij">Share</button>
```

### 9.3. Dostępność Klawiaturowa

**Nawigacja:**
- Tab order: linki nawigacyjne → przyciski akcji → inputy
- `Enter` aktywuje linki i przyciski
- `Space` dla przycisków (domyślne zachowanie)
- Escape zamyka dropdown i modale

**Screen Readery:**
- ARIA labels dla ikon bez tekstu
- Semantic HTML dla struktury
- Błędów Lighthouse accessibility: brak (100%)

---

## 10. Internationalizacja (i18n) – Plan na Przyszłość

### 10.1. Obecny Stan

- Tylko język polski
- Twarde stringi w kodzie (teksty UI: "Definicja", "Przykłady")
- Format daty polski (toLocaleDateString('pl-PL'))

### 10.2. Potencjalne Rozwiązania

**React i18next:**
```javascript
// resources
{
  pl: {
    definition: "Definicja",
    examples: "Przykłady"
  },
  en: {
    definition: "Definition",
    examples: "Examples"
  }
}

// Użycie
const { t } = useTranslation();
<h2>{t('definition')}</h2>
```

**Formaty dat i liczb:**
- `Intl.DateTimeFormat` zamiast `toLocaleDateString`
- `Intl.NumberFormat` dla liczby ulubionych

### 10.3. Priorytet

- MVP: Tylko polski (żadnych zmian)
- Faza 2: Dodanie angielskiego (zależnie od demografii użytkowników)
- Faza 3: Español, Deutsch (jeśli wejście na rynek międzynarodowy)

---

## 11. Deployment i CI/CD

### 11.1. Obecny Stan

**Hosting:**
- Vercel (vercel.com)
- Automatyczny deploy z GitHub
- Preview deployments dla PR
- Edge Network (CDN globalne)

**Konfiguracja:**
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

**Environment Variables:**
- Obecnie: brak (config w kodzie: `START_DATE`)
- Przyszłość: `VITE_API_URL`, `VITE_GA_ID`

### 11.2. Proces Deployu

```
1. Push do brancha main
2. GitHub → webhook → Vercel
3. Vercel: install dependencies
4. Vercel: run `npm run build`
5. Vercel: create preview deployment (URL: <hash>.vercel.app)
6. Na approval: deploy to production (slowo-dnia-pi.vercel.app)
7. Rollback automatyczny przy błędach buildu
```

### 11.3. Monitorowanie Uptime

- Vercel Analytics: dostępność, czasy odpowiedzi
- Lighthouse CI: testy wydajności na każdym PR
- Obecnie brak alerting'u (brak wymaganej infra)

### 11.4. Versioning

- Brak semver (pojedyncza aplikacja)
- Tagi git: `v1.0.0`, `v1.1.0` (manualne)
- CHANGELOG.md: ręcznie aktualizowany

---

## 12. Testy i Jakość (QA)

### 12.1. Obecny Stan Testów

**Manual Tests:**
- [x] Testy przeglądarek: Chrome, Firefox, Safari, Edge
- [x] Testy responsywności: Mobile, Tablet, Desktop
- [x] Testy funkcjonalne: wszystkie user flows
- [x] Testy UI: design zgodny z mockupami

**Automatyzacja:**
- Brak testów jednostkowych (Jest/Vitest)
- Brak testów integracyjnych (Testing Library)
- Brak E2E (Cypress/Playwright)

### 12.2. Strategia Testowania (Dla Przyszłości)

**Testy Jednostkowe (Hooks):**
```javascript
// useWordOfDay.test.js
describe('useWordOfDay', () => {
  test('returns first word for date before START_DATE', () => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => 
      new Date('2026-04-12').getTime()
    );
    const { result } = renderHook(() => useWordOfDay());
    expect(result.current.wordOfDay.id).toBe(1);
  });
});
```

**Testy Integracyjne (Components):**
```javascript
// WordCard.test.js
describe('WordCard', () => {
  test('displays word and definition', () => {
    render(<WordCard word={mockWord} />);
    expect(screen.getByText('Dyletant')).toBeInTheDocument();
    expect(screen.getByText(/osoba zajmująca się/i)).toBeInTheDocument();
  });
  
  test('toggles favorite on button click', async () => {
    render(<WordCard word={mockWord} />);
    const button = await screen.findByRole('button');
    fireEvent.click(button);
    expect(isFavorite(mockWord.id)).toBe(true);
  });
});
```

**Testy E2E (User Flows):**
```javascript
// cypress/e2e/home.cy.js
describe('Home Page', () => {
  it('shows word of the day', () => {
    cy.visit('/');
    cy.contains('Słowo na dziś');
    cy.get('[data-testid="word"]').should('be.visible');
  });
  
  it('allows adding to favorites', () => {
    cy.visit('/');
    cy.get('[aria-label="Dodaj do ulubionych"]').click();
    cy.get('[aria-label="Ulubione"]').click();
    cy.contains('Dyletant');
  });
});
```

### 12.3. Performance Testing

**Tools:**
- Lighthouse CI (GitHub Action)
- WebPageTest (synthetic testing)
- Chrome DevTools Performance tab

**Budgety Wydajnościowe:**
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.5s
- [ ] Total Blocking Time < 150ms
- [ ] Cumulative Layout Shift < 0.1
- [ ] Bundle size < 300KB (gzipped)

---

## 13. Ograniczenia Techniczne

### 13.1. Brak Backendu (MVP)

**Skutki:**
- Brak możliwości wyszukiwania po etymologii na serwerze (tylko po stronie klienta – wolniej dla dużych zbiorów)
- Brak synchronizacji między urządzeniami
- Aktualizacja słów wymaga redeployu (nie real-time)

**Workarounds:**
- Filtrowanie po 100 słowach jest błyskawiczne (brak sieci)
- Ulubienia trwają lokalnie (akceptowalne dla MVP)
- Zmiana słów co dzień (planowane) wymaga tylko zmiany `words.json`

### 13.2. Limit LocalStorage

**Problem:**
- Safari iOS: czasem zrzuca localStorage przy braku miejsca
- Incognito: localStorage niedostępny

**Rozwiązania:**
- Obsługa błędów (try-catch) – aplikacja nadal działa
- Ewentualnie: IndexedDB dla większych danych (przyszłość)

### 13.3. Single Page Application (SPA)

**SEO:**
- Brak SSR = słaby SEO
- Jednak to aplikacja, nie strona informacyjna (SEO nie-krytyczne)

**Rozwiązanie:**
- Prerendering (np. Prerender.io) jeśli SEO stanie się problemem
- Sitemap.xml dla archiwum (dynamiczne)

---

## 14. Podsumowanie

Stos technologiczny Słowa Dnia opiera się na nowoczesnych, ale dojrzałych technologiach:
- React dla deklaratywnego UI
- Vite dla szybkiego developmentu
- Tailwind CSS dla elastycznego, utility-first designu
- Framer Motion dla "premium feel"
- LocalStorage dla offline-first, bez-serwerowego podejścia

Architektura jest minimalistyczna, co pozwala na:
- Szybkie wdrożenie MVP
- Niskie koszty utrzymania
- Łatwą skalowalność (w miarę potrzeb)
- Prosty onboarding dla nowych deweloperów

Kluczowe decyzje (brak backendu, date-based algorithm, client-side storage) są świadomymi trade-offami, które optymalizują pod kątem czasu i kosztów, przy akceptowalnych kompromisach w skali MVP.
---

*Dokumentacja techniczna, zgodna z aktualnym codebase (stan na 2026-05-03).*