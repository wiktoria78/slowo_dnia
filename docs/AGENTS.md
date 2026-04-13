# Agent AI Developera — Reguły Pracy

## Projekt: Słowo Dnia

**Produkt:** Aplikacja do nauki pięknych polskich słów  
**Model:** Freemium + Newsletter  
**Tech Stack:** React + Vite + Tailwind CSS + Framer Motion  
**Hosting:** GitHub Pages  
**Status:** ✅ PROCEED

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
| S2 | Powiadomienia push | SHOULD |
| S3 | Share na social media | SHOULD |
| S4 | Wyszukiwarka słów | SHOULD |

---

## 2. Struktura Projektu

```
slowo-dnia/
├── src/
│   ├── components/
│   │   ├── WordCard.jsx
│   │   ├── Definition.jsx
│   │   ├── Examples.jsx
│   │   ├── FavoriteButton.jsx
│   │   ├── ShareButton.jsx
│   │   ├── ArchiveList.jsx
│   │   └── SearchBar.jsx
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
│   │   └── Favorites.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
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

## 4. Word of Day Algorithm

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

---

## 5. Tech Stack MVP

| Warstwa | Technologia |
|---------|-------------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Fonts | Google Fonts (Playfair Display, Merriweather, Inter) |
| State | React Context + localStorage |
| Routing | React Router v6 |
| Animacje | Framer Motion |
| Hosting | GitHub Pages |

---

## 6. Design Principles

- **Minimalizm:** Clean, focused on the word
- **Estetyka:** Piękna typografia = core experience
- **Mobile-first:** Touch-friendly, piękne na telefonie
- **Viral:** Easy share buttons
- **Polish:** Premium feel

### Color Palette

| Element | Kolor | Hex |
|---------|-------|-----|
| Primary | Deep Burgundy | #722F37 |
| Secondary | Gold | #C9A227 |
| Background | Cream | #FDF5E6 |
| Surface | White | #FFFFFF |
| Text | Dark Gray | #2C2C2C |
| Accent | Forest Green | #228B22 |

---

## 7. Timeline MVP

| Tydzień | Zadania |
|---------|---------|
| 1 | Setup projektu, baza 100 słów |
| 2 | WordCard, definicje, design |
| 3 | Ulubione, archiwum, search |
| 4 | Share, animacje, PWA, deploy |

---

## 8. Definition of Done (MVP)

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

## 9. Kluczowe Zasady Deweloperskie

1. **KISS** — Keep It Simple, Stupid. Prosty stack, minimalna złożoność.
2. **Mobile-first** — 70%+ ruchu z mobile. Design dla telefonu.
3. **Performance** — Fast load, graceful degradation.
4. **Accessibility** — Czytelne czcionki, wystarczający kontrast.
5. **Viral-first** — Każde słowo musi być "shareable".
6. **No backend (MVP)** — Dane w local JSON, stan w localStorage.
7. **Beautiful UI** — Piękna typografia = core experience.

---

## 10. Referencje Dokumentów

### Biznes
- [mvp-scoping.md](docs/biznes/mvp-scoping.md) — Zakres MVP
- [tech-stack.md](docs/biznes/tech-stack.md) — Tech Stack
- [icp-persona.md](docs/biznes/icp-persona.md) — Persona
- [kill-the-idea-slowo-dnia-komercyjna.md](docs/biznes/kill-the-idea-slowo-dnia-komercyjna.md) — Kill the idea

### Workflow
- [workflow-slowo-dnia.md](docs/biznes/workflow-slowo-dnia.md) — Kompletny workflow
- [resource-analysis.md](docs/biznes/resource-analysis.md) — Analiza zasobów

---

## 11. Koszty (MVP)

| Pozycja | Koszt |
|---------|-------|
| GitHub Pages | $0 |
| Domain (.pl) | ~50 PLN/rok |
| Google Fonts | $0 |
| **RAZEM** | **~50 PLN** |

---

_Central rules for AI Developer Agent. Detailed implementation rules in .kilocode/_