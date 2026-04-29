package com.salesslavy.SalesSlavyApp.Repository;

import com.salesslavy.SalesSlavyApp.Entity.JWTToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface JwtTokenRepository extends JpaRepository<JWTToken, Integer> {

    @Query("SELECT t FROM JWTToken t where t.user.userId = :userId")
    JWTToken findByUserId(@Param("userId") int userId);

    Optional<JWTToken> findByToken(String token);

    @Modifying
    @Transactional
    @Query("DELETE FROM JWTToken t WHERE t.user.userId = :userId")
    void deleteByUserId(@Param("userId") int userId);
}
