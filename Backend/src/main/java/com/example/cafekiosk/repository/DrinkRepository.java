package com.example.cafekiosk.repository;

import com.example.cafekiosk.model.Drink;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrinkRepository extends JpaRepository<Drink, Long> {
}
