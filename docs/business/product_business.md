# Dokumentacja Biznesowa: Słowo Dnia

## 1. Cel Produktu (Product Vision)

Słowo Dnia to aplikacja mobilno-webowa, która każdego dnia dostarcza użytkownikom piękne, rzadko używane polskie słowo. Aplikacja ma na celu:
- **Odkrywanie** – pomaganie użytkownikom w znajdowaniu wyrazów, których nie znali
- **Nauka** – systematyczne poszerzanie słownictwa w sposób mało obciążający (jeden wyraz dziennie)
- **Udostępnianie** – możliwość dzielenia się nowymi słowami ze znajomymi (social virality)
- **Zbieranie** – tworzenie osobistego słownika ulubionych słów

## 2. Grupa Docelowa (ICP - Ideal Customer Profile)

### Primary Segment (Główny): Profesjonaliści i Mówcowie
- **Wiek:** 25-45 lat
- **Zawód:** Nauczyciele, wykładowcy, trenerzy, dziennikarze, copywriterzy, tłumacze, adwokaci, politolodzy
- **Cechy:**
  - Cenią język i słowa
  - Często przemawiają publicznie lub piszą teksty
  - Zależy im na tym, by nie powtarzać tych samych słów (np. "świetny", "fajny", "super")
  - Używają języka jako narzędzia pracy
  - Są w stanie zapłacić za wartość (freemium ready)

**Pain Points (problemy):**
- Brak czasu na czytanie słowników i poszukiwanie nowych słów
- Powtarzanie tych samych słów w mowie i pismie (bicie się o te same epitety)
- Zapominanie nowych słów, które poznali przypadkiem
- Trudność w wejściu do kontaktu z pięknym językiem polskim (książki wymagające czasu)

**Motywacja:**
- Chcą mówić i pisać lepiej
- Chcą podobać się słownie (status, inteligencja)
- Chcą zaspokoić ciekawość intelektualną
- Uwielbiają "perełki językowe" i udostępniać je innym

### Secondary Segment: Rodzice i Edukatorzy
- **Wiek:** 30-50 lat
- **Zawód:** Rodzice, nauczyciele przedszkolni/podstawowi
- **Cechy:**
  - Chcą uczyć dzieci piękna języka polskiego
  - Szukają inspiracji do rozwijania słownictwa dzieci
  - Bawią się językiem razem z dziećmi

**Pain Points:**
- Brak narzędzi do codziennej nauki słów dla dzieci
- Dzieci używają uproszczonego języka (TV, social media)

**Motywacja:**
- Dbanie o rozwój dziecka
- Chcą być dla dzieci autorytetem językowym

### Tertiary Segment: Gen Z (Młodzi Dorośli)
- **Wiek:** 16-24 lata
- **Zawód:** Studenci, uczniowie, początkujący pracownicy
- **Cechy:**
  - Uczą się języka polskiego (obcokrajowcy) lub polskiego na poziomie C1/C2 (Polonia)
  - Uwielbiają gamifikację i osiągnięcia
  - Chcą wyróżniać się w social mediach
  - Lubią udostępniać ciekawe rzeczy

**Pain Points:**
- Chcą poszerzać słownictwo w sposób zabawny
- Szukają pretekstu do rozmowy z followersami

**Motywacja:**
- Budowanie marki osobistej jako "inteligentnego" czycieńca
- Viral potential (udostępnianie w TikTok/Instagram)

---

## 3. Problem (Problem Statement)

**Główny problem:** Użytkownicy nie mają prostego, codziennego i przyjemnego sposobu na odkrywanie i utrwalanie rzadkich polskich słów, które mogłyby wzbogacić ich komunikację.

**Symptomy:**
1. Użytkownicy powtarzają te same słowa ("fajny", "świetny", "super", "mega")
2. Piękne słowa polskie (np. "imponderabilia", "eudajmonia", "katatonia") są mało znane
3. Brak czasu na czytanie słowników i poszukiwanie nowych słów
4. Nowe słowa szybko się zapominają, jeśli nie są systematycznie przypominane
5. Nie ma prostego narzędzia do udostępniania pięknego słownictwa w social mediach

