def evaluate_stress_shock(
    net_worth: float,
    liquid_savings: float,
    monthly_income: float,
    monthly_expenses: float,
    monthly_debt: float,
    equity_assets: float,
    equity_drop_pct: float = 0.28,
    expense_surge_pct: float = 0.05,
    income_cut_pct: float = 0.0,
    cash_drain: float = 0.0
) -> dict:
    stressed_equities = equity_assets * (1 - equity_drop_pct)
    equity_loss = equity_assets - stressed_equities
    
    stressed_cash = max(0.0, liquid_savings - cash_drain)
    stressed_expenses = monthly_expenses * (1 + expense_surge_pct) + monthly_debt
    stressed_income = monthly_income * (1 + income_cut_pct)
    stressed_surplus = max(0.0, stressed_income - stressed_expenses)
    
    stressed_runway = (stressed_cash / stressed_expenses) if stressed_expenses > 0 else 0.0
    stressed_net_worth = net_worth - equity_loss - cash_drain
    net_worth_delta = stressed_net_worth - net_worth

    resilience_score = 50
    if stressed_runway >= 6:
        resilience_score += 25
    elif stressed_runway >= 3:
        resilience_score += 15
    elif stressed_runway >= 1:
        resilience_score += 5
    else:
        resilience_score -= 15

    if stressed_surplus > 500:
        resilience_score += 15
    elif stressed_surplus > 0:
        resilience_score += 5
    else:
        resilience_score -= 15

    resilience_score = max(10, min(100, resilience_score))

    return {
        "stressed_net_worth": round(stressed_net_worth, 2),
        "net_worth_delta": round(net_worth_delta, 2),
        "stressed_liquid_runway_months": round(stressed_runway, 1),
        "stressed_monthly_surplus": round(stressed_surplus, 2),
        "resilience_score": resilience_score,
        "rating": "Fortress (High Resilience)" if resilience_score >= 80 else ("Sturdy" if resilience_score >= 60 else "Vulnerable")
    }
