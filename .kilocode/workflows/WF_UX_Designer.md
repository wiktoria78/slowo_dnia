# WF_UX_Designer

**Cel:** Zaprojektować przepływ użytkownika (User Flows) i strukturę UX dla aplikacji "Słowo Dnia", zapewniając intuicyjne i wygodne doświadczenie.

---

## **1. Fundamentalna Zasada (The Success Equation)**

> **UX Success = User Goals Met + Zero Friction + Delight**

Jeśli użytkownik nie wie, co robić, UX się nie udał. Jeśli napotyka tarcie (friction), odejdzie. Jeśli doświadczenie jest przyjemne, zostanie na dłużej.

Twoim zadaniem jest stworzenie takich przepływów, w których użytkownik osiąga swój cel bez frustracji i z uśmiechem.

---

## **2. Definicja Sukcesu UX**

**Target User Personas:**

1. **Krytyk Literacki (35-55 lat)**  
   - Szuka precyzyjnych definicji
   - Ceni piękne słowa
   - Używa w pracy zawodowej
   - Chce wyglądać mądrze

2. **Student Języka Polskiego (20-25 lat)**  
   - Uczy się słownictwa
   - Potrzebuje przykładów użycia
   - Uwielbia ciekawostki językowe
   - Udostępnia znajomym

3. **Ekspresjonista (25-35 lat)**  
   - Szuka inspiracji do tworzenia
   - Pisze teksty, maile, posty
   - Lubi dzielić się pięknem
   - Ceni estetykę

**User Goals:**
- [ ] Szybko znaleźć interesujące słowo
- [ ] Zrozumieć znaczenie i kontekst
- [ ] Zapamiętać i użyć w praktyce
- [ ] Udostępnić znajomym
- [ ] Zbudować nawyk codziennej nauki

**UX Success Metrics:**
- [ ] Task success rate: >95% (użytkownik znajduje słowo)
- [ ] Time to first value: <10s (od wejścia do zobaczenia słowa)
- [ ] Error rate: <1% (błędy nawigacji)
- [ ] SUS Score: >85 (System Usability Scale)
- [ ] User satisfaction: >4.5/5

---

## **3. User Flows (Mapy Przepływów)

### **Flow 1: Landing → Słowo Dnia (Główny przepływ)

```
[Strona Główna]
      │
      ▼
[Ładowanie strony]
      │
      ├─ Czy to pierwsza wizyta?
      │     ├─ TAK → Pokaż tooltipa (1x)
      │     └─ NIE → Przejdź dalej
      │
      ▼
[Wyświetlenie Słowa Dnia]
      │
      ├─ [Słowo] + [Czcionka duża, wyeksponowana]
      │
      ├─ [Część mowy] + [Kolor akcentowy]
      │
      ├─ [Definicja] + [Czcionka czytelna, interlinia 1.6]
      │
      ├─ [Przykłady użycia] + [Pochylona czcionka, cytat]
      │
      ├─ [Etymologia] + [Ikona magnesu, mniejsza]
      │
      ├─ [Kategoria] + [Tag/chip]
      │
      ├─ [Przyciski akcji]
      │     ├─ ❤️ Dodaj do ulubionych
      │     ├─ 🔍 Szukaj podobnych
      │     └─ 📤 Udostępnij
      │
      ├─ [Estymata czasowa]
      │     └─ "To słowo było używane 13 dni temu"
      │
      └─ [Nawigacja poniżej]
            ├─ [← Poprzednie słowo]
            ├─ [📋 Archiwum]
            └─ [→ Następne słowo]
```

**User Actions:**
1. Wejście na stronę
2. (Opcjonalnie) Przeczytanie tooltipa
3. Przeczytanie słowa
4. Kliknięcie "Dodaj do ulubionych" (jeśli zainteresowany)
5. Przewinięcie w dół
6. Przejście do archiwum lub inne słowo

