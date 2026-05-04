# WF_UI_Designer

**Cel:** Stworzyć system UI designu (komponent library, style, wygląd) dla aplikacji "Słowo Dnia", zapewniając piękny, spójny i profesjonalny wygląd.

---

## **1. Fundamentalna Zasada (The Success Equation)**

> **UI Success = Visual Hierarchy + Consistency + Polish + Brand Identity**

Jeśli UI nie jest piękne, użytkownik odrzuca w pierwszych 5 sekundach. Jeśli jest niespójny, traci zaufanie. Jeśli nie ma polerowania, wydaje się tanio. Jeśli nie ma tożsamości marki, jest zapomniany.

Twoim zadaniem jest stworzenie interfejsu, który zachwyca na pierwszy rzut oka i motywuje do dłuższego użytkowania.

---

## **2. Definicja Sukcesu UI

**Visual Goals:**
- [ ] Profesjonalny typograficzny układ (typography)
- [ ] Harmonijna paleta kolorów (color harmony)
- [ ] Spójny system komponentów (design system)
- [ ] Piękne animacje (delight)
- [ ] Premium feel (poczucie jakości)
- [ ] Mobile-first piękny design

**Brand Identity:**
- **Voice:** Elegancki, kulturowy, przyjazny, polski
- **Personality:** Dostojny, ale luźny; klasyczny, ale nowoczesny
- **Core Value:** Piękno języka polskiego w nowoczesnym wydaniu

---

## **3. Visual Design System (System Wizualny)

### **3.1 Typography Hierarchy (Typografia)

**Font Families:**

```
Display / Headlines: Playfair Display
  - Użycie: Słowo dnia, nagłówki główne
  - Cechy: Elegancki, duże kontrasty, klasyczny serif
  - Wagi: Regular (400), Bold (700)
  - Wartość: Tradycja, piękno, wyrafinowanie

Body / Content: Merriweather
  - Użycie: Definicje, przykłady, tekst długi
  - Cechy: Czytelny, lekko klasyczny, dobra czytelność
  - Wagi: Regular (400), Italic (400)
  - Wartość: Komunikatywność, zrozumiałość

UI Elements / Interface: Inter
  - Użycie: Przyciski, nawigacja, metadata, formularze
  - Cechy: Nowoczesny, czysty, bardzo czytelny
  - Wagi: Medium (500), Regular (400)
  - Wartość: Współczesność, funkcjonalność
```

**Type Scale (Skala Typograficzna):**

```
┌─────────────────┬───────────┬──────────┬─────────────┬─────────────┐
│ Element         │ Mobile    │ Tablet   │ Desktop     │ Line Height │
├─────────────────┼───────────┼──────────┼─────────────┼─────────────┤
│ H1 - Słowo      │ 36px      │ 44px     │ 48px        │ 1.1         │
│ H2 - Category   │ 16px      │ 16px     │ 16px        │ 1.3         │
│ H3 - Section    │ 16px      │ 16px     │ 18px        │ 1.4         │
│ Body - Definicja│ 16px      │ 17px     │ 18px        │ 1.7         │
│ Small - Meta    │ 14px      │ 14px     │ 14px        │ 1.4         │
│ Caption         │ 12px      │ 12px     │ 13px        │ 1.3         │
└─────────────────┴───────────┴──────────┴─────────────┴─────────────┘
```

**Font Weights Usage:**
- **700 (Bold):** Słowo główne, ważne akcenty
- **500 (Medium):** Przyciski, UI labels, część mowy
- **400 (Regular):** Tekst główny, definicje
- **400 Italic:** Przykłady użycia, cytaty, etymologia

---

### **3.2 Color System (System Kolorów)

**Primary Palette:**

```
Deep Burgundy (Akcent główny)
  Jasny tryb:
    #722F37 - główny (słowa, akcenty, przyciski)
    #8B3A45 - hover/lżejszy akcent
    #5A222A - ciemniejszy, pressed state
    #E8D0D2 - bardzo jasny, tła subtelne
  Ciemny tryb:
    #B97A83 - główny słowa (pink)
    #8B3A45 - hover/lżejszy akcent
    #5A222A - ciemniejszy, pressed state
    #8b3842 - bardzo jasny, tła subtelne

Golden (Akcent drugorzędny) - Jasny i ciemny tryb:
    #C9A227 - główny złoty, highlighty
    #D4AF37 - hover, lśniący złoty
    #A67C1A - ciemniejszy, borders
    #F5E8B0 - blady złoty, tła
```
Cream (Tło główne) - Jasny tryb:
    #FDF5E6 - główne tło, papierowy krem
    #FAF0D9 - alternatywne tło sekcji
    #F5E6D3 - subtelny wzór

