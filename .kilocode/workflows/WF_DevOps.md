# WF_DevOps

**Cel:** Zapewnić CI/CD, wdrożenie (deployment) i infrastrukturę dla aplikacji "Słowo Dnia", zapewniając niezawodność, szybkość i bezpieczeństwo.

---

## **1. Fundamentalna Zasada (The Success Equation)**

> **DevOps Success = Automation + Reliability + Speed + Security**

Jeśli proces jest ręczny, jest podatny na błędy. Jeśli system jest niewiarygodny, użytkownicy odchodzą. Jeśli wdrożenia są powolne, tracimy konkurencyjność. Jeśli brak bezpieczeństwa, tracimy dane.

Twoim zadaniem jest zautomatyzować wszystko, co da się zautomatyzować, i zapewnić, że aplikacja działa bezawaryjnie.

---

## **2. Definicja Sukcesu DevOps

**Deployment Targets:**
- [ ] Czas od PR do produkcji < 15 minut
- [ ] Zero-downtime deployments
- [ ] Automatyczne rollback w przypadku błędów
- [ ] 99.9% uptime
- [ ] Build time < 2 minuty
- [ ] Zero manualnych interwencji w procesie CD

**Infrastructure Targets:**
- [ ] Zero ręcznych zmian w środowisku
- [ ] Wszystko jako kod (IaC)
- [ ] Automatyczne skalowanie
- [ ] Monitoring i alerting skonfigurowane
- [ ] Bezpieczeństwo (SSL, CSP, itp.)

---

## **3. CI/CD Pipeline (Pipeline CI/CD)

### **3.1 Overview

```
Git Push → GitHub Actions → Build → Test → Deploy
                                        │
                                        ├─ PR → Preview Deployment (Vercel)
                                        └─ Main → Production Deployment (Vercel)
```

### **3.2 Pipeline Stages

**Stage 1: Install**
```yaml
- name: Install dependencies
  run: npm ci
  # Używa package-lock.json dla deterministycznego installu
```

**Stage 2: Type Check**
```yaml
- name: Type check
  run: npx tsc --noEmit
  # Sprawdza TypeScript kompilację
```

**Stage 3: Lint**
```yaml
- name: Lint
  run: npm run lint
  # ESLint - sprawdza jakość kodu
```

**Stage 4: Unit & Component Tests**
```yaml
- name: Run tests
  run: npm run test:ci
  # Vitest - testy jednostkowe i komponentowe
  # Generuje coverage report
```

**Stage 5: Build**
```yaml
- name: Build
  run: npm run build
  # Vite - produkcyjna builda
  # Generuje statyczne pliki
```

**Stage 6: Deploy**
```yaml
# Automatycznie przez Vercel na merge do main
# Preview deployment na PR
```

### **3.3 GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: CI/CD Pipeline

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

env:
  NODE_VERSION: '18'
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  build-test:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type Check
        run: npx tsc --noEmit
      
      - name: Lint
        run: npm run lint
      
      - name: Run Tests
        run: npm run test:ci -- --coverage
      
      - name: Build
        run: npm run build
      
      - name: Upload Coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
      
      - name: Deploy Preview (on PR)
        if: github.event_name == 'pull_request'
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ env.VERCEL_ORG_ID }}
          vercel-project-id: ${{ env.VERCEL_PROJECT_ID }}
          scope: ${{ env.VERCEL_ORG_ID }}
          alias-domains: |
            preview-${{ github.event.number }}.slowodnia.pl
      
      - name: Deploy Production (on main)
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ env.VERCEL_ORG_ID }}
          vercel-project-id: ${{ env.VERCEL_PROJECT_ID }}
          scope: ${{ env.VERCEL_ORG_ID }}
          prod: true
```

---

## **4. Infrastructure as Code (Infrastruktura jako Kod)

### **4.1 Vercel Configuration

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
  "build": {
    "env": {
      "VITE_API_URL": "@VITE_API_URL"
    }
  }
}
```

