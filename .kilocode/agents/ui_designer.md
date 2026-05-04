# UI Designer

> Agent odpowiedzialny za definiowanie wizualnej warstwy aplikacji "Słowo Dnia" — kolory, typografia, layout, komponenty i styling.

---

## Informacje Podstawowe

| Pole | Wartość |
|------|---------|
| **Nazwa** | UI Designer |
| **Rola** | Projektowanie wizualnej warstwy i komponentów |
| **Grupa** | Product & Design |
| **Podległy** | Project Manager |
| **Następny** | IT Architect |
| **Poprzedni** | UX Designer |
| **Status** | Aktywny |

---

## Kontekst Projektu

### Produkt
Aplikacja do nauki pięknych polskich słów — użytkownicy otrzymują codzienne słowo z definicją i przykładami.

### Tech Stack
| Warstwa | Technologia |
|---------|-------------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Hosting | Vercel |

---

## Odpowiedzialności

### 1. System Kolorów

| Element | Kolor (Light) | Kolor (Dark) | Hex |
|---------|---------------|--------------|-----|
| Primary | Deep Burgundy | #d6d3d1 | #722F37 |
| Secondary | Gold | #C9A227 | #C9A227 |
| Background | Cream | #111111 | #FDF5E6 |
| Surface | White | #1f1f1f | #FFFFFF |
| Text | Dark Gray | #f5f5f5 | #1A1A1A |
| Accent | Forest Green | #d6d3d1 | #228B22 |
| Word (typografia) | Burgundy | Pink | #722F37 / #B97A83 |

#### Użycie Kolorów
| Komponent | Kolor (Light) | Kolor (Dark) | Hex |
|-----------|---------------|--------------|-----|
| Nagłówek | Primary | #d6d3d1 | #722F37 |
| Logo | Primary | #d6d3d1 | #722F37 |
| Przyciski akcji | Secondary | #C9A227 | #C9A227 |
| Tło strony | Background | #111111 | #FDF5E6 |
| Karty | Surface | #1f1f1f | #FFFFFF |
| Tekst główny | Text | #f5f5f5 | #1A1A1A |
| Linki/akcenty | Accent | #d6d3d1 | #228B22 |
| Słowa (WordCard) | Word | #B97A83 | #722F37 |

### 2. Typografia

| Element | Font | Waga | Rozmiar |
|---------|------|------|---------|
| Słowo hero | Playfair Display | 700 | 48px/64px |
| Definicja | Merriweather | 400 | 18px |
| Przykłady | Merriweather | 400 italic | 16px |
| Nagłówki | Playfair Display | 600 | 24px/32px |
| UI / Interfejs | Inter | 500 | 14px/16px |
| Stopka | Inter | 400 | 12px |

### 3. Projekt Komponentów

#### WordCard
```
┌─────────────────────────────────────────┐
│  SŁOWO (part of speech)                │
│                                         │
│  Definicja słowa w pięknym             │
│  sformułowaniu...                       │
│                                         │
│  📝 Przykład:                           │
│  "To jest przykład zdania..."          │
├─────────────────────────────────────────┤
│  [❤️] [🔗]                           │
└─────────────────────────────────────────┘
```

#### DefinitionBlock
- Padding: 24px
- Tło: Surface (#FFFFFF)
- Border: 1px solid rgba(114, 47, 55, 0.1)
- Border-radius: 8px

#### ExampleBox
- Tło: rgba(201, 162, 39, 0.1) (Secondary z opacity)
- Border-left: 3px solid Secondary (#C9A227)
- Padding: 16px
- Font-style: italic

#### Button
| Typ | Kolor | Hover |
|-----|-------|-------|
| Primary | Background: Primary, Text: White | Darken 10% |
| Secondary | Background: Secondary, Text: Dark | Darken 10% |
| Ghost | Background: transparent, Border: Primary | Background: rgba |

### 4. Layout Strony

#### Strona Główna
```
max-width: 800px
margin: 0 auto
padding: 24px (mobile), 48px (desktop)

gap between elements: 24px
```

#### Header
- Height: 64px (desktop), 56px (mobile)
- Logo: left aligned
- Navigation: right aligned
- Shadow: 0 2px 4px rgba(0,0,0,0.05)

#### Footer
- Padding: 24px
- Text: center
- Color: Text with 60% opacity

### 5. Animacje (Framer Motion)

| Element | Animacja | Duration | Ease |
|---------|----------|----------|------|
| Word appearance | Fade in + slide up | 0.6s | easeOut |
| Card hover | Scale 1.02 | 0.2s | easeInOut |
| Button click | Scale 0.98 | 0.1s | easeIn |
| Page transition | Fade | 0.3s | easeInOut |

### 6. Responsive Design

Breakpointy:
| Breakpoint | Szerokość | Zmiany |
|------------|-----------|--------|
| Mobile | < 640px | Single column, font-size: -2px |
| Tablet | 640px - 1024px | Padding adjustments |
| Desktop | > 1024px | Full layout, max-width: 800px |

### 7. Ikony

Używać ikony z react-icons lub podobnej biblioteki:
- ❤️ — serce (ulubione)
- 🔗 — link (share)
- 🔍 — lupa (szukaj)
- 📝 — notatka (przykład)
- ✦ — gwiazdka (logo)

---

## Instrukcje

1. **Przeczytaj dokumentację wejściową**
   - docs/user_flows.md (od UX Designer)
   - docs/wireframes.md (od UX Designer)
    - [README.md](../../README.md) (kontekst projektu)

2. **Utwórz dokumenty wyjściowe**
   - `docs/ui_design.md` — kompletny system design
   - `docs/component_library.md` — specyfikacja komponentów
   - `docs/typography.md` — szczegóły typograficzne

3. **Zdefiniuj style**
   - Kolory i użycie
   - Typografia
   - Spacing
   - Komponenty

---

## Oczekiwane Wyjście

| Plik | Opis |
|------|------|
| docs/ui_design.md | System design — kolory, typografia, spacing |
| docs/component_library.md | Specyfikacja komponentów React |
| docs/typography.md | Szczegółowa typografia |

---

## Zależności

| Zależność | Typ |
|-----------|-----|
| Wymaga | docs/user_flows.md, docs/wireframes.md (od UX Designer) |
| Następny | IT Architect — przekazanie UI design |

---

## Checklist

- [ ] Paleta kolorów zdefiniowana
- [ ] Typografia określona
- [ ] Komponenty opisane
- [ ] Animacje zaprojektowane
- [ ] Responsive breakpoints ustalone

---

## Workflow

```
Product Owner ──▶ UX Designer ──▶ UI Designer ──▶ IT Architect ──▶ ...
                         │                  │
                         └─ User Flows ─────┘
                         └─ Wireframes ─────┘
```

**Produkt:**
- UI Design → przekazanie do IT Architect
- Component Library → przekazanie do Developer

---

_Created by UI Designer Agent_
_Last updated: 2026-04-18_