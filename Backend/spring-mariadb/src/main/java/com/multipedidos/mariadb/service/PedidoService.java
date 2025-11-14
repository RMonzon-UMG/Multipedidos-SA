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

    public Optional<Cliente> actualizarCliente(Long id, ClienteInput input) {
        log.info("Actualizando cliente con ID: {}", id);
        return clienteRepository.findById(id).map(cliente -> {
            cliente.setNombre(input.getNombre());
            cliente.setCorreo(input.getCorreo());
            Cliente clienteActualizado = clienteRepository.save(cliente);
            log.info("Cliente actualizado con ID: {}", clienteActualizado.getId());
            return clienteActualizado;
        });
    }

    public boolean eliminarCliente(Long id) {
        log.info("Eliminando cliente con ID: {}", id);
        if (clienteRepository.existsById(id)) {
            clienteRepository.deleteById(id);
            log.info("Cliente eliminado con ID: {}", id);
            return true;
        }
        log.warn("Cliente no encontrado con ID: {}", id);
        return false;
    }

    public Optional<Pedido> actualizarPedido(Long id, PedidoInput input) {
        log.info("Actualizando pedido con ID: {}", id);
        return pedidoRepository.findById(id).map(pedido -> {
            double subtotal = input.getProductos().stream()
                    .mapToDouble(Producto::getPrecio)
                    .sum();
            log.debug("Subtotal recalculado: {}", subtotal);

            double totalConIVA = OperacionesNegocio.calcularTotalConIVA(subtotal);
            log.debug("Total con IVA recalculado (12%): {}", totalConIVA);

            pedido.setClienteId(input.getClienteId());
            pedido.setProductos(input.getProductos());
            pedido.setTotal(totalConIVA);

            Pedido pedidoActualizado = pedidoRepository.save(pedido);
            log.info("Pedido actualizado con ID: {} y total: {}", pedidoActualizado.getId(), pedidoActualizado.getTotal());
            return pedidoActualizado;
        });
    }

    public boolean eliminarPedido(Long id) {
        log.info("Eliminando pedido con ID: {}", id);
        if (pedidoRepository.existsById(id)) {
            pedidoRepository.deleteById(id);
            log.info("Pedido eliminado con ID: {}", id);
            return true;
        }
        log.warn("Pedido no encontrado con ID: {}", id);
        return false;
    }
}
