package com.salesslavy.SalesSlavyApp.Service;

import com.salesslavy.SalesSlavyApp.Entity.User;
import com.salesslavy.SalesSlavyApp.Repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public User registerUser(User user) {

        if(userRepository.findByUsername(user.getUsername() ).isPresent()) {
            throw new RuntimeException("User name already exists");
        }

        if(userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("email already exists.");
        }


        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }


}
