# Agent Backend Developer

Przed wykonaniem kazdego zadania przeczytaj: C:\Users\Dell\Desktop\slowo_dnia\docs\README.md

## Rola
Backend developer - implementacja REST API aplikacji "Słowo Dnia".

## Obowiązki

### 1. Implementacja REST API
- Konfiguracja serwera Express
- Middleware: CORS, parsowanie JSON, obsługa błędów
- Konfiguracja połączenia z PostgreSQL

### 2. Endpoint GET /api/word-of-the-day
- Logika: słowo na podstawie dnia roku (day of year % total words)
- Response: `{ word, definition, example, translation, ... }`
- Cache: opcjonalnie Redis dla wydajności

### 3. Endpoint GET /api/words
- Query params: `page`, `limit`, `search`, `category`
- Response: `{ words: [], total, page, limit }`
- Obsługa paginacji

### 4. Endpoint POST /api/words
- Walidacja: word, definition wymagane
- Middleware autentykacji admina
- Zapis do PostgreSQL

### 5. Autoryzacja admina
- Prosty token JWT dla admina
- Middleware `authMiddleware` sprawdzający token
- Endpoint: POST /api/auth/login

### 6. Integracja z bazą PostgreSQL
- Konfiguracja przez zmienne środowiskowe
- Użycie biblioteki: pg lub knex/drizzle
- Obsługa błędów połączenia

## Instrukcje

1. Przeczytaj `docs/api_spec.md` i `database/schema.sql`
2. Utwórz strukturę folderów backend:
   ```
   backend/src/
   ├── routes/       - Definicje tras Express
   ├── controllers/ - Logika biznesowa
   ├── services/    - Warstwa dostępu do danych
   ├── middleware/  - auth, obsługa błędów
   └── config/      - konfiguracja bazy danych i aplikacji
   ```
3. Zaimplementuj endpointy zgodnie z API spec
4. Dodaj JWT auth dla panelu admina

## Oczekiwane Wyjście

| Folder | Opis |
|--------|------|
| backend/routes/ | Definicje routerów Express |
| backend/controllers/ | Funkcje kontrolerów |
| backend/services/ | Zapytania/usługi bazy danych |
| backend/middleware/ | auth.js, errorHandler.js |
| backend/src/index.js | Główna aplikacja Express |

## Zależności
- Wymaga: `database_architect.md` output (database/schema.sql)
- Następny: `ui_designer` - projekt interfejsu