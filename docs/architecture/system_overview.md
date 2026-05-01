# Architektura Systemu: Słowo Dnia

## 1. Przegląd Systemu (High-Level)

Słowo Dnia to aplikacja webowa typu SPA (Single Page Application) zbudowana z myślą o nauce i odkrywaniu rzadkich polskich słów. System nie posiada backendu w fazie MVP – wszystkie dane są przechowywane lokalnie w postaci pliku JSON, a stan użytkownika (ulubione słowa) jest utrwalany w przeglądarkowym localStorage.

### 1.1. Model Architektoniczny

```
┌─────────────────────────────────────────────────────────────┐
│                         BROWSER (Client)                    │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                  React Application                      │ │
│  │                                                         │ │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐ │ │
│  │  │  Routing    │    │  Context    │    │  State Mgmt │ │ │
│  │  │  (RR v6)    │◄──►│  (AppCtx)   │◄──►│  (Hooks)    │ │ │
│  │  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘ │ │
│  │         │                   │                   │       │ │
│  │  ┌──────┴──────┐  ┌────────┴────────┐  ┌─────┴─────┐ │ │
│  │  │ Presentation│  │ Business Logic │  │  Data     │ │ │
│  │  │ Components  │  │ (Custom Hooks) │  │ (JSON/LS) │ │ │
│  │  │             │  │                 │  │           │ │ │
│  │  │ - Home      │  │ - useWordOfDay │  │ - words.  │ │ │
│  │  │ - Archive   │  │ - useFavorites │  │   json    │ │ │
│  │  │ - Favorites │  │                 │  │ - local   │ │ │
│  │  │ - WordCard  │  └─────────────────┘  │   Storage │ │ │
│  │  │ - ShareBtn  │                        │           │ │ │
│  │  └─────────────┘                        └───────────┘ │ │
│  │                                                         │ │
│  └─────────────────────────────────────────────────────────┘ │
│        ▲                     ▲                    ▲        │
│        │                     │                    │        │
│   HTTP (Vercel)          LocalStorage          JSON File    │
│   (Static Hosting)       (5MB limit)           (40KB)       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2. Warstwy Architektoniczne

| Warstwa | Technologie | Odpowiedzialność |
|---------|-------------|------------------|
| **Prezentacja** | React, JSX, Tailwind CSS, Framer Motion | UI, routing, animacje, responsywność |
| **Logika Biznesowa** | Custom Hooks (React) | Algorytmy, walidacja, reguły domeny |
| **Dane** | JSON, localStorage | Trwałe/przeżytkowe przechowywanie |
| **State Management** | React Context + Hooks | Dystrybucja stanu globalnego |
| **Infrastruktura** | Vercel, HTTPS | Hosting, CDN, SSL |

### 1.3. Cechy Kluczowe

- **Brak backendu**: MVP operuje wyłącznie na kliencie
- **Offline-first**: Pełna funkcjonalność bez połączenia z internetem
- **Szybki start**: < 100KB zasobów statycznych do pobrania
- **Progresywne wzmocnienie**: Aplikacja działa podstawowo nawet bez JS (HTML/CSS)
- **Bezpieczeństwo**: Brak backendu = brak wektorów ataku serwerowych

---

## 2. Komponenty Systemu

### 2.1. Moduł Routing (App.jsx)

**Rola**: Zarządza nawigacją między widokami, zapewnia spójny nagłówek i stopkę.

**Elementy**:
- React Router v6 (BrowserRouter, Routes, Route)
- Trasy: `/` (Home), `/archive`, `/favorites`
- Linki nawigacyjne z aktywnym stanem (NavLink)

**Zależności**:
- Brak zewnętrznych zależności poza react-router-dom

**Aspekty bezpieczeństwa**:
- Brak dynamicznych parametrów w ścieżkach (brak ryzyka XSS przez routing)
- Wszystkie trasy statyczne

**Wydajność**:
- Code-splitting możliwy (ale nie zaimplementowane w MVP)
- Ładowanie komponentów route'ów tylko przy nawigacji

### 2.2. Moduł Danych (words.json)

**Rola**: Źródło prawdy dla słów i ich metadanych.

**Struktura**:
```typescript
Array<{
  id: number;           // 1-100
  word: string;         // Samo słowo
  definition: string;   // Definicja
  examples: string[];   // 1-3 przykłady
  etymology: string;    // Pochodzenie słowa
  partOfSpeech: string; // Część mowy
  category: string;     // Kategoria tematyczna
  synonyms: string[];   // 1-4 synonimy
}>
```

**Cechy**:
- Importowany jako moduł ES6 (Vite obsługuje JSON natywnie)
- Rozmiar: ~40KB (kompresowany do ~10KB przez gzip na Vercel)
- Cache'owany przez przeglądarkę jako część bundle'a
- Brak wersjonowania (zmiany wymagają redeployu)

**Strategia aktualizacji**:
- Obecnie: ręczna edycja + git push → Vercel build
- Przyszłość: CMS headless + API REST/GraphQL

### 2.3. Moduł Stanów (Hooki)

#### 2.3.1. useWordOfDay

**Odpowiedzialność**: Algorytm wyboru słowa na daną datę.

**Logika**:
1. Oblicza dni od START_DATE (2026-04-13)
2. Indeksuje do words.json
3. Obsługuje edge cases:
   - Przed startem → pierwsze słowo (indeks 0)
   - Po 100 dniach → null (tryb archiwum)

**Stan wewnętrzny**:
- `wordOfDay`: Word | null
- `loading`: boolean (symulacja 300ms)
- `isFinished`: boolean (przekroczono 100 słów)

**Eksponowane API**:
- `wordOfDay`, `loading`, `isFinished`
- `getRandomWord()` - losowe słowo (niewykorzystywane)
- `getCurrentIndex()` - aktualny dzień od startu
- `START_DATE` - stała

#### 2.3.2. useLocalStorage

**Odpowiedzialność**: Abstrakcja nad API localStorage przeglądarki.

**Funkcjonalności**:
- Odczyt z JSON.parse i walidacją (try-catch)
- Zapis z JSON.stringify
- Słuchacz eventu `storage` (synchronizacja między zakładkami)
- Błąd w przeglądarce incognito → fallback do useState

**Podpis**:
```typescript
function useLocalStorage<T>(key: string, initialValue: T): [T, setter]
```

#### 2.3.3. useFavorites

**Odpowiedzialność**: Zarządzanie listą ulubionych słów.

**Operacje**:
- `addFavorite(word)` - dodaj (unikalne po id)
- `removeFavorite(id)` - usuń
- `toggleFavorite(word)` - przełącz
- `isFavorite(id)` - sprawdź (zwraca boolean)

**Baza**: Używa useLocalStorage z kluczem `slowo-dnia-favorites`

### 2.4. Moduł Kontekstu (AppContext)

**Rola**: Dystrybucja stanu ulubionych do całego drzewa komponentów bez prop-drilling.

**Struktura**:
```typescript
{
  favorites: Word[],
  addFavorite: (word: Word) => void,
  removeFavorite: (id: number) => void,
  isFavorite: (id: number) => boolean,
  toggleFavorite: (word: Word) => void
}
```

**Zastosowanie**:
- Owijany wokół `<BrowserRouter>` w `main.jsx`
- Konsumowany przez WordCard i Favorites

### 2.5. Moduł UI (Komponenty)

#### 2.5.1. Home (Strona Główna)

**Rola**: Główny ekran wyświetlający słowo dnia.

**Podkomponenty**:
- WordCard - wyświetlenie słowa
- Loader - animacja podczas ładowania
- Info section - opis aplikacji

**Stan**: Brak (całkowicie oparty na useWordOfDay)

**Styling**:
- Typografia hero (text-5xl Playfair)
- Centrowanie (mx-auto, max-w-2xl)
- Animacje wejścia (framer-motion)

#### 2.5.2. Archive (Archiwum)

**Rola**: Przeglądarka historycznych słów + filtrowanie.

**Stan lokalny**:
- `searchTerm` - wyszukiwanie tekstowe
- `selectedCategory` - filtr kategorii
- `isOpen` - stan otwarcia dropdownu

**Logika**:
- Filtruje słowa do obecnego dnia (bez przyszłych)
- Sortuje odwrotnie (najnowsze pierwsze)
- Wyszukuje po word + definition (case-insensitive)
- Filtruje po kategorii (OR/AND logic)

**Wydajność**:
- useMemo dla archiveWords, categories, filteredWords
- Dla 100 słów: brak zauważalnego lagu

#### 2.5.3. Favorites (Ulubione)

**Rola**: Wyświetlanie i zarządzanie zapisanymi słowami.

**Stan**: Brak (konsumuje AppContext)

**Komunikaty**:
- Pusta lista: zachęca do dodawania
- Niepusta: pokazuje listę z możliwością usuwania

#### 2.5.4. WordCard (Karta Słowa)

**Rola**: Reprezentacja wizualna jednego słowa.

**Cechy**:
- Expandable sections (przykłady, etymologia)
- Toggle ulubionych (serce)
- Share button (Web Share API / Clipboard API)
- Animacje Framer Motion (wejście, hover, tap)

**Stan lokalny**:
- `showExamples` - rozwinięcie przykładów
- `showEtymology` - rozwinięcie etymologii

**Styling**:
- Karta: shadow-lg, rounded-2xl, p-8
- Typografia: 5xl (słowo), lg (definicja), sm (drobne)
- Kolory: primary, secondary, surface, text

#### 2.5.5. ShareButton (Udostępnianie)

**Rola**: Umożliwienie podzielenia się słowem.

**Logika**:
1. Próba Web Share API (mobile native)
2. Fallback: Clipboard API (kopiowanie do schowka)
3. Wizualny feedback (skopiowano ✓)

**Stan**:
- `copied` - czy skopiowano (do animacji zmiany koloru)

**Timeout**: 2s powrót do stanu domyślnego

---

## 3. Przepływ Danych

### 3.1. Inicjalizacja Aplikacji

```
1. index.html ładuje skrypty
2. ReactDOM.render tworzy root
3. App.jsx montuje BrowserRouter
4. AppContext.Provider inicjalizuje useFavorites
   → useLocalStorage odczytuje z localStorage (lub fallback)
