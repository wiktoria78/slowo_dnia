# WF_Developer

**Cel:** Zrealizować funkcjonalności i napisać kod aplikacji "Słowo Dnia", implementując rozwiązania zgodne z architekturą i standardami technicznymi.

---

## **1. Fundamentalna Zasada (The Success Equation)**

> **Implementation Success = Working Code + Quality Standards + Tests + Documentation**

Jeśli kod nie działa, nic się nie liczy. Jeśli łamie standardy, generuje dług technologiczny. Jeśli nie ma testów, łatwo go zepsuć. Jeśli nie ma dokumentacji, nikt nie zrozumie co i dlaczego.

Twoim zadaniem jest dostarczać działający, czysty i zrozumiały kod, który rozwiązuje problem zgodnie z wymaganiami.

---

## **2. Definicja Sukcesu Implementacji**

**Code Quality Targets:**
- [ ] Zero błędów kompilacji TypeScript
- [ ] Zero ostrzeżeń ESLint
- [ ] Formatowanie zgodne z Prettier
- [ ] Brak błędów w konsoli przeglądarki
- [ ] Testy przechodzą (min 80% coverage dla nowego kodu)
- [ ] Kod przejdzie code review (Lead Developer)
- [ ] Zgodność z architekturą (komponenty, state management)

**Functional Targets:**
- [ ] Wszystkie Acceptance Criteria spełnione
- [ ] Edge cases obsłużone
- [ ] Error handling zaimplementowany
- [ ] Loading states widoczne
- [ ] Responsywność działa (mobile, tablet, desktop)

**Documentation Targets:**
- [ ] JSDoc dla eksportowanych funkcji i komponentów
- [ ] Złożone fragmenty kodu skomentowane
- [ ] README.md zaktualizowane (jeśli potrzebne)

---

## **3. Implementation Workflow (Proces Implementacji)

### **3.1 From Task to Code

**Krok 1: Zrozumienie zadania**
```
- Przeczytaj user story i acceptance criteria
- Zapytaj, jeśli coś jest niejasne (nie zgaduj!)
- Zidentyfikuj zależności (co musisz mieć przed startem?)
- Zidentyfikuj ryzyko (co może pójść nie tak?)
```

**Krok 2: Planowanie implementacji**
```
- Podziel zadanie na mniejsze kroki
- Określ kolejność realizacji
- Zidentyfikuj potrzebne komponenty/pliki
- Sprawdź, czy wystarczająco znasz technologię
```

**Krok 3: Setup środowiska**
```
- Utwórz branch (np. feature/WD-123-opis)
- Uruchom dev server (npm run dev)
- Upewnij się, że wszystko kompiluje
```

**Krok 4: Implementacja (TDD podejście - opcjonalne)**
```
1. Napisz test (jeśli to nowa logika)
2. Uruchom test (powinien paść)
3. Zaimplementuj funkcjonalność
4. Uruchom test (powinien przechodzić)
5. Refaktoryzuj (bez zmiany zachowania)
```

**Krok 5: Review własne**
```
- Uruchom linter (npm run lint)
- Uruchom type check (TypeScript)
- Przejrzyj kod (czy czysty? zgodny z guideline?)
- Testy manualne (działa tak jak trzeba?)
```

**Krok 6: Pull Request**
```
- Pchnij branch
- Otwórz PR z jasną treścią
- Przypisz reviewera (Lead Developer)
- Czekaj na feedback
```

### **3.2 Git Workflow

**Branching Strategy:**
```
main (chronione)        ← Production
  ↑
feature/WD-123-opis     ← Twoja praca
```

**Commit Messages:**
```
feat(word-card): add favorite toggle with animation

- Implemented heart scale animation using Framer Motion
- Added toast notification on toggle
- Updated localStorage immediately
- Added tests for toggle behavior

Fixes #123
```

**Commit Often:**
- Małe, logiczne commity
- Każdy commit powinien być w pełni funkcjonalny
- Nie commitować "WIP" czy "temp" (używaj branchy)

### **3.3 Code Review Response

