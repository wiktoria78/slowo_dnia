# WF_Tester

**Cel:** Zapewnić jakość aplikacji poprzez testowanie funkcjonalności, wydajności i zgodności z wymaganiami dla "Słowo Dnia".

---

## **1. Fundamentalna Zasada (The Success Equation)**

> **Testing Success = Coverage + Reliability + Early Detection + User Perspective**

Jeśli to nie zostało przetestowane, nie działa. Jeśli testy są słabe, błędy trafiają do użytkowników. Jeśli testujemy za późno, koszty rosną. Jeśli testujemy tylko maszynowo, tracimy perspektywę użytkownika.

Twoim zadaniem jest łapanie błędów zanim użytkownik ich zauważy.

---

## **2. Definicja Sukcesu Testowania**

**Quality Targets:**
- [ ] Test coverage ≥ 80% dla nowego kodu
- [ ] Zero krytycznych bugów w produkcji
- [ ] Wszystkie testy przechodzą (100% green)
- [ ] Brak regresji w funkcjach istniejących
- [ ] Testy wykrywają 95% wprowadzonych błędów
- [ ] Średni czas naprawy bug-a < 4h

**Release Criteria:**
- [ ] Testy jednostkowe: Pass
- [ ] Testy komponentów: Pass
- [ ] Testy integracyjne: Pass
- [ ] Testy e2e (critical paths): Pass
- [ ] Code review: Approved
- [ ] Zero blockerów otwartych

---

## **3. Test Strategy (Strategia Testowania)

### **3.1 Testing Pyramid

```
          /
         / E2E (5-10 tests)
        /
       / Integration (10-20 tests)
      /
     / Component (50-100 tests)
    /
   / Unit (100+ tests)
  /
```

**Rationale:**
- Unit tests: Fast, isolated, cheap (run on every save)
- Component tests: Medium speed, test React components (run on PR)
- Integration tests: Slower, test flows (run on PR + main)
- E2E tests: Slow, expensive, critical paths only (run nightly + deploy)

### **3.2 Test Types

**Unit Tests:**
- Test isolated functions and hooks
- Mock all dependencies
- Fast execution (< 100ms per test)
- Examples: useLocalStorage, word calculation logic

**Component Tests:**
- Test React components in isolation
- Use React Testing Library
- Mock external dependencies
- Test user interactions
- Examples: WordCard rendering, button clicks

**Integration Tests:**
- Test component + hook integration
- Test multiple components working together
- Limited mocks
- Examples: Favorites flow, navigation

**E2E Tests:**
- Test complete user journeys
- Use Playwright/Cypress
- Test on real browser
- Examples: Full flow from landing to favorite

---

## **4. Test Environment (Środowisko Testowe)

### **4.1 Tools Stack

**Unit & Component Tests:**
- **Vitest**: Test runner (fast, Vite-native)
- **React Testing Library**: Component testing
- **jsdom**: DOM simulation
- **MSW**: Mock Service Worker (API mocking)

**E2E Tests:**
- **Playwright**: Cross-browser testing
- **Chromium, Firefox, WebKit**: Browser engines

**Code Coverage:**
- **Vitest coverage**: Built-in coverage reports
- **Istanbul**: Coverage instrumentation

**Visual Regression:**
- **Chromatic**: Visual testing (optional)

### **4.2 Test Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
```

---

## **5. Test Data (Dane Testowe)

### **5.1 Mock Words Data

```typescript
// src/__mocks__/words.ts
export const mockWords: Word[] = [
  {
    id: 1,
    word: 'Sercecze',
    definition: 'Rzecz potoczna, karczmowa, często taniej jakości.',
    examples: [
      'Zrobiliśmy z tego takie sercecze, że ledwo można było je przełknąć.'
    ],
    etymology: 'Od słowa "serce" - kształt przypominał serce.',
    partOfSpeech: 'rzeczownik',
    category: 'potoczne',
    synonyms: ['taniocha', 'bajzel', 'gniot']
  },
  {
    id: 2,
    word: 'Miłość',
    definition: 'Czucie wyższe, zmysłowe, oparte na sympatii.',
    examples: [
      'Miłość wszystko wybacza.'
    ],
    etymology: 'Od staropolskiego "miłować"',
    partOfSpeech: 'rzeczownik',
    category: 'emocje',
    synonyms: ['skrucha', 'uczucie', 'sympatia']
  }
];

export const mockWord = mockWords[0];
```

### **5.2 Test Utilities

```typescript
// src/test-utils.tsx
import { render } from '@testing-library/react';
import { AppProvider } from './context/AppContext';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

---

## **6. Unit Testing (Testy Jednostkowe)

### **6.1 Hook Tests

