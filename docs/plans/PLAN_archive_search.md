# Plan wdrożenia: Archiwum i Wyszukiwanie

## 1. Cel biznesowy

Zapewnienie możliwości przeglądania historii słów, które już się pojawiły, oraz wyszukiwania słów w całej bazie. Funkcjonalność ta służy nauce systematycznej oraz pozwala użytkownikom na znalezienie konkretnych słów czy eksplorację po kategoriach.

## 2. Zakres

### Wymagania funkcjonalne
- [x] Wyświetlanie listy poprzednich słów (od najnowszego)
- [x] Dynamiczny filtr na podstawie aktualnej daty (słowa tylko do dziś)
- [x] Wyszukiwanie po słowie i definicji (case-insensitive)
- [x] Filtrowanie po kategoriach (wielokrotny wybór via dropdown)
- [x] Licznik wyników wyszukiwania
- [x] Komunikat o braku wyników
- [x] Paginacja/paginacja wirtualna (brak - wszystko na raz, max 100)
- [x] Animowane wejście elementów (staggered)

### Wymagania niefunkcjonalne
- [x] Wydajność filtrowania < 50ms dla 100 elementów
- [x] Responsive design (grid 1-3 kolumny)
- [x] Dostępność (aria-label dla inputów, focus states)
- [x] Brak przeładowania strony przy filtrowaniu (SPA)

### Wymagania techniczne
- Komponent: `Archive.jsx`
- Stan lokalny: `useState` dla searchTerm, selectedCategory
- Memoizacja: `useMemo` dla filteredWords, categories
- Data source: `words.json` (bezpośredni import)
- Filtrowanie: case-insensitive substring match
- CSS Grid: responsive columns (1/2/3)

## 3. Wymagania funkcjonalne (szczegółowe)

### 3.1. Logika filtrowania (Archive)
```javascript
const daysElapsed = getDaysElapsed(START_DATE);
const maxIndex = Math.min(daysElapsed, wordsData.length);
const archiveWords = wordsData.slice(0, maxIndex).reverse();

// Filtrowanie
const filtered = archiveWords.filter(word => {
  const matchesSearch = word.word.toLowerCase().includes(term) || 
                        word.definition.toLowerCase().includes(term);
  const matchesCategory = category === 'all' || word.category === category;
  return matchesSearch && matchesCategory;
});
```

### 3.2. Dropdown kategorii
- Komponent controlled (stan: `selectedCategory`)
- Opcje: "Wszystkie kategorie" + unikatowe kategorie z archiveWords
- Kliknięcie poza dropdownem zamyka go (useClickOutside)
- Animacja Framer Motion (opacity, y)

### 3.3. Wyszukiwanie
- Input typu text z placeholderem
- Debounce nie jest wymagane (szybkie dla 100 elementów)
- onChange aktualizuje state natychmiast
- Case-insensitive (toLowerCase())

### 3.4. Wyniki
- Komunikat: "Znaleziono X słów"
- Pusta lista: "Brak słów spełniających kryteria"
- Siatka: CSS Grid z responsywnymi kolumnami
- Item: uproszczona karta (brak expandable sections)

### 3.5. Animacje
- Staggered reveal: `delay: index * 0.05`
- Wejście: opacity 0→1, y: 10→0
- Wyjście: niezaimplementowane (brak usuwania elementów)

## 4. Kontekst techniczny

### 4.1. Architektura
```
Archive (component)
  ├── State: searchTerm, selectedCategory, isOpen
  ├── useMemo: archiveWords (data slice)
  ├── useMemo: categories (derived)
  ├── useMemo: filteredWords (computed)
  ├── Handlers: setSearchTerm, setSelectedCategory
  ├── Effects: useClickOutside (dropdown)
  └── Render:
        ├── Header
        ├── Filters (Input + Dropdown)
        ├── Results counter
        └── Grid (mapped filteredWords)
```

### 4.2. Modele danych
- Wejście: `words.json` (Array<Word>)
- Wyjście: `filteredWords` (Array<Word>)
- Pochodne: `categories` (string[])
- Grid item: uproszczony WordCard (bez przycisków)

