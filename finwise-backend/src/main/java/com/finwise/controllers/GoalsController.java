package com.finwise.controllers;

import com.finwise.models.Goal;
import com.finwise.repository.GoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "*")
public class GoalsController {

    @Autowired
    private GoalRepository goalRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Goal>> getUserGoals(@PathVariable String userId) {
        return ResponseEntity.ok(goalRepository.findByUserId(userId));
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<Goal> createGoal(@PathVariable String userId, @RequestBody Goal goal) {
        goal.setUserId(userId);
        goal.setCreatedAt(new Date());
        return ResponseEntity.ok(goalRepository.save(goal));
    }

    @PutMapping("/{goalId}")
    public ResponseEntity<Goal> updateGoal(@PathVariable String goalId, @RequestBody Goal updatedData) {
        return goalRepository.findById(goalId)
                .map(existing -> {
                    existing.setName(updatedData.getName());
                    existing.setCategory(updatedData.getCategory());
                    existing.setTargetAmount(updatedData.getTargetAmount());
                    existing.setCurrentAmount(updatedData.getCurrentAmount());
                    existing.setTargetYear(updatedData.getTargetYear());
                    existing.setPriority(updatedData.getPriority());
                    existing.setExpectedReturn(updatedData.getExpectedReturn());
                    existing.setInflationRate(updatedData.getInflationRate());
                    return ResponseEntity.ok(goalRepository.save(existing));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{goalId}")
    public ResponseEntity<?> deleteGoal(@PathVariable String goalId) {
        goalRepository.deleteById(goalId);
        return ResponseEntity.ok().build();
    }
}
