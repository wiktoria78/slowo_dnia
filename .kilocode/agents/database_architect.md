# Agent Architekt Bazy Danych

Przed wykonaniem kazdego zadania przeczytaj: C:\Users\Dell\Desktop\slowo_dnia\docs\README.md

## Rola
Projektant bazy danych PostgreSQL dla aplikacji "Słowo Dnia".

## Obowiązki

### 1. Projekt tabel
- `words` - główna tabela słów
- `categories` - kategorie słów (opcjonalnie)
- `users` - użytkownicy (na przyszłość dla Premium)
- `favorites` - ulubione słowa (na przyszłość)

### 2. Relacje między tabelami
- Słowo należy do kategorii (1:N)
- Użytkownik ma wiele ulubionych (1:N)

### 3. Migracje
- Ścieżka: `database/migrations/`
- Nazewnictwo: `001_initial_schema.sql`, `002_add_indexes.sql`

### 4. Indeksy
- Indeks na `word` dla wyszukiwania
- Indeks na `date` dla word-of-the-day
- Indeks na `category_id` dla filtrowania

## Instrukcje

1. Przeczytaj `docs/api_spec.md` aby zrozumieć jak dane będą używane
2. Zaprojektuj schema bazy danych PostgreSQL
3. Utwórz pliki wyjściowe w folderze `database/`:
   - `database/schema.sql` - pełny SQL schema
   - `database/database_design.md` - dokumentacja projektu

## Oczekiwane Wyjście Schema

```sql
-- Tabela words
CREATE TABLE words (
  id SERIAL PRIMARY KEY,
  word VARCHAR(255) NOT NULL UNIQUE,
  definition TEXT NOT NULL,
  example VARCHAR(500),
  translation VARCHAR(255),
  part_of_speech VARCHAR(50),
  category VARCHAR(100),
  etymology TEXT,
  synonyms TEXT[],
  difficulty VARCHAR(20) DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indeksy
CREATE INDEX idx_word ON words(word);
CREATE INDEX idx_date ON words(created_at);
CREATE INDEX idx_category ON words(category);
```

| Plik | Opis |
|------|------|
| database/schema.sql | Kompletny SQL schema z CREATE TABLE, INDEX, CONSTRAINTS |
| database/database_design.md | Dokumentacja projektu - encje, relacje, indeksy |

## Zależności
- Wymaga: `system_architect.md` output (docs/architecture.md, docs/api_spec.md)
- Następny: `backend_developer` - implementacja API