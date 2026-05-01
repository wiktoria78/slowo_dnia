# WF_Product_Owner

**Cel:** Zdefiniować wizję produktu, wymagania i priorytety dla aplikacji "Słowo Dnia", zapewniając wartość dla użytkowników i biznesu.

---

## **1. Fundamentalna Zasada (The Success Equation)**

> **Product Success = User Value + Business Value + Clear Scope**

Jeśli użytkownik nie widzi wartości, produkt się nie przyjmie. Jeśli biznes nie ma modelu zysku, produkt upadnie. Jeśli scope jest niejasny, projekt rośnie w siłę.

Twoim zadaniem jest zapewnienie, że budujemy to, co użytkownicy naprawdę potrzebują, zarabiamy na tym, a zespół ma jasny kierunek.

---

## **2. Definicja Sukcesu Produktu**

**Wizja:**
Tworzymy najlepsze narzędzie do nauki pięknych polskich słów - proste, eleganckie i skuteczne.

**Target Metrics:**
- [ ] Dzienna aktywacja (DAU): 1000+ użytkowników
- [ ] Retention D1: >60% (użytkownik wraca następnego dnia)
- [ ] Retention D7: >30% (użytkownik wraca po tygodniu)
- [ ] Konwersja na premium: >5%
- [ ] NPS: >50 (polecanie znajomym)

**MVP Success Criteria:**
- 100 pięknych słów z definicjami i przykładami
- Algorytm słowa dnia oparty na dacie
- System ulubień
- Archiwum słów
- Wyszukiwarka i filtry
- Responsywne na mobile
- Animacje wprowadzające słowo

---

## **3. User Stories (Wymagania Funkcjonalne)**

### **Epic 1: Słowo Dnia (Core Value)**

**US1: Wyświetlanie Słowa Dnia**  
Jako użytkownik, chcę zobaczyć codzienne słowo z piękną typografią, abym mógł je zapamiętać.

**Akceptacja:**
- [ ] Słowo wyświetla się od razu po wejściu na stronę
- [ ] Wyświetlają się: słowo, część mowy, definicja, przykłady użycia
- [ ] Estymaty czasowe (z ilu dni to słowo)
- [ ] Przycisk "Dodaj do ulubionych"
- [ ] Animacja pojawiania się słowa

**US2: Algorytm Słowa Dnia**  
Jako użytkownik, chcę, aby każdego dnia widziałem nowe słowo, oparte na dacie, bez konieczności logowania.

**Akceptacja:**
- [ ] Algorytm oblicza dni od startu (13.04.2026)
- [ ] Jeśli dni > 100 → komunikat archiwum
- [ ] To samo słowo dla wszystkich w danym dniu
- [ ] Możliwość patrzenia słów z poprzednich dni

**US3: Szukanie Słowa**  
Jako użytkownik, chcę wyszukać konkretne słowo, jeśli go nie pamiętam.

**Akceptacja:**
- [ ] Wyszukiwarka po słowie i definicji
- [ ] Filtry: część mowy, kategoria, etymologia
- [ ] Paginacja wyników
- [ ] Szybkie przewijanie

---

### **Epic 2: Ulubione (Personalizacja)**

**US4: Dodawanie do Ulubionych**  
Jako użytkownik, chcę dodać słowo do ulubionych, aby móc je łatwo odnaleźć później.

**Akceptacja:**
- [ ] Przycisk serca/słoneczka przy słowie
- [ ] Zapisywanie w localStorage
- [ ] Wizualne potwierdzenie zapisania
- [ ] Limit: brak (wszystkie słowa mogą być ulubione)

**US5: Wyświetlanie Ulubionych**  
Jako użytkownik, chcę zobaczyć listę swoich ulubionych słów na osobnej stronie.

**Akceptacja:**
- [ ] Strona `/favorites` z listą
- [ ] Usuwanie z ulubionych
- [ ] Sortowanie po dacie dodania
- [ ] Możliwość eksportu do CSV

**US6: Słowo Dnia z Ulubionych**  
Jako użytkownik, chcę mieć możliwość przypominania sobie ulubionego słowa jako słowa dnia.

**Akceptacja:**
- [ ] Przycisk "Przypomnij mi to"
- [ ] Zapis w localStorage z datą
- [ ] Wyświetlanie jako słowo dnia na dany dzień

---

### **Epic 3: Archiwum (History)**

**US7: Przeglądanie Archiwum**  
Jako użytkownik, chcę przeglądać wszystkie słowa z przeszłości z paginacją.

