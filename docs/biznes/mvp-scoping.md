# WF_MVP_Scoping — Słowo Dnia

**Data:** 2026-03-15  
**Autor:** SaaS Architect & Business Auditor  
**Wersja:** 1.0  
**Status:** DOKUMENTACJA MVP  
**Projekt:** Słowo Dnia (aplikacja3)

---

## 1. Executive Summary

Niniejszy dokument definiuje zakres MVP (Minimum Viable Product) dla **Słowo Dnia** — aplikacji, która każdego dnia prezentuje piękne, rzadko używane polskie słowo, pomagając użytkownikom wzbogacić słownictwo i mówić piękniej po polsku.

**Kluczowe założenia MVP:**

| Aspekt | Założenie |
|--------|-----------|
| **Produkt** | Aplikacja do nauki pięknych polskich słów |
| **Model** | Freemium + Newsletter |
| **Target** | Miłośnicy języka polskiego, osoby chcące wzbogacić słownictwo |
| **Cena** | Free (1 słowo/dzień), Premium 19 PLN/miesiąc |
| **Dev time** | 2-4 tygodnie (Solo-Dev) |
| **Dane** | Local JSON (500 słów) |

**Core Value Proposition:** Codzienna dawka pięknego polskiego słowa — prosta, viralowa, niszowa aplikacja z wysokim potencjałem społecznościowym.

**Wynik Kill-The-Idea:** ✅ PROCEED — jeden z najlepszych pomysłów!

---

## 2. Strategic Context

### 2.1 Problem Statement

- **Problem:** Ludzie chcą mówić piękniej, ale nie znają rzadkich, pięknych polskich słów
- **Kontekst:** "Słowo dnia" format jest popularny na TikToku (potwierdzony trend)
- **Wartość:** Wzbogacenie słownictwa = lepsza komunikacja, większa pewność siebie
- **Rozmiar rynku:** Miliony osób mówiących po polsku

### 2.2 Unikalna Propozycja Wartości

| Element | Opis |
|---------|------|
| **Polska nisza** | Jedyna taka aplikacja w języku polskim |
| **Format** | "Word of the day" = sprawdzony model (Wordnik) |
| **Viral** | Piękne słowa = naturalny content na social media |
| **Low maintenance** | Brak API, statyczna baza = minimalna praca |

---

## 3. MVP Features — Priorytetyzacja

### 3.1 Feature Matrix (MoSCoW)

| ID | Feature | Priorytet | Złożoność | Czas | Uzasadnienie |
|----|---------|-----------|-----------|------|--------------|
| **M1** | Wyświetlanie słowa dnia | MUST | Niska | 1 dzień | Core function |
| **M2** | Baza 100 pięknych słów | MUST | Niska | 3 dni | Core content |
| **M3** | Definicja + przykłady | MUST | Niska | 1 dzień | Core value |
| **M4** | Słowo na dziś (data) | MUST | Niska | 1 dzień | Core mechanic |
| **M5** | Zapis ulubionych | MUST | Niska | 1 dzień | Retencja |
| **S1** | Archiwum poprzednich słów | SHOULD | Niska | 1 dzień | User value |
| **S2** | Powiadomienia push | SHOULD | Średnia | 2 dni | Retencja |
| **S3** | Share na social media | SHOULD | Niska | 1 dzień | Viral driver |
| **S4** | Wyszukiwarka słów | SHOULD | Niska | 1 dzień | UX improvement |
| **C1** | Quiz/ćwiczenia | COULD | Średnia | 3 dni | Engagement |
| **C2** | Newsletter email | COULD | Średnia | 2 dni | Alternative delivery |
| **C3** | TTS (text-to-speech) | COULD | Niska | 1 dzień | Accessibility |
| **W1** | User accounts | WON'T | Wysoka | Out of scope | MVP |
| **W2** | Panel admina | WON'T | Wysoka | Out of scope | MVP |
| **W3** | Forum społeczności | WON'T | Wysoka | Out of scope | v2 |

### 3.2 Szczegółowy Opis Features MUST