Cream (Tło główne) - Ciemny tryb:
    #111111 - główne tło
    #1a1a1a - alternatywne tło sekcji
    #252525 - subtelny wzór

Surface (Powierzchnie) - Jasny tryb:
    #FFFFFF - karty, modal, powierzchnie podniesione
    #FCFCFC - lekkie cienie

Surface (Powierzchnie) - Ciemny tryb:
    #1f1f1f - karty, modal, powierzchnie podniesione
    #2a2a2a - lekkie cienie
```

**Neutral Palette:**

```
Dark Text (Tekst główny)
  Jasny tryb:
    #1A1A1A - główny tekst (90% czerni)
    #3D3D3D - tekst drugorzędny
    #5A5A5A - subtelny tekst (placeholder)
    #8A8A8A - disabled, inactive
  Ciemny tryb:
    #f5f5f5 - główny tekst
    #a1a1a1 - tekst drugorzędny
    #6b6b6b - subtelny tekst
    #8A8A8A - disabled, inactive

Light Grays (Borders, Dividers)
  Jasny tryb:
    #E8E8E8 - główne borders
    #F0F0F0 - subtelne krawędzie
    #FAFAFA - najlżejsze separatory
  Ciemny tryb:
    #2f2f2f - główne borders
    #3a3a3a - subtelne krawędzie
    #454545 - najlżejsze separatory

Semantic Colors (Statusy) - Jasny tryb:
    Success: #228B22 - zielony lasu (potwierdzenie)
    Warning: #B8860B - ciemny żółty (ostrzeżenie)
    Error: #A63333 - bordowy (błąd)
    Info: #3A6B8D - granatowy niebieski (info)

Semantic Colors (Statusy) - Ciemny tryb:
    Success: #d6d3d1 - jasny (potwierdzenie)
    Warning: #C9A227 - złoty (ostrzeżenie)
    Error: #FF6B6B - czerwony (błąd)
    Info: #6B9AB8 - granatowy (info)