**Decision Points:**
- Czy dodać do ulubionych? (Zależne od zainteresowania)
- Czy przejść do archiwum? (Zależne od ciekawości)
- Czy udostępnić? (Zależne od wartości słowa)

**Friction Points to Avoid:**
- Zbyt wiele opcji na raz (overchoice)
- Trudno czytelna definicja
- Brak wyraźnego CTA
- Zbyt długie ładowanie
- Niezrozumiały interfejs

---

### **Flow 2: Archiwum → Przeglądanie Słów

```
[Strona Archiwum]
      │
      ▼
[Filtry i Szukaj]
      │
      ├─ [Search bar] - "Szukaj słowa lub definicji..."
      │
      ├─ [Filtry]
      │     ├─ Część mowy [Wszystkie ▼]
      │     ├─ Kategoria [Wszystkie ▼]
      │     └─ Data [Od - Do]
      │
      ▼
[Lista Słów - Paginacja]
      │
      ├─ [Słowo #100] + [Data: 13.04.2026]
      │     ├─ [Definicja - skrócona]
      │     └─ [Przycisk: Pokaż więcej →]
      │
      ├─ [Słowo #99] + [Data: 14.04.2026]
      │     ├─ [Definicja - skrócona]
      │     └─ [Przycisk: Pokaż więcej →]
      │
      └─ ... (10 słów na stronę)
            │
            ▼
      [Paginacja]
            ├─ [← Poprzednia]
            ├─ [Strona 1 z 10]
            └─ [Następna →]
```

**User Actions:**
1. Wejście na stronę archiwum
2. (Opcjonalnie) Użycie wyszukiwarki/filtrów
3. Przeglądanie listy słów
4. Kliknięcie "Pokaż więcej" dla interesującego słowa
5. Przejście do szczegółów słowa
6. (Opcjonalnie) Powrót do listy

**Decision Points:**
- Jakie słowo wybrać do przeczytania? (Zależne od tytułu/definicji)
- Kiedy przejść do następnej strony? (Po przeczytaniu obecnej)

**Friction Points to Avoid:**
- Brak paginacji (za dużo na raz)
- Wolne ładowanie kolejnych stron
- Niewyraźne filtry
- Brak podglądu treści

---

### **Flow 3: Ulubione → Zarządzanie Zapisanymi

```
[Strona Ulubione]
      │
      ▼
[Pasek narzędzi]
      │
      ├─ [Przycisk: Eksportuj do CSV]
      │
      ├─ [Wyszukiwarka]
      │
      └─ [Sortowanie: Po dacie ▼]
            ├─ Po dacie dodania (od najnowszych)
            ├─ Po dacie dodania (od najstarszych)
            └─ Alfabetycznie
            
      ▼
[Lista Ulubionych]
      │
      ├─ [Słowo #1] + [Data dodania]
      │     ├─ [Definicja - skrócona]
      │     ├─ [Ikona: ❤️]
      │     └─ [Przycisk: Usuń ×]
      │
      ├─ [Słowo #2] + [Data dodania]
      │     ├─ [Definicja - skrócona]
      │     ├─ [Ikona: ❤️]
      │     └─ [Przycisk: Usuń ×]
      │
      └─ (Brak słów: "Brak ulubionych słów")
            └─ [Przycisk: Przejdź do dzisiejszego słowa]
```

**User Actions:**
1. Wejście na stronę ulubionych
2. (Opcjonalnie) Użycie wyszukiwarki
3. Przeglądanie listy
4. Usuwanie słów (jeśli już nieaktualne)
5. Eksport do CSV (jeśli chce zapisać)

**Decision Points:**
- Jakie słowa usunąć? (Te, które już opanował)
- Czy eksportować do pliku? (Zależne od potrzeb)

**Friction Points to Avoid:**
- Trudno usunąć wiele naraz (brak multi-select)
- Brak potwierdzenia usuwania
- Zły feedback po usunięciu

---

## **4. Information Architecture (Struktura Informacji)