### **4.2 Environment Variables

**Production Secrets (Vercel Dashboard):**
```
VERCEL_TOKEN=***
VERCEL_ORG_ID=***
VERCEL_PROJECT_ID=***
```

**Environment Files:**
```bash
# .env.production
VITE_APP_URL=https://slowodnia.pl
VITE_API_URL=https://api.slowodnia.pl
NODE_ENV=production

# .env.development
VITE_APP_URL=http://localhost:5173
VITE_API_URL=http://localhost:3000
NODE_ENV=development
```

### **4.3 Infrastructure Diagram

```
┌─────────────────┐
│  Developer      │
│  (Git Push)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐    ┌──────────────────┐
│  GitHub Repo    │    │  Secrets Store   │
│  (Code)         │    │  (Vercel, etc.)  │
└────────┬────────┘    └────────┬─────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌──────────────────┐
│  GitHub Actions │────│  Vercel Deploy   │
│  (CI/CD)        │    │  (Edge Network)  │
└────────┬────────┘    └────────┬─────────┘
         │                       │
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌──────────────────┐
│  Preview (PR)   │    │  Production      │
│  Environment    │    │  Environment     │
│  *.vercel.app   │    │  *.slowodnia.pl  │
└─────────────────┘    └──────────────────┘
```

---

## **5. Deployment Strategy (Strategia Wdrażania)

### **5.1 Zero-Downtime Deployment

**Vercel Features:**
- **Atomic Deploys:** Each deployment is immutable
- **Instant Rollback:** Switch to previous deployment in 1 click
- **Preview URLs:** Every PR gets unique URL
- **Edge Network:** Global CDN for fast delivery

**Deployment Process:**
```
1. Code merged to main
2. GitHub Actions triggered
3. Build & test in CI (5-10 min)
4. Deploy to Vercel (1-2 min)
5. Health checks pass
6. Traffic switched to new deployment
7. Old deployment kept for rollback

Total time: ~15 minutes
```

### **5.2 Rollback Strategy

**Automatic Rollback Triggers:**
```yaml
# In CI/CD pipeline
- name: Health Check
  run: |
    sleep 30  # Wait for deployment to stabilize
    curl -f https://slowodnia.pl/health || exit 1
  
- name: Check Errors
  run: |
    # Check if error rate increased
    # Rollback if critical errors detected
```

**Manual Rollback (Vercel Dashboard):**
1. Go to Vercel Dashboard
2. Select Project
3. Click "Revert" on previous deployment
4. Traffic switches instantly

---

## **6. Monitoring & Observability

### **6.1 Application Monitoring

**Vercel Analytics:**
```bash
# Built-in analytics
- Page views
- Unique visitors
- Performance metrics
- Geographic distribution
```

**Custom Metrics:**
```typescript
// Track errors
window.addEventListener('error', (event) => {
  fetch('/api/log-error', {
    method: 'POST',
    body: JSON.stringify({
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      userAgent: navigator.userAgent
    })
  });
});
```

### **6.2 Performance Monitoring

**Lighthouse CI:**
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:5173
          configPath: "./.lighthouserc.json"
```

**Performance Budgets:**
```json
// .lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:5173"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.8}],
        "resource-summary:script:totalBytes": ["error", {"maxNumericValue": 500000}],
        "resource-summary:image:totalBytes": ["error", {"maxNumericValue": 500000}]
      }
    }
  }
}
```

### **6.3 Alerting

**Error Tracking:**
```typescript
// src/error-tracking.ts
export class ErrorTracker {
  private static instance: ErrorTracker;
  private errors: ErrorLog[] = [];
  
  static getInstance() {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }
  
  log(error: Error, context?: any) {
    const log: ErrorLog = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      context,
      url: window.location.href,
      userAgent: navigator.userAgent
    };
    
    this.errors.push(log);
    
