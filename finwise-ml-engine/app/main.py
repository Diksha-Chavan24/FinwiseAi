from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from app.engine.health_score import compute_health_score
from app.engine.monte_carlo import run_monte_carlo
from app.engine.stress_tester import evaluate_stress_shock

app = FastAPI(
    title="FinWise AI - Deterministic Financial & ML Engine",
    version="1.0.0",
    description="High-performance financial computation service powering FinWise AI"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HealthScoreRequest(BaseModel):
    monthly_income: float
    fixed_expenses: float
    liquid_savings: float
    debt_payments: float
    credit_card_debt: Optional[float] = 0.0

class MonteCarloRequest(BaseModel):
    initial_investment: float = 50000.0
    monthly_contribution: float = 1000.0
    expected_annual_return: float = 0.09
    annual_volatility: float = 0.14
    years: int = 20
    num_simulations: int = 1000

class StressTestRequest(BaseModel):
    net_worth: float
    liquid_savings: float
    monthly_income: float
    monthly_expenses: float
    monthly_debt: float
    equity_assets: float
    equity_drop_pct: float = 0.28
    expense_surge_pct: float = 0.05
    income_cut_pct: float = 0.0
    cash_drain: float = 0.0

@app.get("/")
def root():
    return {
        "service": "FinWise AI Financial Engine",
        "status": "online",
        "version": "1.0.0"
    }

@app.post("/api/v1/health-score")
def api_health_score(req: HealthScoreRequest):
    return compute_health_score(
        monthly_income=req.monthly_income,
        fixed_expenses=req.fixed_expenses,
        liquid_savings=req.liquid_savings,
        debt_payments=req.debt_payments,
        credit_card_debt=req.credit_card_debt or 0.0
    )

@app.post("/api/v1/monte-carlo")
def api_monte_carlo(req: MonteCarloRequest):
    return run_monte_carlo(
        initial_investment=req.initial_investment,
        monthly_contribution=req.monthly_contribution,
        expected_annual_return=req.expected_annual_return,
        annual_volatility=req.annual_volatility,
        years=req.years,
        num_simulations=req.num_simulations
    )

@app.post("/api/v1/stress-test")
def api_stress_test(req: StressTestRequest):
    return evaluate_stress_shock(
        net_worth=req.net_worth,
        liquid_savings=req.liquid_savings,
        monthly_income=req.monthly_income,
        monthly_expenses=req.monthly_expenses,
        monthly_debt=req.monthly_debt,
        equity_assets=req.equity_assets,
        equity_drop_pct=req.equity_drop_pct,
        expense_surge_pct=req.expense_surge_pct,
        income_cut_pct=req.income_cut_pct,
        cash_drain=req.cash_drain
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
