package com.multipedidos.mariadb.service;

import com.multipedidos.common.OperacionesNegocio;
import com.multipedidos.mariadb.dto.ClienteInput;
import com.multipedidos.mariadb.dto.PedidoInput;
import com.multipedidos.mariadb.entity.Cliente;
import com.multipedidos.mariadb.entity.Pedido;
import com.multipedidos.mariadb.entity.Producto;
import com.multipedidos.mariadb.repository.ClienteRepository;
import com.multipedidos.mariadb.repository.PedidoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class PedidoService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    public Cliente crearCliente(ClienteInput input) {
        log.info("Creando cliente: {}", input.getNombre());
        Cliente cliente = new Cliente();
        cliente.setNombre(input.getNombre());
        cliente.setCorreo(input.getCorreo());
        Cliente clienteGuardado = clienteRepository.save(cliente);
        log.info("Cliente creado con ID: {}", clienteGuardado.getId());
        return clienteGuardado;
    }

    public Optional<Cliente> obtenerClientePorId(Long id) {
        log.debug("Obteniendo cliente con ID: {}", id);
        return clienteRepository.findById(id);
    }

    public List<Cliente> listarClientes() {
        log.debug("Listando todos los clientes");
        return clienteRepository.findAll();
    }

    public Pedido crearPedido(PedidoInput input) {
        log.info("Creando pedido para cliente ID: {}", input.getClienteId());

        double subtotal = input.getProductos().stream()
                .mapToDouble(Producto::getPrecio)
                .sum();
        log.debug("Subtotal calculado: {}", subtotal);

        double totalConIVA = OperacionesNegocio.calcularTotalConIVA(subtotal);
        log.debug("Total con IVA (12%): {}", totalConIVA);

        Pedido pedido = new Pedido();
        pedido.setClienteId(input.getClienteId());
        pedido.setProductos(input.getProductos());
        pedido.setTotal(totalConIVA);

        Pedido pedidoGuardado = pedidoRepository.save(pedido);
        log.info("Pedido creado con ID: {} y total: {}", pedidoGuardado.getId(), pedidoGuardado.getTotal());

        return pedidoGuardado;
    }

    public Optional<Pedido> obtenerPedidoPorId(Long id) {
        log.debug("Obteniendo pedido con ID: {}", id);
        return pedidoRepository.findById(id);
    }

    public List<Pedido> listarPedidos() {
        log.debug("Listando todos los pedidos");
        return pedidoRepository.findAll();
    }

    public List<Pedido> obtenerPedidosPorClienteId(Long clienteId) {
        log.debug("Obteniendo pedidos del cliente ID: {}", clienteId);
        return pedidoRepository.findByClienteId(clienteId);
    }
}
