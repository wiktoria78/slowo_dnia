# WF_IT_Architect

**Cel:** Zdefiniować architekturę systemu, technologię i podejście techniczne dla aplikacji "Słowo Dnia", zapewniając skalowalność, wydajność i ułatwiającą rozwój.

---

## **1. Fundamentalna Zasada (The Success Equation)**

> **Architecture Success = Right Tech + Scalable Design + Dev Experience + Future-Proof**

Jeśli technologia nie pasuje do problemu, projekt zawodzi. Jeśli architektura nie skaluje, system padnie. Jeśli deweloperzy mają zły doświadczenie, prędkość spada. Jeśli nie ma miejsca na rozwój, projekt umiera.

Twoim zadaniem jest zaprojektowanie architektury, która rozwiązuje obecny problem i pozwala na rozwój w przyszłości.

---

## **2. Definicja Sukcesu Architektury**

**Cel Architektoniczny:**
Zbudować SPA (Single Page Application), które jest:
- Szybkie i lekkie (bundle < 500KB)
- Łatwe w rozwoju i utrzymaniu
- Przygotowane na skalowanie
- Bezpieczne i stabilne
- Łatwe w testowaniu

**Technical Success Metrics:**
- [ ] Czas ładowania strony < 2s (3G)
- [ ] Time to Interactive < 3s
- [ ] Bundle size < 500KB (gzipped)
- [ ] Zero runtime errors w pierwszym miesiącu
- [ ] Lighthouse score > 90 (Performance, Accessibility, Best Practices)
- [ ] Czas buildu < 2 minuty
- [ ] Happy developers (brak frustracji z narzędzi)

---

## **3. System Architecture (Architektura Systemu)

### **3.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Users (Web Browsers)                     │
│  Chrome, Firefox, Safari, Edge (Desktop & Mobile)               │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ HTTPS (TLS 1.3)
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                        CDN / Hosting                            │
│                    Vercel (Edge Network)                        │
│  - Global distribution                                          │
│  - Automatic SSL (HTTPS)                                        │
│  - Edge caching for static assets                              │
│  - Preview deployments                                          │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ Serves Static Files
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    React SPA (Client-Side)                      │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  Router     │  │  State      │  │  Components │             │
│  │  (React     │  │  (Context   │  │  (React     │             │
│  │   Router)   │  │   + Local   │  │   + Framer) │             │
│  └─────────────┘  │   Storage)  │  └─────────────┘             │
│                   └─────────────┘                              │
│                                                                 │
│  Data Flow:                                                    │
│  1. User navigates → Router                                    │
│  2. Component renders → Reads from Context/LocalStorage       │
│  3. User interacts → Updates Context/LocalStorage              │
│  4. State changes → Components re-render (optimized)           │
│                                                                 │
│  Data Storage:                                                 │
│  - words.json (static, bundled)                                │
│  - localStorage (user preferences, favorites)                  │
│  - Session storage (temporary state)                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### **3.2 Technology Stack Justification

**Frontend Framework: React 18 + Vite**
- *Why React?* Industry standard, huge ecosystem, excellent developer experience
- *Why Vite?* Lightning-fast HMR, fast builds, modern tooling
- *Why not Next.js?* No SSR needed (SPA), no server-side features required
- *Why not Vue?* Team expertise, React ecosystem, more job market

**State Management: React Context + localStorage**
- *Why Context?* Built-in, no extra dependencies, perfect for medium complexity
- *Why localStorage?* Persists favorites without backend, offline-first
- *Why not Redux?* Overkill for this scale, adds bundle size
- *Why not Zustand/MobX?* Unnecessary complexity for simple state

**Styling: Tailwind CSS**
- *Why Tailwind?* Utility-first, rapid development, consistent design
- *Why not styled-components?* No runtime cost, smaller bundle
- *Why not CSS modules?* Tailwind faster for prototyping/development

