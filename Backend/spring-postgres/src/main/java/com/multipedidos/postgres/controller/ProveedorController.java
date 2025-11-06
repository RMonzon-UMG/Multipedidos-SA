package com.multipedidos.postgres.controller;

import com.multipedidos.postgres.dto.ProveedorInput;
import com.multipedidos.postgres.entity.Proveedor;
import com.multipedidos.postgres.service.FacturaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/proveedores")
@Tag(name = "Proveedores", description = "API para gestion de proveedores")
public class ProveedorController {

    @Autowired
    private FacturaService facturaService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Registrar un proveedor", description = "Registra un nuevo proveedor en el sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Proveedor creado correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos invalidos")
    })
    public Proveedor crearProveedor(@RequestBody ProveedorInput input) {
        return facturaService.crearProveedor(input);
    }

    @GetMapping
    @Operation(summary = "Listar todos los proveedores", description = "Obtiene la lista completa de proveedores")
    @ApiResponse(responseCode = "200", description = "Lista de proveedores")
    public List<Proveedor> listarProveedores() {
        return facturaService.listarProveedores();
    }
}
