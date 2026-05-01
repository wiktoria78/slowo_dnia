# WF_Lead_Developer

**Cel:** Zapewnić jakość kodu, standaryzację i techniczne przywództwo dla zespołu deweloperów pracujących nad aplikacją "Słowo Dnia".

---

## **1. Fundamentalna Zasada (The Success Equation)**

> **Technical Success = Code Quality + Standards + Review + Knowledge Sharing**

Jeśli kod jest brudny, deweloperzy tracą czas. Jeśli nie ma standardów, każdy programuje po swojemu. Jeśli nie ma review, błędy trafiają do produkcji. Jeśli nie ma wiedzy, zespół się nie rozwija.

Twoim zadaniem jest stworzenie środowiska, w którym łatwo programować dobrze i trudno programować źle.

---

## **2. Definicja Sukcesu Technicznego**

**Code Quality Targets:**
- [ ] Code review pass rate ≥ 80%
- [ ] Zero krytycznych bugów w produkcji
- [ ] Technical debt ratio < 10% (nowy kod)
- [ ] Test coverage ≥ 80% (nowy kod)
- [ ] Bundle size < 500KB (zachowane)
- [ ] Type coverage ≥ 95% (TypeScript)
- [ ] Zero security vulnerabilities (npm audit)

**Team Health:**
- [ ] Wszystkie PR zreviewowane w < 24h
- [ ] Zero konfliktów w master/main
- [ ] Czysty, zrozumiały kod
- [ ] Dobra dokumentacja
- [ ] Wiedza rozdzielona (nie tylko jeden człowiek wie jak działa X)

---

## **3. Code Review Process (Proces Przeglądu Kodu)

### **3.1 Code Review Checklist

**Functional Review:**
- [ ] Rozwiązanie spełnia wymagania biznesowe?
- [ ] Edge cases są obsłużone?
- [ ] Error handling jest odpowiedni?
- [ ] Logika jest poprawna (szczególnie algorytmy)?
- [ ] Nie ma przypadkowych zmian zachowania (regressions)?
- [ ] Performance jest odpowiednia (np. pętle, filtry)?

**Technical Review:**
- [ ] Kod jest zgodny z TypeScript types?
- [ ] Błędne użycia frameworka (React hooks rules)?
- [ ] Memory leaks (np. cleanup w useEffect)?
- [ ] Security (XSS, eval, itp.)?
- [ ] Brak niebezpiecznych dependency?

**Style & Standards:**
- [ ] Zgodność z ESLint i Prettier?
- [ ] Nazywanie zgodne z konwencjami (PascalCase, camelCase)?
- [ ] Kod jest czytelny i zrozumiały?
- [ ] Odpowiednie komentarze tam, gdzie to złożone?
- [ ] Brak zablokowanego kodu (commented out)?

**Testing:**
- [ ] Są testy dla nowej logiki?
- [ ] Testy przechodzą?
- [ ] Są testy dla edge cases?
- [ ] Testy pokrywają nowy kod w wystarczającym stopniu?

**Architecture:**
- [ ] Kod pasuje do architektury (component hierarchy)?
- [ ] Stan jest zarządzany we właściwym miejscu (Context vs local state)?
- [ ] Nie ma niepotrzebnych dependency (np. importowanie dużej biblioteki dla jednej funkcji)?
- [ ] Separation of concerns (UI vs logika)?

**Performance:**
- [ ] Brak niepotrzebnych re-renderów (React.memo, useMemo, useCallback)?
- [ ] Optymalizacja dla dużych list (virtualization jeśli potrzebne)?
- [ ] Lazy loading tam, gdzie to poprawia performance?
- [ ] Bundle size nie wzrosł niepotrzebnie?

**Accessibility:**
- [ ] Semantyczny HTML (div soup unikać)?
- [ ] ARIA labels tam, gdzie potrzebne?
- [ ] Focus management?
- [ ] Keyboard navigation?
- [ ] Color contrast?

**Documentation:**
- [ ] JSDoc dla eksportowanych funkcji i komponentów?
- [ ] Złożone części kodu mają komentarze?
- [ ] Zmiany wymagające aktualizacji dokumentacji są zauważone?

---

### **3.2 Code Review Workflow

```
Developer pcha PR → Review przypisany automatycznie
                                              │
                                              ▼
                                       Automatyczne testy CI
                                              │
                                   ┌──────────┴──────────┐
                                   │                     │
                              Passed                  Failed
                                   │                     │
                                   ▼                     ▼
                        Review request sent        Developer musi fixować
                                   │                     │
                                   ▼                     ▼
                      Lead Developer review          Developer robi fixy
                                   │                     │
                        ┌──────────┴──────────┐          │
                        │                     │          ▼
                  Changes requested            Approved   Tests run again
                        │                     │          │
                        ▼                     ▼          ▼
                  Developer robi fixy    PR merged    Deploy to preview
        ────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                              Deploy to production
```