#### **M1: Wyświetlanie Słowa Dnia**

```
Funkcjonalność:
- Główne widok: piękne słowo + definicja
- Duża typografia dla estetyki
- Automatyczna zmiana o północy (lub co 24h od pierwszej wizyty)
- Animacja pojawiania się słowa

User Stories:
1. Jako użytkownik chcę widzieć słowo dnia od razu po wejściu
2. Jako użytkownik chcę czytać pięknie sformatowane słowo

Tech: React + Tailwind + CSS animations
```

#### **M2: Baza 100 Pięknych Słów**

```
Struktura słowa:
{
  "word": "dyletant",
  "definition": "osoba zajmująca się czymś bez wymaganych kwalifikacji; amator",
  "examples": [
    "Ten dyletant wziął się za naprawę samochodu i tylko pogorszył sprawę.",
    "Nie jestem dyletantem - studiowałem to przez pięć lat."
  ],
  "etymology": "od włoskiego dilettante, z łaciny dilectare = rozkoszować się",
  "partOfSpeech": "rzeczownik, rodzaj męski",
  "category": "charakterystyka osoby",
  "synonyms": ["amator", "laik"]
}

Wymagania:
- 100 starannie wyselekcjonowanych słów
- Kategorie: natura, uczucia, cechy, sytuacje
- Piękne, ale użyteczne słowa
- Research: słowniki polskie, literatura

Tech: local JSON file
```

#### **M3: Definicja + Przykłady**

```
Funkcjonalność:
- Definicja (1-2 zdania)
- 2 przykłady użycia w zdaniu
- Etymologia (krótko)
- Part of speech
- Kategoria tematyczna

Design:
- Piękna typografia (Playfair Display / Merriweather)
- Duże słowo jako hero element
- Karty z definicją i przykładami
```

#### **M4: Słowo na Dziś (Data-based)**

```
Funkcjonalność:
- Obliczanie słowa na podstawie daty
- Algorytm: dzień_roku % liczba_słów
- To samo słowo dla wszystkich tego dnia
- Nowe słowo każdego dnia o północy

Tech: JavaScript Date + modulo
```

#### **M5: Zapis Ulubionych**

```
Funkcjonalność:
- Przycisk "❤️ Zapisz" na każdym słowie
- Lista ulubionych (localStorage)
- Możliwość usunięcia
- Export listy (opcjonalnie)

Tech: localStorage API
```

---

## 4. User Journey Map

### 4.1 Ścieżka Użytkownika (Happy Path)

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│ Landing │ ──► │ Słowo   │ ──► │ Czytaj  │ ──► │ Zapisz  │
│ Page    │     │ Dnia    │     │ Dalej   │     │ Ulubione│
└─────────┘     └─────────┘     └─────────┘     └─────────┘
      │
      ▼
┌─────────┐     ┌─────────┐
│ Archiwum│ ──► │ Szukaj  │
│         │     │         │
└─────────┘     └─────────┘
```

### 4.2 User Stories Szczegółowe

| Persona | Story | Kryteria akceptacji |
|---------|-------|---------------------|
| Użytkownik | Chcę widzieć słowo dnia | Słowo widoczne od razu, pięknie sformatowane |
| Użytkownik | Chcę zrozumieć znacienie | Definicja widoczna, przykłady pomocne |
| Użytkownik | Chcę zapisać słowo | Kliknięcie = zapis, po odświeżeniu nadal jest |
| Użytkownik | Chcę przeglądać archiwum | Widzę listę poprzednich słów |
| Użytkownik | Chcę się dzielić | Przycisk share = link/-obraz |
| Użytkownik | Chcę powiadomienia | O północy/ustaloną godzinę |

---

## 5. Technical Architecture

### 5.1 Tech Stack MVP

| Warstwa | Technologia | Koszt |
|---------|-------------|-------|
| **Frontend** | React + Vite | $0 |
| **Styling** | Tailwind CSS + Google Fonts | $0 |
| **Dane** | Local JSON (100 słów) | $0 |
| **State** | React Context + localStorage | $0 |
| **Routing** | React Router v6 | $0 |
| **Animacje** | Framer Motion | $0 |
| **Hosting** | Vercel | $0 |
| **Domena** | slowodnia.pl | ~50 PLN/rok |
| **Razem** | | **~50 PLN** |

### 5.2 Struktura Projektu

```
slowo-dnia/
├── public/
│   └── favicon.ico
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
│   │   └── useWordOfDay.js
│   ├── context/
│   │   └── AppContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Archive.jsx
│   │   └── Favorites.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

