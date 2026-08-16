package com.finwise.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "financial_plans")
public class Plan {
    @Id
    private String id;
    private String userId;
    private String planKey; // 'plan-conservative', 'plan-balanced', etc.
    private String name;
    private String badge;
    private String tagline;
    private double expectedReturn;
    private double volatility;
    private Map<String, Integer> assetAllocation; // { "equity": 55, "debt": 30, ... }
    private double monthlySIPRatio;
    private List<String> features;
    private String pros;
    private String cons;
    private String recommendedFor;
    private boolean isSelected;
}