**Animations: Framer Motion**
- *Why Framer Motion?* Declarative, powerful, great DX
- *Why not CSS animations?* More complex orchestration
- *Why not GSAP?* Overkill for typical UI animations

**Routing: React Router v6**
- *Why RR6?* Standard for React, powerful, type-safe
- *Why not Next.js router?* Already using Vite

**Build Tool: Vite**
- *Why Vite?* Fast HMR, optimized builds, ES modules
- *Why not Webpack?* Vite is faster and simpler for this use case

**Testing: Vitest + React Testing Library**
- *Why Vitest?* Fast, Vite-native, compatible with Jest API
- *Why RTL?* Industry standard for React testing

**Type Checking: TypeScript**
- *Why TypeScript?* Type safety, better DX, fewer runtime errors
- *Why not JavaScript?* Scale, maintainability, developer experience

**Linting: ESLint + Prettier**
- *Why ESLint?* Code quality, catching errors early
- *Why Prettier?* Consistent formatting, no style debates

---

## **4. Data Architecture (Architektura Danych)

### **4.1 Static Data (words.json)

**Structure:**
```json
[
  {
    "id": 1,
    "word": "Sercecze",
    "definition": "Rzecz potoczna, karczmowa...",
    "examples": [
      "Zrobiliśmy z tego takie sercecze, że ledwo można było je przełknąć."
    ],
    "etymology": "Od słowa 'serce'...",
    "partOfSpeech": "rzeczownik",
    "category": "potoczne",
    "synonyms": ["taniocha", "bajzel"]
  }
]
```

**Storage Strategy:**
- Bundled with application (import in code)
- Loaded once at app initialization
- Cached in memory
- Size: ~100KB (100 words with full data)

**Rationale:**
- No backend needed
- Instant loading (no API calls)
- Version controllable
- Easy to update (just replace file)
- Works offline

### **4.2 Dynamic Data (User State)

**Storage: localStorage**

**Structure:**
```javascript
{
  "favorites": [1, 5, 23], // array of word IDs
  "lastViewed": 15, // last word ID viewed
  "theme": "light", // theme preference
  "version": "1.0" // data schema version
}
```

**Rationale:**
- Persists across sessions
- No backend required
- Offline-first
- User-specific
- Synchronous API (simple)

**Considerations:**
- Limited to ~5MB
- Only strings (need JSON serialization)
- Synchronous (blocking)
- Same-origin only

---

## **5. Component Architecture (Architektura Komponentów)

### **5.1 Component Hierarchy

```
App
├── Router (React Router)
│   ├── Route: / (Home)
│   │   ├── Layout
│   │   │   ├── Header
│   │   │   ├── Main
│   │   │   │   └── WordCard (Hero)
│   │   │   └── Footer
│   │   └── Routes
│   │       └── HomeRoute
│   ├── Route: /archive
│   │   ├── Layout
│   │   └── ArchivePage
│   │       ├── SearchBar
│   │       ├── FilterPanel
│   │       └── WordList
│   │           └── WordCard (Compact)
│   └── Route: /favorites
│       ├── Layout
│       └── FavoritesPage
│           ├── Toolbar
│           └── WordList
│               └── WordCard (Compact)
├── AppContext (Provider)
│   ├── WordProvider
│   ├── FavoritesProvider
│   └── SettingsProvider
└── Hooks
    ├── useWordOfDay
    ├── useFavorites
    └── useLocalStorage
```

### **5.2 Core Components

**App (Root Component)**
- Responsibilities: Routing, global providers, error boundaries
- State: None (delegates to context)
- Props: None

**Layout (Wrapper Component)**
- Responsibilities: Consistent page structure, header/footer
- State: None
- Props: children

**WordCard (Hero Variant)**
- Responsibilities: Display full word with all details
- State: isFavorite (derived)
- Props: word, onFavoriteToggle, onShare
- Animations: Entry animation, favorite heart pop

**WordCard (Compact Variant)**
- Responsibilities: Display word in list format
- State: isFavorite (derived)
- Props: word, onFavoriteToggle
- Interactions: Hover effects, click to view

