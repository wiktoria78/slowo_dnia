# 📚 Słowo Dnia — Dokumentacja Projektu

> Aplikacja, która każdego dnia prezentuje piękne, rzadko używane polskie słowo, pomagając użytkownikom wzbogacić słownictwo i mówić piękniej po polsku.

**Status:** ✅ PROCEED — Projekt zaakceptowany  
**Wersja:** 1.0  
**Data:** 2026-03-21  
**Autor:** SaaS Architect & Business Auditor

---

## 🎯 Podsumowanie Projektu

| Aspekt | Opis |
|--------|------|
| **Produkt** | Aplikacja do nauki pięknych polskich słów |
| **Problem** | Ludzie chcą mówić piękniej, ale nie znają rzadkich, pięknych polskich słów |
| **Rozwiązanie** | Codzienne słowo dnia z definicją, przykładami i etymologią |
| **Model** | Freemium + Premium (19 PLN/mies) + Newsletter (9 PLN/mies) |
| **Target** | Miłośnicy języka polskiego (25-45 lat) |
| **Dev Time** | 6 tygodni (Solo-Dev) |
| **Koszt** | ~50 PLN (MVP) |

---

## 📁 Dokumentacja

### Dokumenty Biznesowe

| Dokument | Opis | Status |
|----------|------|--------|
| [README.md](README.md) | Ten dokument | ✅ |
| [mvp-scoping.md](mvp-scoping.md) | Zakres MVP | ✅ |
| [kill-the-idea-slowo-dnia-komercyjna.md](kill-the-idea-slowo-dnia-komercyjna.md) | Analiza biznesowa (Komercyjna) | ✅ |
| [kill-the-idea-slowo-dnia-studencka.md](kill-the-idea-slowo-dnia-studencka.md) | Analiza biznesowa (Studencka) | ✅ |
| [icp-persona.md](icp-persona.md) | Profil Idealnego Klienta | ✅ |
| [competitor-audit.md](competitor-audit.md) | Analiza konkurencji | ✅ |
| [gtm-strategy.md](gtm-strategy.md) | Strategia Go-To-Market | ✅ |
| [monetization-strategy.md](monetization-strategy.md) | Strategia monetyzacji | ✅ |
| [tech-stack.md](tech-stack.md) | Stack technologiczny | ✅ |
| [resource-analysis.md](resource-analysis.md) | Analiza zasobów | ✅ |

---

## 🚀 Szybki Start

### 1. Setup Projektu

```bash
# Clone repo
git clone https://github.com/twoje-username/slowo-dnia.git
cd slowo-dnia

# Install dependencies
npm install

# Run dev server
npm run dev
```

### 2. Struktura Słów

Słowa są przechowywane w pliku [`src/data/words.json`](src/data/words.json):

```json
{
  "word": "dyletant",
  "definition": "osoba zajmująca się czymś bez wymaganych kwalifikacji; amator",
  "examples": [
    "Ten dyletant wziął się za naprawę samochodu i tylko pogorszył sprawę.",
    "Nie jestem dyletantem - studiowałem to przez pięć lat."
  ],
  "etymology": "od włoskiego dilettante, z łaciny dilectare = rozkoszować się",
  "partOfSpeech": "rzeczownik, rodzaj męski",
  "category": "charakterystyka osoby",
  "synonyms": ["amator", "laik"]
}
```

### 3. Deployment

```bash
# Deploy to Vercel
vercel --prod
```

---

## 📊 Ścieżki Użytkownika

### User Journey Map

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│ Landing │ ──► │ Słowo   │ ──► │ Czytaj  │ ──► │ Zapisz  │
│ Page    │     │ Dnia    │     │ Dalej   │     │ Ulubione│
└─────────┘     └─────────┘     └─────────┘     └─────────┘
      │                               │
      │           ◄───────────────────┘
      │                  "Losuj nowe"
      │
      ▼