**useLocalStorage Test:**
```typescript
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial value when no value in localStorage', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );
    
    expect(result.current.value).toBe('initial');
  });

  it('should save value to localStorage', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );
    
    act(() => {
      result.current.setValue('updated');
    });
    
    expect(localStorage.getItem('test-key')).toBe('"updated"');
  });

  it('should update value when localStorage changes in another tab', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );
    
    act(() => {
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'test-key',
        newValue: '"from-other-tab"'
      }));
    });
    
    expect(result.current.value).toBe('from-other-tab');
  });
});
```

**useWordOfDay Test:**
```typescript
import { renderHook } from '@testing-library/react';
import { useWordOfDay } from './useWordOfDay';

describe('useWordOfDay', () => {
  it('should return first word on start date', () => {
    const mockWords = [
      { id: 1, word: 'First', definition: '', examples: [], etymology: '', partOfSpeech: '', category: '' },
      { id: 2, word: 'Second', definition: '', examples: [], etymology: '', partOfSpeech: '', category: '' }
    ];
    
    // Mock date to be start date
    jest.spyOn(global.Date.prototype, 'getTime').mockReturnValue(
      new Date('2026-04-13').getTime()
    );
    
    const { result } = renderHook(() => useWordOfDay(mockWords));
    
    expect(result.current?.word).toBe('First');
  });

  it('should return null after all words used', () => {
    const mockWords = [
      { id: 1, word: 'First', definition: '', examples: [], etymology: '', partOfSpeech: '', category: '' }
    ];
    
    // Mock date to be after all words
    jest.spyOn(global.Date.prototype, 'getTime').mockReturnValue(
      new Date('2026-07-22').getTime()
    );
    
    const { result } = renderHook(() => useWordOfDay(mockWords));
    
    expect(result.current).toBeNull();
  });
});
```

### **6.2 Utility Tests

**Word Filtering:**
```typescript
import { filterWords } from './utils';

describe('filterWords', () => {
  const words = [
    { id: 1, word: 'Apple', definition: '', examples: [], etymology: '', partOfSpeech: '', category: 'fruit' },
    { id: 2, word: 'Banana', definition: '', examples: [], etymology: '', partOfSpeech: '', category: 'fruit' },
    { id: 3, word: 'Carrot', definition: '', examples: [], etymology: '', partOfSpeech: '', category: 'vegetable' }
  ];

  it('should filter by search term', () => {
    const result = filterWords(words, 'app');
    expect(result).toHaveLength(1);
    expect(result[0].word).toBe('Apple');
  });

  it('should filter by category', () => {
    const result = filterWords(words, '', 'fruit');
    expect(result).toHaveLength(2);
  });

  it('should return all words when no filter', () => {
    const result = filterWords(words, '', '');
    expect(result).toHaveLength(3);
  });
});
```

---

## **7. Component Testing (Testowanie Komponentów)

### **7.1 WordCard Tests

```typescript
import { render, screen, fireEvent } from './test-utils';
import WordCard from './WordCard';

const mockWord = {
  id: 1,
  word: 'Sercecze',
  definition: 'Rzecz potoczna, karczmowa.',
  examples: ['Przykład użycia.'],
  etymology: 'Od słowa "serce"',
  partOfSpeech: 'rzeczownik',
  category: 'potoczne'
};

describe('WordCard', () => {
  it('should display word details', () => {
    render(<WordCard word={mockWord} />);
    
    expect(screen.getByText('Sercecze')).toBeInTheDocument();
    expect(screen.getByText(/rzeczownik/i)).toBeInTheDocument();
    expect(screen.getByText(/Rzecz potoczna/i)).toBeInTheDocument();
    expect(screen.getByText(/Przykład użycia/i)).toBeInTheDocument();
  });

  it('should call onFavoriteToggle when heart is clicked', () => {
    const handleFavorite = vi.fn();
    render(<WordCard word={mockWord} onFavoriteToggle={handleFavorite} />);
    
    fireEvent.click(screen.getByLabelText(/Add to favorites/i));
    
    expect(handleFavorite).toHaveBeenCalledWith(1);
  });

  it('should show etymology section when present', () => {
    render(<WordCard word={mockWord} />);
    
    expect(screen.getByText(/Od słowa "serce"/i)).toBeInTheDocument();
  });

  it('should show category tag', () => {
    render(<WordCard word={mockWord} />);
    
    expect(screen.getByText(/potoczne/i)).toBeInTheDocument();
  });
});
```

### **7.2 SearchBar Tests

```typescript
import { render, screen, fireEvent } from './test-utils';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('should render search input', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('should call onChange when input changes', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: 'test' }
    });
    
    expect(handleChange).toHaveBeenCalledWith('test');
  });

  it('should clear input when clear button is clicked', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="test" onChange={handleChange} />);
    
    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    
    expect(handleChange).toHaveBeenCalledWith('');
  });
});
```

