# CareerOS — AI-Powered Student Career & Placement Platform 🚀

A modern, responsive, and functional React + Vite web application built for hackathons, replicating the exact Figma UI design system and ready to connect to a FastAPI backend.

---

## 📸 Figma UI Design Faithfully Recreated

1. **Design System & UI Foundation** (`media_1787313809639.png`)
   - Dark theme palette (`#080C15`, `#121829`, `#1E293B`, `#6366F1`, `#22D3EE`, `#10B981`, `#F59E0B`).
   - Typography, buttons, pills, status tags, and cards showcase.

2. **Landing Hero Page** (`media_1787313845414.png`)
   - Header with Logo and navigation.
   - Hero headline: *"Build a career path that actually makes sense for you."* with electric cyan gradient.
   - Interactive live floating preview card featuring 72% Career Match, animated progress bar, and Next Best Move (*🔥 Learn SQL fundamentals*).

3. **Career Discovery & Skills Selection Wizard** (`media_1787313881417.png`)
   - *"What do you want your future to look like?"*
   - Interactive role selection with prominent selected path card and alternative roles.
   - Step 2 skill picker with custom skill addition and quick tags.
   - 3-step bottom progress indicator (*1. Career Goal → 2. Your Skills → 3. AI Roadmap*).

4. **Personal Career Blueprint & Skill Map Dashboard** (`media_1787313927134.png`)
   - *Hey, Student 👋* greeting with bold cyan `DATA ANALYST` heading.
   - Circular SVG radial gauge displaying **25% CAREER READINESS** (`ON YOUR WAY 🚀`).
   - **✨ AI CAREER INSIGHT** alert banner (*🔥 MASTER SQL* + *Start with SQL →* button).
   - **YOUR SKILL MAP**: 3-column cards (*What you already have*, *What to learn next* with purple highlight, *Your other skills*).
   - **YOUR NEXT MOVES**: Horizontal roadmap timeline with step connectors.
   - **BUILD YOUR PORTFOLIO**: Suggested projects with interactive modal popups containing deliverables and starter code.

---

## ⚡ FastAPI Backend Integration

CareerOS is pre-configured to connect to these 4 FastAPI endpoints:

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/career/analyze` | `POST` | Career Roadmap & Skill Gap Analysis |
| `/api/resume/analyze` | `POST` | ATS Resume Scanner & Match Score |
| `/api/interview/generate` | `POST` | Mock Interview Question Generator |
| `/api/interview/evaluate` | `POST` | Interview Answer Evaluation |

### Dual Mode:
- **Mock Demo Mode (Default)**: Instant, realistic responses with zero dependencies—perfect for offline presentations and hackathon judges.
- **Live FastAPI Mode**: Switch with 1 click in the top-right Settings modal or enter your custom backend URL (e.g. `http://127.0.0.1:8000`).

---

## 🛠️ How to Run in VS Code

```bash
# 1. Open the project folder in VS Code
cd "C:\Users\Shiven Sharma\.gemini\antigravity\scratch\career-os"

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the Vite dev server
npm run dev
```

Open your browser at `http://localhost:5173` to view the app!

---

## 📂 Project Structure

```
career-os/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.cjs
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── context/
│   │   └── AppContext.jsx          # Shared state for user profile, skills, and API results
│   ├── services/
│   │   └── api.js                  # FastAPI client & fallback handler
│   ├── data/
│   │   └── mockData.js             # Realistic mock datasets matching FastAPI JSON schemas
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.jsx           # Status badges (matched, missing, warning, outlined)
│   │   │   ├── Button.jsx          # Styled action buttons with gradients
│   │   │   └── CircularGauge.jsx   # SVG circular gauge (25% Readiness / ATS Score)
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Header with logo, navigation, and API status pill
│   │   │   └── Footer.jsx          # Footer with quick links and FastAPI specs
│   │   ├── modals/
│   │   │   ├── ProjectModal.jsx    # Interactive project details and starter code modal
│   │   │   └── SettingsModal.jsx   # FastAPI URL configurator & contract inspector
│   │   └── views/
│   │       ├── LandingView.jsx         # Figma Screenshot 2
│   │       ├── CareerDiscoveryView.jsx # Figma Screenshot 3
│   │       ├── CareerBlueprintView.jsx # Figma Screenshot 4
│   │       ├── ResumeAnalyzerView.jsx  # Feature 2: ATS Resume Scanner
│   │       ├── MockInterviewView.jsx   # Features 3 & 4: Mock Interview & Evaluator
│   │       └── DesignSystemView.jsx    # Figma Screenshot 1
```