**Kiedy dostajesz feedback:**
1. Przeczytaj wszystkie komentarze
2. Zrozum, co trzeba poprawić (jeśli niejasne - pytaj)
3. Zrób poprawki
4. Push do tego samego brancha
5. Powiadom reviewera (np. na Slacku)

**Nie zgadzasz się z review?**
- Zrozum perspektywę reviewera
- Wyjaśnij swoje podejście
- Dyskucja na poziomie technicznym
- Jeśli wciąż niezgoda - zaangażuj Lead Developera
- Ostatecznie: zrób jak mówi reviewer (jest częścią procesu)

---

## **4. Implementation Guidelines (Wytyczne Implementacyjne)

### **4.1 React Components

**Component Structure:**
```typescript
// ✅ Good: Single responsibility, typed props
interface WordCardProps {
  word: Word;
  onFavoriteToggle?: (wordId: number) => void;
}

const WordCard: React.FC<WordCardProps> = ({ word, onFavoriteToggle }) => {
  // Hooks at the top, consistent order
  const [isFavorite, setIsFavorite] = useState(false);
  const { toggleFavorite } = useContext(AppContext);
  
  // Event handlers
  const handleFavoriteClick = useCallback(() => {
    toggleFavorite(word.id);
    setIsFavorite(prev => !prev);
  }, [word.id, toggleFavorite]);
  
  // Effects
  useEffect(() => {
    // Cleanup if needed
    return () => {
      // Cleanup logic
    };
  }, []);
  
  // Derived data
  const isWordOfDay = word.id === getWordOfDayId();
  
  return (
    <Card className="word-card">
      {/* JSX */}
    </Card>
  );
};

export default WordCard;
```

**Do's and Don'ts:**

```typescript
// ✅ Good: Small, focused components
function WordHeader({ word }: { word: Word }) {
  return (
    <header>
      <h1>{word.word}</h1>
      <Badge>{word.partOfSpeech}</Badge>
    </header>
  );
}

// ✅ Good: Reusable hooks
function useWordOfDay() {
  const [word, setWord] = useState<Word | null>(null);
  
  useEffect(() => {
    const todayWord = calculateWordOfDay();
    setWord(todayWord);
  }, []);
  
  return word;
}

// ❌ Bad: God component
function BadWordCard() {
  // 500 lines of everything
  // State, logic, UI, side effects
  // No separation of concerns
}

// ❌ Bad: Inline styles (use Tailwind)
<div style={{ color: 'red', margin: '10px' }}>Bad</div>

// ❌ Bad: Direct DOM manipulation
useEffect(() => {
  document.getElementById('thing')?.click(); // Avoid
}, []);
```

### **4.2 State Management

**Context Usage:**
```typescript
// ✅ Good: Context for global state
const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// Use for: favorites, currentWord, settings
```

**Local State:**
```typescript
// ✅ Good: useState for UI state
function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  // Local state is fine for component-specific state
}
```

**Avoid Prop Drilling:**
```typescript
// ❌ Bad: Too many props
<WordCard 
  word={word}
  onFavorite={handleFavorite}
  onShare={handleShare}
  onEdit={handleEdit}
  isFavorite={isFavorite}
  user={user}
  settings={settings}
/>

// ✅ Good: Use Context for widely-used data
<WordCard word={word} />
// Inside WordCard:
const { toggleFavorite } = useAppContext();
```

### **4.3 TypeScript Best Practices

**Type Safety:**
```typescript
// ✅ Good: Exhaustive type checking
function handleCategory(category: Category) {
  switch (category) {
    case 'potoczne':
      return 'Potoczne';
    case 'historyczne':
      return 'Historyczne';
    case 'naukowe':
      return 'Naukowe';
    default:
      // TypeScript ensures this is unreachable if all cases covered
      const _exhaustiveCheck: never = category;
      return _exhaustiveCheck;
  }
}

// ✅ Good: Optional properties only when truly optional
interface Word {
  id: number;
  word: string;
  definition: string;
  examples: string[]; // Required - every word has examples
  etymology?: string; // Optional - might be missing
}

// ❌ Bad: Excessive optional properties
interface BadWord {
  id?: number;
  word?: string;
  definition?: string;
  // Makes it impossible to trust the type
}
```

