package com.multipedidos.postgres.dto;

import com.multipedidos.postgres.entity.PedidoReferencia;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FacturaInput {
    private Long proveedorId;
    private List<PedidoReferencia> pedidos;
}
