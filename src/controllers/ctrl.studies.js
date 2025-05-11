import { getStudiesModel } from "../model/model.studies.js";

export const getStudies = async (req, res) => {
  try {
    // LLAMAMOS AL MODELO
    const resultsStudiesModel = await getStudiesModel();

    // SI EL CONTADOR NO ES MAYOR A CERO NO HAY REGISTROS Y NO INICIAR TRANSACCION
    if (resultsStudiesModel === null || resultsStudiesModel.length === 0) {
      return res.status(204).send(); // No se encontraron registros
    }

    // SINO
    return res.status(200).json({
      success: true,
      message: 'Ok',
      result: resultsStudiesModel
    });
  } catch (error) {
    // Si el error es temporal (ej. problemas de conexión)
    if (error.code === 'ECONNREFUSED' || error.message.includes('timeout')) {
      return res.status(503).json({
        success: false,
        message: "El servicio está temporalmente inactivo. Intente nuevamente en unos momentos.",
        result: null,
      });
    }

    // Error general de servidor
    return res.status(500).json({
      success: false,
      message: "No eres tú, soy yo. Intente más tarde.",
      result: null,
    });
  }
};
