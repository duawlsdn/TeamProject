package com.example.cafekiosk.repository;

import com.example.cafekiosk.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
