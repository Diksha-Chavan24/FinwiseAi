package com.finwise.controllers;

import com.finwise.models.Plan;
import com.finwise.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "*")
public class PlansController {

    @Autowired
    private PlanRepository planRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Plan>> getUserPlans(@PathVariable String userId) {
        return ResponseEntity.ok(planRepository.findByUserId(userId));
    }

    @PostMapping("/user/{userId}/select/{planId}")
    public ResponseEntity<?> selectActivePlan(@PathVariable String userId, @PathVariable String planId) {
        List<Plan> userPlans = planRepository.findByUserId(userId);
        for (Plan p : userPlans) {
            p.setSelected(p.getId().equals(planId) || p.getPlanKey().equals(planId));
            planRepository.save(p);
        }
        return ResponseEntity.ok(Map.of("message", "Active plan updated successfully."));
    }
}