```
App (Poziom 1 - Globalny)
├─ Home (Poziom 2 - Główny ekran)
│  ├─ Header: Logo + Nawigacja
│  ├─ Hero: Słowo Dnia (Poziom 3 - Focal point)
│  │  ├─ Słowo (H1 - 48px, Bold)
│  │  ├─ Część mowy (H2 - 20px, Medium)
│  │  ├─ Definicja (P - 18px, Regular)
│  │  ├─ Przykłady (Blockquote - 16px, Italic)
│  │  ├─ Etymologia (P - 14px, Light)
│  │  └─ Kategoria (Chip - 12px)
│  ├─ Actions: [❤️] [🔍] [📤]
│  └─ Navigation: [←] [📋] [→]
│
├─ Archive (Poziom 2 - Lista)
│  ├─ Search Bar (Poziom 3 - Primary action)
│  ├─ Filters (Poziom 3 - Secondary action)
│  └─ List (Poziom 3 - Content)
│     ├─ Item 1 (Card)
│     ├─ Item 2 (Card)
│     └─ ...
│
├─ Favorites (Poziom 2 - Lista)
│  ├─ Toolbar (Poziom 3)
│  └─ List (Poziom 3 - Content)
│     ├─ Item 1 (Card with ❤️)
│     ├─ Item 2 (Card with ❤️)
│     └─ ...
│
└─ Footer (Poziom 2 - Globalny)
   ├─ Copyright
   └─ Links
```

---

## **5. Navigation Design (Nawigacja)

**Primary Navigation (Główna):**
- Strona Główna (Home)
- Archiwum
- Ulubione

**Location:**  
- Desktop: Header (top, centered)
- Mobile: Bottom navigation (sticky)

**Behavior:**
- Active state: Underline + color
- Hover: Color change
- Mobile: Icons + text

**Rationale:**
- Tylko 3 główne ekrany (KISS)
- Nawigacja zawsze widoczna
- Szybki powrót do home

---

## **6. Screen Layouts (Układy Ekranów)

### **Home Screen (Desktop - 1440px+)

```
┌─────────────────────────────────────────────────────────────┐
│  Logo          Home     Archive     Favorites           [☰]  │ ← Header
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                      [📖 Słowo Dnia]                        │ ← Title (subtle)
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                                                     │   │
│   │           [SERCECZE]                                 │   │ ← Słowo (72px, Bold)
│   │                                                     │   │
│   │              (rzeczownik)                            │   │ ← Część mowy (24px, Italic)
│   │                                                     │   │
│   │   Rzecz potoczna, karczmowa. Coś bardzo taniego,     │   │
│   │   często kiepskiej jakości. Używane często w kontekście │
│   │   jedzenia, ale nie tylko.                          │   │
│   │                                                     │   │
│   │   > "Zrobiliśmy z tego takie sercecze, że ledwo       │   │
│   │      można było je przełknąć."                       │   │
│   │                                                     │   │
│   │    [Etymologia: od słowa 'serce']                    │   │ ← Etymologia (14px)
│   │                                                     │   │
│   │   [🏷️ Potoczne]                                      │   │ ← Kategoria (Chip)
│   │                                                     │   │
│   │   [❤️] [🔍] [📤] [⏪ Wczoraj] [📋 Archiwum] [⏩ Jutro] │   ← Actions
│   │                                                     │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  © 2026 Słowo Dnia | Polityka prywatności | Kontakt        │ ← Footer
└─────────────────────────────────────────────────────────────┘
```

### **Home Screen (Mobile - 375px)