**Generics:**
```typescript
// ✅ Good: Type-safe utilities
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Implementation
}

// ✅ Good: Constrain generics
function filterWords<T extends { id: number }>(
  words: T[],
  predicate: (word: T) => boolean
): T[] {
  return words.filter(predicate);
}
```

### **4.4 Performance Considerations

**Memoization:**
```typescript
// ✅ Good: Memoize expensive operations
const filteredWords = useMemo(() => {
  if (!searchTerm) return words;
  return words.filter(w => 
    w.word.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [words, searchTerm]);

// ✅ Good: Memoize callbacks
const handleFavorite = useCallback((wordId: number) => {
  toggleFavorite(wordId);
}, [toggleFavorite]);

// ✅ Good: Memoize components
const WordCardMemo = React.memo(WordCard);
```

**Avoid:**
```typescript
// ❌ Bad: Inline function in render (creates new reference each render)
<button onClick={() => handleClick(word.id)}>Click</button>

// ❌ Bad: Expensive calculation in render
const result = expensiveCalculation(data); // Runs on every render

// ❌ Bad: Unnecessary re-renders
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      {/* This re-renders even when only count changes */}
      <ExpensiveList items={items} />
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
    </div>
  );
}
```

### **4.5 Error Handling

**Graceful Degradation:**
```typescript
// ✅ Good: Handle errors gracefully
function WordDisplay() {
  const [word, setWord] = useState<Word | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    try {
      const data = loadWordData();
      setWord(data);
    } catch (err) {
      setError('Failed to load word data');
      console.error('Error loading word:', err);
    }
  }, []);
  
  if (error) {
    return <ErrorState message={error} />;
  }
  
  if (!word) {
    return <LoadingState />;
  }
  
  return <WordCard word={word} />;
}
```

**User Feedback:**
```typescript
// ✅ Good: Inform user of errors
const handleFavoriteToggle = async (wordId: number) => {
  try {
    await toggleFavorite(wordId);
    showToast('Added to favorites');
  } catch (err) {
    showToast('Failed to update favorites', 'error');
  }
};
```

### **4.6 Accessibility

**Semantic HTML:**
```typescript
// ✅ Good: Use semantic elements
<article className="word-card">
  <header>
    <h1>{word.word}</h1>
  </header>
  <section>
    <p>{word.definition}</p>
  </section>
</article>

// ❌ Bad: Div soup
<div className="word-card">
  <div className="header">
    <div className="title">{word.word}</div>
  </div>
</div>
```

**ARIA Labels:**
```typescript
// ✅ Good: Label icon buttons
<button 
  aria-label="Add to favorites"
  onClick={handleFavoriteToggle}
>
  <HeartIcon />
</button>

// ✅ Good: Live regions for dynamic content
<div aria-live="polite">
  {notification}
</div>
```

**Keyboard Navigation:**
```typescript
// ✅ Good: All interactive elements keyboard-accessible
<button onClick={handleClick}>Click me</button>

// ✅ Good: Focus management
useEffect(() => {
  if (isOpen) {
    modalRef.current?.focus();
  }
}, [isOpen]);
```

---

## **5. Testing Guidelines (Wytyczne Testowania)

### **5.1 What to Test

**Test These:**
- Component rendering with various props
- User interactions (clicks, input changes)
- State changes
- Async operations
- Edge cases (empty data, errors)
- Integration points (context, hooks)

**Don't Test:**
- Third-party library internals
- Implementation details
- Visual appearance (unless critical)
- Browser-specific behavior

### **5.2 Test Structure

**Component Test Example:**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import WordCard from './WordCard';

const mockWord: Word = {
  id: 1,
  word: 'Test',
  definition: 'Test definition',
  examples: ['Test example'],
  etymology: 'Test etymology',
  partOfSpeech: 'noun',
  category: 'test'
};

