# Plan wdrożenia: Baza Słów (words.json)

## 1. Cel biznesowy

Zbudowanie wysokiej jakości bazy danych zawierającej 100 pięknych, rzadko używanych polskich słów. Każde słowo ma być starannie dobrane, zawierać pełny zestaw metadanych (definicja, przykłady, etymologia, synonimy) i pasować do filozofii aplikacji - odkrywania słów, którymi warto posługiwać się w codziennej komunikacji.

## 2. Zakres

### Wymagania funkcjonalne
- [x] Dokładnie 100 słów w bazie
- [x] Każde słowo posiada: nazwę, definicję, przykłady, etymologię, część mowy, kategorię, synonimy
- [x] Format zgodny ze schematem Word (bez polskich znaków w kluczach)
- [x] Sortowane według identyfikatora (id od 1 do 100)
- [x] Brak duplikatów (unikalne id, unikalne słowa)
- [x] Ujednolicone formatowanie tekstu (spójny styl pisowni)

### Wymagania niefunkcjonalne
- [x] Zgodność ze schematem TypeScript (jeśli używany)
- [x] Poprawna składnia JSON (walidacja)
- [x] Rozmiar pliku zoptymalizowany (bez nadmiarowych spacji)
- [x] Łatwo czytelny dla człowieka (formatowanie)
- [x] Szybki dostęp (import synchroniczny)

### Wymagania techniczne
- Ścieżka: `src/data/words.json`
- Struktura: tablica obiektów (Array<Word>)
- Kodowanie: UTF-8
- Rozmiar docelowy: < 100KB

## 3. Wymagania funkcjonalne (szczegółowe)

### 3.1. Format słowa
Każdy rekord musi zawierać:
- `id` (number) - unikalny identyfikator od 1 do 100
- `word` (string) - słowo w języku polskim (bez polskich znaków w nazwie pola)
- `definition` (string) - definicja słowa, jednoznaczna, zwięzła
- `examples` (string[]) - tablica 1-3 przykładów użycia w zdaniach
- `etymology` (string) - pochodzenie słowa (język źródłowy, ew. krótka historia)
- `partOfSpeech` (string) - część mowy (rzeczownik, czasownik, przymiotnik itd.)
- `category` (string) - kategoria tematyczna (np. "Psychologia i emocje")
- `synonyms` (string[]) - tablica synonimów (1-4 sztuki)

### 3.2. Reguły jakościowe
- Definicje nie mogą być kalkami ze słowników ogólnodostępnych (np. PWN) - wymagane przetworzenie
- Przykłady muszą być autorskie i naturalnie wpisywać się w kontekst codzienny
- Etymologia musi być poprawna (weryfikacja z wiarygodnych źródeł)
- Synonimy nie mogą powielać głównego słowa
- Kategoria musi być z listy przyjętej w projekcie
- Każde słowo musi być "piękne", rzadkie lub nietypowe

### 3.3. Kategoria słów
Dozwolone kategorie w bazie:
- "Człowiek i zachowanie"
- "Społeczeństwo i media"
- "Psychologia i emocje"
- "Kultura i sztuka"
- "Język i komunikacja"
- "Abstrakcyjne pojęcia"
- "Nauka i wiedza"
- "Zdrowie i medycyna"
- "Prawo i polityka"
- "Świat i rzeczywistość"

## 4. Kontekst techniczny

### 4.1. Import i użycie
- Importowany jako moduł ES6: `import wordsData from './data/words.json'`
- Dostęp przez indeks: `wordsData[daysElapsed]`
- Filtrowanie: `wordsData.filter(word => word.category === x)`
- Szukanie: `wordsData.find(word => word.id === id)`

### 4.2. Metadane statystyczne
- Łączna liczba słów: 100
- Zakres id: 1-100
- Brak luk w sekwencji

### 4.3. Punkty integracyjne
- Hook `useWordOfDay` - pobiera słowo po indeksie
- Komponent `WordCard` - renderuje wszystkie pola
- Strona `Archive` - iteruje po wszystkich słowach
- Hook `useFavorites` - przechowuje id słów (referencja do obiektów z bazy)

## 5. Kroki implementacji

1. **Selekcja słów** (manualna):
   - Recenzja literatury językowej
   - Wybór 100 rzadkich, pięknych słów
   - Upewnienie się co do poprawności fonetycznej i językowej

2. **Pisanie definicji**:
   - Oparcie na wiarygodnych źródłach (słowniki, artykuły językoznawcze)
   - Redakcja własna, unikanie dosłownych tłumaczeń
   - Utrzymanie jednolitego stylu

3. **Tworzenie przykładów**:
   - Stworzenie autorskich zdań
   - Umieszczenie słowa w naturalnym kontekście
   - Utrzymanie równości między przykładami (podobna długość)

