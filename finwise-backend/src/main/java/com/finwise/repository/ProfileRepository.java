package com.finwise.repository;

import com.finwise.models.FinancialProfile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends MongoRepository<FinancialProfile, String> {
    Optional<FinancialProfile> findByUserId(String userId);
}