**Akceptacja:**
- [ ] Strona `/archive` z listą słów
- [ ] Paginacja: 10 słów na stronę
- [ ] Sortowanie po dacie (od najnowszych)
- [ ] Szybkie przeskakiwanie stron
- [ ] Wyświetlanie, którego dnia było dane słowo

**US8: Eksport Archiwum**  
Jako użytkownik, chcę wyeksportować archiwum słów do pliku CSV.

**Akceptacja:**
- [ ] Przycisk "Eksportuj do CSV"
- [ ] Pobieranie pliku ze wszystkimi słowami
- [ ] Format: słowo, część mowy, definicja, przykłady, kategoria

---

### **Epic 4: UI/UX (Doświadczenie)**

**US9: Animacje i Przejścia**  
Jako użytkownik, chcę cieszyć się piękną animacją pojawiania się słowa, co zwiększa moje zaangażowanie.

**Akceptacja:**
- [ ] Animacja Framer Motion przy ładowaniu słowa
- [ ] Płynne przejścia między stanami
- [ ] Animacja dodawania do ulubionych (serce bije)
- [ ] Loading states podczas przetwarzania
- [ ] Smooth scroll na archiwum

**US10: Responsive Design**  
Jako użytkownik, chcę mieć taką samą przyjemność z używania aplikacji na telefonie jak na komputerze.

**Akceptacja:**
- [ ] Działa na mobile (< 640px)
- [ ] Działa na tablet (640px - 1024px)
- [ ] Działa na desktop (> 1024px)
- [ ] Touch-friendly na mobile
- [ ] Odpowiednie rozmiary czcionek i przycisków

---

### **Epic 5: Informacje (Kontekst)**

**US11: Informacje o Słowie**  
Jako użytkownik, chcę poznać więcej o słowie: etymologię, synonimy, częstotliwość użycia.

**Akceptacja:**
- [ ] Sekcja etymologia (jeśli dostępna w danych)
- [ ] Sekcja synonimy (jeśli dostępne)
- [ ] Kategoria słowa (np. rolnictwo, sztuka, nauka)

**US12: Podziel się Słowem**  
Jako użytkownik, chcę podzielić się dzisiejszym słowem ze znajomymi.

**Akceptacja:**
- [ ] Przycisk "Udostępnij"
- [ ] Kopiowanie do schowka linku
- [ ] Wygenerowanie obrazka z słowem (opcjonalnie)
- [ ] Formy: Twitter, Facebook, Email

---

### **Epic 6: Onboarding (Pierwsze Wejście)**

**US13: Powitanie i Wyjaśnienie**  
Jako nowy użytkownik, chcę zrozumieć, jak działa aplikacja, po wejściu na stronę.

**Akceptacja:**
- [ ] Clean landing page (bez zbędnych elementów)
- [ ] Jasną nazwę: "Słowo Dnia"
- [ ] Krótkie hasło wyjaśniające (hero text)
- [ ] Wyraźne CTA (Call To Action)
- [ ] Brak nachodzących okienek (modals) na start

---

## **4. Priorytetyzacja MoSCoW**

| Priorytet | User Story | Uzasadnienie |
|-----------|-----------|--------------|
| **MUST** | US1, US2, US4, US7, US9, US10, US13 | Rdzeń wartości - bez tego aplikacja nie ma sensu |
| **SHOULD** | US3, US5, US6, US11 | Ważne dla angażowania użytkowników |
| **COULD** | US8, US12 | Przydatne, ale nie krytyczne dla MVP |
| **WON'T** | Social login, zaawansowane filtry, powiadomienia push, multi-językowość, zaawansowana analityka | Czeka na potwierdzenie rynku w fazie 2 |

---

## **5. Acceptance Criteria - Szablon**

Dla każdego user story definiujemy:

```
GIVEN: [Kontekst początkowy - użytkownik jest na stronie głównej]
WHEN: [Akcja - kliknie "Dodaj do ulubionych"]
THEN: [Oczekiwany wynik - słowo zapisuje się do localStorage i przycisk zmienia kolor]
AND: [Dodatkowe warunki - wyświetla się toast "Dodano do ulubionych"]
```

---

## **6. Non-Functional Requirements (Wymagania Niefunkcjonalne)**

### **Wydajność**
- [ ] Czas ładowania strony < 2s (3G)
- [ ] Czas ładowania słowa < 500ms
- [ ] Rozmiar bundle < 500KB (gzipped)
- [ ] Animacje 60fps

