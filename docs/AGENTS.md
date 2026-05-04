# Agent AI Developera — Reguły Pracy

## Projekt: Słowo Dnia

**Produkt:** Aplikacja do nauki pięknych polskich słów  
**Model:** Freemium + Newsletter  
**Tech Stack:** React + Vite + Tailwind CSS + Framer Motion  
**Hosting:** Vercel  
**Status:** ✅ COMPLETE - All MVP features implemented

---

## 1. Kontekst Biznesowy

### 1.1 ICP (Idealny Klient)
- **Segment Primary:** Miłośnicy języka polskiego (25-45 lat), Zawodowi Mówcy (nauczyciele, prelegenci, dziennikarze)
- **Segment Secondary:** Rodzice, Gen Z (TikTok)
- **Pain Points:**
  - Brak źródła pięknych, rzadkich słów
  - Powtarzanie tych samych słów ("fajny", "super")
  - Zapominanie nowych słów

### 1.2 MVP Features (MoSCoW)

| ID | Feature | Priorytet |
|----|---------|----------|
| M1 | Wyświetlanie słowa dnia | MUST |
| M2 | Baza 100 pięknych słów | MUST |
| M3 | Definicja + przykłady | MUST |
| M4 | Słowo na dziś (data-based) | MUST |
| M5 | Zapis ulubionych (localStorage) | MUST |
| S1 | Archiwum poprzednich słów | SHOULD |
| S2 | Wyszukiwarka słów | SHOULD |
| S3 | Share na social media | SHOULD |

---

## 2. Architektura Systemu

### 2.1 Struktura Projektu

```
slowo-dnia/
├── src/
│   ├── data/
│   │   └── words.json          # 100 słów
│   ├── hooks/
│   │   ├── useWordOfDay.js     # Algorytm słowa dnia
│   │   ├── useFavorites.js    # CRUD ulubionych
│   │   └── useLocalStorage.js  # localStorage wrapper
│   ├── context/
│   │   ├── AppContext.jsx      # Global state provider
│   │   └── components/
│   │       ├── WordCard.jsx    # Komponent karty słowa
│   │       └── ShareButton.jsx # Share functionality
│   ├── pages/
│   │   ├── Home.jsx            # Strona główna
│   │   ├── Archive.jsx        # Archiwum + search
│   │   └── Favorites.jsx       # Ulubione
│   ├── App.jsx                # Routing
│   ├── main.jsx               # Entry point
│   └── index.css              # Design system
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

### 2.2 Warstwy Architektury

| Warstwa | Komponenty | Odpowiedzialność |
|---------|------------|------------------|
| Presentation | Home, Archive, Favorites, WordCard, ShareButton | UI, routing, animacje |
| Business Logic | useWordOfDay, useFavorites | Logika biznesowa, algorytmy |
| Data | words.json, localStorage | Przechowywanie danych |
| State | AppContext | Globalny stan aplikacji |

---

## 3. Word Schema

Zgodnie ze specyfikacją architektoniczną:

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
- Po wyczerpaniu słów (100 dni) → tryb archiwum

---

## 5. Tech Stack

| Warstwa | Technologia |
|---------|-------------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Fonts | Google Fonts (Playfair Display, Merriweather, Inter) |
| State | React Context + localStorage |
| Routing | React Router v6 |
| Animacje | Framer Motion |
| Hosting | Vercel |

---

## 6. Design System

### Color Palette

| Element | Kolor (Light) | Kolor (Dark) | Hex |
|---------|---------------|--------------|-----|
| Primary | Deep Burgundy | #d6d3d1 | #722F37 |
| Secondary | Gold | #C9A227 | #C9A227 |
| Background | Cream | #111111 | #FDF5E6 |
| Surface | White | #1f1f1f | #FFFFFF |
| Text | Dark Gray | #f5f5f5 | #1A1A1A |
| Accent | Forest Green | #d6d3d1 | #228B22 |
| Word | Burgundy/Pink | #722F37 / #B97A83 | Tytuł słowa |

### Typography

| Element | Font | Waga |
|---------|------|------|
| Słowo hero | Playfair Display | 700 |
| Definicja | Merriweather | 400 |
| Przykłady | Merriweather | 400 italic |
| UI | Inter | 500 |

---

## 7. Definicja Ukończenia MVP

| ID | Kryterium |
|----|-----------|
| D1 | Widok słowa dnia działa |
| D2 | 100 pięknych słów w bazie |
| D3 | Definicje i przykłady wyświetlane |
| D4 | Zapis ulubionych działa (localStorage) |
| D5 | Archiwum poprzednich słów |
| D6 | Share na social media |
| D7 | Mobile responsive |
| D8 | Piękna typografia i design |
| D9 | Deploy na Vercel |

---

## 8. Zasady Deweloperskie

1. **KISS** — Keep It Simple, Stupid
2. **Modularność** — Małe, wielokrotnego użytku komponenty
3. **Mobile-first** — 70%+ ruchu z mobile
4. **Performance** — Fast load, graceful degradation
5. **Accessibility** — Czytelne czcionki, wystarczający kontrast
6. **No backend (MVP)** — Dane w local JSON, stan w localStorage
7. **Beautiful UI** — Piękna typografia = core experience

---

## 9. Referencje Dokumentów

### Architektura
- [system-design.md](architecture/system-design.md) — Pełna specyfikacja architektoniczna

### Biznes
- [mvp-scoping.md](business/mvp-scoping.md) — Zakres MVP
- [tech-stack.md](business/tech-stack.md) — Tech Stack
- [icp-persona.md](business/icp-persona.md) — Persona

---

## 10. Koszty (MVP)

| Pozycja | Koszt |
|---------|-------|
| Vercel | $0 |
| Domain (.pl) | ~50 PLN/rok |
| Google Fonts | $0 |
| **RAZEM** | **~50 PLN** |

---

_Reguły zgodne z architekturą systemu (system-design.md)_
_Aktualizacja: 2026-03-15_