**SearchBar**
- Responsibilities: Search input with debounce
- State: value (controlled)
- Props: onSearch, placeholder
- Features: Debounced input, clear button

**FilterPanel**
- Responsibilities: Category/part-of-speech filters
- State: activeFilters
- Props: onFilterChange
- Features: Multi-select, chip display

**Navigation (Header)**
- Responsibilities: Main navigation
- State: activeRoute
- Props: None (reads from router)
- Features: Responsive (desktop vs mobile)

---

## **6. State Management Architecture

### **6.1 App Context Structure

```javascript
// AppContext.jsx
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [words, setWords] = useState([]); // All words
  const [favorites, setFavorites] = useState([]); // Favorite IDs
  const [currentWordId, setCurrentWordId] = useState(null);
  
  // Derived state
  const currentWord = words.find(w => w.id === currentWordId);
  const isFavorite = favorites.includes(currentWordId);
  
  // Actions
  const toggleFavorite = (wordId) => {
    // Update favorites in localStorage
  };
  
  const getWordOfDay = () => {
    // Calculate based on date
  };
  
  return (
    <AppContext.Provider value={{
      words,
      favorites,
      currentWord,
      isFavorite,
      toggleFavorite,
      getWordOfDay
    }}>
      {children}
    </AppContext.Provider>
  );
};
```

### **6.2 Custom Hooks Architecture

**useLocalStorage(key, initialValue)**
- Persists any value to localStorage
- Handles serialization/deserialization
- Synchronizes across tabs (storage event)
- Provides loading state

**useWordOfDay()**
- Calculates word of day based on date
- Caches result for performance
- Handles edge cases (pre-launch, post-archive)

**useFavorites()**
- Manages favorites state
- Optimistic updates
- Toast notifications

---

## **7. Performance Architecture

### **7.1 Bundle Optimization Strategy

**Code Splitting:**
```javascript
// Route-based splitting
const Home = lazy(() => import('./pages/Home'));
const Archive = lazy(() => import('./pages/Archive'));
const Favorites = lazy(() => import('./pages/Favorites'));
```

**Tree Shaking:**
- Enabled by default in Vite
- Remove unused code
- Import only what's needed

**Asset Optimization:**
- SVGs as React components (no extra HTTP requests)
- Fonts preloaded
- Images optimized (none in this app)

**Dependencies Audit:**
```
- react, react-dom: ~40KB gzipped
- framer-motion: ~50KB gzipped (tree-shaken)
- react-router: ~10KB gzipped
- tailwindcss: ~30KB (purged)
Total: ~130KB gzipped (well under 500KB)
```

### **7.2 Runtime Performance

**Render Optimization:**
- React.memo for expensive components
- useCallback for stable function references
- useMemo for expensive calculations
- Virtual lists for large datasets (not needed here, only 100 words)

**Lazy Loading:**
- Components loaded on demand
- Routes code-split
- Images (if any) lazy-loaded

**Caching Strategy:**
- words.json: bundled (instant)
- localStorage: synchronous access
- Component styles: CSS-in-JS extracted

**Bundle Analysis:**
```bash
npm run build -- --mode production
# Analyze with source-map-explorer
```

---

## **8. Security Architecture

### **8.1 Security Considerations

**XSS Prevention:**
- No user-generated content displayed
- No dynamic HTML rendering
- React escapes by default
- Sanitize if any user input is added later

**Data Validation:**
- TypeScript type checking
- Runtime validation for localStorage
- Schema versioning for stored data

**Content Security Policy (CSP):**
```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
font-src 'self' data:;
```
(Vercel sets appropriate headers)

**HTTPS Enforcement:**
- Vercel provides automatic HTTPS
- HSTS headers configured

**No Sensitive Data:**
- No API keys in frontend
- No user authentication
- No personal data collected

### **8.2 Security Checklist