```
┌─────────────────────────────────────────┐
│  [☰]                                    │ ← Header (Mobile)
│  Logo          Słowo Dnia               │
├─────────────────────────────────────────┤
│                                         │
│      [📖 Dzień]                          │
│                                         │
│   ┌───────────────────────────────┐    │
│   │                               │    │
│   │      SERCECZE                  │    │
│   │                               │    │
│   │     (rzeczownik)               │    │
│   │                               │    │
│   │   Rzecz potoczna, karczmowa.  │    │
│   │   Coś bardzo taniego, często   │    │
│   │   kiepskiej jakości. Używane   │    │
│   │   często w kontekście jedzenia │    │
│   │   [...więcej]                  │    │
│   │                               │    │
│   │   [Etymologia: od 'serce']     │    │
│   │                               │    │
│   │   [🏷️ Potoczne]                 │    │
│   │                               │    │
│   │   [❤️][🔍][📤]  [⏪][📋][⏩]       │    │
│   │                               │    │
│   └───────────────────────────────┘    │
│                                         │
├─────────────────────────────────────────┤
│  Bottom Nav: [🏠] [📋] [❤️] [🔍] [⚙️]    │
└─────────────────────────────────────────┘
```

### **Archive Screen (Desktop)

```
┌─────────────────────────────────────────────────────────────┐
│  Logo          Home     Archive     Favorites           [☰]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Archive                                               │  │
│  │  Przeglądaj wszystkie słowa z naszej bazy              │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────┐  ┌───────────────────────────┐    │
│  │  [🔍 Szukaj...]      │  │  [Kategoria: Wszystkie ▼] │    │
│  └─────────────────────┘  └───────────────────────────┘    │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │  #98  |  13.04.2026                              │  │  │
│  │  │  SERCECZE                                         │  │  │
│  │  │  Rzecz potoczna, karczmowa...                    │  │  │
│  │  │  [Pokaż więcej →]                                │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │  #97  |  14.04.2026                              │  │  │
│  │  │  MIŁOŚĆ                                             │  │  │
│  │  │  Czucie wyższe, zmysłowe...                       │  │  │
│  │  │  [Pokaż więcej →]                                │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │  ... (8 więcej)                                       │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │  [← Poprzednia]     Strona 1 z 10     [Następna →]│  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### **Favorites Screen (Mobile)

```
┌─────────────────────────────────────────┐
│  [←]  Ulubione                          │
├─────────────────────────────────────────┤
│  [📤 Eksport]  [🔍 Szukaj...]           │
│                                         │
│  ┌───────────────────────────────┐    │
│  │  ❤️ SERCECZE                  │    │
│  │  13.04.2026                   │    │
│  │  Rzecz potoczna, karczmowa    │    │
│  │  [Usuń ×]                     │    │
│  ├───────────────────────────────┤    │
│  │  ❤️ MIŁOŚĆ                    │    │
│  │  12.04.2026                   │    │
│  │  Czucie wyższe, zmysłowe      │    │
│  │  [Usuń ×]                     │    │
│  ├───────────────────────────────┤    │
│  │  (Brak więcej ulubionych)     │    │
│  └───────────────────────────────┘    │
│                                         │
├─────────────────────────────────────────┤
│  [🏠] [📋] [❤️] [🔍] [⚙️]               │
└─────────────────────────────────────────┘
```

---

## **7. Component Specifications (Specyfikacje Komponentów)

### **WordCard Component**
```
Props:
  - word: string (required)
  - partOfSpeech: string
  - definition: string (required)
  - examples: string[]
  - etymology: string
  - category: string
  - isFavorite: boolean
  - onFavoriteToggle: () => void
  - onShare: () => void

Layout:
  ┌─────────────────────────────────┐
  │  [Word]                          │
  │  (partOfSpeech)                  │
  │                                 │
  │  Definition                     │
  │                                 │
  │  > "Example"                    │
  │                                 │
  │  [🏷️ category]  [❤️] [📤]        │
  └─────────────────────────────────┘
```

### **ActionButton Component**
```
Props:
  - icon: ReactNode
  - label: string (for a11y)
  - onClick: () => void
  - variant: 'primary' | 'secondary' | 'ghost'

States:
  - default: Normal appearance
  - hover: Scale 1.05, shadow
  - active: Scale 0.95
  - disabled: Opacity 0.5, no interaction
```

### **SearchBar Component**
```
Props:
  - placeholder: string
  - value: string
  - onChange: (value: string) => void
  - onSearch: () => void