**Konsekwencje:**
- Słabe wyniki w komunikacji werbalnej i pisemnej
- Ograniczona ekspresja emocjonalna i intelektualna
- Mniej udostępnianych treści (brak "viralowych" słów i definicji)
- Spadek zaangażowania w edukację językową

---

## 4. Rozwiązanie (Solution)

Słowo Dnia to aplikacja, która każdego dnia rano prezentuje użytkownikowi jedno piękne polskie słowo z:
- **Definicją** – jasno i zrozumiale wyjaśnioną
- **Przykładami użycia** – 2-3 zdania pokazujące kontekst
- **Etymologią** – pochodzeniem słowa (fascynujące z perspektywy historycznej)
- **Synonimami** – 2-4 podobnymi słowami
- **Kategorią** – np. "Psychologia i emocje", "Kultura i sztuka"

### Główne funkcjonalności (Features)

1. **Słowo dnia (Word of the Day)**
   - Automatycznie dobierane na podstawie daty
   - To samo słowo dla wszystkich w danym dniu (spójność)
   - Archiwum poprzednich słów

2. **Ulubione (Favorites)**
   - Zapis słów, które użytkownik chce zapamiętać
   - Synchronizacja w czasie rzeczywistym
   - Eksport/wysyłka listy ulubionych

3. **Udostępnianie (Share)**
   - Przycisk do podzielenia się słowem na social mediach
   - Wygenerowany tekst z definicją i linkiem
   - Mobilny Web Share API lub kopiowanie do schowka

4. **Archiwum i Wyszukiwanie (Archive & Search)**
   - Przegląd wszystkich słów w formie listy/siatki
   - Filtrowanie po kategoriach
   - Wyszukiwanie tekstowe (po słowie i definicji)

5. **Design i UX (Powered by Framer Motion)**
   - Piękne animacje przejść
   - Rozwijane sekcje (przykłady, etymologia)
   - Responsywność (mobile-first)
   - Premium feel (klasa premium)

---

## 5. Proposta Wartości (Value Proposition)

### Dla Użytkowników (B2C)

**"Odkrywaj piękne polskie słowa codziennie, nie marnując czasu na szukanie. Mów i pisz lepiej, udostępniaj znajomym i buduj swoje słownictwo."**

**Korzyści (Benefits):**
- 📚 **Nauka bez wysiłku** – jeden słowo dziennie to 365 nowych słów rocznie
- ⏱️ **Oszczędność czasu** – 30 sekund dziennie zamiast godzin poszukiwań
- 📱 **Wygoda** – aplikacja w Twojej kieszeni, przypomnienie każdego dnia
- 💡 **Pomysły na komunikację** – inspiracje do postów, maili, prezentacji
- ❤️ **Udostępnianie** – daj coś wartościowego znajomym (viral potential)
- 🏆 **Osiągnięcia** – zbieraj ulubione słowa, widoczny postęp

**USP (Unique Selling Proposition):**
- **Jedyne słowo dziennie** – brak przytłoczenia informacyjnego (information overload)
- **Piękna szata graficzna** – premium feel budzące zaufanie i chęć udostępniania
- **Polskość** – skupienie na naszym języku (kultura, dziedzictwo)
- **Filtrowanie po kategoriach** – użytkownik może wybrać temat (np. emocje, nauka)

---

### Dla Biznesu (B2B Potencjał)

**Sektor Edukacyjny:**
- Szkoły i uniwersytety mogą kupować licencje dla uczniów
- Nauczyciele języków polskich jako narzędzie wspomagające

**Content Creatorzy:**
- Agencje PR i copywriterskie mogą używać do poszerzania słownictwa
- Influencerzy jako źródło inspiracji do postów

**Corporate:**
- Firmy mogą integrować z intranetem dla rozwoju pracowników
- Employer branding (dbamy o język naszych pracowników)

### Modele Monetizacji (w przyszłości)

