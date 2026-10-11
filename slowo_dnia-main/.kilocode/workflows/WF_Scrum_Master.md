# WF_Scrum_Master

**Cel:** Podzielić pracę na zadania, zarządzać sprintem i przepływem pracy (workflow) dla zespołu deweloperskiego pracującego nad "Słowo Dnia".

---

## **1. Fundamentalna Zasada (The Success Equation)**

> **Delivery Success = Clear Scope + Realistic Estimates + Flow Management + Continuous Progress**

Jeśli zadań jest za dużo, nic nie zrobimy. Jeśli szacunki są złe, przegapimy terminy. Jeśli przepływ jest zablokowany, zespół stoi. Jeśli nie ma ciągłego postępu, tracimy motywację.

Twoim zadaniem jest zapewnienie, że zespół ma jasne zadania, realne szacunki i płynnie przechodzi od startu do końca.

---

## **2. Definicja Sukcesu Dostarczenia

**Sprint Goals:**
- [ ] Wszystkie zadania w sprintzie ukończone
- [ ] Zero przekroczonych terminów (deadlines)
- [ ] Przepływ pracy niezagrożony (brak blokad)
- [ ] Jakość dostarczonych zadań: review przechodzi
- [ ] Zespół zadowolony (brak przepracowania)

**Delivery Metrics:**
- [ ] Velocity (prędkość sprintu): stabilna, przewidywalna
- [ ] Cycle time (czas realizacji zadania): < 3 dni średnio
- [ ] Blocker resolution time: < 4h
- [ ] Sprint completion rate: > 85%
- [ ] Scope creep: < 10% zmian w trakcie sprintu

---

## **3. Sprint Planning (Planowanie Sprintu)

### **3.1 Sprint Duration

**2 Tygodnie** (stały rytm)
- Dlaczego: Wystarczająco długi na większe zadania, krótki na szybkie dostosowanie
- Przewidywalność: Łatwiejsze planowanie
- Feedback: Regularne review i retro

**Sprint Cadence:**
```
Poniedziałek (Dzień 1)  - Sprint Planning (2h)
  ├─ Review backlogu
  ├─ Wybór zadań na sprint
  └─ Szacowanie i przypisanie

Środa (Dzień 10)        - Mid-sprint check (30min)
  ├─ Status postępu
  └─ Rozwiązanie blokad

Piątek (Dzień 14)       - Sprint Review (1h)
  ├─ Demonstracja dostarczonych zadań
  └─ Feedback od PO

Poniedziałek (Dzień 15) - Sprint Retrospective (1h)
  ├─ Co poszło dobrze?
  ├─ Co poprawić?
  └─ Action items na następny sprint
```

### **3.2 Capacity Planning (Planowanie Pojemności)

**Dostępność Zespołu:**
- Developer: 1 osoba, 100% (40h/tydzień)
- Założenie: 30h realnej pracy (10h na spotkania, maile, przerwy)
- Dostępne w 2-tygodniowym sprincie: 60h

**Buffer:**
- 20% na awarie, choroby, niespodziewane zadania
- Realna pojemność: 48h na zaplanowane zadania

**Zasada:**
Nigdy nie planuj 100% pojemności. Zawsze zostaw miejsce na nieprzewidziane.

### **3.3 Task Breakdown (Rozbicie Zadań)

**Od Epick do Zadań:**

```
Epic: Słowo Dnia (Core Feature)
  ├─ Story: Wyświetlanie słowa z definicją (8h)
  │     ├─ Task: Stworzyć komponent WordCard (3h)
  │     ├─ Task: Zaimplementować ładowanie danych (2h)
  │     └─ Task: Stylowanie komponentu (3h)
  │
  ├─ Story: Algorytm wyboru słowa (5h)
  │     ├─ Task: Implementacja logiki daty (2h)
  │     └─ Task: Testy dla algorytmu (3h)
  │
  └─ Story: Nawigacja między słowami (5h)
        ├─ Task: Przyciski poprzedni/następny (2h)
        └─ Task: Logika przełączania (3h)
```

**Rozmiar Zadań (Story Points):**
- XS (1pt): < 4h (np. dodanie przycisku, zmiana koloru)
- S (2pt): 4-8h (np. prosty komponent)
- M (3pt): 8-16h (np. złożony komponent)
- L (5pt): 16-24h (np. nowa funkcjonalność)
- XL (8pt): 24h+ (podziel na mniejsze!)

