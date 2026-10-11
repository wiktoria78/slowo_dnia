# Plan wdrożenia: WordCard - Komponent Karty Słowa

## 1. Cel biznesowy

Stworzenie atrakcyjnego, interaktywnego komponentu wyświetlającego słowo dnia z pełnym zestawem informacji (definicja, przykłady, etymologia, kategorie, synonimy) oraz funkcjonalnością ulubionych i udostępniania. Komponent ma być centralnym elementem UX aplikacji, budującym "piękny design" jako kluczowy atrybut marki.

## 2. Zakres

### Wymagania funkcjonalne
- [x] Wyświetlanie słowa (typografia hero)
- [x] Wyświetlanie definicji
- [x] Wyświetlanie części mowy (italiczną czcionką)
- [x] Sekcja synonymów (jako tagi/chips)
- [x] Expandable section: Przykłady użycia (złożone)
- [x] Expandable section: Etymologia (złożone)
- [x] Kategoria jako chip/sticker
- [x] Przycisk Ulubione (toggle) z ikoną serca
- [x] Przycisk Udostępnij (Share)
- [x] Animacje wejścia (motion)
- [x] Responsywność (mobile-first)

### Wymagania niefunkcjonalne
- [x] Czas pierwszego renderu (TTI) < 100ms dla statycznego HTML
- [x] Płynne animacje 60fps
- [x] Kontrast WCAG AA (minimum 4.5:1 dla tekstu)
- [x] Dostępność klawiaturowa (focus states)
- [x] Semantic HTML (h1, h2, p, button)
- [x] Brak re-renderów niepotrzebnych (React.memo opcjonalnie)

### Wymagania techniczne
- Komponent: `WordCard.jsx`
- Animacje: `framer-motion`
- Hooki: `useFavorites`, `useWordOfDay`
- Stylowanie: Tailwind CSS + CSS Variables
- Fonty: Playfair Display (tytuł), Merriweather (tekst), Inter (UI)

## 3. Wymagania funkcjonalne (szczegółowe)

### 3.1. Hierarchia wizualna
1. **Słowo główne** (5xl, bold, primary color, font-display)
2. **Część mowy** (italic, text-muted, font-body)
3. **Definicja** (lg, leading-relaxed, font-body)
4. **Synonimy** (sm, tag-style, primary/secondary)
5. **Rozwijane sekcje**:
   - Przykłady (italic, quote style)
   - Etymologia (sm, readable)
6. **Kategoria** (chip, secondary background)
7. **Akcje** (przyciski: ulubione + share)

### 3.2. Interakcje

**Przycisk "Ulubione" (toggle)**
- Stan domyślny: obrysowany serce (♡), primary color
- Stan aktywny: wypełnione serce (♥), primary bg, white text
- Hover: scale 1.05, opacity 0.9
- Tap: scale 0.95
- Animacja Framer Motion

**Przycisk "Udostępnij" (share)**
- Stan domyślny: ikona share
- Stan "skopiowano": ikona checkmark, green bg
- Timeout powrotu do domyślnego: 2s
- Web Share API (mobile) lub Clipboard API (desktop)
- Hover/tap animacje jak wyżej

**Rozwijane sekcje (Przykłady, Etymologia)**
- Stan zwinięty: strzałka ▶ (90deg transform), tekst "Przykłady użycia"
- Stan rozwinięty: strzałka ▼, wysokość auto, fadeIn
- Kliknięcie przełącza stan
- Smooth height transition (motion)
- Border-left akcentowy (secondary/30)

**Karta ogólna**
- Biały background, zaokrąglone rogi (xl / 2xl)
- Cień (shadow-lg)
- Hover: cienie mocniejsze (shadow-xl)
- Padding responsywny (p-8 md:p-12?)

### 3.3. Responsywność
- **Mobile (< 640px)**:
  - Font-size słowa: 2.5rem (4xl)
  - Padding: p-6
  - Przyciski: full-width, stack w kolumnę
  - Margins: mniejsze

- **Tablet (640px - 1024px)**:
  - Font-size słowa: 3rem (5xl)
  - Padding: p-8
  - Przyciski: flex-row gap-4

- **Desktop (> 1024px)**:
  - Font-size słowa: 5xl (3rem+)
  - Max-width: 2xl (max-w-2xl)
  - Centrowanie: mx-auto

## 4. Kontekst techniczny