1. **Freemium** (Obecnie – 100% darmowe)
   - Darmowe: 100 słów w bazie, podstawowe funkcje
   - Premium ($2.99/mc): dostęp do 1000+ słów, tryb offline, własne notatki, quizy

2. **B2B Licencje**
   - Szkoły: $50/rok za klasę (30 uczniów)
   - Firmy: $5/użytkownik/rok

3. **Affiliate Marketing**
   - Linki do książek (Księgarnia partnerska)
   - Kursy z języka polskiego

4. **Sponsored Words** (Native Ads)
   - Marki sponsorują konkretne słowo dnia (np. kawiarnia słowo "kawiarnia")
   - Delikatne, nieintruzywne

5. **Newsletter**
   - Email ze słowem dnia do subskrybentów
   - Monetyzacja przez newsletter ads

---

## 6. Konkurencja (Competitive Landscape)

### Bezpośredni Konkurenci

**Słowniki Internetowe (np. sjp.pl, encyklopedia.pwn.pl)**
- **Mocne strony:** Kompleksowe, darmowe, autorytatywne
- **Słabe strony:** Skomplikowane, brak osobowości, brak selekcji, brak motywacji do powrotu, zero UX
- **Nasza przewaga:** Selekcja (tylko piękne słowa), design, codzienność, społeczność, personalizacja (ulubione)

**Aplikacje do nauki języków (Duolingo, Babbel, Quizlet)**
- **Mocne strony:** Gamifikacja, ścieżki nauki, społeczność
- **Słabe strony:** Zbyt ogólne (cały język vs jedno słowo), nudne, skupione na gramatyce
- **Nasza przewaga:** Fokus na pięknym języku polskim, zero presji, jedno słowo dziennie, premium feel

**Słowniki SlownikE24, DobreSłowo**
- **Mocne strony:** Proste, kilka słów dziennie
- **Słabe strony:** Brak aplikacji mobilnej, brzydki design, brak funkcji społecznościowych/archiwum
- **Nasza przewaga:** Aplikacja natywna (PWA), piękny design, archiwum, ulubione, share, UX

### Pośredni Konkurenci

**Portale z cytatami (np. BrainyQuote, Wykop, Reddit r/Polska)**
- **Mocne strony:** Treści w formie cytatów, społeczność
- **Słabe strony:** Brak systematyczności, brak słownictwa, hałaśliwość
- **Nasza przewaga:** Jeden słowo dziennie z definicją i przykładem, brak komentarzy (cichy odpoczynek)

**Newslettery językowe**
- **Mocne strony:** Trafiają do skrzynki, przypominają
- **Słabe strony:** Wymagają emaila, często nudne, brak interaktywności
- **Nasza przewaga:** Aplikacja interaktywna, zero wysiłku (nie trzeba sprawdzać maila), archiwum

### Analiza SWOT

| | Korzyści (Strengths) | Słabości (Weaknesses) |
|---|---|---|
| **Szansa (Opportunities)** | ✅ Premium feel przyciąga użytkowników premium <br> ✅ Viral potential (udostępnianie pięknych słów) | ⚠️ Brak zaawansowanych funkcji (brak quizów) <br> ⚠️ Tylko 100 słów (mała wartość długoterminowa) |
| **Groźba (Threats)** | ✅ Offline-first (działa wszędzie) <br> ✅ Zero kosztów utrzymania (MVP) | ⚠️ Słowniki mają więcej słów (konkurencja w wyszukiwarce) <br> ⚠️ Duolingo itp. mają większą bazę użytkowników do cross-sell |

---

## 7. Proces GTM (Go-To-Market)

### Faza 1: MVP (Miesiąc 1-2)
**Cel:** Zbudować i wypuścić, zbierać pierwsze feedbacki
- Wdrażanie obecnego MVP (100 słów, podstawowe funkcje)
- Deploy na Vercel
- Udostępnianie wśród znajomych/nauczycieli języka polskiego
- Zbieranie feedbacków w komentarzach na social mediach