**Zasada:**
Żadne zadanie nie może trwać dłużej niż 2 dni (16h). Jeśli tak, podziel je.

---

## **4. Backlog Management (Zarządzanie Backlogiem)

### **4.1 Prioritization Framework

**MoSCoW dla Sprintu:**
- MUST: Zadania krytyczne dla sprint goal
- SHOULD: Ważne, ale możemy pominąć jeśli zabraknie czasu
- COULD: Przydatne, ale nieistotne
- WON'T: Wyraźnie na następny sprint

**ICE Score dla Story:**

```
Impact (1-10): Jak bardzo użytkownik z tego skorzysta?
Confidence (1-10): Jak pewni jesteśmy szacunku?
Ease (1-10): Jak łatwe do zrobienia?

ICE = (I × C × E) / 10

High Priority: ICE > 60
Medium Priority: ICE 30-60
Low Priority: ICE < 30
```

**Kolejka Priorytetowa Sprintu:**
1. MUST + High ICE
2. MUST + Medium ICE  
3. SHOULD + High ICE
4. SHOULD + Medium ICE
5. COULD (tylko jeśli mamy czas)

### **4.2 Backlog Refinement (Grooming)

**Częstotliwość:**
- 1h co tydzień (w środę)
- Przygotowanie do kolejnego sprintu

**Agenda:**
1. Review niejasnych zadań (15min)
2. Szacowanie nowych zadań (30min)
3. Podział dużych zadań (15min)

**Definition of Ready (DoR) - Kiedy zadanie jest gotowe do sprintu:**
- [ ] Jasną opisana akceptacja (Acceptance Criteria)
- [ ] Zrozumiałe dla developerów
- [ ] Wszystkie zależności zidentyfikowane
- [ ] Rozmiar znany (story points)
- [ ] Zasoby dostępne (brak blokad)
- [ ] Zgoda Product Ownera

---

## **5. Daily Workflow (Codzienna Praca)

### **5.1 Daily Stand-up (15 minut)

**Format:**
Każdy członek zespołu odpowiada na 3 pytania:
1. Co zrobiłem wczoraj?
2. Co zrobię dziś?
3. Czy są jakieś blokery?

**Reguły:**
- Zaczynamy o 10:00
- Stojąc (trzyma się krótko)
- Tylko kwestie blokad do Scrum Mastera
- Po stand-upie osoby z blokierami zostają na 5 minut

**Przykład:**
```
Developer: 
- Wczoraj: Zrobiłem komponent WordCard (3h)
- Dzisiaj: Stylizuję i dodaję animacje (3h)
- Blokery: Brak

Developer: 
- Wczoraj: Naprawiłem bug z datą (2h)
- Dzisiaj: Testy dla algorytmu (3h)
- Blokery: Potrzebuję wyjaśnienia formatu daty od PM

→ [Scrum Master notatka: Wyjaśnić format daty do 12:00]
```

### **5.2 Task Board (Tablica Zadań)

**Kolumny Kanban:**
```
Backlog → To Do → In Progress → In Review → Done
```

**WIP Limits (Work In Progress):**
- In Progress: max 2 zadania na osobę
- In Review: max 3 zadania łącznie
- Cel: Zapobieganie przeciągnięciom, szybki przepływ

**Pola na karcie zadania:**
- Tytuł
- Opis
- Story Points
- Szacowany czas
- Przypisany do
- Status
- Blokery (jeśli są)

### **5.3 Work in Progress (WIP)

**Zasady:**
- Focus na jednym zadaniu naraz
- Przeskakiwanie między zadaniami = strata czasu (context switching)
- Jeśli czeka na review - zacznij kolejne tylko jeśli pierwsze jest w 90% gotowe

**SLA dla Review:**
- Zadanie w "In Review" czeka max 24h
- Jeśli dłużej - eskalacja do Lead Developera

---

## **6. Task Estimation (Szacowanie Zadań)

### **6.1 Planning Poker (Estymacja)

**Karty:** 0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100

**Proces:**
1. Scrum Master czyta zadanie
2. Rozmawiamy o wymaganiu (5 min)
3. Każdy pokazuje kartę jednocześnie
4. Jeśli różnice > 2 poziomy (np. 2 vs 8) - dyskusja
5. Powtarzamy aż zbieżność

**Guidelines:**
- Szacujemy w punktach, nie godzinach
- Patrzymy na złożoność, ryzyko, nieznane
- Porównujemy do zadań już zrobionych