- [ ] No `dangerouslySetInnerHTML` usage
- [ ] All inputs validated
- [ ] No eval() or similar
- [ ] Dependencies audited (npm audit)
- [ ] CSP headers configured
- [ ] HTTPS enforced
- [ ] No secrets in code

---

## **9. Scalability Architecture

### **9.1 Current Scale (MVP)

**Users:** < 1000 DAU
**Data:** 100 words (~100KB)
**Traffic:** Minimal (static hosting)
**State:** Client-only (localStorage)

Architecture is sufficient for this scale.

### **9.2 Future Scale Considerations

**If user base grows to 10,000+:**

**Option 1: Add Backend**
```
Frontend → API Gateway → Backend (Node.js/Fastify)
                      → Database (PostgreSQL)
                      → Redis (caching)
```
- Benefits: User accounts, progress tracking, analytics
- Cost: ~$20-50/month (basic hosting)

**Option 2: Serverless**
```
Frontend → Vercel Edge Functions
        → Database (Supabase/Vercel Postgres)
        → Blob Storage (user uploads)
```
- Benefits: Automatic scaling, pay-per-use
- Cost: Free tier sufficient for MVP

**Option 3: Stay Static**
- Enhance localStorage approach
- Add service worker for offline
- Use IndexedDB for more data
- Cost: $0 (static hosting)

**Recommendation:**  
Keep current architecture for MVP. If features requiring backend are requested (user accounts, progress sync, multi-device), migrate to serverless (Supabase/Vercel Postgres).

### **9.3 Feature Extensions Without Architecture Changes

Can add without backend:
- More words (update JSON)
- Categories/tags
- Search improvements
- Export features
- PWA capabilities (offline mode)
- Local notes on words

Require backend:
- User accounts
- Sync across devices
- User-generated content
- Analytics
- Social features

---

## **10. Development Experience (DX) Architecture

### **10.1 Tooling Stack

**Development:**
- Vite: Fast HMR (< 100ms)
- ESLint: Code quality
- Prettier: Formatting
- TypeScript: Type safety

**Testing:**
- Vitest: Unit tests (Jest-compatible, but faster)
- React Testing Library: Component tests
- jsdom: DOM simulation

**Deployment:**
- Vercel: Automatic CI/CD
- Preview deployments on PR
- Git-connected deployments

**Monitoring:**
- Vercel Analytics (basic)
- Error tracking (Sentry/BrowserStack for production)

### **10.2 Project Structure

```
src/
├── data/              # Static data
│   └── words.json
├── hooks/             # Custom hooks
│   ├── useWordOfDay.js
│   ├── useFavorites.js
│   └── useLocalStorage.js
├── context/           # State management
│   ├── AppContext.jsx
│   └── components/    # Context-related components
│       ├── WordCard.jsx
│       └── ShareButton.jsx
├── pages/             # Page components
│   ├── Home.jsx
│   ├── Archive.jsx
│   └── Favorites.jsx
├── components/        # Shared components
│   ├── common/        # Low-level components
│   └── layout/        # Layout components
├── styles/            # Global styles
│   └── index.css
├── utils/             # Utility functions
│   └── helpers.js
├── App.jsx            # Root component
└── main.jsx           # Entry point
```

### **10.3 Development Workflow

```bash
# Start development server
npm run dev
# → Vite dev server on :5173
# → HMR enabled
# → Linting on save

# Run tests
npm run test
# → Vitest test runner
# → Watch mode by default

# Build for production
npm run build
# → Type checking
# → Linting
# → Optimized bundle

# Preview production build
npm run preview
# → Local production simulation

# Lint code
npm run lint
# → ESLint check
```

---

## **11. Testing Architecture

### **11.1 Test Strategy

**Unit Tests:**
- Test individual functions and hooks
- Use Vitest
- Coverage goal: 80%+

**Component Tests:**
- Test React components
- Use React Testing Library
- Test behavior, not implementation
- Coverage goal: 80%+

