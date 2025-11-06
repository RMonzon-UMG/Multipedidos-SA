package com.multipedidos.common;

/**
 * Clase de utilidades para operaciones de negocio compartidas
 * entre los microservicios de MultiPedidos S.A.
 */
public class OperacionesNegocio {

    private static final double IVA = 0.12;
    private static final String CODIGO_REGEX = "[A-Z]{3}-\\d{4}";

    /**
     * Calcula el total aplicando 12% de IVA al subtotal
     *
     * @param subtotal el subtotal sin IVA
     * @return el total con IVA incluido
     */
    public static double calcularTotalConIVA(double subtotal) {
        return subtotal * (1 + IVA);
    }

    /**
     * Aplica un descuento porcentual al total
     *
     * @param total el total antes del descuento
     * @param porcentaje el porcentaje de descuento a aplicar (0-100)
     * @return el total con el descuento aplicado
     */
    public static double aplicarDescuento(double total, double porcentaje) {
        return total - (total * (porcentaje / 100));
    }

    /**
     * Valida que un codigo cumpla con el formato requerido:
     * 3 letras mayusculas + guion + 4 digitos
     * Ejemplo: ABC-1234
     *
     * @param codigo el codigo a validar
     * @return true si el codigo es valido, false en caso contrario
     */
    public static boolean validarCodigo(String codigo) {
        if (codigo == null) {
            return false;
        }
        return codigo.matches(CODIGO_REGEX);
    }
}
