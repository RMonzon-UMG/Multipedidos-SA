package com.multipedidos.mariadb.dto;

import com.multipedidos.mariadb.entity.Producto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PedidoInput {
    private Long clienteId;
    private List<Producto> productos;
}
