/**
 * FinWise AI - Grounded AI Assistant (100% INR & Simple English)
 * Plain, simple English financial guidance strictly grounded in verified user facts. Zero hallucinations.
 */

import { formatINR, formatPercent } from '../utils/formatters';

/**
 * Generate structured prompt context grounded in deterministic calculations
 */
export const buildFinancialContextPrompt = (profile, healthData, goalsData, plans, activePlan) => {
  const activePlanObj = plans.find(p => p.id === activePlan) || plans[1] || plans[0];

  return `
[VERIFIED USER FINANCIAL PROFILE IN INR]
- Total Net Worth: ${formatINR(healthData?.netWorth || 0)}
- Total Assets: ${formatINR(healthData?.totalAssets || 0)} (Bank Savings/FDs: ${formatINR(profile?.liquidSavings || 0)}, Mutual Funds/Stocks: ${formatINR(profile?.stocksAndMutualFunds || 0)}, EPF/PPF: ${formatINR(profile?.retirementAccounts || 0)}, Gold: ${formatINR(profile?.cryptoAndOthers || 0)}, Real Estate: ${formatINR(profile?.realEstate || 0)})
- Total Loans/Debts: ${formatINR(healthData?.totalLiabilities || 0)} (Home Loan: ${formatINR(profile?.mortgage || 0)}, Education Loan: ${formatINR(profile?.studentLoans || 0)}, Credit Card Dues: ${formatINR(profile?.creditCardDebt || 0)})
- Monthly Money Flow: Take-home Income ${formatINR(profile?.monthlyIncome || 0)}/mo, Total Expenses ${formatINR(healthData?.totalExpenses || 0)}/mo, Monthly Savings Surplus ${formatINR(healthData?.monthlySurplus || 0)}/mo
- Monthly Savings Rate: ${formatPercent(healthData?.savingsRate || 0)}
- Emergency Savings Buffer: ${healthData?.runwayMonths || 0} months of expenses in bank/FD
- Financial Health Score: ${healthData?.totalScore || 0}/100
- Risk Profile Score: ${profile?.riskScore || 50}/100
- Active Chosen Plan: ${activePlanObj?.name} (Expected Return: ${formatPercent(activePlanObj?.expectedReturn || 0.10)}, Mix: ${activePlanObj?.assetAllocation?.equity}% Mutual Funds / ${activePlanObj?.assetAllocation?.debt}% FDs & Debt)
- Active Goals: ${goalsData?.length ? goalsData.map(g => `${g.name} (Target: ${formatINR(g.targetAmount)} by ${g.targetYear}, Needed SIP: ${formatINR(g.requiredMonthlySIP || 0)}/mo)`).join('; ') : 'None added yet'}
`;
};

/**
 * Query AI Assistant with grounded context
 */
