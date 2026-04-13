# WF_Resource_Analysis — Słowo Dnia

## Cel

Audyt zasobów potrzebnych do zbudowania i uruchomienia produktu "Słowo Dnia", uwzględniając czas, budżet, umiejętności i integracje dla solo-deva.

---

## 1. Analiza Czasu

### 1.1 Estymacja Czasu MVP

| Faza | Zadania | Godziny | Tygodnie |
|------|---------|---------|----------|
| **Faza 1: Setup** | Repo, Vite, Tailwind, Fonts | 8h | 1 |
| **Faza 2: Dane** | 100 pięknych słów (research) | 24h | 1-2 |
| **Faza 3: Core UI** | WordCard, Definition, Examples | 16h | 1 |
| **Faza 4: Funkcje** | Ulubione, Archiwum, Search | 16h | 1 |
| **Faza 5: Polish** | Animacje, Mobile, Share | 16h | 1 |
| **Faza 6: Deploy** | Vercel, Domain, SEO | 8h | 1 |
| **RAZEM** | | **88h** | **6 tygodni** |

### 1.2 Szczegółowy Breakdown

```
Tydzień 1:
├── Pon-Pt: Setup projektu + config (8h)
├── Pt-Nd: Research słów (8h)

Tydzień 2:
├── Pon-Wt: Research słów (16h)
├── Śr-Cz: Core components (8h)
├── Pt-Nd: WordCard + Definition (8h)

Tydzień 3:
├── Pon-Wt: Favorites + localStorage (8h)
├── Śr-Cz: Archive + Search (8h)
├── Pt-Nd: Share + Polish (8h)

Tydzień 4:
├── Pon-Wt: Mobile responsive (8h)
├── Śr-Cz: Animacje (8h)
├── Pt-Nd: Testing + Bug fixes (8h)

Tydzień 5:
├── Pon-Cz: Deploy + SEO (8h)
├── Pt-Nd: Newsletter setup (8h)

Tydzień 6:
├── Buffer + Launch prep
```

### 1.3 Time Allocation (Procent)

| Aktywność | % Czasu |
|-----------|---------|
| Development | 50% |
| Research (słowa) | 30% |
| Design/Polish | 15% |
| Deployment | 5% |

---

## 2. Analiza Budżetu

### 2.1 Koszty MVP

| Pozycja | Koszt jednorazowy | Koszt miesięczny |
|---------|-------------------|------------------|
| Domena (.pl) | 50 PLN | - |
| Vercel (free tier) | $0 | $0 |
| Google Fonts | $0 | $0 |
| Mailchimp (free) | $0 | $0 |
| **RAZEM MVP** | **50 PLN** | **0 PLN** |

### 2.2 Koszty v1 (Po Launch)

| Pozycja | Koszt miesięczny |
|---------|------------------|
| Vercel Pro | 80 PLN |
| Supabase (free) | 0 PLN |
| Plausible | 50 PLN |
| Domain (renewal) | 4 PLN |
| **RAZEM** | **~134 PLN/mies** |

### 2.3 Koszty v2 (Monetyzacja)

| Pozycja | Koszt % | Uwagi |
|---------|---------|-------|
| Stripe | 2% + 0.50 PLN | Per transaction |
| Resend (free tier) | $0 | Do 3k emails |
| AWS S3 (merch) | $5 | Jeśli merch |

### 2.4 Budżet Roczny

| Okres | Budżet |
|-------|--------|
| Rok 1 (MVP + v1) | ~1700 PLN |
| Rok 2 (scale) | ~5000 PLN |

---

## 3. Wymagane Umiejętności

### 3.1 Hard Skills

| Umiejętność | Poziom | Użycie |
|-------------|--------|--------|
| **React** | Podstawowy-średni | Frontend |
| **JavaScript** | Podstawowy | Logika |
| **CSS/Tailwind** | Podstawowy | Styling |
| **Git** | Podstawowy | Version control |
| **SEO** | Podstawowy | Search optimization |
| **Content** | Średni | Research słów |

### 3.2 Soft Skills

| Umiejętność | Użycie |
|-------------|--------|
| **Consistency** | Codzienne posting na social media |
| **Creativity** | TikTok content |
| **Communication** | B2B outreach |
| **Time management** | Solo-dev = multiple hats |

### 3.3 Learning Curve

