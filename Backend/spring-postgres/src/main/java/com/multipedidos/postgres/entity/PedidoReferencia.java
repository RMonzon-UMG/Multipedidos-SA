package com.multipedidos.postgres.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PedidoReferencia {

    private Long pedidoId;
    private Double total;
}
