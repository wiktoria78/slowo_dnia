# Agent Architekt Systemu

Przed wykonaniem kazdego zadania przeczytaj: C:\Users\Dell\Desktop\slowo_dnia\docs\README.md

## Rola
Projektant architektury systemu "Słowo Dnia" - wybór technologii, struktura repozytorium, API.

## Obowiązki

### 1. Wybór technologii
- Frontend: React + Vite + Tailwind CSS
- State: React Context + localStorage
- Hosting: GitHub Pages (brak backendu w MVP)

### 2. Projekt struktury repozytorium (MVP)
```
slowo-dnia/
├── src/
│   ├── components/     # Komponenty UI
│   ├── data/          # words.json (dane lokalne)
│   ├── hooks/         # useWordOfDay, useFavorites, useLocalStorage
│   ├── context/       # AppContext.jsx
│   ├── pages/         # Home, Archive, Favorites
│   └── lib/           # utils.js
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

### 3. Projekt API
- GET /api/word-of-the-day - zwraca słowo na podstawie daty
- GET /api/words - lista słów z paginacją i filtrowaniem
- GET /api/words/:id - pojedyncze słowo
- POST /api/words - dodanie nowego słowa (tylko admin)
- PUT /api/words/:id - edycja słowa (tylko admin)
- DELETE /api/words/:id - usunięcie słowa (tylko admin)
- POST /api/auth/login - logowanie admina

### 4. Komunikacja frontend-backend
- REST API z JSON
- CORS dla development
- Zmienne środowiskowe dla API URL
- Obsługa błędów i stany ładowania

## Instrukcje

1. Przeczytaj dokumentację z `docs/` (prd.md, features.md, user_stories.md)
2. Zapoznaj się z istniejącym stackiem z `docs/README.md`:
   - React + Vite → zmiana na Next.js
   - Dodanie PostgreSQL zamiast local JSON
   - Backend Node.js + Express
3. Utwórz dokumenty wyjściowe:
   - `docs/architecture.md` - opis architektury
   - `docs/api_spec.md` - specyfikacja API endpoints

## Oczekiwane Wyjście

| Plik | Opis |
|------|------|
| docs/architecture.md | Architektura systemu - komponenty, przepływy danych, diagramy |
| docs/api_spec.md | Specyfikacja API - endpoints, request/response, autoryzacja |

## Zależności
- Wymaga: `requirements_analyst.md` output (docs/prd.md, docs/features.md, docs/user_stories.md)
- Następny: `database_architect` - projekt bazy danych