package com.multipedidos.postgres.service;

import com.multipedidos.postgres.client.ComponenteAClient;
import com.multipedidos.postgres.dto.FacturaInput;
import com.multipedidos.postgres.dto.ProveedorInput;
import com.multipedidos.postgres.entity.Factura;
import com.multipedidos.postgres.entity.PedidoReferencia;
import com.multipedidos.postgres.entity.Proveedor;
import com.multipedidos.postgres.repository.FacturaRepository;
import com.multipedidos.postgres.repository.ProveedorRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class FacturaService {

    @Autowired
    private ProveedorRepository proveedorRepository;

    @Autowired
    private FacturaRepository facturaRepository;

    @Autowired
    private ComponenteAClient componenteAClient;

    public Proveedor crearProveedor(ProveedorInput input) {
        log.info("Creando proveedor: {}", input.getNombre());
        Proveedor proveedor = new Proveedor();
        proveedor.setNombre(input.getNombre());
        proveedor.setCorreo(input.getCorreo());
        Proveedor proveedorGuardado = proveedorRepository.save(proveedor);
        log.info("Proveedor creado con ID: {}", proveedorGuardado.getId());
        return proveedorGuardado;
    }

    public Optional<Proveedor> obtenerProveedorPorId(Long id) {
        log.debug("Obteniendo proveedor con ID: {}", id);
        return proveedorRepository.findById(id);
    }

    public List<Proveedor> listarProveedores() {
        log.debug("Listando todos los proveedores");
        return proveedorRepository.findAll();
    }

    public Factura crearFactura(FacturaInput input) {
        log.info("Creando factura para proveedor ID: {}", input.getProveedorId());

        double totalFactura = input.getPedidos().stream()
                .mapToDouble(PedidoReferencia::getTotal)
                .sum();
        log.debug("Total de factura calculado: {}", totalFactura);

        Factura factura = new Factura();
        factura.setProveedorId(input.getProveedorId());
        factura.setPedidos(input.getPedidos());
        factura.setTotalFactura(totalFactura);

        Factura facturaGuardada = facturaRepository.save(factura);
        log.info("Factura creada con ID: {} y total: {}", facturaGuardada.getId(), facturaGuardada.getTotalFactura());

        return facturaGuardada;
    }

    public Optional<Factura> obtenerFacturaPorId(Long id) {
        log.debug("Obteniendo factura con ID: {}", id);
        return facturaRepository.findById(id);
    }

    public List<Factura> listarFacturas() {
        log.debug("Listando todas las facturas");
        return facturaRepository.findAll();
    }

    public List<Object> consultarPedidosDeComponenteA(Long clienteId) {
        log.info("Consultando pedidos del cliente {} desde Componente A", clienteId);
        return componenteAClient.getPedidosByClienteId(clienteId);
    }
}
