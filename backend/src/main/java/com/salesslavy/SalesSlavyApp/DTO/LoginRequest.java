package com.salesslavy.SalesSlavyApp.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
public class LoginRequest {
    private String username;

    private String password;
}
