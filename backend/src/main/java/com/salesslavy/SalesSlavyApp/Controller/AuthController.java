package com.salesslavy.SalesSlavyApp.Controller;

import com.salesslavy.SalesSlavyApp.DTO.LoginRequest;
import com.salesslavy.SalesSlavyApp.Entity.User;
import com.salesslavy.SalesSlavyApp.Service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {
            User user = authService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
            String token = authService.generateToken(user);

            System.out.println("TOKEN: " + token);

//            Cookie cookie = new Cookie("authToken", token);
//            cookie.setHttpOnly(true);
//            cookie.setSecure(false); // Set to true if using HTTPS
//            cookie.setPath("/");
//            cookie.setMaxAge(3600); // 1 hour
//            response.addCookie(cookie);

            // Optional but useful
            response.addHeader("Set-Cookie",
                    String.format("authToken=%s; HttpOnly; Path=/; Max-Age=3600; SameSite=None", token));

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("token", token);
            responseBody.put("message", "Login successful");
            responseBody.put("role", user.getRole().name());
            responseBody.put("username", user.getUsername());

            return ResponseEntity.ok(responseBody);

        }catch (RuntimeException e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(
            HttpServletRequest request,
            HttpServletResponse response) {

        Map<String, String> result = new HashMap<>();

        try {
            User user =
                    (User) request.getAttribute("authenticatedUser");

            if (user != null) {
                authService.logout(user);
            }

            Cookie cookie = new Cookie("authToken", null);
            cookie.setHttpOnly(true);
            cookie.setMaxAge(0);
            cookie.setPath("/");
            response.addCookie(cookie);

            result.put("message", "Logout successful");

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();

            result.put("message", "Logout failed");

            return ResponseEntity.status(500).body(result);
        }
    }
}
