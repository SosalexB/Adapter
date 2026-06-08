/**
 * COMPONENTE: INTERFAZ DEL CLIENTE (Punto 4 del resumen)
 * Define el protocolo que nuestra aplicación entiende nativamente.
 */
export interface TargetAppInbound {
    getDatosStockXML(): string;
}