**Integration Tests:**
- Test component interactions
- Test user flows
- Limited number (keep fast)

**End-to-End Tests:**
- Critical user journeys
- Use Playwright or Cypress
- Smoke tests only

**What NOT to Test:**
- Third-party libraries (React, etc.)
- Implementation details
- CSS/visual appearance
- Browser-specific behavior

### **11.2 Test Pyramid

```
    E2E (5-10 tests)
         |
  Integration (10-20 tests)
         |
 Component (50-100 tests)
         |
    Unit (100+ tests)
```

### **11.3 Test Examples

**Hook Test (useLocalStorage):**
```javascript
test('should save and retrieve value', () => {
  const { result } = renderHook(() => useLocalStorage('key', 'initial'));
  act(() => result.current.setValue('new'));
  expect(result.current.value).toBe('new');
});
```

**Component Test (WordCard):**
```javascript
test('should display word details', () => {
  render(<WordCard word={mockWord} />);
  expect(screen.getByText('Sercecze')).toBeInTheDocument();
  expect(screen.getByText(/rzeczownik/i)).toBeInTheDocument();
});
```

**User Flow Test:**
```javascript
test('should add to favorites and persist', async () => {
  render(<App />);
  userEvent.click(screen.getByText('Dodaj do ulubionych'));
  expect(await screen.findByText('Dodano')).toBeInTheDocument();
  // Navigate away and back
  // Verify still in favorites
});
```

---

## **12. CI/CD Architecture

### **12.1 Vercel Deployment Pipeline

```
Git Push → GitHub → Vercel Webhook
                          │
                          ▼
                  Build & Test Pipeline
                          │
                          ├─ Install dependencies
                          │
                          ├─ Type check (TypeScript)
                          │
                          ├─ Lint (ESLint)
                          │
                          ├─ Test (Vitest)
                          │
                          ├─ Build (Vite)
                          │
                          └─ Deploy Preview (preview.example.com)
                                  │
                          PR Review & Approval
                                  │
                          Merge to main
                                  │
                          Deploy to Production (example.com)
```

### **12.2 Environment Strategy

**Preview Deployments:**
- Every PR gets unique URL
- Test before merging
- Share with stakeholders

**Production:**
- Only `main` branch
- Automatic deploy on merge
- Atomic deployments (instant rollback)

**No Staging:**
- Overkill for this scale
- Preview deployments serve the same purpose
- Production issues caught by preview testing

### **12.3 Rollback Strategy

```
Vercel features:
- Instant rollback to previous deployment
- Git-integrated (revert commit)
- Zero-downtime deploys
- Rollback in < 1 minute

Manual rollback:
- Git revert
- Push → Vercel redeploys
```

---

## **13. Monitoring & Observability

### **13.1 Metrics to Track

**Performance:**
- Page load time (Lighthouse)
- Time to Interactive
- Bundle size (trend)
- Lighthouse score

**Reliability:**
- Error rate (frontend errors)
- Crash-free users
- Failed deployments

**Usage:**
- Page views
- User interactions
- Feature usage

### **13.2 Tools

**Production:**
- Vercel Analytics (basic)
- Browser console error logging
- Lighthouse CI (performance budgets)

**Development:**
- React DevTools
- ESLint (real-time)
- Vitest watch mode
- Bundle analyzer

### **13.3 Alerting

**Set alerts for:**
- Lighthouse score < 90
- Bundle size > 500KB
- Error rate increase > 1%
- Build failures
- Deployment failures

---

## **14. Documentation Architecture

### **14.1 Inline Documentation

```javascript
/**
 * Calculates word of the day based on start date
 * @param {Word[]} words - Array of all words
 * @param {Date} startDate - Start date for word rotation
 * @returns {Word|null} Today's word or null if out of range
 * @example
 * const word = getWordOfDay(words, new Date('2026-04-13'));
 */
export function getWordOfDay(words, startDate) {
  // Implementation
}
```

