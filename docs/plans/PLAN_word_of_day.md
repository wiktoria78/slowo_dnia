# Plan wdrożenia: Słowo Dnia

## 1. Cel biznesowy

Aplikacja ma za zadanie pomagać użytkownikom w nauce i odkrywaniu pięknych, rzadko używanych polskich słów. Każdego dnia użytkownik otrzymuje nowe słowo dostosowane do daty, co zapewnia spójność (ten sam dzień = to samo słowo dla wszystkich) i pozwala na systematyczne poszerzanie słownictwa.

## 2. Zakres

### Wymagania funkcjonalne
- [x] Algorytm wyboru słowa na podstawie daty (START_DATE: 2026-04-13)
- [x] Wyświetlanie słowa dnia na stronie głównej
- [x] Obsługa przypadku przed startem (daysElapsed < 0) - pierwsze słowo
- [x] Obsługa przypadku po wyczerpaniu słów (daysElapsed >= 100) - tryb archiwum
- [x] Animacja ładowania podczas inicjalizacji
- [x] Obliczanie aktualnego indeksu dla statystyk

### Wymagania niefunkcjonalne
- [x] Reaktywny interfejs użytkownika (Framer Motion)
- [x] Responsywność (mobile-first design)
- [x] Czas ładowania < 1 sekundy (symulacja 300ms)
- [x] Dostępność (semantic HTML, kontrast)
- [x] Wydajność renderowania

### Wymagania techniczne
- Baza danych: `src/data/words.json` - 100 słów
- Hook niestandardowy: `useWordOfDay.js`
- Cache przeglądarki: Brak (dynamiczne obliczanie na podstawie daty)
- State management: useState, useEffect

## 3. Wymagania funkcjonalne (szczegółowe)

### 3.1. Algorytm wyboru słowa
Dla danej daty system oblicza liczbę dni od daty startowej:
```
daysElapsed = floor((currentDate - START_DATE) / (1000 * 60 * 60 * 24))
```

- Jeśli `daysElapsed < 0`: zwraca pierwsze słowo (words[0])
- Jeśli `daysElapsed >= words.length`: zwraca null (tryb archiwum)
- Jeśli `0 <= daysElapsed < words.length`: zwraca words[daysElapsed]

### 3.2. Interfejs użytkownika
- Nagłówek z datą w formacie polskim (np. "niedziela, 28 kwietnia 2026")
- Tytuł sekcji: "Słowo na dziś" (lub "Archiwum" po wyczerpaniu słów)
- Karta słowa (WordCard) z animacją wejścia
- Sekcja informacyjna z opisem aplikacji
- W trybie archiwum: komunikat o zakończeniu i statystyka (X / 100 słów)

### 3.3. Stan ładowania
- Animacja obracającego się koła (spinner) podczas inicjalizacji
- Czas wyświetlania: minimum 300ms (symulacja pobierania danych)

## 4. Kontekst techniczny

### 4.1. Komponenty
- `Home.jsx` - strona główna, integruje hook useWordOfDay
- `WordCard.jsx` - komponent prezentujący słowo z definicją, przykładami, etymologią
- `useWordOfDay.js` - hook niestandardowy z logiką biznesową

### 4.2. Modele danych
- `Word` (z words.json):
  - id: number
  - word: string
  - definition: string
  - examples: string[]
  - etymology: string
  - partOfSpeech: string
  - category: string
  - synonyms: string[]

### 4.3. Punkty integracji
- `words.json` - import danych statycznych
- `START_DATE` - stała konfiguracyjna (2026-04-13)
- `getDaysElapsed()` - funkcja pomocnicza obliczająca dni
- `getWordOfDay()` - funkcja selekcji słowa

## 5. Kroki implementacji

1. **Inicjalizacja stanu** (`useWordOfDay.js`):
   - useState dla wordOfDay, loading, isFinished
   - useEffect z symulacją opóźnienia (300ms)

2. **Obliczenie dni**:
   - Klonowanie daty bieżącej (obcinanie godzin/minut/sekund)
   - Klonowanie daty startowej
   - Różnica w milisekundach → dni

3. **Selekcja słowa**:
   - Sprawdzenie warunków brzegowych
   - Pobranie słowa z tablicy po indeksie

4. **Renderowanie warunkowe** (Home.jsx):
   - Stan ładowania → spinner
   - Tryb archiwum → komunikat + statystyka
   - Stan normalny → WordCard

5. **Formatowanie daty**:
   - toLocaleDateString('pl-PL') z opcjami rozszerzonymi

## 6. Kryteria akceptacji

### 6.1. Testy jednostkowe
- [x] `getDaysElapsed()` zwraca 0 dla daty startowej
- [x] `getDaysElapsed()` zwraca 1 dla daty startowej + 1 dzień
- [x] `getWordOfDay()` zwraca words[0] dla daysElapsed = -1
- [x] `getWordOfDay()` zwraca null dla daysElapsed = 100
- [x] `getWordOfDay()` zwraca words[50] dla daysElapsed = 50
- [x] Hook `useWordOfDay` inicjalizuje loading na true
- [x] Hook `useWordOfDay` kończy loading po efekcie
- [x] Hook `useWordOfDay` ustawia isFinished dla daysElapsed >= 100

### 6.2. Testy integracyjne
- [x] Strona główna wyświetla spinner podczas ładowania
- [x] Po 300ms wyświetla się karta słowa
- [x] Data wyświetlana w polskim formacie
- [x] Dla przeszłej daty (symulacja) wyświetlane pierwsze słowo
- [x] Dla przyszłej daty (symulacja 100+ dni) wyświetlany komunikat archiwum
- [x] WordCard poprawie renderuje wszystkie pola słowa

### 6.3. Testy manualne
- [x] Spinner animuje się płynnie (rotacja 360deg)
- [x] Karta słowa pojawia się z animacją fadeIn + slideUp
- [x] Przyciski i linki są klikalne
- [x] Responsywność na urządzeniach mobilnych (< 640px)
- [x] Responsywność na tabletach (640px - 1024px)
- [x] Responsywność na desktopach (> 1024px)

## 7. Testy

### 7.1. Podstawy (oparte na kodzie)
```javascript
// Test: Pobranie pierwszego słowa dla daty startowej
const startDate = new Date('2026-04-13');
const days = getDaysElapsed(startDate); // oczekiwane: 0
const word = getWordOfDay(words); // oczekiwane: words[0] = 'Dyletant'

// Test: Obsługa przypadku przed startem
const beforeDate = new Date('2026-04-12');
const daysBefore = getDaysElapsed(beforeDate); // oczekiwane: -1
const wordBefore = getWordOfDay(words); // oczekiwane: words[0]

// Test: Obsługa przypadku po zakończeniu
const afterDate = new Date('2026-07-22'); // 100 dni po start
const daysAfter = getDaysElapsed(afterDate); // oczekiwane: >= 100
const wordAfter = getWordOfDay(words); // oczekiwane: null
```

### 7.2. Testy integracyjne UI
- Spinner CSS: `border-2 border-primary border-t-transparent rounded-full`
- Animacja rotacji: `rotate: 360deg` w 1 sekundę, powtarzanie nieskończone
- Animacja wejścia karty: `opacity: 0 → 1`, `y: 20 → 0` w 0.5s