    // Send to monitoring service
    if (this.errors.length > 5) {
      this.sendToService();
    }
  }
  
  private sendToService() {
    // Integrate with Sentry, LogRocket, etc.
  }
}
```

---

## **7. Security (Bezpieczeństwo)

### **7.1 Security Headers

**Vercel Configuration:**
```json
// vercel.json
{
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
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ]
}
```

### **7.2 Secrets Management

**Never Commit Secrets:**
```bash
# .gitignore
.env
.env.local
.env.*.local
*.key
*.pem
.vercel
```

**Vercel Environment Variables:**
- Set in Vercel Dashboard
- Encrypted at rest
- Only accessible to team members
- Different values per environment (preview, production)

### **7.3 Dependency Security

```bash
# Regular security audits
npm audit

# Fix vulnerabilities
npm audit fix

# Force audit on CI
npm audit --audit-level=high
```

**Automate Security Checks:**
```yaml
# .github/workflows/security.yml
name: Security Audit

on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly
  workflow_dispatch:

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Audit dependencies
        run: npm audit --audit-level=moderate
```

---

## **8. Scaling Strategy (Skalowanie)

### **8.1 Current Scale (MVP)

**Traffic:** < 1,000 DAU
**Build Time:** < 2 minutes
**Deploy Time:** < 5 minutes
**Infrastructure Cost:** $0 (Vercel free tier)

**Vercel Free Tier Includes:**
- Unlimited deployments
- Serverless functions
- 100 GB bandwidth
- Automatic HTTPS
- Edge caching

### **8.2 Growth Plan

**10,000+ DAU:**
- Upgrade to Vercel Pro ($20/month)
- Custom domains
- Advanced analytics
- Priority support

**100,000+ DAU:**
- Split frontend/backend
- Add API layer
- Database (Supabase/PostgreSQL)
- CDN optimization

**1,000,000+ DAU:**
- Multi-region deployment
- Load balancing
- Database sharding
- Dedicated infrastructure

### **8.3 Performance Optimization

**Bundle Size:**
```bash
# Track bundle size
npx source-map-explorer 'build/static/js/*.js'

# Set size limit
"size-limit": [
  {
    "path": "build/static/js/*.js",
    "limit": "500 KB"
  }
]
```

**Lazy Loading:**
```typescript
// Route-based code splitting
const Home = lazy(() => import('./pages/Home'));
const Archive = lazy(() => import('./pages/Archive'));
const Favorites = lazy(() => import('./pages/Favorites'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Suspense>
  );
}
```

---

## **9. Backup & Disaster Recovery

### **9.1 Code Backup

**GitHub:**
- All code in GitHub repository
- Automatic version history
- Branch protection on main

**Automated Backups:**
```bash
# Daily backup of production data
0 0 * * * git clone https://github.com/user/slowo-dnia.git /backups/$(date +\%Y\%m\%d)
```

### **9.2 Data Backup

**Static Data (words.json):**
- Version controlled in Git
- Backed up with code

**Dynamic Data (localStorage):**
- Client-side only
- No server backup needed
- Users responsible for their data

### **9.3 Disaster Recovery Plan

**If Deployment Fails:**
1. Vercel automatically keeps old deployment
2. Health check fails
3. Automatic rollback to previous version
4. Team notified via Slack/GitHub

**If Data Lost:**
1. Restore words.json from Git
2. Notify users (localStorage cleared)
3. Provide instructions for recovery

**If Security Breach:**
1. Immediately revoke deployment keys
2. Audit recent changes
3. Rollback to last known good state
4. Analyze and fix vulnerability
5. Rotate all secrets

---

## **10. Cost Management

### **10.1 Current Costs

**Free Tier (Vercel):**
- $0/month
- Includes: Hosting, CI/CD, SSL, CDN
- Limitations: 100GB bandwidth, no custom domains on free projects

**Domain (if purchased):**
- ~50 PLN/year

**Total:** ~50 PLN/year

### **10.2 Future Costs

**Growth Scenarios:**

| Users | Monthly Cost | Reason |
|-------|--------------|--------|
| 1,000 | $0 | Free tier sufficient |
| 10,000 | $20 | Vercel Pro + domain |
| 100,000 | $200 | Pro + database + CDN |
| 1,000,000 | $1,000+ | Enterprise tier + custom infra |

### **10.3 Cost Optimization

**Keep Costs Low:**
- Use free tier as long as possible
- Optimize bundle size (reduce bandwidth)
- Implement caching (reduce serverless function calls)
- Monitor usage and set alerts
- Delete old preview deployments automatically

---

## **11. Documentation (Dokumentacja)

### **11.1 Deployment Guide

```markdown
# Deployment Guide

