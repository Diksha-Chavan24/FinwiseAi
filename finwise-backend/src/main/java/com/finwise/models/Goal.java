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
@Document(collection = "financial_goals")
public class Goal {
    @Id
    private String id;
    private String userId;
    private String name;
    private String category;
    private double targetAmount;
    private double currentAmount;
    private int targetYear;
    private String priority; // 'High' | 'Medium' | 'Low'
    private double expectedReturn;
    private double inflationRate;
    private String icon;
    private Date createdAt;
}