describe('WordCard', () => {
  it('should display word correctly', () => {
    render(<WordCard word={mockWord} />);
    
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText(/noun/i)).toBeInTheDocument();
    expect(screen.getByText(/Test definition/i)).toBeInTheDocument();
  });

  it('should handle favorite toggle', () => {
    const handleFavorite = vi.fn();
    render(<WordCard word={mockWord} onFavoriteToggle={handleFavorite} />);
    
    fireEvent.click(screen.getByLabelText(/Add to favorites/i));
    expect(handleFavorite).toHaveBeenCalledWith(1);
  });
});
```

**Hook Test Example:**
```typescript
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  it('should save and retrieve value', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );
    
    expect(result.current.value).toBe('initial');
    
    act(() => {
      result.current.setValue('updated');
    });
    
    expect(result.current.value).toBe('updated');
  });
});
```

### **5.3 Test Coverage Goals

**Minimum Coverage:**
- New components: 80%
- New hooks: 90%
- New utils: 85%
- Critical paths: 90%+

**Coverage Reports:**
```bash
# Run tests with coverage
npm run test -- --coverage

# View coverage report
open coverage/lcov-report/index.html
```

---

## **6. Code Quality Standards (Standardy Jakości Kodu)

### **6.1 ESLint Rules

**Must Follow:**
- No `console.log` in production code
- No unused variables
- No implicit any in TypeScript
- Consistent import order
- Proper error handling

**Auto-fixable:**
```bash
# Fix linting errors automatically
npm run lint -- --fix
```

### **6.2 Prettier Formatting

**Auto-format on Save:**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

**Prettier Config:**
- Single quotes for strings
- 2-space indentation
- Trailing commas (ES5)
- Print width: 100

### **6.3 Code Organization

**File Structure:**
```typescript
// ✅ Good: Logical grouping
import React from 'react';           // 1. External libs
import { useState } from 'react';    
import { motion } from 'framer-motion';

import WordCard from './WordCard';   // 2. Internal components
import { useWordOfDay } from './hooks'; // 3. Internal hooks

import './WordDisplay.css';          // 4. Styles
```

**Function Length:**
- Keep functions under 50 lines
- If longer, split into smaller functions
- One function = one responsibility

### **6.4 Naming Conventions

**Components:**
```typescript
// ✅ Good: PascalCase
WordCard
WordDisplay
FavoriteButton

// ❌ Bad: Inconsistent
wordCard
Word_Display
favorite_button
```

**Hooks:**
```typescript
// ✅ Good: camelCase with 'use' prefix
useWordOfDay
useLocalStorage
useFavorites

// ❌ Bad: Missing 'use'
wordOfDay
localStorage
```

**Variables/Functions:**
```typescript
// ✅ Good: camelCase, descriptive
const wordCount = 5;
const toggleFavorite = () => {};

// ❌ Bad: Unclear or wrong case
const cnt = 5;
const togglefav = () => {};
```

**Types/Interfaces:**
```typescript
// ✅ Good: PascalCase
interface Word {
  id: number;
}

type Category = 'potoczne' | 'naukowe';

// ❌ Bad: Wrong case
type word = { id: number }; // Should be Word
interface WORD { ... } // Should be Word
```

---

## **7. Development Environment (Środowisko Deweloperskie)

### **7.1 Local Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → Opens at http://localhost:5173

# Run tests
npm run test
# → Watch mode, runs on file changes

# Lint code
npm run lint
# → Shows linting errors

# Type check
npx tsc --noEmit
# → TypeScript validation

# Build for production
npm run build
# → Output in dist/ folder
```

### **7.2 VS Code Setup (Recommended)

**Extensions:**
```
- ESLint
- Prettier
- TypeScript Vue Plugin
- GitLens
- Auto Rename Tag

**Settings:**
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

### **7.3 Debugging

**React DevTools:**
- Inspect component tree
- View props and state
- Check hooks values

**Browser DevTools:**
- Console for errors
- Network tab for API calls
- Performance profiling

**VS Code Debugger:**
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-chrome",
      "request": "launch",
      "name": "Debug App",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

---

## **8. Common Patterns (Wzorce Projektowe)

### **8.1 Custom Hooks

**Pattern: Data Fetching**
```typescript
function useWordData(wordId: number) {
  const [data, setData] = useState<Word | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      try {
        const result = await fetchWord(wordId);
        if (mounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      mounted = false;
    };
  }, [wordId]);
  
  return { data, loading, error };
}
```

### **8.2 Component Composition

**Pattern: Compound Components**
```typescript
const WordCard = {
  Header: WordCardHeader,
  Body: WordCardBody,
  Actions: WordCardActions,
} as const;

