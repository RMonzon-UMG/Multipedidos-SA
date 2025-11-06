package com.multipedidos.postgres.controller;

import com.multipedidos.postgres.dto.FacturaInput;
import com.multipedidos.postgres.entity.Factura;
import com.multipedidos.postgres.service.FacturaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/facturas")
@Tag(name = "Facturas", description = "API para gestion de facturas")
public class FacturaController {

    @Autowired
    private FacturaService facturaService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Registrar una factura", description = "Registra una nueva factura calculando el total")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Factura registrada correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos invalidos")
    })
    public Factura crearFactura(@RequestBody FacturaInput input) {
        return facturaService.crearFactura(input);
    }

    @GetMapping
    @Operation(summary = "Listar todas las facturas", description = "Obtiene la lista completa de facturas")
    @ApiResponse(responseCode = "200", description = "Lista de facturas")
    public List<Factura> listarFacturas() {
        return facturaService.listarFacturas();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener factura por ID", description = "Busca una factura especifica por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Factura encontrada"),
            @ApiResponse(responseCode = "404", description = "Factura no encontrada")
    })
    public ResponseEntity<Factura> obtenerFacturaPorId(@PathVariable Long id) {
        return facturaService.obtenerFacturaPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
