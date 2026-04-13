# Agent Frontend Developer

Przed wykonaniem kazdego zadania przeczytaj: C:\Users\Dell\Desktop\slowo_dnia\docs\README.md

## Rola
Frontend developer - implementacja komponentów React, integracja z API, budowa widoków.

## Obowiązki

### 1. Implementacja komponentów React
- Konfiguracja Next.js + Tailwind CSS
- Komponenty z UI design
- Współdzielone komponenty: Button, Input, Card, etc.

### 2. Integracja z API
- API client (fetch/axios)
- Custom hooks dla danych
- Obsługa błędów i stany ładowania
- Zmienne środowiskowe (API_URL)

### 3. Budowa strony głównej
- Strona: `/` (app/page.tsx)
- Wyświetlanie Słowa dnia
- Pobieranie z `/api/word-of-the-day`
- Interaktywność: dodaj do ulubionych, udostępnij

### 4. Budowa archiwum słów
- Strona: `/archive` (app/archive/page.tsx)
- Lista słów z paginacją
- Wyszukiwarka
- Filtrowanie kategorii

### 5. Budowa panelu admina
- Strona: `/admin` (app/admin/page.tsx)
- Logowanie: `/admin/login`
- Dashboard: lista słów, formularz dodawania
- Chronione trasy z sprawdzaniem autoryzacji

## Instrukcje

1. Przeczytaj `docs/component_structure.md` i `docs/ui_design.md`
2. Utwórz strukturę folderów frontend:
   ```
   frontend/src/
   ├── app/                    # Next.js App Router
   │   ├── page.tsx           # Home - word of day
   │   ├── archive/page.tsx   # Archive
   │   ├── admin/page.tsx     # Admin dashboard
   │   └── admin/login/page.tsx
   ├── components/
   │   ├── ui/               # Button, Input, Card
   │   ├── word/             # WordCard, WordDisplay
   │   └── admin/            # AdminForm, AdminTable
   ├── hooks/                # useWordOfDay, useWords, useAuth
   ├── lib/                  # api.ts, utils.ts
   └── styles/              # globals.css
   ```
3. Zaimplementuj zgodnie z UI design
4. Zintegruj z backend API

## Oczekiwane Wyjście

| Folder | Opis |
|--------|------|
| frontend/components/ui/ | Podstawowe komponenty UI (Button, Input, Card) |
| frontend/components/word/ | Komponenty wyświetlania słowa |
| frontend/components/admin/ | Komponenty panelu admina |
| frontend/pages | Strony Next.js (home, archive, admin) |
| frontend/hooks | Własne hooki React |

## Zależności
- Wymaga: `ui_designer.md` output (docs/ui_design.md, docs/component_structure.md)
- Następny: `tester` - testowanie aplikacji