// Usage:
<WordCard>
  <WordCard.Header word={word} />
  <WordCard.Body definition={word.definition} />
  <WordCard.Actions word={word} />
</WordCard>
```

### **8.3 State Machines

**Pattern: Finite State Machine**
```typescript
type State = 'idle' | 'loading' | 'success' | 'error';
type Action = 'FETCH' | 'RESOLVE' | 'REJECT' | 'RETRY';

function reducer(state: State, action: Action): State {
  switch (state) {
    case 'idle':
      return action === 'FETCH' ? 'loading' : state;
    case 'loading':
      return action === 'RESOLVE' ? 'success' : 'error';
    case 'error':
      return action === 'RETRY' ? 'loading' : state;
    default:
      return state;
  }
}
```

---

## **9. Performance Optimization (Optymalizacja Wydajności)

### **9.1 Rendering Optimization

**React.memo:**
```typescript
// ✅ Good: Memoize expensive components
const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});

// Will only re-render when items change
```

**useMemo:**
```typescript
// ✅ Good: Memoize expensive calculations
const sortedWords = useMemo(() => {
  return [...words].sort((a, b) => 
    a.word.localeCompare(b.word)
  );
}, [words]);
```

**useCallback:**
```typescript
// ✅ Good: Memoize callbacks
const handleSave = useCallback(() => {
  saveData(data);
}, [data]);
```

### **9.2 Bundle Optimization

**Code Splitting:**
```typescript
// ✅ Good: Route-based splitting
const Home = lazy(() => import('./pages/Home'));
const Archive = lazy(() => import('./pages/Archive'));

function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </Suspense>
  );
}
```

**Dynamic Imports:**
```typescript
// ✅ Good: Import heavy libraries only when needed
async function loadHeavyLibrary() {
  const { heavyFunction } = await import('heavy-library');
  return heavyFunction();
}
```

### **9.3 Memory Management

**Cleanup:**
```typescript
useEffect(() => {
  const subscription = eventBus.subscribe('event', handler);
  
  return () => {
    subscription.unsubscribe(); // Prevent memory leaks
  };
}, []);
```

---

## **10. Documentation Requirements (Wymogi Dokumentacji)

### **10.1 JSDoc for Functions

```typescript
/**
 * Calculates the word of the day based on start date
 * @param {Word[]} words - Array of all available words
 * @param {Date} startDate - Start date for word rotation (2026-04-13)
 * @returns {Word|null} Today's word or null if out of range
 * @example
 * const word = getWordOfDay(words, new Date('2026-04-13'));
 */
export function getWordOfDay(words: Word[], startDate: Date): Word | null {
  // Implementation
}
```

**JSDoc Rules:**
- [ ] All exported functions must have JSDoc
- [ ] All parameters must be documented with `@param`
- [ ] Return value must be documented with `@returns`
- [ ] Include `@example` for complex functions
- [ ] Use proper TypeScript types in JSDoc

### **10.2 Component Documentation

```typescript
/**
 * WordCard - Displays a single word with full details
 * 
 * @component
 * @param {WordCardProps} props - Component props
 * @param {Word} props.word - The word to display
 * @param {Function} [props.onFavoriteToggle] - Callback for favorite toggle
 * @returns {JSX.Element} Rendered word card
 * 
 * @example
 * <WordCard 
 *   word={word} 
 *   onFavoriteToggle={handleFavoriteToggle}
 * />
 */
