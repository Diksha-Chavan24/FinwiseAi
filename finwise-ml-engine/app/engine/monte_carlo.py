import numpy as np

def run_monte_carlo(
    initial_investment: float = 50000.0,
    monthly_contribution: float = 1000.0,
    expected_annual_return: float = 0.09,
    annual_volatility: float = 0.14,
    years: int = 20,
    num_simulations: int = 1000
) -> dict:
    annual_contrib = monthly_contribution * 12
    simulations = np.zeros((num_simulations, years + 1))
    simulations[:, 0] = initial_investment

    for t in range(1, years + 1):
        # Generate random market returns using normal distribution
        random_returns = np.random.normal(expected_annual_return, annual_volatility, num_simulations)
        random_returns = np.maximum(random_returns, -0.60) # Floor at -60% crash
        simulations[:, t] = simulations[:, t - 1] * (1 + random_returns) + annual_contrib

    p10 = np.percentile(simulations, 10, axis=0)
    p50 = np.percentile(simulations, 50, axis=0)
    p90 = np.percentile(simulations, 90, axis=0)

    timeline = []
    for y in range(years + 1):
        timeline.append({
            "year_index": y,
            "p10_conservative": round(float(p10[y]), 2),
            "p50_expected": round(float(p50[y]), 2),
            "p90_optimistic": round(float(p90[y]), 2),
            "cumulative_contributed": round(initial_investment + annual_contrib * y, 2)
        })

    return {
        "summary": {
            "p10_terminal_wealth": round(float(p10[-1]), 2),
            "p50_terminal_wealth": round(float(p50[-1]), 2),
            "p90_terminal_wealth": round(float(p90[-1]), 2),
            "total_contributed": round(initial_investment + annual_contrib * years, 2),
            "iterations": num_simulations,
            "horizon_years": years
        },
        "timeline": timeline
    }
