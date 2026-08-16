package com.finwise.repository;

import com.finwise.models.Plan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlanRepository extends MongoRepository<Plan, String> {
    List<Plan> findByUserId(String userId);
    Optional<Plan> findByUserIdAndIsSelectedTrue(String userId);
}