Features:
  - Debounced input (300ms)
  - Clear button (×)
  - Auto-focus on mount (mobile)
```

---

## **8. Responsive Design (Punkty Przerwania)

| Breakpoint | Width | Layout Changes |
|-----------|-------|----------------|
| Mobile | < 640px | Single column, bottom nav, larger touch targets |
| Tablet | 640px - 1024px | Two columns optional, side nav optional |
| Desktop | > 1024px | Full layout, multi-column cards |
| Wide | > 1440px | Max-width container, centered content |

**Mobile-First Approach:**
- Start with mobile layout
- Add features for larger screens
- Touch targets ≥ 44px
- Font sizes scale up

---

## **9. Accessibility (Dostępność)

### **WCAG 2.1 AA Compliance:**

**Color Contrast:**
- Text vs Background: ≥ 4.5:1
- Large text: ≥ 3:1
- Interactive elements: ≥ 3:1

**Keyboard Navigation:**
- All interactive elements reachable via Tab
- Logical tab order
- Visible focus indicator
- Skip links for main content

**Screen Readers:**
- ARIA labels on icon buttons
- Semantic HTML (h1-h6, nav, main, section)
- Alt text on images
- Live regions for dynamic content

**Motion:**
- Respect `prefers-reduced-motion`
- Option to disable animations
- No flashing content (>3 flashes/sec)

**Forms:**
- Labels on all inputs
- Error messages announced
- Success feedback provided

---

## **10. Interaction Design (Interakcje)

### **Micro-interactions:**

**1. Favorite Toggle:**
```
Default: Heart outline (gray)
Hover: Scale 1.1
Active: Heart fills with red, slight bounce
Feedback: Toast "Dodano do ulubionych" or "Usunięto"
```

**2. Share Button:**
```
Default: Share icon
Click: Options appear (slide up on mobile)
Hover: Background highlight
Feedback: Tooltip "Udostępnij"
```

**3. Word Load:**
```
State 1: Skeleton loader (gray blocks)
State 2: Fade-in word (opacity 0 → 1)
State 3: Slide-in examples (transform)
Duration: 300-500ms total
```

### **Transitions:**

- Page transitions: Fade (200ms)
- Element entrance: Slide up (300ms)
- Hover states: Color (150ms), Scale (150ms)
- Loading states: Pulse animation

---

## **11. Typography System (System Typograficzny)

### **Font Families:**
- Display: Playfair Display (serif, elegant)
- Body: Merriweather (serif, readable)
- UI: Inter (sans-serif, clean)

### **Scale:**
```
H1 (Słowo): 48px / 60px (Desktop)
            36px / 44px (Mobile)

H2 (Część mowy): 24px / 32px

H3 (Section): 20px / 28px

Body (Definicja): 18px / 28px

Small (Etymologia): 14px / 20px