### 4.1. Architektura komponentu
```
WordCard (container)
  ├── Motion.div (animacja wejścia)
  │   ├── Header (słowo + część mowy)
  │   ├── Definition
  │   ├── Synonyms (map)
  │   ├── ExpandableSection "Przykłady"
  │   │     └── Motion.div (height/opacity)
  │   ├── ExpandableSection "Etymologia"
  │   │     └── Motion.div (height/opacity)
  │   ├── Category (chip)
  │   └── Actions (row)
  │         ├── FavoriteButton (motion.button)
  │         └── ShareButton (component)
  └── (wszystko animowane w/w out)
```

### 4.2. Modele props
```typescript
interface WordCardProps {
  word: Word | null;
  showFavoriteButton?: boolean; // domyślnie true
}
```

### 4.3. Hooki i zależności
- `useFavorites()` - toggle/state
- `useWordOfDay()` - nie używane bezpośrednio (przekazywane przez props)
- `useState` - showExamples, showEtymologia
- `useEffect` - brak (ew. do analityki)

### 4.4. Stylowanie CSS
- Variables: `--color-primary`, `--color-secondary`, `--color-background`, etc.
- Fonty: @import przez @tailwind, ale z Google Fonts w index.html
- Z-index: dropdowny, animacje
- Utility classes: max-w-2xl, mx-auto, rounded-2xl, shadow-lg, p-8

### 4.5. Integracje
- `ShareButton.jsx` - podkomponent (niezależny)
- `useFavorites` - do toggle ulubionych
- `WordCard` eksportowany domyślnie
- Używany w: `Home.jsx`, `Favorites.jsx` (z showFavoriteButton={false})

## 5. Kroki implementacji

### 5.1. Struktura statyczna
1. Container: motion.div z initial/animate
2. Sekcja słowa: h1 + italic
3. Sekcja definicji: h2 + p
4. Sekcja synonimów: h2 + div flex-wrap
5. Przyciski toggle: button flex items-center gap-2
6. Rozwijane sekcje: AnimatePresence + motion.div
7. Kategoria: span chip
8. Przyciski akcji: flex gap-4

### 5.2. Logika interakcji
```javascript
const [showExamples, setShowExamples] = useState(false);
const [showEtymology, setShowEtymology] = useState(false);
const { toggleFavorite, isFavorite } = useFavorites();

const favorite = word ? isFavorite(word.id) : false;

const handleToggle = () => word && toggleFavorite(word);
```

### 5.3. Animacje Framer Motion
```javascript
// Wejście karty
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
/>

// Rozwijanie sekcji
<AnimatePresence>
  {showExamples && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
    />
  )}
</AnimatePresence>

// Przyciski
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>
```

### 5.4. Warunki brzegowe w renderowaniu
- `if (!word) return null;` - wczesne wyjście
- Sprawdzenie `word.examples?.length` przed renderowaniem
- Sprawdzenie `word.synonyms?.length` przed renderowaniem
- Renderowanie warunkowe przycisku showFavoriteButton (prop)

### 5.5. Responsywność (Tailwind)
- `text-5xl md:text-6xl` dla słowa
- `max-w-2xl mx-auto` dla container
- `flex-col md:flex-row` dla akcji
- `p-6 md:p-8` dla paddingu
- `text-sm md:text-base` dla tekstów drugorzędnych

## 6. Kryteria akceptacji