```

**Color Usage Rules:**

```
Słowo główne (Hero)            → Deep Burgundy (#722F37 w jasnym, #B97A83 w ciemnym)
Część mowy                     → Dark Text (#1A1A1A jasny / #f5f5f5 ciemny) italic
Definicja                      → Dark Text (#1A1A1A jasny / #f5f5f5 ciemny) na tło Surface
Przykłady (blockquote)         → Dark Text, italic, left border (2px, #C9A227/30)
Etymologia                     → Dark Text (#1A1A1A jasny / #f5f5f5 ciemny), left border (2px, #C9A227/30)
Kategoria (tag)                → Secondary background (#C9A227/20), rounded-full, secondary text
Przyciski główne               → Deep Burgundy (#722F37), biały tekst
Przyciski drugorzędne          → Transparent, bordowy border
Hover stanu                   → Lżejszy odcień (#8B3A45) lub przezroczystość
Focus ring                     → Złoty (#D4AF37), 2px
Borders                        → Subtelne (#E8E8E8 jasny / #2f2f2f ciemny)
```
Słowo główne (Hero)        → Deep Burgundy (#722F37)
            Część mowy                 → Dark Text (#1A1A1A) italic
            Definicja                  → Dark Text (#1A1A1A) na tle (#FFFFFF)
Przykłady (blockquote)     → Dark Text, italic, left border (2px, #C9A227/30)
            Etymologia                 → Dark Text (#1A1A1A), left border (2px, #C9A227/30)
Kategoria (tag)            → Secondary background (#C9A227/20), rounded-full, secondary text
Przyciski główne           → Deep Burgundy, biały tekst
Przyciski drugorzędne      → Transparent, bordowy border
Hover stanu               → Lżejszy odcień (#8B3A45) lub przezroczystość
Focus ring                 → Złoty (#D4AF37), 2px
Borders                    → Subtelne (#E8E8E8)
```

---

### **3.3 Elevation System (Cienie i Głębia)

```
Level 0 - Flat (Brak cienia)
  box-shadow: none;
  Użycie: Tło główne, pełnoekranowe elementy

Level 1 - Subtle (Subtelny cień)
  box-shadow: 0 1px 3px rgba(0,0,0,0.08),
              0 1px 2px rgba(0,0,0,0.04);
  Użycie: Karty słów, małe podniesienia

Level 2 - Default (Standardowy cień)
  box-shadow: 0 4px 6px rgba(0,0,0,0.07),
              0 2px 4px rgba(0,0,0,0.06);
  Użycie: Główne karty, modale, dropdowny

Level 3 - Elevated (Wyraźny cień)
  box-shadow: 0 10px 15px rgba(0,0,0,0.08),
              0 4px 6px rgba(0,0,0,0.05);
  Użycie: Popovers, tooltips, modal dialogs

Level 4 - Floating (Pływający)
  box-shadow: 0 20px 25px rgba(0,0,0,0.1),
              0 10px 10px rgba(0,0,0,0.04);
  Użycie: Hero section, główne akcje
```

**Border Radius Scale:**

```
Rounded-none:  0px    (kwadraty, ostre karty)
Rounded-sm:    4px    (małe elementy, ikony)
Rounded-md:    8px    (domyślne, przyciski, karty)
Rounded-lg:    12px   (duże karty, sekcje)
Rounded-xl:    16px   (hero, główne akcenty)
Rounded-full:  9999px (pille, koła)
```

---

### **3.4 Spacing & Layout (Odstępy i Układ)

**8px Base Grid System:**

```
1x:   8px    (minimalny odstęp)
2x:  16px    (standardowy odstęp między elementami)
3x:  24px    (odstęp w sekcjach)
4x:  32px    (odstęp między sekcjami)
5x:  40px    (większe przerwy)
6x:  48px    (odstęp na mobile)
8x:  64px    (odstęp na desktop)
10x: 80px    (duże sekcje)
12x: 96px    (hero sections)
```

**Container Max Widths:**

```
Mobile:  100% (pełna szerokość)
Tablet:  720px
Desktop: 980px
Wide:    1200px
Hero:    1400px (maksymalnie)
```

**Grid System:**
- 12-kolumnowy grid na desktop
- 8-kolumnowy na tablet
- 4-kolumnowy na mobile
- Gutter: 24px (desktop), 16px (tablet), 8px (mobile)

---

## **4. Component Library (Biblioteka Komponentów)

### **4.1 Button Component (Przycisk)

**Variants:**

```
1. Primary Button (Główny akcent)
   Background: #722F37 (Deep Burgundy)
   Text: #FFFFFF (White)
   Border: none
   
   States:
   - Default: Solid burgundy
   - Hover: #8B3A45 (lighter burgundy), shadow elevation 2→3
   - Active: #5A222A (darker burgundy), pressed state
   - Focus: Gold ring 2px (#D4AF37)
   - Disabled: Opacity 50%, no shadow
   
   Border Radius: 8px (rounded-md)
   Padding: 12px 24px (M)
   Font: Inter Medium 14px
   Transition: all 150ms ease

2. Secondary Button (Drugorzędny)
   Background: Transparent
   Text: #2C2C2C (Dark text)
   Border: 1px solid #E8E8E8
   
   States:
   - Default: Transparent bg, subtle border
   - Hover: #FAF0D9 (pale gold bg), border #C9A227
   - Active: #F5E8B0 (darker gold bg)
   - Focus: Gold ring 2px
   - Disabled: Gray border, text opacity 50%
   
   Border Radius: 8px
   Padding: 10px 20px
   Font: Inter Medium 14px
   
3. Ghost Button (Bez tła)
   Background: Transparent
   Text: #722F37 (Burgundy)
   Border: none
   
   States:
   - Default: Text only
   - Hover: #8B3A45 (darker burgundy), subtle bg
   - Active: #5A222A (much darker)
   - Focus: Gold underline
   
   Border Radius: 4px
   Padding: 8px 16px
   Font: Inter Medium 14px

4. Icon Button (Tylko ikona)
   Background: Transparent or subtle bg
   Icon: #2C2C2C
   
   States:
   - Default: Subtle
   - Hover: #F5E8B0 bg
   - Active: #E8D0D2 bg
   - Focus: Gold ring
   
   Size: 40x40px (touch target)
   Border Radius: 50% (full circle)
```

**Special Buttons:**

```
Favorite Button (❤️):
   Default: Heart outline #8A8A8A
   Hover: Scale 1.1, #A63333 (red)
   Active: Filled red #A63333, slight scale down
   Animated: Heart beat pulse on favorited

 Share Button (📤):
    Default: Share icon #2C2C2C on bg-primary
    Hover: bg-primary/90 (slightly transparent)
    Active: Scale 0.95
    Focus: Gold ring
    Copied state: Green (#2E8B57 / bg-green-600) with check icon
    
    Button styling:
    - Background: bg-primary (Deep Burgundy #722F37)
    - Text: White
    - Border radius: 0.5rem (8px)
    - Min-width: 140px
    - Padding: 0.5rem 0.75rem
    - Font: Inter Medium 14px
   
Back/Forward Navigation (⏪ ⏩):
   Large circular buttons
   Size: 48x48px
   Border: 1px solid #E8E8E8
   Icon centered
   Hover: Gold border #C9A227
   Transition: transform 150ms
```

### **4.2 Card Component (Karty - dla słów)

**Word Card (Główna karta słowa):**

```
Container:
  Background: #FFFFFF
  Border Radius: 16px (rounded-xl)
  Padding: 40px 48px
  Box Shadow: Level 2 (default elevation)
  Max-width: 800px
  Margin: 0 auto
  
  Mobile:
    Padding: 24px 16px
    Border-radius: 12px
    Box-shadow: Level 1

Header (Word + Metadata):
  Layout: Vertical stack, centered
  
   Word (Słowo):
     Font: Playfair Display Bold
     Size: 48px (desktop), 44px (mobile)
     Color: #722F37 (jasny) / #B97A83 (ciemny)
     Line-height: 1.1
     Letter-spacing: -0.02em
    Margin-bottom: 8px
    
  Part of Speech (Część mowy):
    Font: Inter Italic
    Size: 20px (desktop), 16px (mobile)
    Color: #C9A227 (Gold)
    Background: #F5E8B0 (pale gold)
    Display: inline-block
    Padding: 4px 12px
    Border-radius: 20px
    Margin-bottom: 24px

Body (Content):
  Layout: Vertical stack, spaced
  
  Definition:
    Font: Merriweather Regular
    Size: 18px
    Color: #2C2C2C (Dark text)
    Line-height: 1.7
    Margin-bottom: 20px
    
  Examples (Przykłady):
    Container:
      Border-left: 3px solid #E8E8E8
      Padding-left: 20px
      Margin: 0 0 20px 0
    
    Label "Przykłady użycia:":
      Font: Inter Medium 12px
      Color: #5A5A5A (Muted)
      Text-transform: uppercase
      Letter-spacing: 0.05em
      Margin-bottom: 8px
    
    Each Example:
      Font: Merriweather Italic
      Size: 16px
      Color: #3D3D3D
      Line-height: 1.6
      Margin-bottom: 12px
      
      Quote styling:
        &::before { content: "„"; }
        &::after { content: "”"; }

  Etymology (Etymologia):
    Container:
      Background: #FDF5E6 (cream)
      Border: 1px solid #E8E8E8
      Border-radius: 8px
      Padding: 16px 20px
    
    Label:
      Font: Inter Medium 12px
      Color: #5A5A5A
      Text-transform: uppercase
      Margin-bottom: 4px
    
    Text:
      Font: Merriweather Regular 13px
      Color: #5A5A5A
      Font-style: italic

   Category (Kategoria):
     Display: inline-block
     Background: #F5E8B0 (pale gold)
     Color: #722F37 (jasny) / #B97A83 (ciemny)
     Font: Inter Medium 12px
     Padding: 4px 12px
     Border-radius: 20px
    Margin-bottom: 24px

Actions (Przyciski):
  Layout: Horizontal flex, centered, wrapped
  Gap: 12px
  
  Favorite Button:
    Size: Medium (12px 24px)
    Animated heart icon
    
  Share Button:
    Size: Medium
    
  Navigation (Previous/Next):
    Ghost variant
    With arrows
    
  "Dzień X" indicator:
    Font: Inter Regular 13px
    Color: #8A8A8A
    Italic
```

**Archive Cards (W archiwum):**

```
Compact Word Card:
  Background: #FFFFFF
  Border: 1px solid #E8E8E8
  Border-radius: 12px
  Padding: 20px 24px
  Margin-bottom: 16px
  Transition: all 200ms ease
  
  States:
  - Default: Subtle border, shadow Level 0
  - Hover: Border-color #C9A227, shadow Level 1, translateY(-2px)
  - Active: Pressed state
  
  Layout:
    Grid: 3 columns
    Col 1: #98 (number) - muted
    Col 2: Word + preview - main content
    Col 3: Actions
    
  Number:
    Font: Inter Regular 12px
    Color: #8A8A8A
    
   Word:
     Font: Playfair Display Bold 20px
     Color: #2C2C2C (jasny) / #f5f5f5 (ciemny)
     Margin-bottom: 4px
    
  Definition preview:
    Font: Merriweather Regular 14px
    Color: #5A5A5A
    White-space: nowrap
    Overflow: hidden
    Text-overflow: ellipsis
    
  Category:
    Display: inline-block
     Background: #F5E8B0
     Color: #C9A227 (gold)
     Font-size: 11px
    Padding: 2px 8px
    Border-radius: 12px
    Margin-top: 8px
    
  Action (Pokaż więcej):
    Ghost button
    Font-size: 13px
    Float: right
```

### **4.3 Navigation Component (Nawigacja)

**Main Navigation Bar:**

```
Desktop Header:
  Position: Fixed top, full width
  Height: 72px
  Background: rgba(253, 245, 230, 0.95) [cream with transparency]
  Backdrop-filter: blur(10px)
  Border-bottom: 1px solid rgba(232, 232, 232, 0.5)
  z-index: 1000
  
  Layout: Flex, justify space-between, align center
  Padding: 0 48px
  
  Left (Brand):
    Logo/Text: "Słowo Dnia"
    Font: Playfair Display Bold 20px
    Color: #722F37
    
  Center (Nav Links):
    Display: Flex
    Gap: 8px
    
    Each Link:
      Font: Inter Medium 14px
      Color: #5A5A5A
      Padding: 8px 16px
      Border-radius: 8px
      Transition: all 150ms
      
      States:
      - Default: Subtle
      - Hover: Background #FFFFFF, color #2C2C2C
      - Active: Background #F5E8B0, color #722F37
      - Active Page: Background #722F37, color #FFFFFF
      
  Right (Menu):
    Optional: User menu or settings
    
  Mobile Header:
    Height: 64px
    Padding: 0 16px
    
    Center Nav: Hidden (goes to bottom nav)
    
    Right: Menu button (hamburger)

Bottom Navigation (Mobile):
  Position: Fixed bottom, full width
  Height: 64px
  Background: #FFFFFF
  Border-top: 1px solid #E8E8E8
  
  Layout: Flex, justify space-around, align center
  
  Each Nav Item:
    Size: 44px x 44px (touch target)
    Display: Flex, flex-direction column, align center, justify center
    
     Icon:
       Size: 24px
       Color: #8A8A8A (nieaktywne jasny/ciemny), #722F37 (aktywne jasny) / #B97A83 (aktywne ciemny)
       
     Label:
       Font: Inter 10px
       Color: #8A8A8A (nieaktywne jasny/ciemny), #722F37 (aktywne jasny) / #B97A83 (aktywne ciemny)
      
    Active State:
      Icon and label tinted burgundy
      Subtle glow effect
```

### **4.4 Input Components (Form Elements)

**Search Bar:**

```
Main Search (Archive):
  Container:
    Position: relative
    Width: 100%
    Max-width: 500px
    
  Input:
    Width: 100%
    Height: 48px
    Background: #FFFFFF
    Border: 1px solid #E8E8E8
    Border-radius: 12px
    Padding: 0 20px 0 48px
    Font: Inter Regular 15px
    Color: #2C2C2C
    
    States:
    - Default: Subtle border
    - Focus: Border #C9A227, box-shadow 0 0 0 3px rgba(201, 162, 39, 0.1)
    - Hover: Border #C9A227
      outline: none
    
  Search Icon:
    Position: absolute
    Left: 16px
    Top: 50%
    Transform: translateY(-50%)
    Color: #8A8A8A
    Size: 20px
    
  Clear Button:
    Position: absolute
    Right: 16px
    Top: 50%
    Transform: translateY(-50%)
    Background: none
    Border: none
    Color: #8A8A8A
    Cursor: pointer
    
    Hover: Color #2C2C2C
```

### **4.5 Modal / Overlay Components

**Modal Dialog:**

```
Overlay:
  Position: fixed
  Top: 0, Left: 0, Right: 0, Bottom: 0
  Background: rgba(44, 44, 44, 0.4)
  backdrop-filter: blur(4px)
  z-index: 2000
  
  Animation: Fade in 200ms
  
Modal Content:
  Position: fixed
  Top: 50%
  Left: 50%
  Transform: translate(-50%, -50%)
  Background: #FFFFFF
  Border-radius: 16px
  Padding: 32px
  Max-width: 480px
  Width: 90%
  
  Box-shadow: Level 4 (floating)
  
  Animation: Scale in 200ms
  
  Header:
    Font: Playfair Display Bold 24px
    Color: #2C2C2C
    Margin-bottom: 16px
    
  Body:
    Font: Merriweather Regular 16px
    Color: #3D3D3D
    Line-height: 1.6
    
  Footer:
    Display: Flex
    Justify: flex-end
    Gap: 12px
    Margin-top: 24px
```

### **4.6 Toast / Notification

**Toast Message:**

```
Container:
  Position: fixed
  Bottom: 24px
  Right: 24px
  z-index: 3000
  
Toast:
  Background: #2C2C2C (dark background)
  Color: #FFFFFF
  Padding: 16px 24px
  Border-radius: 8px
  Box-shadow: Level 3
  
  Display: flex
  Align: center
  Gap: 12px
  
  Font: Inter Regular 14px
  
  Animation: Slide up 300ms, fade out after 3s
  
  Variants:
  - Success: Background #228B22, icon check
  - Error: Background #A63333, icon x
  - Info: Background #3A6B8D, icon info
  
  Close button:
    Margin-left: 16px
    Color: rgba(255,255,255,0.6)
    Hover: Color #FFFFFF
```

---

## **5. Animation System (System Animacji)

### **5.1 Framer Motion Presets

```
// Hero Word Reveal
const wordReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

// Staggered children (definition, examples)
const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemFade = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

// Favorite heart animation
const heartPop = {
  whileTap: { scale: 0.9 },
  whileHover: { scale: 1.1 },
  transition: { type: "spring", stiffness: 300 }
}

// Button hover
const buttonHover = {
  whileHover: { 
    scale: 1.02,
    boxShadow: "0 6px 12px rgba(0,0,0,0.1)"
  },
  whileTap: { scale: 0.98 }
}

// Page transition
const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
}
```

### **5.2 Micro-Interactions

 **Favorite Toggle:**
 ```
 Default: Heart outline, deep gray (#8A8A8A)
 Hover: Scale 1.1, slight opacity change
 Tap: Scale 0.9 → spring back to 1
 If toggled on: 
   - Fill animation
   - Color changes to primary burgundy (#722F37 or #8B3A45)
   - Slight bounce effect
  - Toast appears
```

**Button Press:**
```
Hover: Scale 1.02, shadow increases
Active (mousedown): Scale 0.98
Release: Spring back to 1
```

**Navigation Link:**
```
Hover: Color transition 150ms, background fade
Active: Background solid, color invert
```

**Search Input:**
```
Focus: Border color change, shadow glow (300ms)
Blur: Return to default (300ms)
```

**Page Scroll:**
```
Link click to anchor: Smooth scroll (500ms, easeInOut)
Back/forward nav: Fade + slide (300ms)
```

---

## **6. Responsive Breakpoints (Punkty Przerwania)

### **Mobile First (375px - 639px)

**Typography:**
- H1 (Słowo): 36px - 40px
- Body: 16px - 17px
- Padding: 16px (container)

**Layout:**
- Single column
- Bottom navigation (64px height)
- Full-width cards
- Touch targets: 44px minimum

**Components:**
- Cards: Full width, 12px radius
- Buttons: Full width or stacked
- Search: Full width

### **Tablet (640px - 1023px)

**Typography:**
- H1 (Słowo): 44px - 52px
- Body: 17px - 18px
- Padding: 24px - 32px

**Layout:**
- 2-column grid optional
- Side navigation optional
- Cards: 2 per row (archive)

**Components:**
- Cards: 12px - 16px radius
- Buttons: Medium size
- Search: Centered, limited width

### **Desktop (1024px - 1439px)

**Typography:**
- H1 (Słowo): 56px - 64px
- Body: 18px
- Padding: 48px

**Layout:**
- 12-column grid
- Top navigation
- Cards: 1-3 per row
- Max-width container: 1200px

**Components:**
- Cards: 16px radius, level 2 shadow
- Buttons: Standard size
- Search: Right-aligned or centered

### **Wide Desktop (1440px+)

**Typography:**
- H1 (Słowo): 64px - 72px
- Max container: 1400px

**Layout:**
- Centered with comfortable margins
- Generous whitespace
- Hero sections with more breathing room

---

## **7. Icon System (System Ikon)

### **Icon Library:**

```
Navigation:
- Home: 🏠 or house icon
- Archive: 📋 or list icon  
- Favorites: ❤️ or heart icon
- Previous: ⏪ or chevron left
- Next: ⏩ or chevron right

Actions:
- Favorite: ❤️ (animated heart)
- Share: 📤 or share icon
- Search: 🔍 or magnifying glass
- Clear: × or x mark
- Menu: ☰ or hamburger

Categories:
- Potoczne: 🏷️ or tag
- Historyczne: 🏛️ or building
- Naukowe: 🔬 or flask
- Filozoficzne: 📖 or book
- Emocje: 💭 or smile
- Inne: ⋮ or dots

Status:
- Success: ✅ or check
- Error: ❌ or x
- Info: ℹ️ or i
- Warning: ⚠️ or warning
```

**Icon Sizes:**
- Small: 16px (inline)
- Medium: 20px - 24px (buttons, nav)
- Large: 32px - 48px (hero, empty states)

**Icon Colors:**
- Primary: Inherit or #2C2C2C
- Accent: #722F37 or #C9A227
- Muted: #8A8A8A

---

## **8. Design Tokens (Zmienne Projektowe)

### **CSS Custom Properties (Variables):**

```css
:root {
   /* Colors - Jasny tryb */
   --color-primary: #722F37;
   --color-primary-light: #8B3A45;
   --color-primary-dark: #5A222A;
   --color-primary-pale: #E8D0D2;
   
   --color-gold: #C9A227;
   --color-gold-light: #D4AF37;
   --color-gold-dark: #A67C1A;
   --color-gold-pale: #F5E8B0;
   
   --color-bg: #FDF5E6;
   --color-bg-alt: #FAF0D9;
   --color-surface: #FFFFFF;
   
   --color-text: #2C2C2C;
   --color-text-secondary: #3D3D3D;
   --color-text-muted: #5A5A5A;
   --color-text-inactive: #8A8A8A;
   
   --color-border: #E8E8E8;
   --color-border-light: #F0F0F0;
   
   --color-success: #228B22;
   --color-warning: #B8860B;
   --color-error: #A63333;
   --color-info: #3A6B8D;

   /* Colors - Ciemny tryb */
   --color-bg-dark: #111111;
   --color-bg-alt-dark: #1a1a1a;
   --color-surface-dark: #1f1f1f;
   
   --color-text-dark: #f5f5f5;
   --color-text-secondary-dark: #a1a1a1;
   --color-text-muted-dark: #6b6b6b;
   
   --color-border-dark: #2f2f2f;
   --color-border-light-dark: #3a3a3a;
   
   --color-word-light: #722F37;
   --color-word-dark: #B97A83;
   
   --color-error-dark: #FF6B6B;
   --color-info-dark: #6B9AB8;
}
  
  /* Typography */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Merriweather', Georgia, serif;
  --font-ui: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  
  --text-h1: 64px;
  --text-h2: 28px;
  --text-h3: 18px;
  --text-body: 18px;
  --text-small: 14px;
  --text-caption: 12px;
  
  --line-height-tight: 1.1;
  --line-height-normal: 1.4;
  --line-height-loose: 1.7;
  
  /* Spacing */
  --space-xs: 4px;
  --space-s: 8px;
  --space-m: 16px;
  --space-l: 24px;
  --space-xl: 32px;
  --space-xxl: 48px;
  
  /* Borders */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  --border-width: 1px;
  --border-width-thick: 3px;
  
  /* Shadows */
  --shadow-0: none;
  --shadow-1: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-2: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06);
  --shadow-3: 0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.05);
  --shadow-4: 0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow: 500ms ease;
  
  /* Z-index */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}