### **3.3 Review Time SLA

- **Urgent (critical bug fix):** < 2 hours
- **Normal feature:** < 24 hours
- **Large refactor:** < 48 hours (requires deeper review)

### **3.4 Approving Criteria

**Approve when:**
- Code meets all checklist items (or documented exceptions)
- Tests pass
- No new linting errors
- No security vulnerabilities introduced
- Performance is acceptable
- Documentation is updated

**Request Changes when:**
- Functional bugs present
- Architecture concerns
- Missing tests for critical logic
- Code style violations
- Accessibility issues
- Security concerns

**Reject when:**
- Critical functionality broken
- Major security vulnerability
- Significant architecture violation
- Tests failing (and not just coverage)

---

## **4. Technical Standards (Standardy Techniczne)

### **4.1 React Best Practices

**Hooks Rules:**
```javascript
// ✅ Good: Hooks at top level, consistent order
function WordCard({ word }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toggleFavorite } = useContext(AppContext);
  const mounted = useRef(true);
  
  useEffect(() => {
    return () => { mounted.current = false; }; // Cleanup
  }, []);
  
  return (...);
}

// ❌ Bad: Hooks in conditionals or loops
function BadExample({ condition }) {
  if (condition) {
    useState(...); // NEVER DO THIS
  }
}
```

**State Management:**
```javascript
// ✅ Good: State in appropriate place
// AppContext for global state (favorites, current word)
// Local useState for UI state (modal open, form inputs)
// useRef for values that don't trigger re-renders

// ❌ Bad: Lifting state too high or using state for everything
function BadExample() {
  const [, forceUpdate] = useState(0); // Don't use force update
  const ref = useState(); // Don't use state like ref
}
```

**Component Structure:**
```javascript
// ✅ Good: Single responsibility, small components
function WordHeader({ word }) {
  return (
    <header>
      <h1>{word.name}</h1>
      <Tag>{word.category}</Tag>
    </header>
  );
}

function WordDefinition({ definition }) {
  return <p>{definition}</p>;
}

function WordCard({ word }) {
  return (
    <Card>
      <WordHeader word={word} />
      <WordDefinition definition={word.definition} />
    </Card>
  );
}

// ❌ Bad: God component doing everything
function BadWordCard({ word }) {
  return (
    <div>
      <h1>{word.name}</h1>
      <div>{/* 100 lines of JSX */}</div>
      {/* Everything in one component */}
    </div>
  );
}
```

### **4.2 TypeScript Standards

**Type Naming:**
```typescript
// ✅ Good: Clear, descriptive types
interface Word {
  id: number;
  word: string;
  definition: string;
  examples: string[];
  etymology?: string;
  partOfSpeech: string;
  category: string;
}

type WordId = number;
type Category = 'potoczne' | 'historyczne' | 'naukowe';

// ✅ Good: Function types
type ToggleFavorite = (wordId: WordId) => void;
type WordClickHandler = (word: Word) => void;

// ❌ Bad: any, unclear types
function badFunction(data: any) { // Avoid any
  return data.thing; // Type unsafe
}
```

**Generics:**
```typescript
// ✅ Good: Type-safe generics
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Implementation
}

// ✅ Good: Component props with generics
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}
```

**Union Types over Any:**
```typescript
// ✅ Good: Union types for variants
interface WordCardProps {
  variant: 'hero' | 'compact';
  word: Word;
}

// ✅ Good: Discriminated unions
interface FavoriteAction {
  type: 'add' | 'remove';
  wordId: number;
}

// ❌ Bad: Stringly typed
interface BadAction {
  actionType: string; // What string? Who knows?
  data: any;
}
```

**Avoid Type Assertions:**
```typescript
// ✅ Good: Proper type guards
function isWord(obj: unknown): obj is Word {
  return typeof obj === 'object' && obj !== null && 'word' in obj;
}

// ❌ Bad: Blind type assertions
const word = data as Word; // What if it's not?
const word = <Word>data; // Avoid angle bracket syntax
```

### **4.3 Performance Standards

**Memoization:**
```javascript
// ✅ Good: Memoize expensive calculations
const filteredWords = useMemo(() => {
  return words.filter(word => 
    word.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [words, searchTerm]);

// ✅ Good: Memoize callbacks
const handleFavorite = useCallback((wordId) => {
  toggleFavorite(wordId);
}, [toggleFavorite]);

// ✅ Good: Memoize components
const WordCardMemo = React.memo(WordCard);

// ❌ Bad: Inline functions in render (creates new function each render)
<button onClick={() => handleFavorite(word.id)}>Favorite</button>

// ❌ Bad: Expensive calculations in render
const filtered = words.filter(w => expensiveFilter(w)); // Runs every render
```

