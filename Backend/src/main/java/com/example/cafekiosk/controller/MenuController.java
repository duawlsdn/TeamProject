package com.example.cafekiosk.controller;

import com.example.cafekiosk.model.Dessert;
import com.example.cafekiosk.model.Drink;
import com.example.cafekiosk.model.Order;
import com.example.cafekiosk.server.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MenuController {
    @Autowired
    private MenuService menuService;

    @GetMapping("/drinks")
    public List<Drink> getDrinks() {
        return menuService.getAllDrinks();
    }

    @GetMapping("/desserts")
    public List<Dessert> getDesserts() {
        return menuService.getAllDessert();
    }

    @PostMapping("/orders")
    public Order createOrder(@RequestBody Order order) {
        return menuService.createOrder(order);
    }
}