---

## **8. Integration Testing (Testy Integracyjne)

### **8.1 Favorites Flow Test

```typescript
import { render, screen, fireEvent, waitFor } from './test-utils';
import App from './App';

describe('Favorites Flow', () => {
  it('should add and remove word from favorites', async () => {
    render(<App />);
    
    // Wait for word to load
    await waitFor(() => {
      expect(screen.getByText(/Sercecze/i)).toBeInTheDocument();
    });
    
    // Add to favorites
    fireEvent.click(screen.getByLabelText(/Add to favorites/i));
    
    await waitFor(() => {
      expect(screen.getByText(/Added to favorites/i)).toBeInTheDocument();
    });
    
    // Navigate to favorites page
    fireEvent.click(screen.getByRole('link', { name: /favorites/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/Sercecze/i)).toBeInTheDocument();
    });
    
    // Remove from favorites
    fireEvent.click(screen.getByLabelText(/Remove from favorites/i));
    
    await waitFor(() => {
      expect(screen.queryByText(/Sercecze/i)).not.toBeInTheDocument();
    });
  });
});
```

### **8.2 Navigation Test

```typescript
import { render, screen, fireEvent } from './test-utils';
import App from './App';

describe('Navigation', () => {
  it('should navigate between pages', () => {
    render(<App />);
    
    // Start at home
    expect(screen.getByText(/Sercecze/i)).toBeInTheDocument();
    
    // Navigate to archive
    fireEvent.click(screen.getByRole('link', { name: /archive/i }));
    
    expect(screen.getByText(/Archive/i)).toBeInTheDocument();
    
    // Navigate to favorites
    fireEvent.click(screen.getByRole('link', { name: /favorites/i }));
    
    expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
    
    // Navigate back to home
    fireEvent.click(screen.getByRole('link', { name: /home/i }));
    
    expect(screen.getByText(/Sercecze/i)).toBeInTheDocument();
  });
});
```

---

## **9. E2E Testing (Testy End-to-End)

### **9.1 Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

### **9.2 E2E Test Example

```typescript
// tests/e2e/word-of-day.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Word of Day', () => {
  test('should display word of the day', async ({ page }) => {
    await page.goto('/');
    
    // Check that word is displayed
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).not.toBeEmpty();
    
    // Check that definition is displayed
    await expect(page.locator('p')).toContainText(/definition/i);
    
    // Check that examples are displayed
    await expect(page.locator('blockquote')).toBeVisible();
  });

  test('should add word to favorites', async ({ page }) => {
    await page.goto('/');
    
    // Click favorite button
    await page.click('button[aria-label="Add to favorites"]');
    
    // Check for success message
    await expect(page.locator('text=Added to favorites')).toBeVisible();
    
    // Navigate to favorites
    await page.click('a[href="/favorites"]');
    
    // Check that word is in favorites
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to archive', async ({ page }) => {
    await page.goto('/');
    
    // Click archive link
    await page.click('a[href="/archive"]');
    
    // Check that archive page is displayed
    await expect(page).toHaveURL(/.*archive/);
    await expect(page.locator('text=Archive')).toBeVisible();
    
    // Check that words are listed
    await expect(page.locator('article')).toHaveCountGreaterThan(0);
  });
});
```

---

## **10. Test Execution (Wykonywanie Testów)

### **10.1 Running Tests

**Development:**
```bash
# Watch mode (runs on file changes)
npm run test

# Run specific test file
npm run test WordCard.test.tsx
```

**CI/CD Pipeline:**
```bash
# Run all tests with coverage
npm run test -- --coverage --run

# Run tests without watch mode
npm run test -- --run
```

**Pre-commit Hook:**
```bash
# Run tests before commit
npm run test -- --run --passWithNoTests
```

### **10.2 Test Results

**Passing Tests:**
```
✓ should display word details (5ms)
✓ should call onFavoriteToggle (3ms)
✓ should handle errors gracefully (7ms)

Test Files:  12 passed, 12 total
Tests:       87 passed, 87 total
Time:        2.45s
```

**Failing Tests:**
```
✕ should filter words by category (12ms)

  Expected: 2
  Received: 1

  > 15 |     expect(result).toHaveLength(2);
     |                     ^
  16 |   });
```

---

## **11. Bug Reporting (Raportowanie Błędów)

### **11.1 Bug Report Template

```markdown
## Bug Report

**Title:** [Brief description]

**Priority:** High / Medium / Low
**Severity:** Critical / Major / Minor / Trivial

**Environment:**
- Browser: Chrome 120
- OS: Windows 11
- App Version: 1.0.0

**Steps to Reproduce:**
1. Go to homepage
2. Click "Add to favorites"
3. Navigate to favorites page
4. Error occurs

**Expected Result:**
Word should be added to favorites.

**Actual Result:**
Error: "Cannot read property 'id' of undefined"

**Screenshots:**
[Attach screenshots]

**Console Error:**
[Copy error message]

**Additional Notes:**
- Only happens on mobile
- Reproducible 100% of the time
```