### Faza 2: Wzrost organiczny (Miesiące 3-4)
**Cel:** Zbudować społeczność, zwiększyć świadomość marki
- Konta na Instagram/TikTok z udostępnianiem słów dnia (zdjęciacia z cytatami)
- Uruchomienie newslettera (Słowo Dnia prosto do maila – wolisz desktop czy aplikację?)
- SEO: artykuł "50 pięknych polskich słów, których nie znasz"
- Cross-promocja z blogami o języku polskim

### Faza 3: Monetyzacja i Skala (Miesiące 5-6)
**Cel:** Zacząć zarabiać, dodać więcej słów, powiększyć bazę
- Wersja Premium (1000+ słów, tryb offline, quizy)
- Program partnerski ze szkołami
- Newsletter z subskrypcją płatną (Słowo Dnia + kontekst historyczny)

### Faza 4: Ekspansja (Miesiąc 7+)
**Cel:** Nowe języki, B2B, ekosystem
- Słowo Dnia w innych językach (Angielskie, Hiszpańskie)
- Integracje ze szkołami (API dla uczniów)
- Aplikacja mobilna (PWA → Native iOS/Android)
- Corporate plans dla firm

---

## 8. Mierniki Sukcesu (KPIs)

### Aktywność (Engagement)
- **DAU/MAU ratio:** Cel > 15% (codzienne wracanie użytkowników)
- **Średni czas w aplikacji:** Cel > 45 sekund na sesję
- **Interakcje na stronę:** Cel > 3 (przewinięcia, kliknięcia w przyciski, rozwijanie sekcji)

### Wzrost (Growth)
- **Nowi użytkownicy:** 100 w pierwszym miesiącu, 1000 w 6 miesięcy
- **Współczynnik retencji:** 40% po 7 dniach, 20% po 30 dniach
- **Współczynnik viralności (K-factor):** > 0.5 (udostępnienia przynoszą nowych użytkowników)

### Jakość (Quality)
- **NPS (Net Promoter Score):** > 30 (użytkownicy polecali by aplikację)
- **Bounce rate:** < 40% (użytkownicy nie uciekają od razu)
- **Czas do interakcji:** < 1 sekunda (aplikacja musi być szybka)

### Business (Gdy wprowadzimy monetyzację)
- **CR (Conversion Rate):** 2-5% z darmowych na płatne
- **ARPU (Average Revenue Per User):** $0.50 miesięcznie
- **LTV (Lifetime Value):** $5-10 za użytkownika rocznie

---

## 9. Priorytety (MoSCoW dla MVP i Po)

### MUST HAVE (MVP – obecny stan)
- [x] 100 słów w bazie z pełnymi danymi
- [x] Wyświetlanie słowa dnia na podstawie daty
- [x] Definicja + przykłady + etymologia + synonimy
- [x] Ulubione słowa (zapis w localStorage)
- [x] Archiwum poprzednich słów
- [x] Wyszukiwarka i filtrowanie po kategoriach
- [x] Udostępnianie (Share API)
- [x] Responsywny design (mobile-first)
- [x] Piękna typografia i design system
- [x] Animacje (Framer Motion)

### SHOULD HAVE (Faza 2 – miesiące 2-3)
- [ ] Newsletter ze słowem dnia (opcjonalny)
- [ ] Notatki do słów (użytkownik może coś zapisać)
- [ ] Tryb ciemny (dark mode)
- [ ] Pokrewna słowa / słowa z tym samym korzeniem
- [ ] Pronuncjacja (audio – z API Forvo lub text-to-speech)
- [ ] Quiz 10-minutowy (sprawdź wiedzę z ostatnich 10 słów)

### COULD HAVE (Faza 3 – miesiące 4-6)
- [ ] Aplikacja mobilna iOS/Android (React Native / Expo)
- [ ] Tryb offline z pobieraniem słów do urządzenia
- [ ] Synchronizacja między urządzeniami (konto użytkownika)
- [ ] Strefa Premium (więcej słów, statystyki nauki)
- [ ] Współdzielenie postępów (widok "Mam X słów w ulubionych")
- [ ] Widget na ekran startowy iOS/Android (słowo dnia)
- [ ] Integracje (Udostępnij do WhatsApp/Telegram/Slack)