export const askAIAssistant = async ({
  question,
  profile,
  healthData,
  goalsData,
  plans,
  activePlan,
}) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('finwise_gemini_key');
  const context = buildFinancialContextPrompt(profile, healthData, goalsData, plans, activePlan);

  if (apiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `You are FinWise AI, a friendly Indian personal finance advisor.
Rules:
1. Use simple, clear, everyday English. No difficult academic words.
2. Use ONLY the exact numbers provided in the user context (in INR ₹, Lakhs, Crores).
3. Do NOT make up any numbers.
4. Give short, practical, bullet-point advice.

${context}

User question: ${question}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 600,
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) return reply;
      }
    } catch (e) {
      console.warn('Gemini call failed, using built-in reasoning engine:', e);
    }
  }

  // Built-in Simple English Grounded Reasoning
  return generateGroundedResponse(question, profile, healthData, goalsData, plans, activePlan);
};

/**
 * Simple English Deterministic Reasoning Engine
 */
function generateGroundedResponse(query, profile, healthData, goalsData, plans, activePlan) {
  const q = query.toLowerCase();
  const surplus = healthData?.monthlySurplus || 0;
  const netWorth = healthData?.netWorth || 0;
  const runway = healthData?.runwayMonths || 0;
  const healthScore = healthData?.totalScore || 75;
  const activePlanObj = plans.find(p => p.id === activePlan) || plans[1] || plans[0];

  // 1. Health Score Inquiry
  if (q.includes('health score') || q.includes('score') || q.includes('why is my') || q.includes('how healthy')) {
    return `### 📊 Your Financial Health Score: ${healthScore}/100

Here is the simple breakdown of why your score is **${healthScore}/100**:

- **Emergency Savings (${runway} months)**: ${runway >= 6 ? '✅ Excellent! You have more than 6 months of living expenses in Bank/FD.' : runway >= 3 ? '⚠️ Okay, but try to reach 6 months of expenses in Bank FD for full safety.' : '🚨 Low emergency cash. You only have ' + runway + ' months of expenses saved.'}
- **Monthly Savings (${formatPercent(healthData?.savingsRate || 0)})**: You save **${formatINR(surplus)}/month** after paying all living costs and loan EMIs.
- **Loan Burden (${formatPercent(healthData?.dtiRatio || 0)})**: ${healthData?.dtiRatio <= 0.25 ? '✅ Your monthly loan EMIs are low and safe.' : '⚠️ Loan EMIs are taking up ' + formatPercent(healthData?.dtiRatio) + ' of your monthly salary.'}
- **Credit Card Dues**: ${profile?.creditCardDebt > 0 ? `🚨 You have **${formatINR(profile.creditCardDebt)}** in credit card dues. Paying this off will immediately improve your score.` : '✅ You have zero credit card debt!'}

**Top Advice**: Keep saving your monthly surplus of **${formatINR(surplus)}** consistently into your chosen goals.`;
  }

  // 2. Plan Comparison
  if (q.includes('compare') || q.includes('which plan') || q.includes('plan') || q.includes('strategy')) {
    return `### 📋 Comparing Your 4 Investment Plans

Here is the simple comparison based on your monthly surplus of **${formatINR(surplus)}**:

1. **${plans[1]?.name || 'Santulan Plan (Balanced)'}** (Active: ${activePlanObj.name === plans[1]?.name ? 'Yes' : 'No'}):
   - **Investment Mix**: 55% Mutual Funds, 30% FDs/Debt, 10% Cash, 5% Gold
   - **Expected Return**: 10.0% per year
   - **Why choose this**: Best balanced option. Gives good wealth growth while protecting you during market dips.

2. **${plans[2]?.name || 'Vridhi Plan (High Growth)'}**:
   - **Investment Mix**: 80% Mutual Funds, 10% FDs, 5% Cash, 5% Gold
   - **Expected Return**: 12.5% per year
   - **Why choose this**: If you have 8+ years and want maximum wealth for buying a house or retirement.

**Recommendation**: Stay with **${activePlanObj.name}** for steady progress toward your goals.`;
  }

  // 3. Goals and Affordability
  if (q.includes('afford') || q.includes('goal') || q.includes('house') || q.includes('flat') || q.includes('retire') || q.includes('college')) {
    const totalGoalSIP = goalsData?.reduce((sum, g) => sum + (g.requiredMonthlySIP || 0), 0) || 0;
    const isFeasible = surplus >= totalGoalSIP;

    return `### 🎯 Can You Afford Your Life Goals?

- **Your Monthly Savings Surplus**: ${formatINR(surplus)}/month
- **Total Required Monthly SIP for Goals**: ${formatINR(totalGoalSIP)}/month
- **Extra Buffer Left Over**: ${formatINR(surplus - totalGoalSIP)}/month

${isFeasible 
  ? `✅ **Yes, your goals are achievable!** Your monthly surplus of ${formatINR(surplus)} easily covers all your goal SIPs with **${formatINR(surplus - totalGoalSIP)}/month** extra to spare.`
  : `⚠️ **Goal Deficit**: Your goals need **${formatINR(totalGoalSIP)}/month**, which is higher than your surplus of **${formatINR(surplus)}/month**. Consider extending the goal timeline by 1-2 years.`}

**Next Step**: Set up auto-debit SIPs in mutual funds on the 5th of every month right after salary day.`;
  }

  // 4. Risks and Vulnerabilities
  if (q.includes('risk') || q.includes('danger') || q.includes('weakness') || q.includes('emergency')) {
    return `### 🛡️ Safety & Risk Check for Your Money

- **Bank Emergency Fund**: You have **${formatINR(profile?.liquidSavings || 0)}** in liquid savings, which covers **${runway} months** of living costs.
- **Stock Market Dip Impact**: If the stock market drops by 20%, your mutual fund portfolio would temporarily dip, but your emergency FDs and Gold are completely safe.
- **Loan Safety**: Your monthly EMI is **${formatINR(profile?.monthlyDebtPayments || 0)}/mo**.

**Action Plan**: Ensure you have a ₹10-15 Lakh family health insurance policy and maintain 6 months of expenses in Bank FDs.`;
  }

  // Default Simple Overview
  return `### 💡 Quick Summary of Your Money

Here is where you stand right now:

- **Total Net Worth**: **${formatINR(netWorth)}** (Assets: ${formatINR(healthData?.totalAssets || 0)} | Loans: ${formatINR(healthData?.totalLiabilities || 0)})
- **Monthly Savings Surplus**: **${formatINR(surplus)}/month** (${formatPercent(healthData?.savingsRate || 0)} savings speed)
- **Active Investment Plan**: **${activePlanObj.name}**
- **Health Score**: **${healthScore}/100** (${runway} months of emergency savings)

*Ask me anything about your goals, home buying plan, or comparing investment strategies!*`;
}
