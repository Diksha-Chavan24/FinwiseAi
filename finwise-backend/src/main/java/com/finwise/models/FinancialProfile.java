package com.finwise.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "financial_profiles")
public class FinancialProfile {
    @Id
    private String id;
    private String userId;

    // Monthly Cashflow
    private double monthlyIncome;
    private double fixedExpenses;
    private double discretionaryExpenses;
    private double monthlyDebtPayments;

    // Asset balances
    private double liquidSavings;
    private double stocksAndMutualFunds;
    private double retirementAccounts;
    private double realEstate;
    private double cryptoAndOthers;

    // Liabilities
    private double mortgage;
    private double studentLoans;
    private double carLoans;
    private double creditCardDebt;
    private double otherDebts;

    // Protections & Dependents
    private int dependents;
    private boolean hasHealthInsurance;
    private boolean hasLifeInsurance;

    private Date updatedAt;
}