```

### **10.3 Complex Logic Comments

```typescript
// Calculate days elapsed since start date
// Using UTC to avoid timezone issues
// Floor ensures we get complete days
const daysElapsed = Math.floor(
  (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
);

// If daysElapsed is negative (before start date), use first word
// If daysElapsed exceeds word count, return null (no more words)
```

**Commenting Guidelines:**
- [ ] Explain **why**, not what (code should be self-explanatory)
- [ ] Document complex algorithms
- [ ] Note edge cases and assumptions
- [ ] Mark TODOs and FIXMEs
- [ ] Avoid redundant comments

---

## **11. Error Handling Best Practices

### **11.1 Error Boundaries

```typescript
// ErrorBoundary.tsx
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Usage:
<ErrorBoundary fallback={<ErrorScreen />}>
  <WordCard word={word} />
</ErrorBoundary>
```

### **11.2 Graceful Error States

```typescript
function WordDisplay() {
  const [word, setWord] = useState<Word | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWord = async () => {
      try {
        setLoading(true);
        const data = await fetchWordOfDay();
        setWord(data);
      } catch (err) {
        setError('Failed to load word. Please try again.');
        logError(err);
      } finally {
        setLoading(false);
      }
    };

    loadWord();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} onRetry={loadWord} />;
  if (!word) return <EmptyState message="No word available" />;
  
  return <WordCard word={word} />;
}
```

---

## **12. Internationalization (i18n) Considerations

Even though this is Polish-only now, plan for future expansion:

```typescript
// ❌ Bad: Hardcoded strings
<h1>Słowo Dnia</h1>

// ✅ Good: Use translation keys
<h1>{t('app.title')}</h1>

// Translation file
const pl = {
  app: {
    title: 'Słowo Dnia',
  },
};
```

**Recommendation:** Use react-i18next or similar library from the start.

---

## **13. Web Vitals Optimization

### **13.1 Core Web Vitals Targets

| Metric | Target | Impact |
|--------|--------|--------|
| LCP | < 2.5s | User sees content quickly |
| FID | < 100ms | Interactions feel instant |
| CLS | < 0.1 | No layout shifts |
| TTFB | < 800ms | Server responds fast |

### **13.2 Optimization Techniques

```typescript
// Preload critical resources
<link rel="preload" href="/font.woff2" as="font" type="font/woff2" crossOrigin />

// Lazy load non-critical components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Optimize images (if added later)
<img 
  src="image.webp" 
  loading="lazy" 
  decoding="async"
  width={800}
  height={600}
/>

// Minimize main thread work
useMemo(() => expensiveCalculation(data), [data]);
```

---

## **14. Code Review Checklist for Developers

Before submitting PR, verify:

### **Pre-Submit Checklist**
- [ ] All tests pass locally
- [ ] Code coverage ≥ 80% for new code
- [ ] No ESLint errors or warnings
- [ ] TypeScript compiles without errors
- [ ] Bundle size hasn't increased unexpectedly
- [ ] No console.log in production code
- [ ] All new functions have JSDoc
- [ ] Complex logic is commented
- [ ] Accessibility attributes are present
- [ ] Error handling is implemented
- [ ] Loading states are handled
- [ ] Edge cases are covered

### **PR Description Template**
```markdown
## Description
[Brief summary of changes]

## Related Issue
Closes #XXX

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Refactoring
- [ ] Documentation
- [ ] Testing

## Changes Made
- [List of changes]

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Edge cases tested

## Screenshots (if UI changes)
[Attach screenshots]

## Notes
[Any additional information]
```

---

## **15. Performance Monitoring

### **15.1 Bundle Analysis

```bash
# Install bundle analyzer
npm install --save-dev source-map-explorer

# Add to package.json
"scripts": {
  "analyze": "source-map-explorer 'build/static/js/*.js'"
}

# Run analysis
npm run build
npm run analyze
```

### **15.2 Runtime Performance

```typescript
// Measure component render time
const useRenderTime = (componentName: string) => {
  useEffect(() => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      console.log(`${componentName} render: ${(end - start).toFixed(2)}ms`);
    };
  });
};

// Usage
useRenderTime('WordCard');
```

### **15.3 User Timing API

```typescript
// Mark important milestones
performance.mark('word-loading-start');

// ...load word...

performance.mark('word-loading-end');
performance.measure(
  'Word Loading',
  'word-loading-start',
  'word-loading-end'
);

// Get measurements
const measures = performance.getEntriesByName('Word Loading');
console.log(`Word loaded in ${measures[0].duration}ms`);
```

---

## **16. Development Best Practices

### **16.1 Git Workflow

```bash
# Start new feature
git checkout -b feature/WD-123-add-feature

# Commit often with clear messages
git commit -m "feat: add favorite toggle button"