| Skill | Czas nauki | Prior |
|-------|------------|-------|
| React | 20h | 🔴 Wysoki |
| Tailwind | 5h | 🟡 Średni |
| Framer Motion | 10h | 🟢 Niski |
| SEO | 5h | 🟢 Niski |

---

## 4. Zasoby Zewnętrzne

### 4.1 Wymagane Konta

| Usługa | Cel | Cost | Status |
|--------|-----|------|--------|
| GitHub | Repo | $0 | ✅ Wymagane |
| Vercel | Hosting | $0 | ✅ Wymagane |
| Figma | Design (opcjonalne) | $0 | 🔄 Opcjonalne |
| Mailchimp | Newsletter | $0 | ✅ Wymagane |
| Plausible | Analytics | €10/m | 🔄 Opcjonalne |
| Stripe | Payments | 2% | 🔄 Po monetyzacji |

### 4.2 API i Integracje

| API | Cel | Cost | Uwagi |
|-----|-----|------|-------|
| Brak (MVP) | - | - | Local JSON |
| Web Speech API | TTS | $0 | Browser native |
| Share API | Social sharing | $0 | Browser native |

---

## 5. Dependencies i Libraries

### 5.1 Production Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "framer-motion": "^10.16.0"
}
```

### 5.2 Development Dependencies

```json
{
  "vite": "^5.0.0",
  "tailwindcss": "^3.3.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0"
}
```

---

## 6. Risk Assessment

### 6.1 Resource Risks

| Ryzyko | Prawdopodobieństwo | Impact | Mitigacja |
|--------|-------------------|--------|-----------|
| Brak czasu | Średnie | Wysoki | MVP scope minimal |
| Burnout | Średnie | Wysoki | Realistic timeline |
| Blocked by tech | Niskie | Średni | Simple stack |
| Brak motywacji | Niskie | Wysoki | Small daily wins |

### 6.2 Mitigacje

| Problem | Rozwiązanie |
|---------|-------------|
| Za dużo słów do research | Start z 50, dodawaj po 10/tydzień |
| Prokrastynacja | Daily standup with self |
| Tech blockers | Keep it simple |

---

## 7. Milestones i Deliverables

### 7.1 MVP Milestones

| Milestone | Data | Deliverable |
|-----------|------|-------------|
| M1: Setup | Tydzień 1 | Repo + dev env |
| M2: Data | Tydzień 2 | 100 słów w JSON |
| M3: Core | Tydzień 3 | WordCard + Definition |
| M4: Features | Tydzień 4 | Favorites + Archive |
| M5: Polish | Tydzień 5 | Mobile + Animations |
| M6: Launch | Tydzień 6 | Live on Vercel |

### 7.2 Definition of Done

- [ ] Repozytorium na GitHub
- [ ] 100 pięknych polskich słów
- [ ] Word of the Day działa
- [ ] Ulubione zapisują się w localStorage
- [ ] Archiwum dostępne
- [ ] Mobile responsive
- [ ] Piękna typografia
- [ ] Deploy na Vercel
- [ ] Domain podpięty

---

## 8. Allocation Chart

### 8.1 Daily Time Investment (Launch)

| Aktywność | Czas/dzień |
|-----------|------------|
| Development | 1-2h |
| Social media | 30min |
| Email/writing | 15min |
| **RAZEM** | **2-3h/dzień** |

### 8.2 Weekly Time Budget

| Dzień | Focus |
|-------|-------|
| Poniedziałek | Dev |
| Wtorek | Dev |
| Środa | Dev |
| Czwartek | Content (TikTok) |
| Piątek | Dev |
| Sobota | Content |
| Niedziela | Rest/Planning |

---

## 9. Co Dalej?

| Status | Krok |
|--------|------|
| ✅ | Wybrano Słowo Dnia |
| ✅ | WF_Kill_The_Idea — PROCEED |
| ✅ | WF_ICP_Persona — COMPLETE |
| ✅ | WF_MVP_Scoping — COMPLETE |
| ✅ | WF_Competitor_Audit — COMPLETE |
| ✅ | WF_GTM_Strategy — COMPLETE |
| ✅ | WF_Monetization_Strategy — COMPLETE |
| ✅ | WF_Tech_Stack — COMPLETE |
| ✅ | **WF_Resource_Analysis — TEN DOKUMENT** |
| ⏳ | Stworzenie finalnego README |

---

_Dokument przygotowany w ramach workflow WF_Resource_Analysis._  
_Wersja: 1.0 | Data: 2026-03-21 | Autor: SaaS Architect & Business Auditor_