### **11.2 Bug Triage

**Priority Levels:**
- **Critical:** Blocks core functionality, data loss
- **Major:** Significant impact, workaround exists
- **Minor:** Cosmetic issues, edge cases
- **Trivial:** Typos, small improvements

**Bug Lifecycle:**
```
Reported → Triaged → In Progress → Fixed → Tested → Closed
                                    ↓
                              Won't Fix
                                    ↓
                              Duplicate
```

---

## **12. Quality Metrics (Metryki Jakości)

### **12.1 Coverage Goals

```
Component Coverage:
├── Statement: 85% ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
├── Branch:   80% ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
├── Function: 85% ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
└── Line:     85% ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Critical Paths:
├── Word of day calculation: 95% ✓
├── Favorite toggle: 90% ✓
├── Search functionality: 85% ✓
└── Navigation: 90% ✓
```

### **12.2 Test Results Dashboard

```
Sprint 3 Test Summary
═══════════════════════════════════════════════

Tests Run:    127
Passed:       125 (98.4%)
Failed:       2 (1.6%)
Skipped:      0

Coverage:
Statements:  87.2% ↑
Branches:    82.5% →
Functions:   88.1% ↑
Lines:       86.9% ↑

New This Sprint:
- 23 new tests added
- Coverage increased by 2.1%
- 2 bugs fixed
```

---

## **13. Test Automation (Automatyzacja Testów)

### **13.1 CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Tests

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npx tsc --noEmit
      
      - name: Lint
        run: npm run lint
      
      - name: Unit tests
        run: npm run test:unit -- --coverage
      
      - name: E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

### **13.2 Pre-commit Hooks

```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint-staged
npm run test:staged
```

---

## **14. Regression Testing (Testowanie Regresyjne)

### **14.1 Regression Suite

```typescript
// tests/regression.spec.ts
describe('Regression Tests', () => {
  // Bug #123: Favorite toggle not persisting
  test('favorites persist after page refresh', async ({ page }) => {
    await page.goto('/');
    await page.click('button[aria-label="Add to favorites"]');
    await page.reload();
    
    // Should still be favorited
    await expect(page.locator('button[aria-label="Remove from favorites"]'))
      .toBeVisible();
  });

  // Bug #456: Search not working with special characters
  test('search handles special characters', async ({ page }) => {
    await page.goto('/archive');
    await page.fill('input[placeholder*="search"]', 'ąęśćźż');
    
    // Should not crash
    await expect(page.locator('text=Error')).not.toBeVisible();
  });

  // Bug #789: Date calculation off by one
  test('word of day calculation correct', async ({ page }) => {
    await page.goto('/');
    const word = await page.locator('h1').textContent();
    
    // Verify based on known test data
    expect(word).toBe('Expected Word');
  });
});
```

---

## **15. Instrukcja dla Agentów (System Prompt)

> Kiedy wywołasz `WF_Tester`, Twoim celem jest:
> 1. Zaprojektować kompleksową strategię testowania dla wszystkich funkcji
> 2. Stworzyć testy jednostkowe, komponentowe, integracyjne i e2e
> 3. Upewnić się, że krytyczne ścieżki są pokryte testami
> 4. Monitorować coverage i identyfikować obszary niewytestowane
> 5. Raportować błędy i śledzić ich naprawę
> 6. Upewnić się, że nowe funkcje nie niszczą istniejących (regresje)
> 7. Automatyzować testy w CI/CD
> 
> Bądź bezlitosny: znajduj błędy, zgłaszaj je i wymuszaj ich naprawę. Pamiętaj, że użytkownik nie będzie tolerował błędów, które mogłyby zostać złapane przed wydaniem. Jakość to priorytet.

---

## **16. Definition of Done (Tester)

- [ ] Test strategy zdefiniowana i udokumentowana
- [ ] Testy jednostkowe dla nowego kodu (≥80% coverage)
- [ ] Testy komponentowe dla nowych komponentów
- [ ] Testy integracyjne dla głównych flowów
- [ ] Testy e2e dla krytycznych ścieżek
- [ ] Wszystkie testy przechodzą (100%)
- [ ] Żadnych krytycznych bugów otwartych
- [ ] Regression suite aktualne
- [ ] CI/CD konfigurowane z testami
- [ ] Code coverage monitorowane i zgłaszane
- [ ] Bug reports sporządzane i śledzone
- [ ] Performance tests (jeśli dotyczy)

---

_Created by Tester Agent_  
_Last updated: 2026-04-30_