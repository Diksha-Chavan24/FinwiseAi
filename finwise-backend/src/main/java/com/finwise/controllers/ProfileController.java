package com.finwise.controllers;

import com.finwise.models.FinancialProfile;
import com.finwise.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    @Autowired
    private ProfileRepository profileRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<FinancialProfile> getProfile(@PathVariable String userId) {
        Optional<FinancialProfile> profile = profileRepository.findByUserId(userId);
        return profile.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{userId}")
    public ResponseEntity<FinancialProfile> saveOrUpdateProfile(
            @PathVariable String userId,
            @RequestBody FinancialProfile newProfileData) {
        
        Optional<FinancialProfile> existing = profileRepository.findByUserId(userId);
        FinancialProfile profileToSave = existing.orElse(new FinancialProfile());

        profileToSave.setUserId(userId);
        profileToSave.setMonthlyIncome(newProfileData.getMonthlyIncome());
        profileToSave.setFixedExpenses(newProfileData.getFixedExpenses());
        profileToSave.setDiscretionaryExpenses(newProfileData.getDiscretionaryExpenses());
        profileToSave.setMonthlyDebtPayments(newProfileData.getMonthlyDebtPayments());

        profileToSave.setLiquidSavings(newProfileData.getLiquidSavings());
        profileToSave.setStocksAndMutualFunds(newProfileData.getStocksAndMutualFunds());
        profileToSave.setRetirementAccounts(newProfileData.getRetirementAccounts());
        profileToSave.setRealEstate(newProfileData.getRealEstate());
        profileToSave.setCryptoAndOthers(newProfileData.getCryptoAndOthers());

        profileToSave.setMortgage(newProfileData.getMortgage());
        profileToSave.setStudentLoans(newProfileData.getStudentLoans());
        profileToSave.setCarLoans(newProfileData.getCarLoans());
        profileToSave.setCreditCardDebt(newProfileData.getCreditCardDebt());
        profileToSave.setOtherDebts(newProfileData.getOtherDebts());

        profileToSave.setDependents(newProfileData.getDependents());
        profileToSave.setHasHealthInsurance(newProfileData.isHasHealthInsurance());
        profileToSave.setHasLifeInsurance(newProfileData.isHasLifeInsurance());
        profileToSave.setUpdatedAt(new Date());

        FinancialProfile saved = profileRepository.save(profileToSave);
        return ResponseEntity.ok(saved);
    }
}
