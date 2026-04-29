package com.salesslavy.SalesSlavyApp.Service;

import com.salesslavy.SalesSlavyApp.Entity.OrderItem;
import com.salesslavy.SalesSlavyApp.Entity.Product;
import com.salesslavy.SalesSlavyApp.Entity.ProductImage;
import com.salesslavy.SalesSlavyApp.Entity.User;
import com.salesslavy.SalesSlavyApp.Repository.OrderItemRepository;
import com.salesslavy.SalesSlavyApp.Repository.ProductImageRepository;
import com.salesslavy.SalesSlavyApp.Repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderItemRepository orderItemRepository;

    private final ProductRepository productRepository;

    private final ProductImageRepository productImageRepository;

    /**
     * Fetches all successful orders for a given user and returns the required response format.
     *
     * @param user The authenticated user object.
     * @return A map containing the user's role, username, and ordered products.
     */
    public Map<String, Object> getOrdersForUser(User user) {

        // Fetch all successful order items for the user
        List<OrderItem> orderItems = orderItemRepository.findSuccessfulOrderItemsByUserId(user.getUserId());

        // Prepare response map
        Map<String, Object> response = new HashMap<>();
        response.put("username", user.getUsername());
        response.put("role", user.getRole());

        // Transform order items into a list of product details
        List<Map<String, Object>> products = new ArrayList<>();

        for (OrderItem item : orderItems) {

            Product product = productRepository.findById(item.getProductId()).orElse(null);

            if (product == null) {
                continue; // Skip if product does not exist
            }

            // Fetch product image (if available)
            List<ProductImage> images = productImageRepository.findByProduct_ProductId(product.getProductId());

            String imageUrl = images.isEmpty() ? null : images.get(0).getImageUrl();

            // Create product details map
            Map<String, Object> productDetails = new HashMap<>();

            productDetails.put("order_id", item.getOrder().getOrderId());

            productDetails.put("quantity", item.getQuantity());

            productDetails.put("total_price", item.getTotalPrice());

            productDetails.put("image_url", imageUrl);

            productDetails.put("product_id", product.getProductId());

            productDetails.put("name", product.getName());

            productDetails.put("description", product.getDescription());

            productDetails.put("price_per_unit", item.getPricePerUnit());

            products.add(productDetails);
        }

        // Add products list to response
        response.put("products", products);

        return response;
    }
}