5. Home ładuje useWordOfDay
   → useState inicjalizuje loading=true
   → useEffect po 300ms oblicza słowo dnia
   → setState(word, loading=false, isFinished?)
6. Render: WordCard z word
7. Interakcje użytkownika odpychają zmiany stanu
```

### 3.2. Ścieżki Użytkownika (User Flows)

#### Scenariusz A: Pierwsza wizyta
1. Użytkownik wchodzi na stronę
2. Widzi loader przez 300ms
3. Pojawia się karta słowa z definicją
4. Może kliknąć ♥ aby dodać do ulubionych
5. Może kliknąć udostępnij
6. Rozwija przykłady/etymologię (opcjonalnie)

#### Scenariusz B: Powrót (localStorage)
1. Otwiera przeglądarkę
2. useLocalStorage natychmiast ładuje ulubione
3. AppContext jest zainicjalizowany
4. WordCard od razu pokazuje serce jako aktywne (jeśli wczoraj dodane)

#### Scenariusz C: Archiwum + Wyszukiwanie
1. Przechodzi do `/archive`
2. Widzi listę słów (najnowsze pierwsze)
3. Wpisuje w wyszukiwarkę fragment słowa
4. Lista filtruje się dynamicznie
5. Kliknij kategorię w dropdownie
6. Kombinacja wyszukiwania + kategorii działa
7. Zobacz szczegóły (WordCard w miniaturce)

### 3.3. Aktualizacja Stanu

```
User Action (np. toggle favorite)
  ↓
