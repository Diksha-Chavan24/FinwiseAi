package com.finwise.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health-score")
@CrossOrigin(origins = "*")
public class HealthScoreController {

    @PostMapping("/calculate")
    public ResponseEntity<?> calculateHealthScore(@RequestBody Map<String, Object> payload) {
        double monthlyIncome = Double.parseDouble(payload.getOrDefault("monthlyIncome", "10000").toString());
        double fixedExpenses = Double.parseDouble(payload.getOrDefault("fixedExpenses", "4000").toString());
        double liquidSavings = Double.parseDouble(payload.getOrDefault("liquidSavings", "25000").toString());
        double debtPayments = Double.parseDouble(payload.getOrDefault("monthlyDebtPayments", "500").toString());

        double totalExpenses = fixedExpenses + debtPayments;
        double monthlySurplus = Math.max(0, monthlyIncome - totalExpenses);
        double savingsRate = monthlyIncome > 0 ? (monthlySurplus / monthlyIncome) : 0;
        double runwayMonths = totalExpenses > 0 ? (liquidSavings / totalExpenses) : 0;

        int score = 50;
        if (runwayMonths >= 6) score += 20;
        else if (runwayMonths >= 3) score += 12;
        else score += 4;

        if (savingsRate >= 0.3) score += 20;
        else if (savingsRate >= 0.15) score += 12;
        else score += 4;

        score = Math.min(100, Math.max(10, score));

        Map<String, Object> response = new HashMap<>();
        response.put("score", score);
        response.put("runwayMonths", Math.round(runwayMonths * 10.0) / 10.0);
        response.put("monthlySurplus", monthlySurplus);
        response.put("savingsRate", savingsRate);

        return ResponseEntity.ok(response);
    }
}
