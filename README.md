# Słowo Dnia

Aplikacja, która każdego dnia prezentuje piękne, rzadko używane polskie słowo — z definicją, przykładami i etymologią. Pomaga wzbogacić słownictwo i mówić piękniej po polsku.

**Status:** ✅ Live  
**Tech:** React + Vite + Tailwind CSS

---

## 📚 Dokumentacja

| Plik | Opis |
|------|------|
| [docs/biznes/mvp-scoping.md](docs/biznes/mvp-scoping.md) | Zakres MVP, kryteria sukcesu |
| [docs/biznes/tech-stack.md](docs/biznes/tech-stack.md) | Audyt stacku technologicznego |
| [docs/biznes/icp-persona.md](docs/biznes/icp-persona.md) | Idealny klient i persony |
| [docs/biznes/competitor-audit.md](docs/biznes/competitor-audit.md) | Analiza konkurencji |
| [docs/biznes/monetization-strategy.md](docs/biznes/monetization-strategy.md) | Strategia monetyzacji |
| [docs/biznes/gtm-strategy.md](docs/biznes/gtm-strategy.md) | Strategia go-to-market |
| [docs/biznes/resource-analysis.md](docs/biznes/resource-analysis.md) | Audyt zasobów |
| [docs/biznes/kill-the-idea-slowo-dnia.md](docs/biznes/kill-the-idea-slowo-dnia.md) | Walidacja koncepcji |

---

## ✨ Features

- Codzienne słowo dnia (ten sam dzień = to samo słowo dla wszystkich)
- 100 pięknych polskich słów z definicjami i przykładami
- Etymologia i części mowy
- Ulubione (zapis w localStorage)
- Archiwum z wyszukiwarką i filtrowaniem
- Share na social media
- Mobile-first design
- Piękna typografia (Playfair Display, Merriweather)

---

## 🛠 Tech Stack

- **Frontend:** React 18 + Vite 6
- **Styling:** Tailwind CSS 3.4
- **Animacje:** Framer Motion 11
- **Fonts:** Playfair Display, Merriweather, Inter
- **State:** React Context + localStorage
- **Routing:** React Router v6
- **Hosting:** Vercel

---

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/your-username/slowo-dnia.git
cd slowo-dnia

# Install
npm install

# Run
npm run dev
```

### Build & Deploy

```bash
npm run build
npx vercel deploy --prod
```

---

## 📦 Project Structure

```
src/
├── data/words.json          # 100 słów
├── hooks/
│   ├── useWordOfDay.js      # Algorytm słowa dnia
│   └── useFavorites.js    # Ulubione
├── context/
│   ├── AppContext.jsx      # Global state
│   └── components/
│       ├── WordCard.jsx    # Karta słowa
│       └── ShareButton.jsx
├── pages/
│   ├── Home.jsx            # Strona główna
│   ├── Archive.jsx        # Archiwum
│   └── Favorites.jsx       # Ulubione
├── App.jsx                 # Routing
└── index.css              # Tailwind
```

---

## 🧠 How It Works

Słowo dnia jest wybierane na podstawie daty:

```javascript
const START_DATE = new Date('2026-04-13');
const daysElapsed = Math.floor((now - START_DATE) / (1000 * 60 * 60 * 24));
const word = words[daysElapsed];
```

Każdego dnia inne słowo, w tej samej kolejności dla wszystkich użytkowników.

### Word Schema

```json
{
  "id": 1,
  "word": "dyletant",
  "definition": "osoba zajmująca się czymś bez wymaganych kwalifikacji; amator",
  "examples": [
    "Ten dyletant wziął się za naprawę samochodu.",
    "Nie jestem dyletantem - studiowałem to przez pięć lat."
  ],
  "etymology": "od włoskiego dilettante, z łaciny dilectare",
  "partOfSpeech": "rzeczownik, rodzaj męski",
  "category": "charakterystyka osoby",
  "synonyms": ["amator", "laik"]
}
```

---

## 🎨 Design

### Color Palette

| Element | Kolor | HEX |
|---------|-------|-----|
| Primary | Deep Burgundy | `#722F37` |
| Secondary | Gold | `#C9A227` |
| Background | Cream | `#FDF5E6` |
| Surface | White | `#FFFFFF` |
| Text | Dark Gray | `#2C2C2C` |
| Accent | Forest Green | `#228B22` |

### Typography

| Zastosowanie | Font | Waga |
|--------------|------|------|
| Słowo hero | Playfair Display | 700 |
| Definicja, przykłady | Merriweather | 400 |
| UI, przyciski | Inter | 500 |

---

## 🗺 Roadmap

- [x] MVP — Słowo dnia + baza + definicje
- [x] Ulubione (localStorage)
- [x] Archiwum + search
- [x] Share buttons
- [ ] Quiz / ćwiczenia
- [ ] Newsletter email

---

## 🤝 Contributing

1. Fork repo
2. Branch: `git checkout -b feature/nowa-funkcja`
3. Commit i push
4. PR

---

## 📄 License

MIT

---

Built with ❤️ for Polish language lovers.