### 5.3 Word of Day Algorithm

```javascript
// useWordOfDay.js
const getWordOfDay = (words) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  // Selection based on day of year (same word for everyone on same day)
  const index = dayOfYear % words.length;
  return words[index];
};
```

### 5.4 Data Structure

```javascript
// words.json (sample)
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
    "synonyms": ["amator", "laik"]
  }
]
```

---

## 6. Timeline & Milestones

### 6.1 Harmonogram MVP (4 tygodnie)

| Tydzień | Zadania | Deliverable |
|---------|---------|-------------|
| **Tydzień 1** | Setup projektu, baza 100 słów | Projekt + dane gotowe |
| **Tydzień 2** | WordCard, definicje, design | Główny widok działa |
| **Tydzień 3** | Ulubione, archiwum, search | Funkcjonalności |
| **Tydzień 4** | Share, animacje, PWA, deploy | MVP na produkcji |

### 6.2 Definition of Done (MVP)

- [x] Widok słowa dnia działa
- [x] 1388 pięknych słów w bazie
- [x] Definicje i przykłady wyświetlane
- [x] Zapis ulubionych działa (localStorage)
- [x] Archiwum poprzednich słów
- [x] Share na social media
- [x] Mobile responsive
- [x] Piękna typografia i design
- [x] Deploy na GitHub Pages (2026-04-18)

**Status:** ✅ UKOŃCZONE (2026-04-18)

---

## 7. UI/UX Considerations

### 7.1 Design Principles

| Zasada | Implementacja |
|--------|---------------|
| **Minimalizm** | Clean, focused on the word |
| **Estetyka** | Piękna typografia = core experience |
| **Mobile-first** | Touch-friendly |
| **Viral** | Easy share |
| **Polish** | Premium feel |

### 7.2 Color Palette (Propozycja)

| Element | Kolor | Hex |
|---------|-------|-----|
| Primary | Deep Burgundy | #722F37 |
| Secondary | Gold | #C9A227 |
| Background | Cream | #FDF5E6 |
| Surface | White | #FFFFFF |
| Text | Dark Gray | #2C2C2C |
| Accent | Forest Green | #228B22 |

### 7.3 Typography

| Element | Font | Waga |
|---------|------|------|
| **Słowo hero** | Playfair Display | 700 (bold) |
| **Definicja** | Merriweather | 400 (regular) |
| **Przykłady** | Merriweather | 400 italic |
| **UI elements** | Inter | 500 |

### 7.4 Component States

```
FavoriteButton:
- Default: Outline heart, gray
- Hover: Scale(1.1), primary color
- Active/Favorited: Filled heart, burgundy (#722F37)

WordCard:
- Default: Cream background, subtle shadow
- Appear: Fade in + slide up animation
- Hover: Slight elevation
```

---

## 8. Content Strategy

### 8.1 Słowa Kategorie

| Kategoria | Przykłady | Liczba |
|-----------|-----------|--------|
| **Cechy charakteru** | dyletant, szczerość, odwaga | 25 |
| **Natura** | zmierzch, południe, szept | 20 |
| **Uczucia** | tęsknota, radość, nadzieja | 20 |
| **Sytuacje** | dyletant, zaskoczenie, spokój | 15 |
| **Inne** | architektura, tradycja | 20 |

### 8.2 Kryteria Wyboru Słów

