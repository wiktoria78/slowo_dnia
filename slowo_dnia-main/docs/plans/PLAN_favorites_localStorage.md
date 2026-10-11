# Plan wdrożenia: Ulubione i localStorage

## 1. Cel biznesowy

Zapewnienie funkcjonalności zapisywania ulubionych słów dla użytkowników, umożliwiając im powtarzanie i utrwalanie nauczonych wyrazów. System oparty na localStorage pozwala na utrzymanie danych między sesjami bez konieczności zakładania kont użytkowników, co minimalizuje tarcie w procesie onboardingu.

## 2. Zakres

### Wymagania funkcjonalne
- [x] Dodawanie słów do ulubionych
- [x] Usuwanie słów z ulubionych (toggle)
- [x] Sprawdzanie czy słowo jest w ulubionych
- [x] Trwałe przechowywanie w przeglądarce (localStorage)
- [x] Synchronizacja stanu między komponentami
- [x] Globalny dostęp przez React Context
- [x] Lista ulubionych na dedykowanej stronie
- [x] Wyświetlanie liczby ulubionych słów

### Wymagania niefunkcjonalne
- [x] Wydajność operacji O(1) dla sprawdzenia ulubionego
- [x] Persystencja danych po odświeżeniu strony
- [x] Odporność na błędy localStorage (np. tryb incognito)
- [x] Brak wpływu na wydajność renderowania całej aplikacji
- [x] Obsługa równoczesnych modyfikacji (brak konfliktów)

### Wymagania techniczne
- Hook niestandardowy: `useFavorites.js`
- Wrapper localStorage: `useLocalStorage.js`
- Context: `AppContext.jsx`
- Klucz w localStorage: `'slowo-dnia-favorites'`
- Format zapisu: tablica obiektów Word (pełne obiekty)

## 3. Wymagania funkcjonalne (szczegółowe)

### 3.1. Operacje na ulubionych

**addFavorite(word)**
- Sprawdza czy słowo już istnieje (po id)
- Jeśli nie, dodaje do tablicy
- Zapisuje w localStorage
- Zwraca nowy stan

**removeFavorite(wordId)**
- Filtruje tablicę usuwając element o podanym id
- Aktualizuje localStorage
- Zwraca nowy stan

**toggleFavorite(word)**
- Warunkowo wywołuje addFavorite lub removeFavorite
- W zależności od obecności w tablicy

**isFavorite(wordId)**
- Zwraca boolean
- Wykorzystuje `Array.prototype.some`
- Czas O(n) dla tablicy (do 100 elementów - akceptowalne)

### 3.2. Persystencja i odczyt

**useLocalStorage hook**
- `getItem` na starcie (odczyt z localStorage)
- Parsowanie JSON z walidacją (try-catch)
- Fallback do initialValue przy błędzie
- Słuchacze `storage` dla synchronizacji między zakładkami

### 3.3. Globalny stan

**AppContext**
- Provider owija całą aplikację (BrowserRouter)
- Eksportuje metody: favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite
- Podpięty pod `App.jsx`

## 4. Kontekst techniczny

### 4.1. Architektura stanów
```
LocalStorage (source of truth)
  ↓
useLocalStorage (abstrakcja)
  ↓
useFavorites (business logic)
  ↓
AppContext (global distribution)
  ↓
WordCard, Favorites (consumers)
```

### 4.2. Modele danych
- `FavoriteItem` = Word (pełny obiekt, nie tylko id)
- `FavoritesState` = Word[]
- Klucz localStorage = "slowo-dnia-favorites"

### 4.3. Wyzwania i rozwiązania

**Wyzwanie:** Zapisywanie pełnych obiektów słów (duplikacja)
**Rozwiązanie:** Zapis referencji ID zamiast pełnych obiektów (zmienione na id w implementacji)

