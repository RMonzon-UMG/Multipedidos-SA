package com.multipedidos.common;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests unitarios para la clase OperacionesNegocio
 */
class OperacionesNegocioTest {

    // Tests para calcularTotalConIVA

    @Test
    void testCalcularTotalConIVA_SubtotalCien() {
        double resultado = OperacionesNegocio.calcularTotalConIVA(100.0);
        assertEquals(112.0, resultado, 0.01, "El total con IVA de 100 debe ser 112");
    }

    @Test
    void testCalcularTotalConIVA_SubtotalCero() {
        double resultado = OperacionesNegocio.calcularTotalConIVA(0.0);
        assertEquals(0.0, resultado, 0.01, "El total con IVA de 0 debe ser 0");
    }

    // Tests para aplicarDescuento

    @Test
    void testAplicarDescuento_DiezPorciento() {
        double resultado = OperacionesNegocio.aplicarDescuento(100.0, 10.0);
        assertEquals(90.0, resultado, 0.01, "El total con 10% de descuento debe ser 90");
    }

    @Test
    void testAplicarDescuento_CincuentaPorciento() {
        double resultado = OperacionesNegocio.aplicarDescuento(200.0, 50.0);
        assertEquals(100.0, resultado, 0.01, "El total con 50% de descuento debe ser 100");
    }

    @Test
    void testAplicarDescuento_CeroPorciento() {
        double resultado = OperacionesNegocio.aplicarDescuento(100.0, 0.0);
        assertEquals(100.0, resultado, 0.01, "El total con 0% de descuento debe ser 100");
    }

    // Tests para validarCodigo

    @Test
    void testValidarCodigo_FormatoValido() {
        boolean resultado = OperacionesNegocio.validarCodigo("ABC-1234");
        assertTrue(resultado, "El codigo ABC-1234 debe ser valido");
    }

    @Test
    void testValidarCodigo_LetrasMinusculas() {
        boolean resultado = OperacionesNegocio.validarCodigo("abc-1234");
        assertFalse(resultado, "El codigo con letras minusculas no debe ser valido");
    }

    @Test
    void testValidarCodigo_DosLetras() {
        boolean resultado = OperacionesNegocio.validarCodigo("AB-1234");
        assertFalse(resultado, "El codigo con solo 2 letras no debe ser valido");
    }

    @Test
    void testValidarCodigo_TresDigitos() {
        boolean resultado = OperacionesNegocio.validarCodigo("ABC-123");
        assertFalse(resultado, "El codigo con solo 3 digitos no debe ser valido");
    }

    @Test
    void testValidarCodigo_Null() {
        boolean resultado = OperacionesNegocio.validarCodigo(null);
        assertFalse(resultado, "El codigo null no debe ser valido");
    }

    @Test
    void testValidarCodigo_SinGuion() {
        boolean resultado = OperacionesNegocio.validarCodigo("ABC1234");
        assertFalse(resultado, "El codigo sin guion no debe ser valido");
    }

    @Test
    void testValidarCodigo_CuatroLetras() {
        boolean resultado = OperacionesNegocio.validarCodigo("ABCD-1234");
        assertFalse(resultado, "El codigo con 4 letras no debe ser valido");
    }

    @Test
    void testValidarCodigo_CincoDigitos() {
        boolean resultado = OperacionesNegocio.validarCodigo("ABC-12345");
        assertFalse(resultado, "El codigo con 5 digitos no debe ser valido");
    }
}
