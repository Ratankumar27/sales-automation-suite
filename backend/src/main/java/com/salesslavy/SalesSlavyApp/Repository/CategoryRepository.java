package com.salesslavy.SalesSlavyApp.Repository;

import com.salesslavy.SalesSlavyApp.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface  CategoryRepository extends JpaRepository<Category, Integer> {

    Optional<Category> findByCategoryNameIgnoreCase(String category_name);

}