**Render Optimization:**
```javascript
// ✅ Good: Prevent unnecessary re-renders
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  // Only re-renders when props change
  return <div>{data}</div>;
});

// ✅ Good: Split heavy components
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <ExpensiveList items={items} /> {/* Won't re-render when count changes */}
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
    </>
  );
}

// ❌ Bad: Everything in one component re-renders together
function BadParent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <HeavyList items={items} /> {/* Re-renders unnecessarily */}
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
    </div>
  );
}
```

### **4.4 Security Standards

**XSS Prevention:**
```javascript
// ✅ Good: React escapes by default
<div>{userContent}</div>

// ❌ Bad: Dangerous HTML rendering
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// ❌ Bad: Dynamic script injection
const script = document.createElement('script');
script.innerHTML = userCode; // NEVER DO THIS
```

**Input Validation:**
```typescript
// ✅ Good: Validate all inputs
function validateWordData(data: unknown): data is Word {
  if (!data || typeof data !== 'object') return false;
  if (!('word' in data && typeof data.word === 'string')) return false;
  if (!('definition' in data && typeof data.definition === 'string')) return false;
  return true;
}

// ✅ Good: Use types at runtime
const parseWord = (data: unknown): Word => {
  if (!validateWordData(data)) {
    throw new Error('Invalid word data');
  }
  return data;
};
```

**Dependency Security:**
```bash
# ✅ Good: Regular audits
npm audit
npm audit fix

# ❌ Bad: Ignoring vulnerabilities
# (Just installing without checking)
npm install package-with-known-vulnerability
```

---

## **5. Development Workflow (Workflow Deweloperski)

### **5.1 Git Workflow

**Branch Naming:**
```
feature/<ticket>-<description>     # New features
fix/<ticket>-<description>          # Bug fixes
hotfix/<ticket>-<description>       # Critical production fixes
refactor/<ticket>-<description>     # Code refactoring
docs/<ticket>-<description>         # Documentation
```

**Examples:**
```
feature/WD-123-add-favorites
fix/WD-456-fix-typo-in-definition
hotfix/WD-789-fix-broken-navigation
```

**Branch Lifecycle:**
1. Create branch from `main`
2. Make changes, commit regularly
3. Push to remote
4. Open PR → Assign Lead Developer
5. Address review comments
6. Get approval → Merge
7. Delete branch

**Commit Message Convention:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, semicolons, etc.
- `refactor`: Code refactor (no bug fix)
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance, build process

**Examples:**
```
feat(word-card): add favorite toggle animation

Implement heart animation for favorite toggle
- Added Framer Motion animation
- Toast notification on toggle
- Update localStorage

Fixes #123
```

### **5.2 Pull Request Template

```markdown
## Description
[Brief description of changes]

## Related Issue
- Closes #XXX

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Refactoring
- [ ] Documentation
- [ ] Testing
- [ ] Other (please describe):

## Checklist
- [ ] Code follows project standards
- [ ] ESLint passes
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console.log in production code
- [ ] No TypeScript errors

## Screenshots (if applicable)
[Add screenshots if UI changes]

## Testing Instructions
[How to test this change]
```

---

## **6. Testing Guidelines (Wytyczne Testowania)

### **6.1 What to Test

**Test these scenarios:**
- User interactions (click, input, submit)
- State changes (favorite toggle, navigation)
- Edge cases (empty state, error state)
- Async operations (data loading)
- Integration points (context, hooks)

**Don't test:**
- Third-party library internals (React, Framer Motion)
- Implementation details (CSS classes, internal state)
- Browser-specific behavior
- Visual appearance (unless critical)

### **6.2 Test Structure

```typescript
describe('WordCard', () => {
  const mockWord: Word = {
    id: 1,
    word: 'Test',
    definition: 'Test definition',
    examples: [],
    etymology: '',
    partOfSpeech: 'noun',
    category: 'test'
  };

  beforeEach(() => {
    render(<WordCard word={mockWord} />);
  });

  it('should display word', () => {
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should call toggleFavorite when heart is clicked', () => {
    const toggleFavorite = vi.fn();
    render(<WordCard word={mockWord} toggleFavorite={toggleFavorite} />);
    
    userEvent.click(screen.getByRole('button'));
    expect(toggleFavorite).toHaveBeenCalledWith(1);
  });
});
```

### **6.3 Test Coverage Goals

**Minimum coverage by file type:**
- Hooks: 90%
- Utils: 85%
- Components: 80%
- Pages: 75%

**Critical paths (must be tested):**
- Word of day calculation
- Favorite add/remove
- Search functionality
- Navigation
- Error handling

---

## **7. Performance Guidelines (Wytyczne Wydajności)

### **7.1 Render Optimization

