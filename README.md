# Patrón de Diseño Structural: Adapter (Wrapper)

Este repositorio contiene la implementación práctica del patrón de diseño **Adapter**, utilizando un caso de estudio clásico: la integración de una biblioteca de análisis financiero de terceros en una aplicación nativa de monitoreo de mercados de valores.

---

## 📌 1. Concepto General y Analogía

El patrón **Adapter** (también conocido como *Wrapper* o envoltorio) es un patrón estructural cuya misión principal es permitir que objetos con interfaces incompatibles colaboren entre sí de manera flexible y transparente.

### Analogía del Mundo Real
* **El Problema:** Tienes un dispositivo con un enchufe americano (clavijas planas) pero el tomacorriente disponible es europeo (agujeros redondos). La conexión directa es físicamente imposible.
* **La Solución:** Un adaptador de viaje actúa como intermediario. Entiende ambos formatos y permite el flujo de energía sin alterar la naturaleza de la electricidad ni destruir los dispositivos.

---

## 🛑 2. El Problema de la Incompatibilidad

En el desarrollo de software, nos enfrentamos frecuentemente al acoplamiento de sistemas heredados o herramientas de terceros:

* **Caso de Estudio:** Nuestra aplicación principal de Bolsa de Valores procesa y renderiza flujos de datos estructurados nativamente en **XML**.
* **El Requisito:** Se necesita integrar una biblioteca externa de análisis predictivo de alto rendimiento.
* **El Conflicto:** Dicha biblioteca de terceros **solo acepta y procesa datos en formato JSON**.
* **Restricción Crítica:** Modificar el código fuente de la biblioteca externa es imposible (código cerrado) o altamente peligroso, ya que podría romper dependencias críticas en otros módulos de la plataforma.

---

## 🛠️ 3. La Solución: El Envoltorio (Wrapper)

La implementación del adaptador introduce un **traductor universal** intermedio:

1. El Cliente (nuestra App) interactúa con el Adaptador creyendo que es su servicio nativo.
2. El Adaptador intercepta la solicitud en formato **XML**.
3. Traduce los datos internamente a formato **JSON**.
4. Delega la ejecución real al servicio de terceros incompatible pasándole el formato correcto.
5. Traduce la respuesta devuelta por el servicio de vuelta a **XML** para que el cliente la procese fluidamente.

---

## 📐 4. Arquitectura del Patrón (Estructura y Roles)

La solución se distribuye en componentes desacoplados siguiendo el enfoque de **Adaptador de Objetos** (mediante Composición):

| Componente | Rol dentro del Sistema | Archivo |
| :--- | :--- | :--- |
| **Cliente** | Contiene la lógica de negocio principal y consume la interfaz esperada. | `index.ts` |
| **Interfaz del Cliente** | El contrato o protocolo que define cómo debe hablar el sistema con nuestra app. | `target.interface.ts` |
| **Servicio (Adaptee)** | La clase útil pero incompatible (biblioteca externa / código JSON). | `service.ts` |
| **Adaptador** | Clase puente que implementa la interfaz, envuelve al servicio y realiza la traducción. | `adapter.ts` |

---

## 📂 5. Estructura del Proyecto

El código fuente se encuentra modularizado de la siguiente manera para garantizar alta cohesión y bajo acoplamiento:

```text
├── target.interface.ts  # Contrato que define el formato XML esperado por la App
├── service.ts           # Servicio externo incompatible que procesa JSON
├── adapter.ts           # El puente traductor (Implementa interfaz y envuelve al servicio)
└── index.ts             # Cliente principal y punto de entrada de la aplicación