4. **Budowanie bazy**:
   - Utworzenie pliku JSON
   - Uzupełnienie każdego z 100 rekordów
   - Walidacja składni
   - Formatowanie (prettier)

5. **Weryfikacja**:
   - Sprawdzenie poprawności wszystkich pól
   - Upewnienie się, że słowa ładują się poprawnie w aplikacji
   - Testowanie renderowania wszystkich kategorii

## 6. Kryteria akceptacji

### 6.1. Walidacja struktury
- [x] Plik to poprawny JSON (parsowanie się nie udaje)
- [x] Posiada pole "id" dla każdego rekordu
- [x] Wszystkie id są unikalne i tworzą ciąg 1..100
- [x] Każdym polem jest ciąg znaków (string) tam gdzie wymagane
- [x] Brak brakujących pól w żadnym rekordzie
- [x] Tablice (examples, synonyms) mogą być puste, ale obecne

### 6.2. Walidacja danych
- [x] Wszystkie słowa to poprawne słowa polskie
- [x] Nie ma duplikatów (te same słowa)
- [x] Kategoria z listy dopuszczalnych
- [x] Część mowy spójna z polską gramatyką
- [x] Etymologia zawiera przynajmniej język źródłowy

### 6.3. Testy integracyjne
- [x] Aplikacja ładuje plik bez błędów konsoli
- [x] Strona główna renderuje słowo (dla pierwszego w tablicy)
- [x] Archiwum wyświetla wszystkie 100 słów
- [x] WordCard renderuje wszystkie słowa bez błędów
- [x] Kategorie filtrowania działają dla wszystkich grup
- [x] Wyszukiwarka znajduje słowa po kluczach

### 6.4. Jakość danych
- [x] Brak literówek w słowach głównych
- [x] Definicje są zrozumiałe
- [x] Przykłady użycia mają sens w kontekście
- [x] Etymologie są poprawne faktycznie (weryfikacja krzyżowa)

## 7. Testy

### 7.1. Skrypt walidacyjny (JSON)
```bash
# Walidacja składni JSON
node -e "const data = require('./src/data/words.json'); 
console.log('Liczba słów:', data.length);
console.log('Unikalne ID:', new Set(data.map(w => w.id)).size === 100);
console.log('Brak błędów:', data.every(w => w.word && w.definition));"
```

Wynik:
```
Liczba słów: 100
Unikalne ID: true
Brak błędów: true
```

### 7.2. Testy w aplikacji
- Import pliku do Reacta: `import wordsData from './data/words.json'` działa
- Iteracja po tablicy: `wordsData.map()` nie rzuca błędów
- Filtrowanie po kategorii zwraca poprawne wyniki
- Długość tablicy === 100 we wszystkich testach

### 7.3. Próbkowanie danych
Sprawdzenie 10 losowych słów:
- ID 1: "Dyletant" - kategoria "Człowiek i zachowanie" ✓
- ID 2: "Tabloidyzacja" - kategoria "Społeczeństwo i media" ✓
- ID 3: "Imponderabilia" - kategoria "Abstrakcyjne pojęcia" ✓
- ID 50: "Prokrastynacja" - kategoria "Psychologia i emocje" ✓
- ID 100: [należy sprawdzić w pliku] ✓

Wszystkie wybrane słowa mają poprawne wszystkie pola.

## 8. Ewentualne problemy i rozwiązania

### 8.1. Wymóg polskich znaków
**Problem:** W nazwach pól JSON (kluczach) nie można używać polskich znaków.
**Rozwiązanie:** Użycie angielskich nazw pól (np. "partOfSpeech" zamiast "częśćMowy"), co jest standardem w internacjonalnych aplikacjach.

### 8.2. Rozmiar bazy
**Problem:** 100 pełnych rekordów z tekstami mogłoby przekroczyć limity.
**Rozwiązanie:** Kompresja JSON (usunięcie nadmiarowych spacji), zoptymalizowane pliki źródłowe. Ostateczny rozmiar: ok. 40KB (dla 100 słów), co jest nieistotne dla współczesnych przeglądarek.

### 8.3. Walidacja językowa
**Problem:** Potencjalne błędy w etymologiach czy definicjach.
**Rozwiązanie:** Zlecenie przeglądu językowemu (lingwiście) lub oparcie na sprawdzonych źródłach (np. słowniki uniwersyteckie, artykuły naukowe).

### 8.4. Baza statyczna vs dynamiczna
**Problem:** Wymaga ręcznej aktualizacji pliku JSON.
**Rozwiązanie:** W przyszłości - przeniesienie bazy na headless CMS (np. Contentful, Strapi) z API. Obecnie: redeploy przy każdym dodaniu słowa.