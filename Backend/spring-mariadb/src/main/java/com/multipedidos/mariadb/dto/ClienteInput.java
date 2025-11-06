package com.multipedidos.mariadb.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClienteInput {
    private String nombre;
    private String correo;
}