## Manual Deployment

### Deploy to Preview
```bash
npm run build
npx vercel --prod
```

### Deploy to Production
```bash
npm run build
npx vercel --prod
```

## Automatic Deployment

Push to main branch → Auto-deploys to production

Create PR → Auto-deploys preview
```

### **11.2 Environment Configuration

```markdown
# Environment Variables

## Required
- VERCEL_TOKEN: Vercel deployment token
- VERCEL_ORG_ID: Vercel organization ID
- VERCEL_PROJECT_ID: Vercel project ID

## Optional
- VITE_APP_URL: Application URL (default: http://localhost:5173)
```

### **11.3 Monitoring Dashboard

```markdown
# Monitoring Dashboard

## Key Metrics
- Uptime: 99.9%
- Avg Response Time: < 200ms
- Error Rate: < 0.1%
- Build Success Rate: 100%

## Tools
- Vercel Analytics
- Lighthouse CI
- Error tracking (console)
```

---

## **12. Instrukcja dla Agentów (System Prompt)

> Kiedy wywołasz `WF_DevOps`, Twoim celem jest:
> 1. Zautomatyzować proces budowania, testowania i wdrażania
> 2. Skonfigurować monitorowanie i alerting
> 3. Zapewnić bezpieczeństwo (SSL, CSP, sekrety)
> 4. Optymalizować koszty i wydajność
> 5. Przygotować plan awaryjny (rollback, backup)
> 6. Udokumentować procesy i narzędzia
> 
> Bądź pragmatyczny: używaj managed services (Vercel) zamiast budować własne rozwiązania. Automatyzuj wszystko, co można. Monitoruj i alertuj o problemach zanim użytkownicy je zauważą. Pamiętaj, że stabilność to podstawa.

---

## **13. Checklist for Deployment

**Before Deploy:**
- [ ] All tests passing
- [ ] Type check successful
- [ ] Linting passes
- [ ] Build successful
- [ ] Bundle size under limit
- [ ] No security vulnerabilities
- [ ] Environment variables set
- [ ] Domain configured (if applicable)

**After Deploy:**
- [ ] Health check passes
- [ ] Smoke tests pass
- [ ] No console errors
- [ ] Performance acceptable (Lighthouse > 90)
- [ ] Monitoring active
- [ ] Team notified

**Post-Deploy:**
- [ ] Monitor for 24 hours
- [ ] Check error logs
- [ ] Verify metrics
- [ ] Collect feedback
- [ ] Document any issues

---

## **14. Definition of Done (DevOps)

- [ ] CI/CD pipeline configured and working
- [ ] Automated tests in CI
- [ ] Automatic deployments on PR and merge
- [ ] Preview environments for PRs
- [ ] Production monitoring configured
- [ ] Alerting set up
- [ ] Security headers configured
- [ ] SSL/HTTPS enforced
- [ ] Secrets management in place
- [ ] Backup strategy documented
- [ ] Disaster recovery plan
- [ ] Cost monitoring active
- [ ] Documentation updated
- [ ] Rollback procedure tested

---

_Created by DevOps Agent_  
_Last updated: 2026-04-30_