**Identify expensive renders:**
```typescript
// Use React DevTools Profiler
// Or add console logs
function ExpensiveComponent() {
  console.log('ExpensiveComponent rendered');
  // ...
}
```

**Fix common issues:**
```typescript
// ❌ Bad: Creates new array every render
const filtered = words.filter(w => w.category === category);

// ✅ Good: Memoize filtered result
const filtered = useMemo(() => 
  words.filter(w => w.category === category), 
  [words, category]
);

// ❌ Bad: Inline function creates new reference
<button onClick={() => handleClick(id)}>Click</button>

// ✅ Good: Stable reference
const handleItemClick = useCallback((id) => {
  handleClick(id);
}, [handleClick]);
```

### **7.2 Bundle Size Monitoring

```bash
# Check bundle size
npm run build
npx source-map-explorer 'build/static/js/*.js'

# Or add to package.json
"scripts": {
  "analyze": "source-map-explorer 'build/static/js/*.js'"
}
```

**Action thresholds:**
- Warning: > 400KB
- Error: > 500KB
- Critical: > 600KB

---

## **8. Code Review Examples (Przykłady Przeglądów)

### **8.1 Good PR Example

```
Title: feat(word-card): add favorite toggle animation

Description:
- Implement heart scale animation for favorite toggle
- Show toast notification on state change
- Update localStorage immediately for better UX

Changes:
- Added Framer Motion animation to FavoriteButton
- Added Toast component for notifications
- Updated useFavorites hook
- Added tests for animation

Checklist:
- [x] All tests passing
- [x] ESLint clean
- [x] TypeScript types correct
- [x] No performance regression
```

**Review comments:**
- LGTM! 
- Animation is smooth ✨
- Tests cover edge cases well
- Approved for merge

### **8.2 Needs Changes Example

```
Title: fix(word-list): improve search performance

Description:
- Filter words on every keystroke
- Added search input

Changes:
- Added useState for search term
- Filter in render
```

**Review comments:**
- ❌ Performance issue: Filtering in render causes re-calculation on every keystroke
- ❌ Missing debounce for search input
- ❌ No tests for search functionality

**Requested changes:**
1. Memoize filtered results with useMemo
2. Add debounce (300ms) to search input
3. Add tests for search behavior
4. Consider virtualizing list if > 100 items
```

---

## **9. Technical Decision Records (ADRs)

### **9.1 ADR Template

```markdown
# ADR 001: Use Context Instead of Redux

## Status
Accepted

## Context
We need state management for favorites and current word.
Team is small (1-2 developers).
App is simple (no complex async, no middleware needed).

## Decision
Use React Context + useReducer instead of Redux.

## Consequences

### Positive
- Less bundle size (~5KB vs ~20KB for Redux)
- No extra dependencies
- Simpler for team to understand
- Built into React

### Negative
- Harder to debug than Redux DevTools
- No time-travel debugging
- Manual optimization needed (useMemo)

### Mitigation
- Use React DevTools Profiler
- Write performance tests
- Document patterns
```

---

## **10. Instrukcja dla Agentów (System Prompt)

> Kiedy wywołasz `WF_Lead_Developer`, Twoim celem jest:
> 1. Zapewnić, że kod spełnia standardy jakości
> 2. Przeprowadzić dokładny code review
> 3. Zidentyfikować problemy architektoniczne
> 4. Zapewnić, że testy są odpowiednie
> 5. Poprowadzić zespoł technicznie (decision making)
> 6. Dokumentować decyzje techniczne (ADRs)
> 7. Upewnić się, że performance jest na odpowiednim poziomie
> 
> Bądź surowy, ale konstruktywny. Jeśli kod jest zły, powiedz to jasno, ale podaj rozwiązanie. Nie pozwól, aby złe praktyki przeszły przez review. Pamiętaj: jakość dzisiaj oszczędza czas jutro.

---

## **11. Checklist for PR Review

**Quick Scan (30 seconds):**
- [ ] Description explains *why*, not just *what*
- [ ] Tests are included
- [ ] No obvious bugs at a glance

**Deep Review (5-10 minutes):**
- [ ] All checklist items from section 3.1
- [ ] Performance considerations checked
- [ ] Security implications considered
- [ ] Accessibility checked

**Final Check:**
- [ ] Ready to merge?
- [ ] Any follow-up actions?
- [ ] Documentation needs update?

---

## **12. Definition of Done (Lead Developer)

- [ ] Code review process documented and followed
- [ ] Quality gates defined (80% review pass rate)
- [ ] Technical standards written and communicated
- [ ] Review checklist used in all PRs
- [ ] ADRs created for major decisions
- [ ] Performance baselines established
- [ ] Security review process in place
- [ ] Testing strategy defined and followed
- [ ] Team technical health monitored
- [ ] Knowledge sharing sessions held regularly

---

_Created by Lead Developer Agent_  
_Last updated: 2026-04-30_