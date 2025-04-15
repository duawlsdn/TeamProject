package com.example.cafekiosk.repository;

import com.example.cafekiosk.model.Dessert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DessertRepository extends JpaRepository<Dessert, Long> {
}
