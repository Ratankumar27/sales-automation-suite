package com.salesslavy.SalesSlavyApp.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="category_id" )
    private Integer categoryId;

    @Column(nullable = false, unique = true)
    private String categoryName;

    public Category(String name) {
        super();
        this.categoryName = name;
    }
}
