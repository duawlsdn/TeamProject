package com.example.cafekiosk.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "drinks")
@Getter
@Setter
public class Drink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    private String path;

    @Column(name = "base_price", nullable = false)
    private int basePrice;
    private String image;

    public Drink(String name, String path, int basePrice, String image){
        this.name = name;
        this.path = path;
        this.basePrice = basePrice;
        this.image = image;
    }

    public Drink() {}

}
