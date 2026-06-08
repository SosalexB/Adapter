import { TargetAppInbound } from "./targetInterface";
import { BibliotecaAnalisisTerceros } from "./service";
import { StockAdapter } from "./adapter";

/**
 * COMPONENTE: CLIENTE (Punto 4 del resumen)
 * Lógica de negocio que consume datos XML mediante la interfaz.
 */
class AplicacionBolsaValores {
    private servicioDatos: TargetAppInbound;

    constructor(servicio: TargetAppInbound) {
        this.servicioDatos = servicio; // Recibe cualquier cosa que firme el contrato XML
    }

    public mostrarPanelDeControl(): void {
        console.log("--- Cargando Tablero de Control de la Bolsa ---");
        const datosXML = this.servicioDatos.getDatosStockXML();
        console.log(`[Cliente] Procesando y mostrando datos en pantalla: ${datosXML}\n`);
    }
}

// ============================================================================
// EJECUCIÓN DE LA DEMOSTRACIÓN
// ============================================================================
function ejecutarDemostracionAdapter() {
    console.log("=== INICIO DE LA DEMOSTRACIÓN INTERACTIVA ===\n");

    // 1. Instanciamos el servicio externo (el enchufe europeo)
    const bibliotecaExterna = new BibliotecaAnalisisTerceros();

    // 2. Creamos el adaptador y le pasamos el servicio (el adaptador de viaje)
    const adaptador = new StockAdapter(bibliotecaExterna);

    // 3. Inicializamos nuestra app pasándole el adaptador.
    // Cumple el Principio Abierto/Cerrado: La app no cambia, solo recibe un adaptador nuevo.
    const miAppBolsa = new AplicacionBolsaValores(adaptador);

    // 4. Corremos la aplicación
    miAppBolsa.mostrarPanelDeControl();

    console.log("=== FIN DE LA DEMOSTRACIÓN ===");
}

ejecutarDemostracionAdapter();