### **Użyteczność**
- [ ] WCAG 2.1 AA accessibility compliance
- [ ] Kontrast kolory > 4.5:1
- [ ] Obsługa klawiatury (Tab, Enter)
- [ ] Screen reader friendly

### **Niezmienność**
- [ ] Słowa muszą być statyczne (plik JSON)
- [ ] Brak możliwości edycji przez użytkownika
- [ ] Wersjonowanie pliku słów (v1.0)

### **Bezpieczeństwo**
- [ ] Zero wrażliwych danych w kodzie
- [ ] Brak XSS vulnerabilities (sanitize inputs)
- [ ] HTTPS tylko

### **Utrzymywalność**
- [ ] Kod zgodny ze standardami React
- [ ] Komponenty podzielone logicznie
- [ ] Brak duplikacji kodu (DRY)
- [ ] Dokumentacja komponentów

---

## **7. Kanały Wymiaru (Metrics)

### **Business Metrics**
- **DAU/MAU ratio:** Miara zaangażowania (target >30%)
- **Retention D1/D7/D30:** Wracający użytkownicy (target >60% / >30% / >10%)
- **Conversion rate:** Freemium → Premium (target >5%)
- **Churn rate:** Odpływ użytkowników (target <5% miesięcznie)

### **Product Metrics**
- **Time to First Value (TTFV):** Czas do pierwszego słowa (target <10s)
- **Daily Active Words:** Ile słów widzi użytkownik dziennie (target = 1)
- **Favorites per User:** Średnia ulubionych na użytkownika (target >10)
- **Share Rate:** Udostępnienia / wyświetlenia (target >2%)

### **Technical Metrics**
- **Error Rate:** % błędów z frontendu (target <0.1%)
- **Crash Rate:** % crashy aplikacji (target 0%)
- **API Response Time:** Czas ładowania słowa (target <500ms)
- **Bundle Size:** Rozmiar kodu produkcyjnego (target <500KB)

---

## **8. Red Flags (Ostrzeżenia)**

Jeśli wystąpi którykolwiek z poniższych - zgłoś natychmiast:

- 🚩 **Feature creep:** Żądanie dodania >3 nowych funkcji poza MVP (np. quizy, gry, multi-językowość)
- 🚩 **Design violation:** Dev ignoruje komponent library i pisze własny styl
- 🚩 **Scope change:** Zmiana słów bazowych (100 słów) w trakcie developmentu
- 🚩 **Missing acceptance criteria:** Ktoś zaczyna kodować bez zdefiniowanego AC
- 🚩 **Broken user flow:** Użytkownik nie może dojść do słowa w < 10s
- 🚩 **Performance issue:** Ładowanie strony > 3s na desktopie
- 🚩 **Mobile broken:** Aplikacja nie działa na telefonie

---

## **9. User Journey - Słowo Dnia (Szablon)

```
## 🎯 User Journey Map: Słowo Dnia

### Success Metric (Co to jest "sukces użytkownika"?)
→ Użytkownik znajduje piękne słowo, zapisuje je w pamięci i używa go w ciągu 24h

---

### Stage 1: Landing (0-30s)
**What they see:**
- Headline: "Odkrywaj piękne polskie słowa"
- Value prop: "Codzienne nowe słowo z definicją i przykładami"

**Friction Points:**
- [ ] Zbyt dużo tekstu hero
- [ ] Niejasne CTA

**Aha Moment:** Użytkownik myśli: "Wow, to jest dokładnie to, czego szukałem"

**CTA:** "Zobacz dzisiejsze słowo"

---

### Stage 2: Sign-Up (1-3 min)
**Flow:**
1. Wejście na stronę
2. Wczytanie słowa dnia
3. [Opcjonalnie] Zapis do ulubionych
4. Brak wymogu logowania

**Friction Points:**
- [ ] Pop-up z loginem
- [ ] Żądanie maila

**Aha Moment:** User widzi słowo i myśli: "To jest piękne"

**Follow-up Email (jeśli da maila):** "Dzisiejsze słowo: [słowo] czeka!"

---

### Stage 3: First Interaction (5-15 min)
**Input type:** Czytanie, eksploracja

**Required actions:**
- [ ] Przeczytanie definicji
- [ ] Przeczytanie przykładów
- [ ] Kliknięcie "Dodaj do ulubionych" (opcjonalnie)

**Friction Points:**
- [ ] Trudne do zrozumienia definicje
- [ ] Brak przykładów użycia

**Aha Moment:** System pokazuje piękne przykłady użycia

---

### Stage 4: Second Visit (1-3 dni później)
**Trigger:** Email / wewnętrzna przypomnienie

**Message:** "Nowe słowo czeka: [tematyka]"

**Goal:** User wraca bez maila (zwyczaj)

**Success:** >40% wraca następnego dnia

---

### Stage 5: Habit Formation (7-30 dni)
**Trigger:** Codzienna wizyta

**Message:** Twoje słowo dnia już czeka"

**Goal:** Użytkownik wchodzi codziennie rano

**Success:** >30% retention D7

---

### Summary Metrics
- Landing → Wczytanie słowa: >70%
- Wczytanie → Ulubione: >20%
- Ulubione → Powrót: >40%
- Powrót → Stale nawyki: >30%
```

