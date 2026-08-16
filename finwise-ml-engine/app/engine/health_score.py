import numpy as np

def compute_health_score(monthly_income: float, fixed_expenses: float, liquid_savings: float, debt_payments: float, credit_card_debt: float = 0.0) -> dict:
    total_expenses = fixed_expenses + debt_payments
    monthly_surplus = max(0.0, monthly_income - total_expenses)
    savings_rate = (monthly_surplus / monthly_income) if monthly_income > 0 else 0.0
    dti_ratio = (debt_payments / monthly_income) if monthly_income > 0 else 0.0
    runway_months = (liquid_savings / total_expenses) if total_expenses > 0 else 0.0

    # 1. Runway score (0-20)
    if runway_months >= 6:
        emergency_score = 20
    elif runway_months >= 3:
        emergency_score = 14 + ((runway_months - 3) / 3) * 6
    else:
        emergency_score = min(10.0, runway_months * 3.3)

    # 2. Debt Score (0-20)
    if dti_ratio <= 0.15:
        debt_score = 20
    elif dti_ratio <= 0.35:
        debt_score = 14 - ((dti_ratio - 0.15) / 0.20) * 8
    else:
        debt_score = max(2.0, 6 - (dti_ratio - 0.35) * 10)
    
    if credit_card_debt > 1500:
        debt_score = max(2.0, debt_score - 6)

    # 3. Savings Score (0-20)
    if savings_rate >= 0.30:
        savings_score = 20
    elif savings_rate >= 0.15:
        savings_score = 12 + ((savings_rate - 0.15) / 0.15) * 8
    else:
        savings_score = max(2.0, (savings_rate / 0.15) * 12)

    total_score = int(np.clip(emergency_score + debt_score + savings_score + 25, 10, 100))

    return {
        "health_score": total_score,
        "runway_months": round(runway_months, 1),
        "monthly_surplus": round(monthly_surplus, 2),
        "savings_rate": round(savings_rate, 4),
        "dti_ratio": round(dti_ratio, 4),
    }