┌─────────┐     ┌─────────┐
│ Archiwum│ ──► │ Szukaj  │
│         │     │         │
└─────────┘     └─────────┘
```

---

## 💰 Model Przychodów

### Plany Cenowe

| Plan | Cena | Funkcje |
|------|------|---------|
| **Free** | 0 PLN | Słowo dnia + definicja + 7 dni archiwum |
| **Premium** | 19 PLN/mies | Pełne archiwum + powiadomienia + quiz |
| **Newsletter** | 9 PLN/mies | Słowo dnia na email |
| **B2B School** | 99 PLN/mies | Dla szkół |

### Projekcja Przychodów (Realistyczna)

| Miesiąc | Użytkownicy | Premium % | Przychód |
|---------|--------------|-----------|----------|
| 1 | 1,000 | 0% | 0 PLN |
| 3 | 5,000 | 1% | 950 PLN |
| 6 | 20,000 | 2% | 7,600 PLN |
| 12 | 50,000 | 3% | 28,500 PLN |

---

## 📱 Kanały Marketingowe

### Primary Channels

| Kanał | Potencjał | CAC |
|-------|-----------|-----|
| TikTok | 🔥🔥🔥 | $0 |
| Instagram Reels | 🔥🔥 | $0 |
| YouTube Shorts | 🔥🔥 | $0 |
| Facebook Groups | 🔥 | $0 |
| Newsletter | 🔥🔥 | $0 |

### Content Calendar

| Dzień | Platforma | Format |
|-------|-----------|--------|
| Poniedziałek | TikTok | Motivational word |
| Wtorek | Instagram | Nature word |
| Środa | TikTok | Feeling word |
| Czwartek | YouTube | Character trait |
| Piątek | TikTok | Fun/obscure word |
| Sobota | Instagram | Archive highlight |
| Niedziela | Newsletter | Week summary |

---

## 🛠️ Tech Stack

| Warstwa | Technologia |
|---------|-------------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Fonts | Playfair Display, Merriweather |
| State | React Context + localStorage |
| Hosting | Vercel |
| Domain | slowodnia.pl |

**Koszt MVP:** ~50 PLN/rok

---

## ⏱️ Timeline

| Tydzień | Faza | Deliverable |
|---------|------|-------------|
| 1 | Setup | Repo + config + 50 słów |
| 2 | Core | WordCard + Definition |
| 3 | Features | Favorites + Archive + Search |
| 4 | Polish | Animacje + Mobile + Share |
| 5 | Deploy | Vercel + Domain + SEO |
| 6 | Launch | Product Hunt + Social |

---

## ✅ Definition of Done (MVP)

- [ ] Repozytorium na GitHub
- [ ] 100 pięknych polskich słów w bazie
- [ ] Word of the Day działa (algorytm daty)
- [ ] Definicja + przykłady wyświetlane
- [ ] Ulubione zapisują się w localStorage
- [ ] Archiwum poprzednich słów
- [ ] Wyszukiwarka
- [ ] Share na social media
- [ ] Mobile responsive
- [ ] Piękna typografia i design
- [ ] Deploy na Vercel

---

## 🎯 ICP (Ideal Customer Profile)

### Primary Segment: Miłośnicy Języka + Zawodowi Mówcy

| Atrybut | Wartość |
|---------|---------|
| Wiek | 25-45 lat |
| Wykształcenie | Wyższe lub w trakcie |
| Zawód | Nauczyciel, dziennikarz, prawnik, marketing |
| Zainteresowania | Literatura, słownictwo, etymologia |
| Pain Point | Brak źródła pięknych słów |

### Backup Segment: Rodzice

- Rodzice (30-45 lat) uczący dzieci pięknego języka
- Wysoka gotowość do płacenia za produkty dla dzieci

---

## 🏆 Konkurencja

### Bezpośrednia
- Wordnik (angielski) — nie zagraża (inny rynek)
- Dictionary.com — nie zagraża (masowy rynek)
- Pap.pl — słaba jakość, brak appki

### Pośrednia
- Duolingo (języki obce)
- Quizlet, Anki
- Newslettery językowe

### Nasza Przewaga
- Unikalna nisza (polski)
- Design-first approach
- Mobile-first
- Community features

---

## 📈 KPI i Metryki

### Funnel Metrics

| Etap | KPI | Target (M1) | Target (M3) |
|------|-----|-------------|-------------|
| Awareness | TikTok views | 100K | 1M |
| Interest | Website visits | 1K | 10K |
| Consideration | Email signups | 500 | 5K |
| Conversion | Premium subs | 10 | 100 |
| Revenue | MRR | €50 | €500 |

### Retention

| Metryka | Cel |
|---------|-----|
| D1 Retention | 40% |
| D7 Retention | 20% |
| D30 Retention | 10% |
| Newsletter Open Rate | 40% |
| Share Rate | 5% |

---

## ⚠️ Ryzyka i Mitigacje

| Ryzyko | Prawdopodobieństwo | Impact | Mitigacja |
|--------|-------------------|--------|-----------|
| Algorytm TikTok zmienia się | Średnie | Wysoki | Multi-platform presence |
| Mało ruchu | Średnie | Wysoki | SEO + email + outreach |
| Churn wysoki | Wysokie | Średni | Push notifications + lifetime |
| Konkurencja | Niskie | Średni | Speed to brand |

---

## 🔄 Workflows Dostępne

Projekt przeszedł przez następujące workflow:

1. ✅ **WF_Idea_Generation** — Generowanie pomysłów
2. ✅ **WF_Kill_The_Idea** — Walidacja biznesowa
3. ✅ **WF_MVP_Scoping** — Zakres MVP
4. ✅ **WF_ICP_Persona** — Profil klienta
5. ✅ **WF_Competitor_Audit** — Analiza konkurencji
6. ✅ **WF_GTM_Strategy** — Strategia wejścia na rynek
7. ✅ **WF_Monetization_Strategy** — Model przychodów
8. ✅ **WF_Tech_Stack** — Technologie
9. ✅ **WF_Resource_Analysis** — Zasoby

---

## 📞 Następne Kroki

| Status | Krok |
|--------|------|
| ✅ | Kompletna dokumentacja |
| ⏳ | Zbieranie 100 pięknych słów |
| ⏳ | Setup projektu React + Vite |
| ⏳ | Build MVP |
| ⏳ | Deploy |
| ⏳ | TikTok content start |

---

## 📚 Źródła

- Słownik języka polskiego PWN
- Słownik wyrazów obcych
- Literatura polska (cytaty)
- Polskie przysłowia

---

_Dokument przygotowany przez SaaS Architecture & Business Auditor_  
_Wersja: 1.0 | Data: 2026-03-21_