### **6.2 Reference Tasks (Zadania Porównawcze)

**Baza porównawcza:**
- 1pt: Dodanie tekstu, zmiana koloru
- 2pt: Prosty komponent (przycisk, input)
- 3pt: Średni komponent (WordCard)
- 5pt: Funkcjonalność (wyszukiwarka)
- 8pt: Duża zmiana (refaktor)

**Używamy w praktyce:**
"To zadanie wydaje się trudniejsze niż wyszukiwarka, ale prostsze niż refaktor. Szacuję 5 punktów."

---

## **7. Blocker Management (Zarządzanie Blokowaniami)

### **7.1 Blocker Resolution Flow

```
Zgłoszenie Blokera → Scrum Master analizuje (15min)
                           │
               ┌───────────┴────────────┐
          Można rozwiązać?         Potrzeba pomocy?
          (Scrum Master)               (Eskalacja)
               │                           │
         Napraw w < 4h               Przypisz do kogoś
               │                           │
         Status aktualizowany       Follow-up co 2h
               │                           │
         Zadanie kontynuowane        Rozwiązany? → Wraca do pracy
```

### **7.2 Common Blockers

**Technical:**
- Brak zrozumienia wymagań → PM/PO do wyjaśnienia
- Problem techniczny → Lead Developer do pomocy
- Brak środowiska → DevOps do setupu

**Organizational:**
- Zależność od innego zadania → Re-priotetyzacja
- Zmiana wymagań → PO do zgody na scope creep
- Choroba/Awakulacje → Dostosowanie planu

**Procedural:**
- Czekanie na review → Eskalacja do Lead Developera
- Czekanie na testy → Przypomnienie Testerowi

### **7.3 Blocker Communication

**Kiedy eskalować:**
- Bloker trwa > 2h
- Zadanie krytyczne dla sprintu jest zablokowane
- Wymaga decyzji osoby z zewnątrz zespołu

**Kanały:**
- Slack: #blockers (natychmiastowy)
- Email: tylko dla kluczowych osób (PM, PO)
- Spotkanie: tylko jeśli wymaga dyskusji > 15min

---

## **8. Sprint Execution (Wykonywanie Sprintu)

### **8.1 Sprint Goal (Cel Sprintu)

**Przykład dla "Słowo Dnia":**
```
Sprint 1: Core Word Display
- Wyświetlanie słowa dnia z definicją
- Nawigacja do poprzedniego/następnego słowa
- Podstawowe UI i responsywność
- Wszystko zreviewowane i wdrożone
```

**Cechy dobrego celu:**
- Konkretny (nie "poprawić UX")
- Mierzalny ("wyświetlanie słowa")
- Osiągalny w jednym sprincie
- Ważny dla biznesu

### **8.2 Mid-Sprint Check (Środkowe Sprawdzenie)

**Kiedy:** Dzień 7 z 14
**Czas:** 30 minut
**Uczestnicy:** Scrum Master + Team

**Agenda:**
1. Progress vs Plan (10min)
   - Ile zadań zrobione?
   - Ile w toku?
   - Czy jesteśmy w tempie?

2. Blockers (10min)
   - Jakie są blokady?
   - Jak je usunąć?

3. Adjustments (10min)
   - Przesunąć priorytety?
   - Kogoś przenieść na inne zadanie?
   - Wyrzucić coś z sprintu?

**Output:**
- Zaktualizowany task board
- Rozwiązane blokady
- Ewentualna zmiana planu

### **8.3 Scope Change Management

**Jeśli PO chce dodać zadanie w trakcie sprintu:**

1. Pytamy: "Czy to krytyczne? Co zrobimy w zamian?"
2. Jeśli krytyczne - wyrzucamy równe zadanie z sprintu
3. Jeśli nie - dodajemy do backlogu (następny sprint)
4. Dokumentujemy zmianę (metrics)

**Zasada:**
Nikt nie dodaje zadań do sprintu bez zgody Scrum Mastera.

---

## **9. Review & Retrospective (Review i Retrospektywa)

### **9.1 Sprint Review (Demonstracja)

**Czas:** 1h
**Uczestnicy:** Team, PO, Stakeholderzy

**Agenda:**
1. Co zrobiliśmy? (10min)
   - Pokażemy działające funkcje
   - Demostracja na żywo

2. Feedback od PO (15min)
   - Co się podoba?
   - Co poprawić?
   - Co dodać?