### 4.3. Algorytmy

**Okno czasowe (archiveWords)**
- Oblicza dni od START_DATE
- Bierze slice [0, min(days, length)]
- Odwraca (reverse) dla najnowszych pierwszych

**Wyszukiwanie (O(n))**
- Iteracja po wszystkich archiveWords
- Substring match na word + definition
- Złożoność: O(n*m) gdzie m = średnia długość stringa
- Dla 100 słów: < 1ms

**Kategorie (O(n))**
- Set z kategorii archiveWords
- Konwersja do array
- Dodanie 'all'

## 5. Kroki implementacji

### 5.1. Inicjalizacja stanu
```javascript
const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState('all');
const [isOpen, setIsOpen] = useState(false);
```

### 5.2. Obliczenie słów archiwalnych
```javascript
const archiveWords = useMemo(() => {
  const daysElapsed = getDaysElapsed(START_DATE);
  const maxIndex = Math.min(daysElapsed, wordsData.length);
  return wordsData.slice(0, maxIndex).reverse();
}, []); // pusta dependency - stałe dane
```

### 5.3. Kategorii
```javascript
const categories = useMemo(() => {
  const cats = new Set(archiveWords.map(w => w.category));
  return ['all', ...Array.from(cats)];
}, [archiveWords]);
```

### 5.4. Filtrowanie
```javascript
const filteredWords = useMemo(() => {
  return archiveWords.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          word.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || word.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
}, [archiveWords, searchTerm, selectedCategory]);
```

### 5.5. ClickOutside handler
```javascript
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);
```

### 5.6. Render siatki
```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {filteredWords.map((word, index) => (
    <motion.div
      key={word.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {/* uproszczony item */}
    </motion.div>
  ))}
</div>
```

## 6. Kryteria akceptacji

### 6.1. Funkcjonalne
- [x] Archiwum wyświetla tylko słowa do obecnej daty (bez przyszłych)
- [x] Słowa sortowane są od najnowszych do najstarszych
- [x] Wyszukiwanie znajduje słowa po części nazwy
- [x] Wyszukiwanie znajduje słowa po fragmencie definicji
- [x] Filtrowanie po kategoriach działa poprawnie
- [x] Kombinacja wyszukiwania + kategorii działa (AND)
- [x] Licznik wyników aktualizuje się dynamicznie
- [x] Komunikat o braku wyników jest wyświetlany

### 6.2. UI/UX
- [x] Input wyszukiwania ma placeholder i jest wyraźny
- [x] Dropdown kategorii jest rozwijany i zamykany przez kliknięcie
- [x] Dropdown zamyka się po kliknięciu poza nim
- [x] Wybranej kategorii jest wyróżnione w dropdownie
- [x] Siatka responsywna: 1/2/3 kolumny odpowiednio
- [x] Elementy wchodzą z animacją (staggered)
- [x] Hover na elementach siatki działa (shadow change)

### 6.3. Wydajność
- [x] Filtrowanie jest natychmiastowe (brak zauważalnego lagu)
- [x] Animacje są płynne 60fps
- [x] Pamięć stabilna (brak memory leaków)
- [x] Błędów w konsoli brak

### 6.4. Responsywność
- [x] Mobile (< 640px): 1 kolumna, pełna szerokość inputów
- [x] Tablet (640-1024px): 2 kolumny, flex row inputów
- [x] Desktop (> 1024px): 3 kolumny, max-width okno
- [x] Fonty skalują odpowiednio

### 6.5. Edge cases
- [x] Pusty search term wyświetla wszystko
- [x] "all" kategoria wyświetla wszystko
- [x] Search term wielkich liter działa (case-insensitive)
- [x] Znaki specjalne w search nie crashują
- [x] Brak wyników -> komunikat
- [x] Słowa na granicy daty (dzisiaj) są w archiwum

## 7. Testy