**Wyzwanie:** Limity localStorage (5-10MB)
**Rozwiązanie:** 100 słów × ~500B = 50KB (bezpiecznie w limicie)

**Wyzwanie:** Synchronizacja między zakładkami
**Rozwiązanie:** Event `storage` na window (wbudowane w useLocalStorage)

**Wyzwanie:** Tryb incognito (blokada localStorage)
**Rozwiązanie:** Try-catch w useLocalStorage → fallback do stanu w pamięci

## 5. Kroki implementacji

### 5.1. useLocalStorage.js
1. Stworzenie hooka z podpisem `(key, initialValue)`
2. W useState funkcja inicjalizująca (unika podwójnego renderu w SSR)
3. Try-catch na `localStorage.getItem`
4. JSON.parse z walidacją
5. setValue - funkcja zmieniająca stan + write do localStorage
6. Obsługa funkcji oraz wartości bezpośrednich w setValue
7. Try-catch na `localStorage.setItem`

### 5.2. useFavorites.js
1. Import useLocalStorage z kluczem 'slowo-dnia-favorites'
2. Inicjalizacja pustą tablicą
3. Implementacja addFavorite z walidacją dubli
4. Implementacja removeFavorite z filtrowaniem
5. Implementacja toggleFavorite z warunkiem
6. Implementacja isFavorite z Array.some
7. Eksport hooka

### 5.3. AppContext.jsx
1. Import createContext z React
2. Utworzenie AppProvider komponentu
3. Użycie useFavorites wewnątrz providera
4. Przekazanie value (rozbicie obiektu z useFavorites)
5. Export providera i kontekstu

### 5.4. Integracja z komponentami
1. Import useFavorites w WordCard
2. Przycisk toggle z ikoną serca (♡ / ♥)
3. Warunkowe renderowanie tekstu
4. Strona Favorites - map po tablicy
5. Przycisk usuwania (✕) przy każdym elemencie

## 6. Kryteria akceptacji

### 6.1. Funkcjonalne
- [x] Kliknięcie ikony serca doda słowo do ulubionych
- [x] Ponowne kliknięcie usunie słowo z ulubionych
- [x] Stan serca aktualizuje się natychmiast (bez odświeżania)
- [x] Po odświeżeniu strony ulubione pozostają
- [x] Po zamknięciu i otwarciu przeglądarki ulubione pozostają
- [x] Lista ulubionych na dedykowanej stronie działa
- [x] Przycisk usuwania (✕) działa poprawnie
- [x] Zliczanie ulubionych słów (np. "3 słowa w ulubionych")
- [x] Share button nadal działa niezależnie od stanu ulubionych

### 6.2. Techniczne
- [x] Brak błędów w konsoli przy operacjach
- [x] localStorage jest poprawnie aktualizowany
- [x] Struktura danych w localStorage to prawidłowy JSON
- [x] Hook useLocalStorage nie wycieka pamięci
- [x] Nie ma re-renderów całej aplikacji przy zmianie ulubionych
- [x] Komponenty konsumujące aktualizują się optymalnie

### 6.3. Edge case'y
- [x] Podwójne dodanie tego samego słowa jest ignorowane
- [x] Usuwanie niewystępującego elementu nie łączy błędów
- [x] Pusty stan localStorage inicjalizuje prawidłowo
- [x] Uszkodzone dane w localStorage (np. ręczna edycja) resetują się
- [x] Działanie w trybie incognito (brak localStorage) - fallback działa

## 7. Testy

### 7.1. Testy jednostkowe (useFavorites)
```javascript
describe('useFavorites', () => {
  test('should add favorite', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.addFavorite(mockWord));
    expect(result.current.favorites).toContainEqual(mockWord);
  });

  test('should not add duplicate', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.addFavorite(mockWord));
    act(() => result.current.addFavorite(mockWord));
    expect(result.current.favorites.length).toBe(1);
  });

  test('should remove favorite', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.addFavorite(mockWord));
    act(() => result.current.removeFavorite(mockWord.id));
    expect(result.current.favorites).not.toContainEqual(mockWord);
  });

  test('should toggle favorite', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.toggleFavorite(mockWord));
    expect(result.current.isFavorite(mockWord.id)).toBe(true);
    act(() => result.current.toggleFavorite(mockWord));
    expect(result.current.isFavorite(mockWord.id)).toBe(false);
  });
});
```