### 6.1. Wygląd i styl
- [x] Typografia zgodna z design systemem (Playfair, Merriweather, Inter)
- [x] Kolory zgodne z paletą (#722F37, #C9A227, #FDF5E6)
- [x] Cienie widoczne i estetyczne (shadow-lg, hover:shadow-xl)
- [x] Zaokrąglenia rogów poprawne (rounded-2xl)
- [x] Spacje (padding, margin) zachowane proporcjonalnie

### 6.2. Interakcje
- [x] Animacja wejścia karty działa (fadeIn + slideUp)
- [x] Rozwijanie sekcji ma animację wysokości i przezroczystości
- [x] Serce animuje się (scale) na hover i tap
- [x] Share button zmienia kolor po kliknięciu
- [x] Efekt hover na przyciskach jest widoczny
- [x] Karta reaguje na hover (zmiana cienia)

### 6.3. Funkcjonalność
- [x] Kliknięcie serca dodaje do ulubionych
- [x] Ponowne kliknięcie usuwa z ulubionych
- [x] Stan zapamiętywany po odświeżeniu (localStorage)
- [x] Udostępnianie działa (Web Share API lub Clipboard)
- [x] Kliknięcie rozwija/przypina sekcje przykładów
- [x] Kliknięcie rozwija/przypina sekcję etymologii
- [x] Kategoria widoczna jako chip
- [x] Synonimy widoczne jako tagi

### 6.4. Responsywność
- [x] Na mobile (< 640px): układ pionowy, mniejsze fonty
- [x] Na tablet (640-1024px): średni układ
- [x] Na desktop (> 1024px): pełen układ, max-width ograniczony
- [x] Tekst nie ucieka poza ekran
- [x] Przyciski są wystarczająco duże (touch targets)

### 6.5. Dostępność
- [x] Semantic HTML (h1 dla słowa, h2 dla sekcji)
- [x] Kontrast odpowiedni (text-primary na white surface)
- [x] Przyciski mają aria-label (jeśli ikona bez tekstu)
- [x] Focus states widoczne (Tailwind focus-visible)
- [x] Tab order logiczny

### 6.6. Wydajność
- [x] Błędów w konsoli przy mount/unmount
- [x] Brak niepotrzebnych re-renderów (React.memo nie wymagane)
- [x] Animacje 60fps (bez lagów)
- [x] Czas renderu karty < 100ms

## 7. Testy

### 7.1. Testy komponentu
```javascript
describe('WordCard', () => {
  test('renders word correctly', () => {
    render(<WordCard word={mockWord} />);
    expect(screen.getByText('Dyletant')).toBeInTheDocument();
    expect(screen.getByText(/amator/i)).toBeInTheDocument();
  });

  test('toggles favorite on button click', () => {
    render(<WordCard word={mockWord} />);
    const heartButton = screen.getByRole('button');
    fireEvent.click(heartButton);
    expect(isFavorite(mockWord.id)).toBe(true);
  });

  test('expands examples section', () => {
    render(<WordCard word={mockWord} />);
    const toggleButton = screen.getByText(/przykłady/i);
    fireEvent.click(toggleButton);
    expect(screen.getByText(/Ten dyletant/i)).toBeVisible();
  });

  test('shows category chip', () => {
    render(<WordCard word={mockWord} />);
    expect(screen.getByText('Człowiek i zachowanie')).toBeInTheDocument();
  });

  test('renders synonyms as tags', () => {
    render(<WordCard word={mockWord} />);
    expect(screen.getByText('amator')).toBeInTheDocument();
    expect(screen.getByText('laik')).toBeInTheDocument();
  });

  test('returns null for no word', () => {
    const { container } = render(<WordCard word={null} />);
    expect(container.firstChild).toBeNull();
  });
});
```

### 7.2. Testy integracyjne
- [x] WordCard ładuje się na stronie głównej
- [x] WordCard ładuje się na stronie ulubionych (z inną konfiguracją)
- [x] ShareButton działa w obu lokalizacjach
- [x] Zmiana ulubionych w WordCard aktualizuje globalny stan
- [x] Karta wygląda poprawnie na różnych rozdzielczościach

### 7.3. Testy w przeglądarkach
- [x] Chrome: brak błędów, animacje 60fps
- [x] Firefox: brak błędów, layout poprawny
- [x] Safari: brak błędów, fonty ładują się
- [x] Edge: brak błędów, zgodność z Chrome

### 7.4. Audit wydajności (Lighthouse)
- Performance: > 90 (bezpośredni render, mały komponent)
- Accessibility: > 95 (kontrast, semantic HTML)
- Best Practices: 100 (bez błędów)
- SEO: > 90 (semantic structure)

## 8. Ewentualne problemy i rozwiązania

### 8.1. Performance - animacje
**Problem:** Złożone animacje mogą powodować lagi na słabych urządzeniach.
**Rozwiązanie:** Użycie `will-change`, transform i opacity zamiast top/left. Optymalizacja Framer Motion (layout: false dla sekcji).

### 8.2. Długie przykłady
**Problem:** Przykłady mogą być długie i psuć layout.
**Rozwiązanie:** CSS `line-clamp-3`, `leading-relaxed`, responsywne marginesy.

### 8.3. Dużo synonimów
**Problem:** Słowo może mieć 5+ synonimów, które nie mieszczą się.
**Rozwiązanie:** Flex-wrap, responsive font-size, ewentualnie scroll-x na mobile.

### 8.4. Brak danych
**Problem:** WordCard wywołana z null/undefined.
**Rozwiązanie:** Wczesne wyjście `if (!word) return null;`.

### 8.5. Konflikt z Share API
**Problem:** Web Share API nie jest wspierane na desktop Safari.
**Rozwiązanie:** Fallback do Clipboard API (obecnie działa poprawnie).

### 8.6. Czcionki nie załadowane
**Problem:** Flash unstyled text (FOUT) powoduje zmianę layoutu.
**Rozwiązanie:** font-display: swap w CSS, placeholder rozmiarów (CLS minimisation).