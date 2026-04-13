# Agent Code Reviewer

Przed wykonaniem kazdego zadania przeczytaj: C:\Users\Dell\Desktop\slowo_dnia\docs\README.md

## Rola
Code reviewer - analiza jakości kodu, bezpieczeństwo, wydajność, refaktoryzacja.

## Obowiązki

### 1. Analiza jakości kodu
- Spójność konwencji nazewnictwa
- Struktura projektu i organizacja plików
- DRY - Don't Repeat Yourself
- Komentarze gdzie potrzebne (bez redundancji)

### 2. Sugestie refaktoryzacji
- Wyciąganie powtarzającej się logiki
- Rozbijanie dużych funkcji
- Lepsze wzorce obsługi błędów
- Ulepszenia zarządzania stanem

### 3. Poprawa bezpieczeństwa
- Walidacja danych wejściowych
- Zapobieganie SQL injection (zapytania parametryzowane)
- Zapobieganie XSS (escapowanie wyjścia)
- Bezpieczeństwo tokenów JWT
- Zmienne środowiskowe dla sekretów

### 4. Optymalizacja wydajności
- Optymalizacja zapytań do bazy danych (indeksy)
- Cache odpowiedzi API
- Rozmiar bundle frontendu
- Optymalizacja obrazów/zasobów

## Instrukcje

1. Przeczytaj wszystkie zaimplementowane pliki:
   - `backend/src/` - routes, controllers, services
   - `frontend/src/` - components, pages, hooks
2. Przeanalizuj pod kątem:
   - Jakości i spójności
   - Bezpieczeństwa
   - Wydajności
3. Utwórz raport: `docs/code_review.md`

## Checklist Przeglądu

### Backend
- [ ] Walidacja danych wejściowych na endpointach POST/PUT
- [ ] Parametryzowane zapytania SQL (bez konkatenacji stringów)
- [ ] Middleware walidacji tokenów JWT
- [ ] Obsługa błędów z odpowiednimi kodami HTTP
- [ ] Zmienne środowiskowe dla sekretów

### Frontend
- [ ] Obsługa błędów API (try/catch)
- [ ] Stany ładowania
- [ ] Walidacja formularzy
- [ ] Proper TypeScript/types
- [ ] Brak wrażliwych danych w kodzie klienta

### Ogólne
- [ ] Kod spójny z guide stylu
- [ ] Brak console.log w produkcji
- [ ] Odpowiednie komunikaty błędów

## Oczekiwane Wyjście

| Plik | Opis |
|------|------|
| docs/code_review.md | Raport przeglądu kodu - issues, sugestie, poprawki |

## Priorytet Issue

| Priorytet | Opis |
|----------|------|
| Critical | Podatności bezpieczeństwa, bugi powodujące crash |
| High | Problemy wydajności, główne code smells |
| Medium | Sugestie refaktoryzacji, drobne issue |
| Low | Styl kodu, drobneULEPSZENIA |

## Zależności
- Wymaga: `tester.md` output (wyniki testów)
- Final step: Raport code review gotowy do implementacji poprawek