---

## **10. Competitive Analysis (Kto jest konkurencją?)

| Konkurencja | Słabości | Nasza przewaga |
|------------|----------|----------------|
| Sjp.pl | Tylko słownik, brak UX | Piękny design, codzienność |
| Wikipedia | Zbyt akademicki | Proste, przystępne |
| Duolingo | Skupione na nauce | Luźniejsze, kulturowe |
| Word of the Day apps | Angielski | Polski język, nasze słowa |

---

## **11. Monetization Strategy (Jak zarabiamy?)

### **MVP (Budujemy teraz):**
- Free: Całkowicie darmowy
- Cel: Zbieranie userów i feedbacku

### **Post-MVP (Faza 2):**
- Freemium model:
  - Free: 1 słowo / dzień
  - Premium ($2.99/mc): 
    - Słowa premium (częściej)
    - Tryby quizu
    - Statystyki nauki
    - Eksport rozszerzony
    - Brak reklam

### **Faza 3 (Skalowanie):**
- Corporate (szkolenia językowe)
- B2B (treści customowe)
- Affiliate (książki, kursy)

---

## **12. Risk Assessment (Ocena Ryzyka)

| Ryzyko | Prawdopodobieństwo | Wpływ | Mitigacja |
|--------|-------------------|-------|----------|
| Brak słów | Niskie (mamy 100) | Wysoki | Zbieramy więcej od razu |
| Kiepski UX | Średnie | Wysoki | Testy użytkowników, iteracje |
| Brak zaangażowania | Średnie | Średni | Gamifikacja, powiadomienia |
| Monetizacja nie działa | Wysokie | Średni | Testy A/B, różne modele |
| Konkurencja | Niska | Niski | Skup na polskim rynku |

---

## **13. Feature Requests Queue (Kolejka żądań)

**Wysoki Priorytet (Może poczekać):**
1. Sortowanie ulubionych
2. Tryb ciemny/dzienny
3. Powiadomienia push o nowym słowie
4. Quiz z wczorajszych słów

**Średni Priorytet (Później):**
5. Integracje (Telegram, Slack)
6. Rozszerzenia do przeglądarek
7. Poziom trudności słów
8. Kategoria dnia

**Niski Priorytet (Może poczekać):**
9. Multi-językowość (inne języki)
10. Społeczność (komentarze do słów)
11. Grafiki do udostępniania
12. TTS (wysłuchaj słowa)

---

## **14. Instrukcja dla Agentów (System Prompt)

> Kiedy użytkownik wywoła `WF_Product_Owner`, Twoim celem jest:
> 1. Ocenić czy nowe pomysły pasują do MVP scope'a
> 2. Odrzucić feature'y poza zakresem (lub wrzucić do backlogu)
> 3. Upewnić się, że user stories mają jasne acceptance criteria
> 4. Zwrócić uwagę na wartość biznesową vs koszt implementacji
> 5. Chronić zespołu przed scope creep'em
> 
> Bądź twardy w priorytetyzacji, ale otwarty na feedback. Pamiętaj: MVP musi być gotowe i zawierać TYLKO MUST HAVE features.

---

## **15. Definition of Done (Product Owner)

- [ ] Wszystkie user stories zdefiniowane i zapisane
- [ ] Acceptance criteria jasne dla każdego story
- [ ] Priorytetyzacja MoSCoW wykonana
- [ ] Product backlog utworzony
- [ ] Scope zamknięty (brak scope creep'u)
- [ ] Success metrics zdefiniowane
- [ ] Non-functional requirements udokumentowane
- [ ] Risk assessment zrobiony
- [ ] Monetization strategy określona

---

_Created by Product Owner Agent_  
_Last updated: 2026-04-30_