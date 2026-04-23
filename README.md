# Personalized News Feed Ranking System

Heap · Sorting · Greedy Algorithms — runs entirely in the browser, no npm install needed.

## Setup in VS Code

### Option A — Open directly in browser (simplest)
1. Open the project folder in VS Code
2. Navigate to `public/index.html`
3. Right-click → **Open with Live Server**  
   *(requires the Live Server extension — see below)*

### Option B — Run with Node.js
1. Make sure Node.js is installed → https://nodejs.org
2. Open a terminal in VS Code (`Ctrl+` ` `)
3. Run:
   ```
   node server.js
   ```
4. Open http://localhost:3000 in your browser

### Option C — Open the HTML file directly
1. Open `public/index.html` in any browser  
   *(double-click the file in File Explorer / Finder)*

---

## Recommended VS Code Extensions

| Extension | Why |
|---|---|
| **Live Server** (Ritwick Dey) | Auto-refreshes on file save |
| **Prettier** | Code formatting |
| **Error Lens** | Inline JS errors |

Install Live Server: `Ctrl+Shift+X` → search "Live Server" → Install

---

## Project Structure

```
news-feed-ranking/
├── public/
│   └── index.html      ← entire app (HTML + CSS + JS in one file)
├── server.js           ← optional Node.js static server
├── package.json
└── README.md
```

---

## Algorithms Implemented

### 1. Max-Heap (Priority Queue)
- **Build:** `O(n)` via bottom-up heapify
- **Top-K extract:** `O(K log n)`
- **Insert:** `O(log n)` — ideal for real-time feed updates
- **Use case:** Streaming feeds where new articles arrive constantly

### 2. Array Sort (TimSort)
- **Sort:** `O(n log n)`
- **Top-K:** `O(1)` after sort
- **Use case:** Small static feeds, full-list display

### 3. Greedy Selection with Diversity
- **Selection:** `O(K·n)`
- **Diversity penalty:** 30% score reduction if a category already has 2+ picks
- **Use case:** Avoiding feed monotony, cold-start problem

---

## Scoring Formula

```
finalScore = (wRel × relevance)
           + (wPop × popularity)
           + (wRec × e^(−λ × hoursAgo))

Default weights:  wRel=0.5, wPop=0.3, wRec=0.2
Time-decay:       λ = 0.05
```

---

## Features

- Live algorithm switching (Heap / Sort / Greedy)
- Top-K slider (1–12)
- Category filter
- Per-category user interest sliders
- Score weight tuning (auto-normalized)
- Like articles → triggers re-rank
- Inject new articles (simulates real-time updates)
- Heap array view with parent-child indices
- Complexity comparison table + timing chart
- Execution log with timestamps
- Dark mode support