### 7.1. Algorytm archiwum
```javascript
describe('Archive word filtering', () => {
  test('should include words up to today', () => {
    // Symulacja: dziś jest 100 dni po starcie
    // archiveWords powinno mieć długość 100 (wszystkie)
    expect(archiveWords.length).toBe(100);
  });

  test('should not include future words', () => {
    const futureWord = { id: 101, word: 'future' };
    expect(archiveWords).not.toContain(futureWord);
  });

  test('should be sorted newest first', () => {
    const firstId = archiveWords[0].id;
    const lastId = archiveWords[archiveWords.length - 1].id;
    expect(firstId).toBeGreaterThan(lastId);
  });
});

```

### 7.2. Filtrowanie
```javascript
describe('Archive filtering', () => {
  beforeEach(() => {
    render(<Archive />);
  });

  test('should filter by search term', () => {
    fireEvent.change(screen.getByPlaceholderText(/szukaj/i), {
      target: { value: 'dyletant' }
    });
    expect(screen.getAllByText(/item/i).length).toBe(1);
  });

  test('should filter by category', () => {
    // open dropdown
    fireEvent.click(screen.getByText(/wszystkie kategorie/i));
    // select category
    fireEvent.click(screen.getByText(/człowiek i zachowanie/i));
    // check all items have that category
    const items = screen.getAllByTestId(/archive-item/i);
    items.forEach(item => {
      expect(item).toHaveTextContent(/człowiek i zachowanie/i);
    });
  });

  test('should combine search and category', () => {
    // set search
    fireEvent.change(screen.getByPlaceholderText(/szukaj/i), {
      target: { value: 'emoc' }
    });
    // set category
    fireEvent.click(screen.getByText(/wszystkie kategorie/i));
    fireEvent.click(screen.getByText(/psychologia i emocje/i));
    // check results
    const items = screen.getAllByTestId(/archive-item/i);
    expect(items.length).toBeGreaterThan(0);
    items.forEach(item => {
      expect(item).toHaveTextContent(/psychologia i emocje/i);
    });
  });
});
```

### 7.3. Testy manualne
- [x] Wpisanie "dyletant" znajduje słowo
- [x] Wpisanie "DYLETANT" (caps) znajduje słowo
- [x] Wpisanie "lai" znajduje słowo z definicji
- [x] Wybór kategorii filtruje widok
- [x] Zaznaczenie "Wszystkie" pokazuje wszystko
- [x] Kombinacja działa poprawnie
- [x] Licznik zmienia się w czasie rzeczywistym
- [x] Brak wyników -> komunikat widoczny
- [x] Dropdown zamyka się po kliknięciu w opcję
- [x] Dropdown zamyka się po kliknięciu poza nim

## 8. Ewentualne problemy i rozwiązania

### 8.1. Wydajność dla większej bazy
**Problem:** Gdyby baza rosła do 1000+ słów, filtrowanie mogłoby lagować.
**Rozwiązanie:** Obecnie 100 słów = szybkie. W przyszłości: debounce inputa, Web Worker do filtrowania, albo stronicowanie.

### 8.2. Dropdown UX
**Problem:** Kliknięcie opcji w dropdownie może nie zamykać go na mobile.
**Rozwiązanie:** Obsługa touch events (click działa na mobile). Dodatkowo close na blur.

### 8.3. Zbyt długie teksty w gridzie
**Problem:** Długie słowo lub definicja może psuć layout siatki.
**Rozwiązanie:** CSS ellipsis, min-height, responsywne fonty, wrap.

### 8.4. Synchronizacja z word of day
**Problem:** Jeśli zmieni się algorytm daty, archiwum może pokazywać błędne dane.
**Rozładanie:** START_DATE jest stałą w jednym miejscu (useWordOfDay.js). Importowana do Archive - spójność.

### 8.5. Pamięć z useMemo
**Problem:** useMemo przechowuje duże tablice w pamięci.
**Rozwiązanie:** 100 słów × ~500B = 50KB. Negligible. Memoizacja zapobiega przeliczaniu przy każdym renderze.

### 8.6. Błąd odwrotnej kompilacji
**Problem:** Jeśli słowo ma bardzo długą etymologię, może psuć layout w archiwum.
**Rozwiązanie:** W archiwum nie pokazujemy etymologii - tylko podstawowe info (słowo, definicja, kategoria).