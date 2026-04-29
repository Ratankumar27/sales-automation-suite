package com.salesslavy.SalesSlavyApp.Service;

import com.salesslavy.SalesSlavyApp.Entity.Category;
import com.salesslavy.SalesSlavyApp.Entity.Product;
import com.salesslavy.SalesSlavyApp.Entity.ProductImage;
import com.salesslavy.SalesSlavyApp.Repository.CategoryRepository;
import com.salesslavy.SalesSlavyApp.Repository.ProductImageRepository;
import com.salesslavy.SalesSlavyApp.Repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductImageRepository productImageRepository;

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    public List<Product> getProductsByCategory(String categoryName) {

        if(categoryName!=null && !categoryName.isEmpty()){
            Optional<Category> categoryOpt = categoryRepository.findByCategoryNameIgnoreCase(categoryName);

            if(categoryOpt.isPresent()) {
                System.out.println("Category received: " + categoryName);
                Category category = categoryOpt.get();
                return productRepository.findByCategory_CategoryId(category.getCategoryId());
            }else{
//                throw new RuntimeException("Category not found");
                return new ArrayList<>();
            }
        }else{
            return productRepository.findAll();
        }
    }

    public List<String> getProductImages(Integer product_id) {
        List<ProductImage> productImages = productImageRepository.findByProduct_ProductId(product_id);
        List<String> imageUrls = new ArrayList<>();
        for(ProductImage image: productImages) {
            imageUrls.add(image.getImage_url());
        }

        return imageUrls;
    }
}
