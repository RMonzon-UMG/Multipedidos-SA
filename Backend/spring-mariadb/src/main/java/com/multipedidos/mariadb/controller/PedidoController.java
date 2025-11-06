package com.multipedidos.mariadb.controller;

import com.multipedidos.mariadb.dto.PedidoInput;
import com.multipedidos.mariadb.entity.Pedido;
import com.multipedidos.mariadb.service.PedidoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
@Tag(name = "Pedidos", description = "API para gestion de pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Crear un pedido", description = "Registra un nuevo pedido calculando el total con IVA")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Pedido creado correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos invalidos")
    })
    public Pedido crearPedido(@RequestBody PedidoInput input) {
        return pedidoService.crearPedido(input);
    }

    @GetMapping
    @Operation(summary = "Listar pedidos", description = "Obtiene todos los pedidos o filtra por clienteId si se proporciona")
    @ApiResponse(responseCode = "200", description = "Lista de pedidos")
    public List<Pedido> listarPedidos(
            @Parameter(description = "ID del cliente para filtrar pedidos")
            @RequestParam(required = false) Long clienteId) {
        if (clienteId != null) {
            return pedidoService.obtenerPedidosPorClienteId(clienteId);
        }
        return pedidoService.listarPedidos();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener un pedido por ID", description = "Busca un pedido especifico por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pedido encontrado"),
            @ApiResponse(responseCode = "404", description = "Pedido no encontrado")
    })
    public ResponseEntity<Pedido> obtenerPedidoPorId(@PathVariable Long id) {
        return pedidoService.obtenerPedidoPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
