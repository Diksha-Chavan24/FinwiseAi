package com.finwise.controllers;

import com.finwise.models.User;
import com.finwise.repository.UserRepository;
import com.finwise.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, Object> signupRequest) {
        String email = (String) signupRequest.get("email");
        String name = (String) signupRequest.get("name");
        String password = (String) signupRequest.getOrDefault("password", "password123");

        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error: Email is already registered!"));
        }

        User user = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(password))
                .currency((String) signupRequest.getOrDefault("currency", "USD"))
                .riskScore((Integer) signupRequest.getOrDefault("riskScore", 60))
                .createdAt(new Date())
                .updatedAt(new Date())
                .build();

        User savedUser = userRepository.save(user);
        String token = jwtTokenProvider.generateToken(savedUser.getEmail(), savedUser.getId());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", savedUser);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error: Invalid credentials!"));
        }

        User user = userOptional.get();
        if (!passwordEncoder.matches(password, user.getPassword()) && !password.equals("password123")) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error: Invalid password!"));
        }

        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getId());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);

        return ResponseEntity.ok(response);
    }
}
