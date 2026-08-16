# FinWise AI 💰

**AI-Powered Personalized Finance Planner** built with React, Vite, Tailwind CSS, Recharts, Spring Boot, and Python FastAPI.

FinWise AI is a complete fintech web application designed to create personalized financial planning experiences based on a customer's financial profile, risk tolerance, and financial goals.

> **Project Principle:** Strict separation between deterministic financial computation and GenAI. GenAI explains trade-offs and personalizes insights without inventing or calculating financial figures.

---

## 🌟 5-Phase Architecture Overview

```text
finwise-ai/
│
├── finwise-frontend/ (Root)         # Phase 1: React + Vite + Tailwind UI & Client Engine
│   ├── public/
│   │   ├── favicon.svg
│   │   └── data/
│   │       └── finwise_final_100_entries.csv  # 100 benchmark financial profiles
│   ├── src/
│   │   ├── components/ (common, charts, dashboard, goals, plans, simulator)
│   │   ├── context/ (AuthContext, FinancialContext)
│   │   ├── mock/ (demoUsers, financialPresets)
│   │   ├── pages/ (10 Complete Application Pages)
│   │   ├── services/ (csvService, aiService)
│   │   ├── utils/ (financialCalculators, monteCarlo, stressTesting, formatters)
│   │   ├── App.jsx, index.css, main.jsx
│   └── package.json, vite.config.js, tailwind.config.js, Dockerfile
│
├── finwise-backend/                 # Phase 2: Spring Boot Java REST API & JWT Backend
│   ├── src/main/java/com/finwise/
│   │   ├── config/ (SecurityConfig, WebMvcConfig)
│   │   ├── controllers/ (Auth, Profile, Goals, Plans, HealthScore)
│   │   ├── models/ (User, FinancialProfile, Goal, Plan)
│   │   ├── repository/ (User, Profile, Goal, Plan Mongo Repositories)
│   │   └── security/ (JwtTokenProvider, JwtAuthenticationFilter)
│   ├── pom.xml, Dockerfile
│
├── finwise-ml-engine/               # Phase 3 & 4: Python FastAPI Financial & ML Service
│   ├── app/
│   │   ├── engine/ (health_score.py, monte_carlo.py, stress_tester.py)
│   │   └── main.py
│   ├── requirements.txt, Dockerfile
│
├── docker-compose.yml               # Phase 5: Full-Stack Container Orchestration
└── README.md
```

---

## ✨ Features Built Across All 5 Phases

### 📱 1. Core Application Pages & UI (Phase 1)
- 🏠 **Landing Page (`/`)**: Fintech hero, dynamic stats, interactive mini-calculator preview, feature highlights, and 1-click demo launches.
- 🔐 **Login Page (`/login`)**: Email/password authentication + **1-Click Demo Persona Switcher** (*Alex Chen*, *Sarah Jenkins*, *Robert Davis*) for immediate test driving.
- 📝 **Registration Page (`/register`)**: Onboarding wizard initializing profile figures and health diagnostics.
- 📊 **Financial Dashboard (`/dashboard`)**: Net Worth KPI, monthly surplus, emergency runway, asset allocation donut chart, 15-year compound growth trajectory, peer percentile rankings, hidden risk flags, and goal progress bars.
- 👤 **Financial Profile (`/profile`)**: Live editable cashflow, asset registry, liabilities, dependents, insurance safeguards, and CSV Export/Import.
- 🛡️ **Risk Assessment (`/risk-assessment`)**: 5-question dynamic risk profiler mapping capacity & loss aversion to calibrated archetypes with strategic asset allocation wheels.
- 🎯 **Financial Goals (`/goals`)**: Goal creation wizard, compound SIP calculator with inflation adjustments, and automatic Cashflow Deficit / Timeline Conflict detection.
- 📋 **Personalized Plans (`/plans`)**: 4 deterministic strategies (*Capital Shield*, *Balanced Wealth Builder*, *Equity Maximizer*, *FIRE Accelerator*), 1,000-iteration Monte Carlo confidence corridors, and side-by-side trade-off matrix.
- 🔮 **What-If Simulator (`/simulator`)**: Real-time stress tester with sliders for market drops, stagflation, income shocks, emergency cash drains, and Household Resilience Score calculation.
- 🤖 **AI Financial Assistant (`/ai-assistant`)**: Grounded fiduciary copilot strictly conditioned on verified profile data, suggested queries, and optional Google Gemini API key integration.

### ☕ 2. Spring Boot REST Backend (Phase 2)
- Java 17 + Spring Boot 3.2 + Spring Security + JWT stateless authentication.
- REST Controllers for Auth, Profile, Goals, Plans, and Health Diagnostics.
- Spring Data MongoDB persistence layer.

### 🐍 3. Python FastAPI Financial Engine (Phase 3)
- High-performance numeric calculations with NumPy & Pandas.
- Monte Carlo geometric Brownian motion engine (1,000 runs, P10/P50/P90 percentiles).
- Black Swan stress shock matrix & resilience scoring.

### 🤖 4. GenAI Grounded Reasoning Layer (Phase 4)
- Fiduciary AI prompt engineering grounding context on deterministic facts.
- Integration hook with Google Gemini API (`@google/genai` or direct REST).
- Built-in zero-hallucination fallback engine.

### 🚀 5. Full-Stack Cloud & Docker Deployment (Phase 5)
- Multi-container `docker-compose.yml` spinning up Frontend, Spring Boot, FastAPI, and MongoDB with a single command.

---

## 💻 How to Run the Project Locally

### Option A: Instant Frontend Dev Server (Recommended)

1. Open a terminal in the project directory:
   ```bash
   cd C:\Users\diksh\.gemini\antigravity\scratch\finwise-ai
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser at:
   ```text
   http://localhost:5173
   ```
4. Click **Instant Live Demo** or select **Alex Chen** / **Sarah Jenkins** on the Login page to immediately test all features!

---

### Option B: Docker Compose Full Stack (All 4 Services)

To run Frontend + Spring Boot Backend + FastAPI ML Engine + MongoDB together:

```bash
docker compose up --build
```

- **Frontend:** `http://localhost:5173`
- **Spring Boot Backend:** `http://localhost:8080`
- **FastAPI ML Engine:** `http://localhost:8000/docs`
- **MongoDB:** `localhost:27017`

---

## 🛡️ Financial Disclaimer

FinWise AI is a simulation and planning prototype for educational and portfolio demonstration purposes. All projections are illustrative and based on mathematical assumptions. Actual market outcomes may vary.
