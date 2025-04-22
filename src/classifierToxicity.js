// confianza mínima para considerar una predicción como positiva
// Si no se especifica, el valor predeterminado es 0.85
import * as toxicity from "@tensorflow-models/toxicity"

const threshold = 0.5;

// Variable para almacenar el modelo cargado
let model = null;

// Función para cargar el modelo una vez y luego usarlo
const loadModel = async () => {
    if (!model) {
        try {
            model = await toxicity.load(threshold);
            console.log("Modelo cargado exitosamente");
        } catch (error) {
            console.error("Error al cargar el modelo", error);
        }
    }
};

// Cargar el modelo y clasificar una oración
const clasificador = async (sentence) => {
    try {
        // Asegurarse de que el modelo esté cargado antes de clasificar
        if (!model) {
            await loadModel();
        }
        const predictions = await model.classify(sentence);
        return predictions;
    } catch (error) {
        console.error("Error al clasificar la oración", error);
        return []; // Retorna un arreglo vacío en caso de error
    }
}

export default clasificador;