Caption (Metadata): 12px / 16px
```

### **Weights:**
- Bold (700): Headings, important text
- SemiBold (600): Sub-headings
- Regular (400): Body text
- Italic: Examples, quotes

---

## **12. Color Palette (Paleta Kolorów)

### **Primary Colors:**
```
Deep Burgundy: #722F37 (Accent, CTAs)
Gold: #C9A227 (Highlights, secondary)
```

### **Neutrals:**
```
Background: #FDF5E6 (Cream)
Surface: #FFFFFF (White)
Text: #1A1A1A (Dark gray)
Muted: #666666 (Secondary text)
Border: #E5E5E5 (Light gray)
```

### **Semantic:**
```
Success: #228B22 (Forest green)
Warning: #D4A017 (Amber)
Error: #CC3333 (Red)
Info: #4A90D9 (Blue)
```

---

## **13. Spacing System (System Odstępów)

**Base unit: 8px**

```
XS: 4px    (Half unit)
S:  8px    (1 unit) - Tight spacing
M:  16px   (2 units) - Standard spacing
L:  24px   (3 units) - Comfortable spacing
XL: 32px   (4 units) - Section spacing
XXL: 48px  (6 units) - Major section break
```

**Application:**
- Between elements: M (16px)
- Between sections: L (24px)
- Page padding (mobile): M (16px)
- Page padding (desktop): XL (32px)
- Container max-width: 1200px

---

## **14. Usability Testing Plan (Plan Testów)

### **Test Scenarios:**

**Task 1: Find Today's Word**
- Success criteria: Finds it in <10s
- Measures: Time to first value

**Task 2: Add to Favorites**
- Success criteria: Successfully saves and sees feedback
- Measures: Completion rate

**Task 3: Navigate to Archive**
- Success criteria: Reaches archive and browses words
- Measures: Path efficiency

**Task 4: Search for Specific Word**
- Success criteria: Finds word using search
- Measures: Search success rate

**Task 5: Share a Word**
- Success criteria: Can initiate sharing flow
- Measures: Feature discoverability

### **Testing Methods:**
- 5-user usability test (Nielsen method)
- A/B test on CTA placement
- Heatmap analysis (scroll, clicks)
- Session recordings
- Survey (SUS - System Usability Scale)

### **Iteration Cycle:**
1. Test with 5 users
2. Identify issues
3. Fix critical problems
4. Test again with 3 new users
5. Ship or iterate

---

## **15. Metrics & Analytics (Metryki)

### **Funnel Metrics:**
```
Landing → View Word: >95%
View Word → Add to Favorites: >20%
Add to Favorites → Return: >40%
Return → Habit (7 days): >30%
```

### **Behavioral Metrics:**
- Scroll depth on word page
- Time on page
- Click-through rate on actions
- Navigation patterns
- Mobile vs desktop usage

### **Qualitative Metrics:**
- User satisfaction (survey)
- Net Promoter Score (NPS)
- Feedback sentiment
- Support tickets

---

## **16. Red Flags (Ostrzeżenia UX)

🚩 **Immediate Concerns:**
- User can't find today's word in <10s
- More than 2 clicks to add to favorites
- Form inputs without labels
- Color contrast < 4.5:1
- No keyboard navigation

🚩 **Design Violations:**
- Deviating from component library
- Inconsistent spacing
- Multiple font families mixed
- Wrong color usage (semantic colors)
- Missing focus states

🚩 **User Flow Issues:**
- Dead ends (no way back)
- Infinite loops
- Broken navigation
- Surprise behaviors
- Unclear current location

---

## **17. Instrukcja dla Agentów (System Prompt)

> Kiedy wywołasz `WF_UX_Designer`, Twoim celem jest:
> 1. Zaprojektować przepływy użytkownika (User Flows) dla każdego zadania
> 2. Stworzyć mapy informacji (Information Architecture)
> 3. Zdefiniować układy ekranów (wireframy opisu)
> 4. Określić specyfikacje komponentów
> 5. Upewnić się, że przepływ ma jasne punkty decyzyjne i minimalne tarcie
> 6. Zaprojektować z myślą o accessibility (WCAG 2.1 AA)
> 7. Zapewnić spójność (design system)
> 
> Bądź empatyczny: traktuj każdego użytkownika z szacunkiem i pomyśl, jak sprawić, by miał przyjemność z korzystania z aplikacji. Testuj swoje przepływy samemu (w wyobraźni) i poprawiaj, aż będą idealne.

---

## **18. Definition of Done (UX Designer)

- [ ] User flows zdefiniowane dla wszystkich głównych zadań
- [ ] Information architecture stworzona
- [ ] Screen layouts dla wszystkich ekranów
- [ ] Component library zdefiniowana
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Accessibility audit wykonany
- [ ] Interaction design zdefiniowany
- [ ] Typography system zdefiniowany
- [ ] Color palette zdefiniowana
- [ ] Spacing system zdefiniowany
- [ ] Usability testing plan stworzony
- [ ] Metrics zdefiniowane
- [ ] Design system spójny

---

_Created by UX Designer Agent_  
_Last updated: 2026-04-30_