package com.multipedidos.mariadb.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Producto {

    private String nombre;
    private Double precio;
}
