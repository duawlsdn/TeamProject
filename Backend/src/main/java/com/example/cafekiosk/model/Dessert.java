package com.example.cafekiosk.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "dessert")
@Getter
@Setter
public class Dessert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int price;

    private String image;

    public Dessert(String name, int price, String image){
        this.name = name;
        this.price = price;
        this.image = image;
    }

    public Dessert() {}
}
