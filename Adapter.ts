import { TargetAppInbound } from "./targetInterface";
import { BibliotecaAnalisisTerceros } from "./service";

/**
 * COMPONENTE: EL ADAPTADOR (Punto 3, 4 y 5 del resumen)
 * Traduce las peticiones del cliente para que el servicio externo las entienda.
 */
export class StockAdapter implements TargetAppInbound {
    // Punto 5.4: Guardamos la referencia al objeto incompatible (Composición)
    private servicioExterno: BibliotecaAnalisisTerceros;

    constructor(servicioExterno: BibliotecaAnalisisTerceros) {
        this.servicioExterno = servicioExterno;
    }

    /**
     * Punto 5.5: Lógica de traducción y delegación.
     */
    public getDatosStockXML(): string {
        // 1. Simulación de datos locales en XML
        const datosLocalesXML = "<stock><simbolo>AAPL</simbolo><precio>180</precio></stock>";
        console.log(`[Adaptador] Interceptando llamada. Datos originales: ${datosLocalesXML}`);

        // 2. TRADUCCIÓN: De XML a JSON
        console.log(`[Adaptador] Traduciendo de XML a JSON...`);
        const datosTraducidosJSON = `{ "simbolo": "AAPL", "precio": 180 }`;

        // 3. DELEGACIÓN: Enviamos los datos al servicio externo
        const resultadoAnalisisJSON = this.servicioExterno.realizarAnalisisAvanzado(datosTraducidosJSON);
        
        // 4. SEGUNDA TRADUCCIÓN: De JSON a XML para devolverle al cliente lo que espera
        console.log(`[Adaptador] Traduciendo respuesta de JSON a XML para el cliente...`);
        const resultadoEnXML = `<analisis><tendencia>ALTA</tendencia><confianza>94%</confianza></analisis>`;

        return resultadoEnXML;
    }
}