| Kryterium | Opis |
|-----------|------|
| **Piękno** | Dźwięczne, melodyjne |
| **Użyteczność** | Można użyć w codziennej rozmowie |
| **Nieznane** | Rzadkie, nieoczywiste |
| **Pozytywne** | Preferowane (opcjonalnie negatywne) |
| **Polskie** | Wyłącznie słowiańskie pochodzenie |

### 8.3 Źródła

- Słownik języka polskiego PWN
- Słownik wyrazów obcych
- Literatura polska (cytaty)
- Polskie przysłowia

---

## 9. Testing Strategy

### 9.1 Test Types

| Typ | Narzędzie | Coverage |
|-----|-----------|----------|
| **Unit** | Vitest | Funkcje pomocnicze |
| **Component** | React Testing Library | Komponenty UI |
| **Manual** | - | UX, content |

### 9.2 Test Scenarios

| Scenariusz | Oczekiwany wynik |
|------------|------------------|
| Pierwsza wizyta | Widzę słowo dnia |
| Odświeżenie (inny dzień) | Inne słowo |
| Zapis ulubionego | Po odświeżeniu nadal jest |
| Share button | Generuje obraz/link |
| Mobile view | Pięknie wygląda |

---

## 10. Post-MVP Roadmap

### 10.1 Faza 2 (Po MVP)

| Feature | Priorytet | Estymacja |
|---------|-----------|-----------|
| Powiadomienia push | S1 | 1 tydzień |
| Newsletter email | S1 | 1 tydzień |
| Quiz/ćwiczenia | C1 | 2 tygodnie |
| TTS (text-to-speech) | C2 | 2 dni |
| Więcej słów (500) | S1 | 2 tygodnie |

### 10.2 Monetyzacja v2

| Plan | Cena | Funkcje |
|------|------|---------|
| Free | 0 PLN | 1 słowo/dzień |
| Premium | 19 PLN/mies | Archiwum + powiadomienia |
| Newsletter | 9 PLN/mies | Email słowo/dzień |
| Merch | - | Kubki, plakaty |

---

## 11. Risks & Mitigations

| Ryzyko | Prawdopodobieństwo | Impact | Mitigacja |
|--------|-------------------|--------|-----------|
| Mało słów w bazie | Niskie | Niski | Start z 100, rozrastaj |
| Nikt nie używa | Średnie | Wysoki | TikTok marketing |
| Konkurencja | Niskie | Niski | Szybki start = brand |
| Słowa nieinteresujące | Średnie | Średni | User feedback |

---

## 12. Co Dalej?

| Status | Krok |
|--------|------|
| ✅ | Wybrano Słowo Dnia |
| ✅ | WF_Kill_The_Idea — PROCEED ✅✅✅ |
| ✅ | **WF_MVP_Scoping — UKOŃCZONE** |
| ✅ | Zbieranie 1388 pięknych słów |
| ✅ | Setup projektu |
| ✅ | Build MVP |
| ✅ | Deploy na GitHub Pages |
| ⏳ | Zakup domeny slowodnia.pl |
| ⏳ | Marketing/Growth |

**Aktualny status (2026-04-18):** MVP ~90% gotowy

---

## 13. Viral Content Strategy

### 13.1 TikTok/Reels Format

| Format | Opis | Przykład |
|--------|------|----------|
| **Slow motion reveal** | Piękne pojawienie się słowa | "To słowo zmieni Twoje życie..." |
| **Definition reading** | Czytanie definicji | "Łagodność to nie słabość..." |
| **Use in sentence** | Użycie w zdaniu | "Dzisiaj nauczyłem się słowa..." |
| **Story** | Krótka historia | "Poszedłem na randkę i..." |

### 13.2 Content Calendar

| Dzień | Format |
|-------|--------|
| Poniedziałek | Motivational word |
| Wtorek | Nature word |
| Środa | Feeling word |
| Czwartek | Character trait |
| Piątek | Fun/obscure word |
| Sobota | Archive highlight |
| Niedziela | Week summary |

---

_Dokument przygotowany w ramach workflow WF_MVP_Scoping._  
_Wersja: 1.0 | Data: 2026-03-15 | Autor: SaaS Architect & Business Auditor_