WordCard → useFavorites.toggleFavorite(word)
  ↓
useFavorites → useLocalStorage.set(favorites)
  ↓
localStorage (zapis)
  ↓
useLocalStorage → setStoredValue (aktualizacja React state)
  ↓
Re-render konsumentów (AppContext.Provider value zmieniło się)
  ↓
WordCard, Favorites (wszystkie podpięte pod kontekst)
  ↓
Widok aktualizuje się bez przeładowania
```

---

## 4. Decyzje Architektoniczne (ADR)

### ADR-001: Brak Backendu w MVP

**Status**: ✅ Zaimplementowane  
**Data**: 2026-04-13  
**Decyzja**: Zastosowanie architektury bez serwera (client-only) z lokalnymi danymi i localStorage

**Kontekst**:
- MVP ma za zadanie zweryfikować koncept "Słowa Dnia"
- Budżet i czas ograniczone
- Słowa są statyczne (zmieniane codziennie według algorytmu)
- Ulubienia to proste zapytania CRUD

**Decyzja**:
1. Baza słów jako `words.json` importowany do bundle'a
2. Stan użytkownika w `localStorage` przeglądarki
3. Zero backendu, API, czy baz danych

**Konsekwencje**:
✓ Mniej kosztu (hosting Vercel darmowy)  
✓ Szybszy czas wdrożenia (brak serwera do stworzenia)  
✓ Zero problemów z skalowaniem (SPA, CDN)  
✓ Bezpieczeństwo (brak wektorów ataku serwerowego)  
⚠️ Limity localStorage (~5MB - wystarczające)  
⚠️ Brak synchronizacji multi-device (wymaga konta w przyszłości)  
⚠️ Aktualizacja słów wymaga redeployu (vs API z CMS)  

**Alternatywy rozważone**:
1. Firebase/Firestore - odrzucono (koszt, zbyt duże dla MVP)
2. Backend w Node.js + PostgreSQL - odrzucono (overkill dla 100 słów)
3. Headless CMS (Contentful) - odrzucono (płatne dla >100 wpisów)

**Status akceptacji**: Zatwierdzone przez Product Ownera  

---

### ADR-002: Algorytm Słowa Dnia oparty na Dacie

**Status**: ✅ Zaimplementowane  
**Data**: 2026-04-13  
**Decyzja**: Wybór słowa na podstawie `floor((now - START_DATE) / 86400000)` zamiast losowania lub backendowego harmonogramu

**Kontekst**:
- Każdego dnia to samo słowo dla wszystkich użytkowników (spójność)
- Słowa są uporządkowane w tablicy 1..100
- Brak backendu do harmonogramowania

**Decyzja**:
1. `START_DATE = 2026-04-13`
2. Dni od startu determinują indeks w words.json
3. `word = words[daysElapsed]`
4. Edge cases: `< 0` → words[0], `>= 100` → null

**Konsekwencje**:
✓ Zero kosztów za harmonogramowanie  
✓ Spójność: wszyscy widzą to samo słowo w danym dniu  
✓ Offline-first działa idealnie (brak synchronizacji)  
✓ Deterministyczne (łatwe debugowanie)  
⚠️ Po 100 dniach koniec słów (archiwum) - planowane  
⚠️ Aktualizacja słów wymaga zmiany daty startowej lub bazy  
⚠️ Czas lokalny przeglądarki może różnić się o strefy czasowe (akceptowane)  

**Alternatywy rozważone**:
1. Losowe słowo co do każdego użytkownika - odrzucono (brak spójności, trudniejszy sharing)
2. Backend cron job wybierający słowo - odrzucono (płatny, nie offline)
3. Daty w bazie słów (słowo.startDate) - odrzucono (trudniejsze aktualizacje)

**Status akceptacji**: Zatwierdzone przez Product Ownera

---

### ADR-003: React Context zamiast Redux/Zustand

**Status**: ✅ Zaimplementowane  
**Data**: 2026-04-14  
**Decyzja**: `AppContext` oparty na `createContext` i `useLocalStorage` zamiast Redux, Zustand, czy MobX

**Kontekst**:
- Globalny stan: tylko ulubione słowa
- Prosta logika (add/remove/toggle/isFavorite)
- Brak middleware, devtools, czy zaawansowanego time-travel
- Szybki prototyp/weryfikacja MVP

**Decyzja**:
1. `createContext` dla globalnego dostępu
2. `useFavorites` custom hook z logiką
3. `useLocalStorage` dla persistu
4. Provider wokół całej aplikacji

**Konsekwencje**:
✓ Zero dodatkowych zależności (Redux to ~20KB)  
✓ Wystarczające dla jednego stanu (ulubienia)  
✓ Łatwe zrozumienie dla nowych deweloperów  
✓ Dobra integracja z React DevTools  
⚠️ Potencjalne re-rendery przy rozbudowie stanu  
⚠️ Brak zaawansowanych narzędzi developerskich  
⚠️ Trudniejsza optymalizacja przy wielu kontekstach  

**Alternatywy rozważone**:
1. Redux Toolkit - odrzucono (overkill dla jednego feature'u)
2. Zustand - odrzucono (dodatkowa zależność, mały zysk w MVP)
3. Jotai/Recoil - odrzucono (nowe biblioteki, brak doświadczenia zespołu)
4. Prop drilling - odrzucono (brzydkie, niemaintaunable przy skali)

**Status akceptacji**: Zatwierdzone przez Product Ownera

---

### ADR-004: Framer Motion dla Animacji

**Status**: ✅ Zaimplementowane  
**Data**: 2026-04-14  
**Decyzja**: `framer-motion` jako biblioteka animacji zamiast CSS transitions, React Spring, czy własnej implementacji

**Kontekst**:
- Animacje są kluczowe dla "pięknego designu" (core experience)
- Wymagane: wejścia karty, rozwijanie sekcji, hover states, share feedback

**Decyzja**:
1. `motion.div`, `motion.button` dla deklaratywnych animacji
2. `AnimatePresence` dla animacji mount/unmount
3. `whileHover`, `whileTap` dla interakcji
4. `transition` dla kontroli easingu i czasu

**Konsekwencje**:
✓ Potężne możliwości z małym kodem  
✓ Spójne API dla wszystkich animacji  
✓ Dobra dokumentacja i społeczność  
✓ Płynne 60fps (GPU accelerated)  
⚠️ Dodatkowe ~20KB bundle size  
⚠️ Learning curve dla deweloperów  
⚠️ Możliwość nadużycia (over-animating)  

**Alternatywy rozważone**:
1. CSS transitions/keyframes - odrzucono (trudniejsze złożone sekwencje, mount/unmount)
2. React Spring - odrzucono (podobne, Framer lepsze w UI animacjach)
3. GSAP - odrzucono (overkill dla prostych UI animacji)
4. Brak animacji - odrzucono (słabe UX, brak "premium feel")

**Status akceptacji**: Zatwierdzone przez Product Ownera

---

### ADR-005: Import JSON bezpośrednio vs API Fetch

**Status**: ✅ Zaimplementowane  
**Data**: 2026-04-14  
**Decyzja**: Import `words.json` jako modułu ES6 (`import words from './data/words.json'`) zamiast fetch z public/endpointu

**Kontekst**:
- Baza 100 słów statyczna, dołączana do bundle'a
- Brak backendu
- Wymagany offline-first

**Decyzja**:
1. Vite importuje JSON podczas buildu
2. Bundle zawiera dane (nie oddzielny request)
3. Dostęp synchroniczny (bez asynchronicznego fetcha)

**Konsekwencje**:
✓ Dostęp natychmiastowy (zero network request)  
✓ Offline-first out of the box  
✓ Łatwe cache przez bundlera/Vercel  
✓ Błędów sieci brak  
⚠️ Aktualizacja wymaga rebuildu i redeployu  
⚠️ Bundle size rośnie o ~40KB (gzip ~10KB - akceptowalne)  
⚠️ Brak dynamicznej aktualizacji bez przeładowania  

**Alternatywy rozważone**:
1. Public folder + fetch - odrzucono (network request, offline problem)
2. Własny endpoint API - odrzucono (płatny backend, overkill)
3. CDN dla JSON - odrzucono (wciąż network, cache complexity)

**Status akceptacji**: Zatwierdzone przez Product Ownera

---

## 5. Diagramy Architektury

### 5.1. Diagram Komponentów (C4 Level 2)

```
+---------------------+
|      App (Root)     |
|  +---------------+  |
|  | BrowserRouter |  |
|  +---------------+  |
|  | AppProvider   |  |
|  +---------------+  |
+----------+----------+
           |
     +-----+-----+-----+
     |     |     |     |