### WON'T HAVE (Na ten moment)
- [ ] Multi-języczność (inne języki niż polski)
- [ ] Społeczność (komentarze, lajki, obserwowanie)
- [ ] Grywalizacja (punkty, odznaki, poziomy)
- [ ] AI (generowanie przykładów na podstawie słowa)
- [ ] Reklamy (żadnych w MVP i wczesnej fazie wzrostu)
- [ ] Ciasteczka i tracking (GDPR) – aplikacja jest bez cookie

---

## 10. Aspekty Prawniczne i Polityka Prywatności

### Zbieranie Danych
- **Brak danych osobowych:** Aplikacja nie wymaga rejestracji, nie zbiera emaili, imion, czy innych danych
- **LocalStorage:** Przechowuje tylko ulubione słowa (dane wewnątrz przeglądarki użytkownika)
- **Brak ciasteczek (cookies):** Żadnych tracking cookies, marketingowych cookies
- **Zgodność z RODO:** Aplikacja nie przetwarza danych osobowych, więc RODO nie dotyczy

### Wyjątki
- **Hosting Vercel:** Vercel może zbierać logi serwerowe (adresy IP) dla celów diagnostycznych i bezpieczeństwa – standard branżowy
- **Google Fonts:** Ładowanie fontów z Google (może zbierać adres IP) – wymóg techniczny dla typografii

### Polityka Prywatności (Krótka)
> "Słowo Dnia nie zbiera, nie przechowuje i nie udostępnia żadnych Twoich danych osobowych. Aplikacja działa w 100% po stronie klienta. Ulubione słowa, które zapisujesz, trzymane są wyłącznie w Twojej przeglądarce (localStorage) i nigdy nie są przesyłane na żaden serwer. Nie używamy plików cookies ani narzędzi analitycznych śledzących Twoje ruchy. Twoja prywatność jest w 100% chroniona."

### Warunki Korzystania
- Aplikacja jest udostępniana "as-is" (w stanie obecnej postaci)
- Autor nie ponosi odpowiedzialności za błędy w definicjach słów (choć stara się o dokładność)
- Zabronione jest kopiowanie bazy słów (words.json) na cele komercyjne bez zgody

---

## 11. Zasoby i Budżet (Resource Plan)

### Koszty (Miesięcznie)
- **Hosting (Vercel):** $0 (plan Hobby/Personal – do 100GB transferu, wystarczające)
- **Domena:** $0 (używamy subdomeny Vercel *.vercel.app) lub ~50 PLN/rok za .pl
- **Fonty (Google Fonts):** $0
- **Narzędzia deweloperskie:** $0 (VS Code, Git - darmowe)
- **Razem:** **$0 – 50 PLN miesięcznie** (MVP)

### Koszty Jednorazowe
- **Czas deweloperki:** ~80 godzin (MVP)
  - Przy stawce 200 PLN/h = 16 000 PLń (rynek Polski)
  - Przy stawce 50 USD/h = 4000 USD (rynek Zachodni)
- **Koszty niematerialne:** Tłumaczenia, weryfikacja etymologii – trudno oszacować

### Zespół Wymagany
- **Frontend Developer (React):** 1 (80h)
- **Weryfikator językowy (Proofreader):** 1 (20h – sprawdzenie etymologii, definicji)
- **Product Owner:** 1 (10h – specyfikacja, backlog)
- **Designer (opcjonalnie):** 0 – design system oparty na Tailwind i Google Fonts (brak custom grafiki)

---

## 12. Ryzyka i Mitygacje

| Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|--------|-------------------|-------|-----------|
| Błąd w etymologii/słowie | Średnie | Średni | Weryfikacja przez językoznawcę, linki do źródeł w kodzie komentarzy |
| Słabe przyjęcie (brak użytkowników) | Wysokie | Średni | Szybki pivot, testy A/B z różnymi grupami słów, agresywne marketing |
| Przegranie z duchem (np. aplikacja z AI robi to lepiej) | Średnie | Wysoki | Skupienie na czułości ludzkiej, pięknie opowiedzianych etymologiach, braku generatywnego AI |
| Limit localStorage w przeglądarkach | Niskie | Niski | Używamy <1KB, limit to 5MB – bezpieczna margines |
| Błąd algorytmu daty (słowa przeskakują) | Niskie | Średni | Testy jednostkowe, duże okno tolerancji czasowej |
| Zmiana API przeglądarki (deprecjacja localStorage) | Bardzo niskie | Wysoki | Abstrakcja przez useLocalStorage – łatwa zmiana na IndexedDB |
| Problemy z wydajnością na starych urządzeniach | Niskie | Niski | Animacje zoptymalizowane (GPU), braki wydajności testowane na iPhone 8/Android 8 |

---

## 13. Eksperymenty i Asumptcje (A do testowania)

### Asumpt 1: Ludzie nie mają czasu na naukę słów
- **Eksperyment:** Poproś 10 osób o wyuczenie się 5 słów dziennie przez tydzień (bez aplikacji)
- **Metryka:** Ile osób to zrobi do końca tygodnia?
- **Oczekiwany wynik:** < 30% (ludzie są zajęci)
- **MVP weryfikacja:** Sprawdź czy użytkownicy wracają do aplikacji 2, 3, 7 dni po pierwszym wejściu

### Asumpt 2: Piękny design i jakość prezentacji to klucz
- **Eksperyment:** Porównaj dwie wersje – brzydka (czysty tekst) vs piękna (nasza app) na grupie 50 osób
- **Metryka:** Czas spędzony na stronie, udostępnienia, NPS
- **Oczekiwany wynik:** Piękna wersja ma 3x więcej udostępnień i 2x dłuższy czas
- **MVP weryfikacja:** Sprawdź współczynnik udostępniania (share) – jeśli >5% sesji, design działa

### Asumpt 3: Codzienność (1 słowo dziennie) to dobry nawyk
- **Eksperyment:** Śledź zachowanie 100 użytkowników przez 30 dni
- **Metryka:** DAU/MAU ratio, średnia liczba dni między wizytami
- **Oczekiwany wynik:** 20-30% użytkowników wchodzi codziennie lub co 2-3 dni
- **MVP weryfikacja:** Jeśli DAU/MAU jest bliskie 0, musimy dodać powiadomienia push lub inne "nagie" (remindery)

### Asumpt 4: Społeczność i udostępnianie to napęd wzrostu
- **Eksperyment:** Dodaj przycisk "Wyślij znajomemu" i zobacz konwersję
- **Metryka:** Współczynnik K (ile nowych użytkowników z każdego zaproszenia)
- **Oczekiwany wynik:** K = 0.3-0.6 (każdy zaproszony użytkownik przynosi 0.3-0.6 kolejnych)
- **MVP weryfikacja:** Jeśli udostępnianie nie generuje ruchu, zainwestuj w lepsze opisy i preview linków (OpenGraph)

---

## 14. Wyniki Oczekiwane (Po 6 miesiącach, jeśli MVP powiodło się)

### Miary Sukcesu
- 5 000 aktywnych użytkowników miesięcznie
- 1 000 DAU (codziennych użytkowników)
- 20% udział udostępniania w aktywnych użytkownikach
- 100+ pozytywnych komentarzy/opini
- Zbieranie feedbacku na temat nowych funkcji (Premium, Quizy)

### Ścieżka do Break-even (jeśli wprowadzimy płatności)
- Użytkownicy aktywni miesięcznie: 10 000
- Konwersja na Premium: 3% = 300 płatnych użytkowników
- ARPU (płatni): $3/mc = $900/mc = $10 800/rok
- Koszty utrzymania (hosting, domena, dew tools): ~$1000/rok
- **Zysk:** ~$9 800/rocznie (jeśli zaoszczędzimy czas deweloperski)

---  
*Dokumentacja biznesowa, zgodna z wymaganiami SDD. Oparta na faktach z codebase, bez zmyślania cech.*