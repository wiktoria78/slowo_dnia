# Zaimplementowane Plany

---

## Data: 2026-04-11

### Plan: Wzorzec Planu Pracy dla Agenta AI Developera

# Wzorzec Planu Pracy dla Agenta AI Developera

## Wytyczne Ogólne

### Kryterium Jednej Funkcjonalności
- Każdy plan dotyczy **JEDNEJ małej funkcjonalności**
- Jeśli funkcjonalność wymaga więcej niż jednej sekcji agenta AI → **ODRZUĆ** tworzenie planu
- Zamiast tego rozpadnij na mniejsze osobne plany

### Walidacja Wielkości
Przed stworzeniem planu odpowiedz:
- Czy da się to wdrożyć w < 100 liniach kodu?
- Czy zajmie to < 2 godziny pracy?
- Czy to jest pojedynczy komponent/hook/funkcja?

**Jeśli NIE na którekolwiek pytanie → odrzuć plan**

---

## Szablon Planu

```markdown
# Plan: [Nazwa Funkcjonalności]

## Sekcja 1: Przygotowanie
- [ ] 1. Przeanalizuj istniejący kod i strukturę projektu
- [ ] 2. Zidentyfikuj gdzie dodać nową funkcjonalność

## Sekcja 2: Implementacja
- [ ] 3. Utwórz niezbędne komponenty/pliki
- [ ] 4. Dodaj logikę biznesową
- [ ] 5. Połącz z istniejącym kodem

## Sekcja 3: Walidacja
- [ ] 6. Uruchom testy (npm run test / npm run lint)
- [ ] 7. Zbuduj aplikację (npm run build)
- [ ] 8. Sprawdź czy wszystko działa poprawnie

## Sekcja 4: Dokumentacja
- [ ] 9. Zapisz plan w docs/plany/zaimplementowane-plany.md
```

---

## Struktura Planu

### Nagłówek
```
# Plan: [Krótka nazwa funkcjonalności]
```

### Sekcje (minimum 2, maximum 4)
Każda sekcja ma logiczny podział:
- **Sekcja 1: Analiza** - co trzeba zrobić
- **Sekcja 2: Implementacja** - jak to zrobić
- **Sekcja 3: Walidacja** - testy i weryfikacja
- **Sekcja 4: Dokumentacja** - zapis planu

### Elementy Planu
- Format: `- [ ] NUMER. Opis zadania`
- Każdy element jest checkboxem
- Numeracja ciągła w całym dokumencie (1, 2, 3...)
- Krótkie, konkretne opisy

---

## Przykład Poprawnego Planu (mała funkcjonalność)

```markdown
# Plan: Przycisk ulubionych

## Sekcja 1: Analiza
- [ ] 1. Sprawdź strukturę komponentu WordCard
- [ ] 2. Znajdź hook useFavorites w hooks/useFavorites.js

## Sekcja 2: Implementacja
- [ ] 3. Dodaj przycisk do komponentu WordCard
- [ ] 4. Podłącz funkcjonalność toggleFavorite
- [ ] 5. Dodaj stylizację (ikona serca)

## Sekcja 3: Walidacja
- [ ] 6. Uruchom npm run lint
- [ ] 7. Uruchom npm run build
- [ ] 8. Sprawdź czy przycisk działa

## Sekcja 4: Dokumentacja
- [ ] 9. Zapisz plan w docs/plany/zaimplementowane-plany.md
```

---

## Przykład Odrzuconego Planu (za duży)

```
Plan: Pełny system archiwum z wyszukiwarką i filtrami
```

**Powód odrzucenia:** Wymaga wielu sekcji agenta, za dużo kodu, za długo.

**Rozwiązanie:** Podziel na:
1. Plan: Lista archiwum słów
2. Plan: Wyszukiwarka słów
3. Plan: Filtry kategorii

---

## Procedura Zapisu

### Po Zakończeniu Implementacji:
1. Skopiuj stworzony plan do pliku `docs/plany/zaimplementowane-plany.md`
2. Dodaj datę implementacji
3. Opcjonalnie dodaj notatki

### Format zapisu:
```markdown
## Data: [YYYY-MM-DD]

### Plan: [Nazwa]
[Plan]

**Status:** ✅ Zaimplementowano
```

**Status:** ✅ Zaimplementowano