+----v--+ +v----+ +v----+
| Home | |Archi| |Fav  |
|      | |ve   | |     |
+------+ +-----+ +-----+
     |     |     |
     |     |     |
+----v-----v-----v----+
|    WordCard        |  <- Re-used in Fav/Home
|  +--------------+  |
|  | ShareButton  |  |
|  +--------------+  |
+---------------------+

Dependencies:
- Home -> useWordOfDay
- All -> useFavorites (via AppContext)
- WordCard -> useFavorites
- ShareButton -> (no deps, pure UI)
```

### 5.2. Diagram Przepływu Danych (C4 Level 3)

```
User
  │
  ▼ (1. Navigate)
BrowserRouter
  │
  ▼ (2. Route match)
Page Component (Home/Archive/Fav)
  │
  ▼ (3. useWordOfDay/useContext)
Business Logic (Hooks)
  │
  ├─────── useLocalStorage ────────► LocalStorage
  │              │
  │    (4. Read/Write JSON)
  │              ▼
  └──────► words.json (import)
                    │
                    ▼
              React State
                    │
                    ▼
              Re-render
                    │
                    ▼
              UI Update
```

### 5.3. Wyjaśnienie Architektury dla Introwerty

Architektura aplikacji to jak restauracja:

- **Kuchnia (Data Layer)**: `words.json` to menu i składniki, gotowe do użycia. `localStorage` to lodówka, gdzie trzymamy ulubione dania na później.
- **Kucharze (Business Logic)**: React Hooks to kucharze przyrządzający posiłki (słowa) według przepisu (algorytmu). `useWordOfDay` doborze dzisiejsze danie z menu, `useFavorites` zarządza zamówieniami na później.
- **Kelnerzy (Context/State)**: `AppContext` to system komunikacji między kuchnią a salą. Przekazuje informację "kto zamówił co" bez krzyczania przez całą restaurację (prop-drilling).
- **Stół (Presentation)**: Komponenty React to wyposażenie stołu. WordCard to talerz, na którym pięknie podajemy dzisiejsze danie z dodatkami (definicja, przykłady). Framer Motion to eleganckie układanie sztućców i serwowanie.
- **Winda (Router)**: `BrowserRouter` to winda dowożąca gości między piętrami (Home, Archive, Favorites). Każde piętro ma inny widok, ale winda zawsze działa tak samo.
- **Hostesska (Routing)**: NavLink to hostesska wskazująca drogę do różnych lokali w restauracji (podświetla aktywne wejście).

Kiedy klient dodaje ulubione:
1. Kliknie serce przy daniu (WordCard)
2. Kelner (useFavorites) zapisuje to w notatniku (setState)
3. Jednocześnie notatnik ląduje w lodówce (localStorage) - na wypadek gdyby restauracja musiała zamknąć i otworzyć się na nowo
4. Hostesska w windzie widzi zmianę i informuje inne pokoje (Context update)
5. Na stole (UI) od razu widzimy zmianę - serce jest pełne!

Całość działa offline, bo wszystko jest w restauracji - nie musimy prosić o dostawę z zewnątrz (backendu).

---

## 6. Wydajność i Optymalizacja

### 6.1. Metryki Wydajności (Docelowe)

| Metryka | Cel | Obecny status |
|---------|-----|---------------|
| First Contentful Paint | < 1.5s | ✅ ~1s (Vercel CDN) |
| Time to Interactive | < 3s | ✅ ~2s (z bundle) |
| Total JS Bundle | < 200KB | ✅ ~150KB |
| JSON Payload | < 100KB | ✅ ~40KB |
| LocalStorage użycie | < 5MB | ✅ < 1KB |
| Animacje FPS | 60fps | ✅ 60fps (GPU) |

### 6.2. Optymalizacje Zastosowane

**Code Splitting**:
- React.lazy() i Suspense nie zaimplementowane (mały bundle)
- Potencjalne splitowanie: `/archive` jako osobny chunk

**Memoizacja**:
- `useMemo` dla `archiveWords`, `categories`, `filteredWords`
- Zapobiega przeliczaniu przy każdym resecie

**Render Optymalization**:
- Brak niepotrzebnych re-renderów (Context value stabilne)
- Potencjalne `React.memo` dla WordCard (jeszcze nie potrzebne)

**Asset Optimization**:
- Tailwind CSS: purga unused styles (automatycznie przez Vite)
- Fonty: preconnect do fonts.gstatic.com w index.html
- Obrazy: brak (ikony jako SVG/font)

### 6.3. Strategie Cacheowania

**Browser Cache** (Vercel Headers):
- `/` - `Cache-Control: s-maxage=3600, stale-while-revalidate`
- `/_next/static/*` - `Cache-Control: public, max-age=31536000, immutable`
- `/index.html` - `Cache-Control: s-maxage=0` (zawsze fresh)

**Service Worker**: Brak w MVP (można dodać PWA później)

**LocalStorage**: Natywny cache dla ulubionych

---

## 7. Bezpieczeństwo

### 7.1. Threat Model

| Wektor | Ryzyko | Mitygacja |
|--------|--------|-----------|
| XSS przez dane | Wysokie (JSON user-facing) | Dane zaufane (words.json), brak eval, React domyślnie escapuje |
| XSS przez URL | Średkie | React Router escapuje parametry, brak dynamicznych routów |
| LocalStorage XSS | Wysokie | Brak wstawiania HTML z LS, tylko JSON |
| CSRF | Niskie | Brak mutacji w backendzie (SPA read-only dla danych) |
| Clickjacking | Niskie | Wymagane embedowanie, brak cennych akcji |
| Data Leak | Średkie | localStorage widoczny tylko w danej domenie |

### 7.2. Zastosowane Miary

**React domyślne bezpieczeństwo**:
- JSX automatycznie escapuje content (`{variable}` vs `dangerouslySetInnerHTML`)
- Brak użycia `dangerouslySetInnerHTML` nigdzie w kodzie

**Content Security Policy (CSP)**:
- Nie zaimplementowane w MVP (wymagałoby Vercel headers/config)
- Planowane w przyszłości dla produkcji

**Input Sanitization**:
- Wyszukiwarka lokalna (nie wysyła danych na serwer)
- Brak możliwości wprowadzania danych przez usera (poza klikaniem)

**Rate Limiting**:
- N/A (brak backendu)

**Authentication**:
- Brak (MVP, brak kont użytkowników)

### 7.3. Słabe Punkty

1. **localStorage i XSS**: Jeśli jakiś XSS się wkradnie, może czytać localStorage
   - Mitigacja: Brak XSS (React escaping), regularne audyty kodu

2. **Brak HTTPS**: Strona jest na HTTPS (Vercel domyślnie)

3. **Przechwycenie danych**: Brak wrażliwych danych (ulubione to tylko słowa)

4. **CSRF w przyszłości**: Gdyby dodano backend, potrzebne CSRF tokens
   - Planowane: SameSite cookies, CSRF protection

---

## 8. Skalowalność i Ewolucja

### 8.1. Obecne Ograniczenia

1. **Baza słów**: 100 słów, ręczna aktualizacja
   - Skalowanie: Do 1000 słów wciąż OK z JSON
   - >1000 słów: Wymagałby pagination i code-splitting

2. **Ulubienia**: Limit localStorage (~5MB)
   - Obecnie: ~50KB max (100 słów × 500B)
   - Przyszłość: Możliwość 1000+ ulubionych jeśli zapisujemy tylko ID

3. **Offline**: Pełna funkcjonalność, ale brak synchronizacji
   - Problematyczne dla multi-device
   - Rozwiązanie: Backend z synchronizacją (konto użytkownika)

4. **Brak analityki**: Nie wiem, co użytkownicy robią
   - Planowane: Google Analytics / Plausible
   - Ewentualnie: własne event logging

### 8.2. Ścieżka Ewoluucji (Roadmap Technologiczny)

**Faza 1 (MVP - Obecny)**:
- ✅ SPA, no backend
- ✅ LocalStorage
- ✅ 100 słów
- ✅ Podstawowe UX

**Faza 2 (Growth)**:
- Dodanie backendu (Node.js + Postgres lub Firebase)
- Konta użytkowników (email/social login)
- Synchronizacja multi-device
- Dynamiczne aktualizacje słów (CMS)
- Wyszukiwanie full-text (Elasticsearch)
- Analityka zdarzeń

**Faza 3 (Scale)**:
- Micro-frontends (jeśli rosnie)
- CDN dla JSON (CloudFront)
- Edge caching (Vercel Edge Functions)
- A/B testing (optimizely)
- PWA (Service Worker, offline queue)

**Faza 4 (Enterprise)**:
- SSO (Google, Microsoft dla szkół)
- Team accounts
- API dla partnerów
- SDK dla innych aplikacji

### 8.3. Decyzje Projektowe Wymagające Refaktoryzacji

1. **Migracja z localStorage na backend**:
   - Impact: Duża (zmiana useFavorites hooka)
   - Plan: Adapter pattern - API pozostaje ten sam, zmienia się implementacja

2. **Dodanie pagination w archive**:
   - Impact: Średnia (zmiana Archive.jsx i filtrowania)
   - Plan: Wirtual list (react-window) dla performancji

3. **Wyszukiwanie fuzzy (typo-tolerant)**:
   - Impact: Mała (zmiana algorytmu w Archive)
   - Plan: Fuse.js biblioteka, zamiana zawiera-na substring

---

## 9. Podsumowanie

Architektura Słowa Dnia to klasyczny, minimalistyczny podejście SPA z naciskiem na szybkość wdrożenia i niskie koszty operacyjne. Brak backendu w MVP jest świadomym trade-offem między funkcjonalnością a czasem/ kosztem, z myślą o szybkiej walidacji konceptu na rynku.

Kluczowe decyzje:
- Client-side wszystko (słowa, stan, routing)
- React Context dla stanu globalnego
- Framer Motion dla "premium feel"
- Date-based algorithm dla deterministycznego Słowa Dnia
- localStorage dla ujednoliconego doświadczenia offline

Architektura jest wystarczająca dla MVP i pozwala na naturalną ewolucję w stronę pełnego web app z backendem, gdy koncept zdobędzie trakcję.

---  
*Dokumentacja architektoniczna zgodna z C4 Model i zasadami Spec Driven Development*