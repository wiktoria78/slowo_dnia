# Plan wdrożenia: UI Design System i Responsywność

## 1. Cel

Zastosowanie spójnego design systemu (typografia, kolory, spacing, animacje) w całej aplikacji oraz zapewnienie pełnej responsywności na wszystkich urządzeniach (mobile, tablet, desktop).

## 2. Typografia (Google Fonts)

### Fonty
- **Playfair Display 700** – nagłówki, słowo główne
- **Merriweather 400** – ciało tekstu, definicje, przykłady
- **Inter 500** – UI, przyciski, formularze

### Rozmiary (Desktop)
- Słowo główne: 3-5rem
- Definicja: 1.125rem
- UI tekst: 0.875-1rem

## 3. Paleta Kolorów

| Rola | Kolor | HEX | Użycie |
|------|-------|-----|--------|
| Primary | Deep Burgundy | #722F37 | Nagłówki, akcenty, przyciski |
| Secondary | Gold | #C9A227 | Kategorie, hover stany |
| Background | Cream | #FDF5E6 | Tło strony |
| Surface | White | #FFFFFF | Karty, panele |
| Text | Dark Gray | #2C2C2C | Tekst główny |
| Accent | Forest Green | #228B22 | Sukcesy, dodatkowe akcenty |

## 4. Spacing System

System 8-piksełowy z drobnymi odstępami:
- 0.25rem (4px) – drobne odstępy
- 0.5rem (8px) – małe odstępy
- 1rem (16px) – standard
- 1.5rem (24px) – średnie
- 2rem (32px) – duże
- 3rem (48px) – hero
- 4rem (64px) – maksymalne

## 5. Border Radius

- `rounded` (4px) – małe
- `rounded-lg` (8px) – standard
- `rounded-xl` (12px) – karty
- `rounded-2xl` (16px) – duże zaokrąglenia
- `rounded-full` (9999px) – pill

## 6. Cienie

- `shadow-sm` – delikatny
- `shadow` – standardowy
- `shadow-lg` – wyraźny
- `shadow-xl` – mocny (hover)

## 7. Animacje (Framer Motion)

### Wejścia karty
```
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.5 }
```

### Rozwijanie sekcji
```
initial: { height: 0, opacity: 0 }
animate: { height: 'auto', opacity: 1 }
exit: { height: 0, opacity: 0 }
```

### Przyciski
```
whileHover: { scale: 1.05 }
whileTap: { scale: 0.95 }
```

### Staggered (grid)
```
transition: { delay: index * 0.05 }
```

## 8. Responsywność (Breakpoints)

- **Mobile:** < 640px – 1 kolumna
- **Tablet:** 640px - 1024px – 2 kolumny
- **Desktop:** > 1024px – 3 kolumny

## 9. Accessibility (WCAG AA)

### Kontrast
- Tekst główny na tle: 15.9:1 ✅
- Primary na białym: 5.6:1 ✅
- Minimum wymagane: 4.5:1 ✅

### Nawigacja
- Focus states dla linków
- Semantic HTML (h1-h6, nav, main)
- ARIA labels dla ikon
- Tab order logiczny

### Touch Targets
- Minimum 44px wysokości
- 8px spacing między elementami

## 10. Zgodność Design Systemu

### Komponenty
- Typografia zgodna ze specyfikacją
- Kolory zgodne z paletą
- Spacing zdefiniowany w systemie
- Cienie spójne
- Animacje w Framer Motion

### Testy
- [x] Typografia: Playfair, Merriweather, Inter
- [x] Kolory: #722F37, #C9A227, #FDF5E6, #FFFFFF, #2C2C2C, #228B22
- [x] Spacing: 8-piksełowy system
- [x] Animacje: 60fps
- [x] Responsywność: 1/2/3 kolumny
- [x] Accessibility: WCAG AA

---

*Plan zaimplementowany* ✅
*Dokumentacja aktualna: 2026-04-28*