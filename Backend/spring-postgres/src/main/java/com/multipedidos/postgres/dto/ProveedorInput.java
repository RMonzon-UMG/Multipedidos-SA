package com.multipedidos.postgres.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProveedorInput {
    private String nombre;
    private String correo;
}