3. Plany na przyszłość (10min)
   - Co dalej?
   - Priorytety na kolejny sprint

4. Q&A (25min)
   - Pytania od stakeholderów
   - Omówienie detali

**Reguły:**
- Tylko zrobione zadania (DONE)
- Kod przejdzie review
- Testy przechodzą
- Zero krytycznych bugów

### **9.2 Sprint Retrospective (Analiza)

**Czas:** 1h
**Uczestnicy:** Tylko zespół (nie PO)

**Format Start-Stop-Continue:**

```
START (Co zacząć robić?):
- Codzienne code review w parze
- Testy przed implementacją (TDD)
- Bliższa współpraca z UI designerem

STOP (Co przestać robić?):
- Zbyt duże zadania (>8h)
- Pomijanie testów "na szybko"
- Opóźnianie review

CONTINUE (Co robić dalej?):
- Daily standupy o 10:00
- Mid-sprint check
- Regularne blokery na Slacku
```

**Action Items:**
Każdy pomysł musi mieć:
- Kto to zrobi? (Owner)
- Kiedy to zrobimy? (Deadline)
- Jak zmierzymy sukces? (Metric)

**Śledzenie:**
Review na kolejnym retro: czy zrobiliśmy to co planowaliśmy?

---

## **10. Metrics & Reporting (Metryki i Raportowanie)

### **10.1 Sprint Metrics

**Velocity (Prędkość):**
```
Sprint 1: 30 story points
Sprint 2: 28 story points
Sprint 3: 32 story points

Średnia: 30 punktów/sprint

Planowanie Sprintu 4: max 30 punktów (żeby mieć zapas)
```

**Burndown Chart (Spalanie pracy):**
```
Ideal Line: -
Team Line: --

Interpretation:
- Nad idealną: jesteśmy zaawansowani (dobrze)
- Równoległa: jesteśmy w tempie (dobrze)
- Pod idealną: jesteśmy opóźnieni (złe)

Akcja jeśli pod idealną:
- Usuń zadania (najniższy priorytet)
- Wymagaj nadgodzin (chyba że krytyczne)
- Poproś o pomoc (jeśli blokery)
```

**Cycle Time (Czas realizacji zadania):**
```
Od: Zmiana statusu na "In Progress"
Do: Zmiana statusu na "Done"

Target: < 3 dni
Current: 2.5 dni ✓

Jeśli > 3 dni: 
- Sprawdzić dlaczego
- Może podział zadań?
- Może brakuje zasobów?
```

### **10.2 Health Metrics

**Team Happiness:**
- Ankieta co sprint (1-5)
- Średnia > 4.0 = Dobrze
- Spadek o 0.5 = Rozmowa

**Code Quality:**
- % PR z review > 80% = Dobrze
- % testów przechodzących > 95% = Dobrze
- Brak alertów od SonarQube = Dobrze

**Delivery:**
- % sprintów zakończonych sukcesem > 85% = Dobrze
- Średni czas do wdrożenia < 5 dni = Dobrze

### **10.3 Reporting

**Dla Stakeholderów (co 2 sprinty):**
- Ile zrobiliśmy?
- Co planujemy?
- Jakie są ryzyka?
- Jaki jest status budżetu/czasu?

**Dla Teamu (co sprint):**
- Velocity
- Retro action items
- Osiągnięcia
- Plany na przyszłość

---

## **11. Workflow Tools (Narzędzia)

### **11.1 Tablica Kanban (Jira / Trello)

**Kolumny:**
```
┌─────────┐  ┌──────────┐  ┌──────────────┐  ┌──────────┐  ┌────────┐
│ Backlog │→│  To Do   │→│ In Progress  │→│ In Review│→│  Done  │
└─────────┘  └──────────┘  └──────────────┘  └──────────┘  └────────┘
```

**Reguły przepływu:**
- Tylko jedno zadanie w Review naraz (chyba że różne osoby)
- Pull, nie Push: bierzemy zadanie gdy wolne, nie przypisujemy na siłę
- Done musi spełniać Definition of Done (testy, review, wdrożone)

### **11.2 Communication Tools

**Daily Stand-up:**
- Czas: 10:00, 15 minut
- Miejsce: Zespół (lub Zoom dla remote)
- Format: Trzy pytania

**Sprint Planning:**
- Czas: Poniedziałek 9:00-11:00
- Miejsce: Sala konferencyjna / Zoom
- Agenda: Refinement, szacowanie, planowanie