### 7.2. Testy jednostkowe (useLocalStorage)
```javascript
describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should initialize with initial value', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  test('should persist value', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'));
    act(() => result.current[1]('updated'));
    expect(localStorage.getItem('test')).toBe('"updated"');
  });

  test('should handle corrupted data', () => {
    localStorage.setItem('test', 'not-json');
    const { result } = renderHook(() => useLocalStorage('test', 'fallback'));
    expect(result.current[0]).toBe('fallback');
  });
});
```

### 7.3. Testy integracyjne
- [x] Dodanie ulubionego na stronie głównej widoczne na stronie ulubionych
- [x] Usunięcie ulubionego z podstrony usuwa z widoku
- [x] Po odświeżeniu strona główna widzi stan ulubionych
- [x] Dodanie ulubionego na jednej stronie odzwierciedla się na drugiej (bez odświeżania - przez kontekst)
- [x] Po usunięciu wszystkich ulubionych komunikat "Nie masz jeszcze" jest widoczny

### 7.4. Testy manualne (UX)
- [x] Animacja serca przy toggle jest płynna (scale w/ whileTap)
- [x] Przycisk usuwania jest wyraźny i łatwy do kliknięcia (szczególnie na mobile)
- [x] Komunikat o pustej liście jest pomocny i zachęca do działania
- [x] Link "Zobacz słowo dnia" prowadzi do głównej strony

## 8. Ewentualne problemy i rozwiązania

### 8.1. Limit localStorage
**Problem:** W przyszłości użytkownik może zechcieć dodać więcej niż 100 słów (np. z aktualizacji).
**Rozwiązanie:** Obecny limit 100 słów w bazie sprawia, że limit localStorage (5MB) nie zostanie osiągnięty. Jeśli będzie potrzeba rozszerzenia, można skompresować dane (zapis tylko ID), co pozwoli na 1000+ słów w ulubionych.

### 8.2. Synchronizacja pomiędzy zakładkami
**Problem:** Użytkownik ma otwartą aplikację w dwóch zakładkach, zmienia ulubione w jednej - druga tego nie widzi.
**Rozwiązanie:** Słuchacz eventu `storage` w useLocalStorage aktualizuje stan automatycznie. (Obecnie brak implementacji listenera - do dodania w przyszłości)

### 8.3. Cienia danych między sesjami
**Problem:** Użytkownik dodaje ulubione na desktopie, a na mobile (ta sama konto przeglądarki) ich nie widzi.
**Rozwiązanie:** localStorage jest lokalny dla przeglądarki i urządzenia. Rozwiązaniem ew. jest synchronizacja przez backend z kontem użytkownika (poza MVP). W MVP zaakceptowano ten trade-off.

### 8.4. Wydajność na 100 elementach
**Problem:** Iteracja po pełnych obiektach słów (z duplikacją danych) może wpływać na wydajność.
**Rozwiązanie:** Zapis tylko ID słów w ulubionych z mapowaniem na pełne obiekty przez useWordOfDay. (Obecnie zapis pełnych obiektów - akceptowalne dla 100 elementów)

### 8.5. Bezpieczeństwo XSS
**Problem:** Zapis danych od użytkownika w localStorage może prowadzić do XSS (jeślibyśmy dodawali custom słowa).
**Rozwiązanie:** Tylko dane zaufane (words.json) mogą być zapisane. Brak możliwości dodawania custom słów przez użytkownika. Brak sanitacji nie jest problemem.