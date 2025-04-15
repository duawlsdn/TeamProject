package com.example.cafekiosk.server;

import com.example.cafekiosk.model.Dessert;
import com.example.cafekiosk.model.Drink;
import com.example.cafekiosk.model.Order;
import com.example.cafekiosk.repository.DessertRepository;
import com.example.cafekiosk.repository.DrinkRepository;
import com.example.cafekiosk.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MenuService {
    @Autowired
    private DrinkRepository drinkRepository;

    @Autowired
    private DessertRepository dessertRepository;

    @Autowired
    private OrderRepository orderRepository;

    public List<Drink> getAllDrinks() {
        return drinkRepository.findAll();
    }

    public List<Dessert> getAllDessert() {
        return dessertRepository.findAll();
    }

    public Order createOrder(Order order) {
        order.setOrderDate(LocalDateTime.now());
        return orderRepository.save(order);
    }
}