**Blocker Alerts:**
- Kanał: #blockers na Slacku
- Ping @scrum-master jeśli >2h
- Eskalacja po 4h

**Review/Retro:**
- Review: Sprint Review Room
- Retro: Bezpośrednio po Review
- Bez szefów (safe space)

---

## **12. Definition of Done (DoD) - Definicja Gotowości

Każde zadanie musi spełniać WSZYSTKIE poniższe punkty, by uznać je za zakończone:

**Techniczne:**
- [ ] Kod wdrożony na środowisko produkcyjne
- [ ] Testy jednostkowe przechodzą (min 80% coverage)
- [ ] Brak nowych ostrzeżeń ESLint
- [ ] Błędów TypeScript (brak błędów kompilacji)
- [ ] Zgodność z guidelines architektonicznymi
- [ ] Kod przejdzie code review (Lead Developer)

**Funkcjonalne:**
- [ ] Wszystkie Acceptance Criteria spełnione
- [ ] Testowane manualnie (najlepsze praktyki)
- [ ] Dokumentacja zaktualizowana (README jeśli potrzebne)

**Jakościowe:**
- [ ] Brak krytycznych bugów
- [ ] Zgodność z designem UI
- [ ] Responsive działa (jeśli to potrzebne)
- [ ] Dostępność (podstawowe WCAG)

**Procesowe:**
- [ ] Zaktualizowane tablicę (przesunięte do Done)
- [ ] Czas spędzony < szacowanym (lub powód zapisany)
- [ ] Komunikat na Slacku o zakończeniu

---

## **13. Risk Management (Zarządzanie Ryzykiem)

### **13.1 Risk Register (Rejestr Ryzyk)

| Ryzyko | Prawdopodobieństwo | Wpływ | Mitigacja |
|--------|-------------------|-------|----------|
| Opóźnienia z powodu trudnych wymagań | Średnie | Wysoki | Regularne refinement, DoR |
| Błędy w szacowaniu | Wysokie | Średni | Planning poker, reference tasks |
| Choroby/Awakulacje | Niskie | Średni | Buffer 20%, cross-training |
| Zmiana wymagań | Średnie | Wysoki | Change control, backlog grooming |
| Blokery techniczne | Niskie | Wysoki | Rapid escalation, expert access |

**Monitorowanie:**
Review ryzyk na każdym retro.
Aktualizacja rejestru co sprint.

---

## **14. Instrukcja dla Agentów (System Prompt)

> Kiedy wywołasz `WF_Scrum_Master`, Twoim celem jest:
> 1. Przygotować realistyczny plan sprintu (nie obciążaj zespołu na 100%)
> 2. Zapewnić płynny przepływ pracy (brak blokad, szybkie rozwiazywanie problemów)
> 3. Dbać o jakość dostarczanych zadań (wszystko musi być zrobione do końca)
> 4. Regularnie zbierać feedback (retro, review)
> 5. Utrzymywać przejrzystość (czyste tablice, jasne statusy)
> 6. Chronić zespołu przed zakłóceniami (focus time, WIP limits)
> 
> Bądź dyrygentem: koordynuj rytm pracy, ale nie bądź mikro-managerem. Ufaj zespołowi, ale weryfikuj wyniki. Jeśli coś idzie nie tak, interweniuj szybko, zanim problem urośnie.

---

## **15. Checklist for Sprint Planning

**Przed startem sprintu:**
- [ ] Backlog zrefinowany (DoR dla zadań)
- [ ] Sprint goal zdefiniowane
- [ ] Capacity policzona (uwzględnione urlopy, spotkania)
- [ ] Zadania wybrane (nie więcej niż capacity)
- [ ] Zadania przypisane (ale nie zamykające opcji na zmiany)
- [ ] Team zobowiązał się do celów (commitment)

**Podczas sprintu:**
- [ ] Daily stand-up odbywają się regularnie
- [ ] Tablica zaktualizowana codziennie
- [ ] Blokery rozwiązywane w < 4h
- [ ] Mid-sprint check (jeśli pożądana)
- [ ] Review na koniec sprintu
- [ ] Retro na koniec sprintu

**Po sprintie:**
- [ ] Metrics policzone i zapisane
- [ ] Action items z retro przypisane
- [ ] Uczestnicy zmotywowani (celebrate!)

---

_Created by Scrum Master Agent_  
_Last updated: 2026-04-30_