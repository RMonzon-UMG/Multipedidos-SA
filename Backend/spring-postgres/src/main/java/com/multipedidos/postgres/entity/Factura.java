package com.multipedidos.postgres.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "facturas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Factura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long proveedorId;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "factura_pedidos", joinColumns = @JoinColumn(name = "factura_id"))
    private List<PedidoReferencia> pedidos;

    @Column(nullable = false)
    private Double totalFactura;
}
