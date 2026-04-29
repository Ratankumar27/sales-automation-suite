package com.salesslavy.SalesSlavyApp.Controller;

import com.salesslavy.SalesSlavyApp.Entity.User;
import com.salesslavy.SalesSlavyApp.Repository.UserRepository;
import com.salesslavy.SalesSlavyApp.Service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    private final UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<Void> addToCart(@RequestBody Map<String, Object> request) {

        String username = request.get("username").toString();
        int productId = Integer.parseInt(request.get("productId").toString());

        int quantity = request.containsKey("quantity")
                ? Integer.parseInt(request.get("quantity").toString())
                : 1;

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        cartService.addToCart(user.getUserId(), productId, quantity);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Fetch all cart items for the user (based on username)
    @GetMapping("/items")
    public ResponseEntity<?> getCartItems(@RequestParam String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Map<String, Object> cartItems = cartService.getCartItems(user.getUserId());

        return ResponseEntity.ok(cartItems);
    }

    @GetMapping("/items/count")
    public ResponseEntity<Integer> getCartCount(@RequestParam String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Map<String, Object> cartData = cartService.getCartItems(user.getUserId());

        int count = 0;

        if (cartData.get("cart") != null) {
            Map<String, Object> cart = (Map<String, Object>) cartData.get("cart");

            if (cart.get("products") != null) {
                count = ((java.util.List<?>) cart.get("products")).size();
            }
        }

        return ResponseEntity.ok(count);
    }

    @PutMapping("/update")
    public ResponseEntity<Void> updateCartItemQuantity(@RequestBody Map<String, Object> request) {
        String username = (String) request.get("username");
        int productId = Integer.parseInt(request.get("productId").toString());
        int quantity = Integer.parseInt(request.get("quantity").toString());
        // Fetch the user using username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));

        // Update the cart item quantity
        cartService.updateCartItemQuantity(user.getUserId(), productId, quantity);
        return ResponseEntity.status(HttpStatus.OK).build();

    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteCartItem(@RequestBody Map<String, Object> request) {
        String username = (String) request.get("username");
        int productId = Integer.parseInt(request.get("productId").toString());

        // Fetch the user using username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));

        // Delete the cart item
        cartService.deleteCartItem(user.getUserId(), productId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

    }
}
