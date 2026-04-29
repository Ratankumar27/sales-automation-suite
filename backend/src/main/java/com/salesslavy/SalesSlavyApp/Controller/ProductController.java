    package com.salesslavy.SalesSlavyApp.Controller;

    import com.salesslavy.SalesSlavyApp.Entity.Product;
    import com.salesslavy.SalesSlavyApp.Entity.User;
    import com.salesslavy.SalesSlavyApp.Service.ProductService;
    import jakarta.servlet.http.HttpServletRequest;
    import lombok.RequiredArgsConstructor;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RequestParam;
    import org.springframework.web.bind.annotation.RestController;

    import java.util.ArrayList;
    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;

    @RestController
    @RequestMapping("/api/products")
    @RequiredArgsConstructor
    public class ProductController {

        private final ProductService productService;

        @GetMapping
        public ResponseEntity<Map<String, Object>> getProducts(
                @RequestParam(required = false) String category,
                HttpServletRequest request) {
            try {
                // Retrieve authenticated user from the request attribute set by the filter
                User authenticatedUser = (User) request.getAttribute("authenticatedUser");
                if (authenticatedUser == null) {
                    return ResponseEntity.status(401).body(Map.of("error", "Unauthorized access"));
                }

                System.out.println("✅ User: " + authenticatedUser.getUsername());

                // Fetch products based on the category filter
                List<Product> products = productService.getProductsByCategory(category);

                System.out.println("📦 Products fetched: " + products.size());

                // Build the response
                Map<String, Object> response = new HashMap<>();
                // Add user info
                Map<String, String> userInfo = new HashMap<>();
                userInfo.put("name", authenticatedUser.getUsername());
                userInfo.put("role", authenticatedUser.getRole().name());
                response.put("user", userInfo);
                // Add product details
                List<Map<String, Object>> productList = new ArrayList<>();
                for (Product product : products) {
                    System.out.println("➡ Processing product ID: " + product.getProductId());

                    Map<String, Object> productDetails = new HashMap<>();
                    productDetails.put("product_id", product.getProductId());
                    productDetails.put("name", product.getName());
                    productDetails.put("description", product.getDescription());
                    productDetails.put("price", product.getPrice());
                    productDetails.put("stock", product.getStock());

                    System.out.println("🖼 Fetching images...");
                    // Fetch product images
                    List<String> images = productService.getProductImages(product.getProductId());
                    productDetails.put("images", images);
                    productList.add(productDetails);
                }
                response.put("products", productList);
                return ResponseEntity.ok(response);
            }catch (Exception e) {
                System.out.println("💥 ERROR OCCURRED:");
                e.printStackTrace(); // 🔥 VERY IMPORTANT

                return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
            }

        }
    }