# Push to remote
git push origin feature/WD-123-add-feature

# Create PR on GitHub
```

**Commit Message Convention:**
```
type(scope): description

[optional body]

[optional footer(s)]

Types: feat, fix, docs, style, refactor, test, chore
```

### **16.2 Code Organization

```
src/
├── components/          # Reusable UI components
│   ├── common/          # Low-level (Button, Input)
│   ├── layout/          # Layout components (Header, Footer)
│   └── WordCard.jsx     # Feature-specific components
├── pages/               # Page components
│   ├── Home.jsx
│   ├── Archive.jsx
│   └── Favorites.jsx
├── hooks/               # Custom hooks
│   ├── useWordOfDay.js
│   ├── useFavorites.js
│   └── useLocalStorage.js
├── context/             # State management
│   ├── AppContext.jsx
│   └── components/
├── utils/               # Utility functions
│   └── helpers.js
└── styles/              # Global styles
```

### **16.3 Naming Conventions

```typescript
// Components: PascalCase
WordCard
FavoriteButton

// Hooks: camelCase with 'use' prefix
useWordOfDay
useLocalStorage

// Props interfaces: PascalCase ending with Props
interface WordCardProps {}

// Event handlers: handle + EventName
handleClick
handleFavoriteToggle

// State variables: descriptive
word, words, isLoading, error

// Boolean state prefix: is, has, should
isFavorite, hasError, shouldShow
```

---

## **17. Debugging Guide

### **17.1 Common Issues

| Issue | Solution |
|-------|----------|
| Component not re-rendering | Check dependency arrays in hooks |
| Infinite loop in useEffect | Verify dependencies, add cleanup |
| State not updating | Check if state is immutable |
| TypeScript errors | Verify types, check imports |
| Styles not applying | Check CSS modules, specificity |

### **17.2 Debugging Tools

**React DevTools:**
- Inspect component tree
- View props and state
- Check hooks values
- Profile performance

**Browser DevTools:**
- Console for logs/errors
- Network tab for API calls
- Performance tab for profiling
- Memory tab for leaks

**VS Code Debugger:**
- Set breakpoints
- Step through code
- Inspect variables
- Debug Node.js code

---

## **18. Resources

### **18.1 Documentation

- [React Docs](https://react.dev)
- [TypeScript Docs](https://typescriptlang.org)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://framer.com/motion)

### **18.2 Team Conventions

- Code Review: https://github.com/org/slowo-dnia/wiki/Code-Review
- Architecture: https://github.com/org/slowo-dnia/wiki/Architecture
- Testing: https://github.com/org/slowo-dnia/wiki/Testing
- Deployment: https://github.com/org/slowo-dnia/wiki/Deployment

---

## **19. Instrukcja dla Agentów (System Prompt)

> Kiedy wywołasz `WF_Developer`, Twoim celem jest:
> 1. Zrozumieć wymagania i architekturę
> 2. Zaimplementować funkcje zgodnie ze standardami
> 3. Napisać testy dla nowego kodu
> 4. Upewnić się, że kod jest czysty i czytelny
> 5. Dodać odpowiednią dokumentację
> 6. Zoptymalizować pod kątem wydajności
> 7. Zapewnić dostępność (a11y)
> 8. Obsłużyć przypadki brzegowe i błędy
> 
> 

---

## **20. Definition of Done (Developer)

- [ ] Kod zgodny z architekturą i konwencjami
- [ ] Błędów kompilacji TypeScript 0
- [ ] ESLint bez ostrzeżeń/ błędów
- [ ] Formatowanie zgodne z Prettier
- [ ] Testy jednostkowe (coverage ≥ 80%)
- [ ] Testy komponentowe (jeśli dotyczy)
- [ ] Brak błędów w konsoli
- [ ] Responsive design działa
- [ ] Obsługa błędów zaimplementowana
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] JSDoc dla nowego kodu
- [ ] Dokumentacja zaktualizowana
- [ ] Code review zaakceptowane
- [ ] Performance zoptymalizowana
- [ ] Brak wycieków pamięci
- [ ] Kompatybilność przeglądarek

---

_Created by Developer Agent_  
_Last updated: 2026-04-30_