**Rules:**
- All exported functions documented
- Complex algorithms explained
- Edge cases noted
- Usage examples provided

### **14.2 Architecture Decision Records (ADRs)

Document major decisions:
```
docs/adr/
├── 001-use-react-instead-of-vue.md
├── 002-use-context-instead-of-redux.md
├── 003-bundle-data-instead-of-api.md
└── 004-use-tailwind-instead-of-css-modules.md
```

**Format:**
- Context
- Decision
- Consequences
- Alternatives considered

---

## **15. Deployment Architecture

### **15.1 Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "env": {
    "VITE_APP_URL": {
      "target": "production",
      "value": "https://slowodnia.pl"
    }
  },
  "regions": ["cdg1"], // Paris region (closest to Poland)
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

### **15.2 Deployment Workflow

```
Developer → Git Push → GitHub Actions
                          │
                          ├─ Install (cached)
                          ├─ Type Check
                          ├─ Lint
                          ├─ Test
                          ├─ Build
                          └─ Deploy Preview
                                  │
                     Manual Approval (optional)
                                  │
                ┌─────────────────┴─────────────────┐
                │           Production               │
                └───────────────────────────────────┘
```

**Branch Strategy:**
- `main`: Production (protected)
- `develop`: Integration (optional)
- Feature branches: PRs to develop or main

**Release Strategy:**
- Continuous delivery (every merge → production)
- Feature flags for gradual rollouts (if needed)
- Version tags for releases

---

## **16. Red Flags (Ostrzeżenia)

🚩 **Immediate Concerns:**
- Bundle size > 500KB (performance issue)
- Lighthouse score < 90 (quality issue)
- Build failing in CI (breaks deployment)
- Tests failing (risk of regression)
- Security vulnerabilities (npm audit high/critical)

🚩 **Architecture Violations:**
- Direct localStorage access (use hooks)
- Business logic in components (use hooks/utils)
- No TypeScript types (type safety)
- Inline styles (use Tailwind)
- Magic numbers (use constants)

🚩 **Scale Concerns:**
- Need for backend features (consider migration)
- > 10,000 words (consider pagination/API)
- User data synchronization (requires backend)
- Real-time features (requires WebSocket)

---

## **17. Instrukcja dla Agentów (System Prompt)

> Kiedy wywołasz `WF_IT_Architect`, Twoim celem jest:
> 1. Ocenić czy proponowane rozwiązanie techniczne pasuje do potrzeb
> 2. Zidentyfikować ryzyko technologiczne (performance, security, scale)
> 3. Upewnić się, że architektura pozwala na rozwój (nie jest zbyt sztywna)
> 4. Ocenić, czy narzędzia i biblioteki są odpowiednie
> 5. Zaproponować alternatywy, jeśli rozwiązanie ma wady
> 6. Zapewnić, że testowanie i CI/CD są możliwe
> 
> Bądź pragmatyczny: wybieraj najprostsze rozwiązanie, które działa. Nie dodawaj technologii dla technologii. Pamiętaj o ograniczeniach (brak backendu, mały zespół, krótki czas). Jeśli rozwiązanie jest "dość dobre", to jest wystarczające.

---

## **18. Definition of Done (IT Architect)

- [ ] Technology stack zdefiniowany i uzasadniony
- [ ] Architektura systemu udokumentowana
- [ ] Data architecture zaprojektowana
- [ ] Component hierarchy stworzona
- [ ] State management approach zdefiniowane
- [ ] Performance strategy udokumentowana
- [ ] Security considerations zidentyfikowane
- [ ] Testing strategy zdefiniowana
- [ ] CI/CD pipeline skonfigurowana
- [ ] Monitoring i observability zdefiniowane
- [ ] Deployment process udokumentowany
- [ ] Risk assessment zrobiony
- [ ] Scalability considerations udokumentowane
- [ ] ADRs utworzone (jeśli potrzebne)

---

_Created by IT Architect Agent_  
_Last updated: 2026-04-30_