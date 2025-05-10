import { getInfoTrajectoryeModel } from "../model/model.trajectory.js";

export const getTrajectoryInfo = async (req, res) => {
  try {
    // LLAMAMOS AL MODELO
    const resultsTrajectoryModel = await getInfoTrajectoryeModel();

    // SI EL CONTADOR NO ES MAYOR A CERO NO HAY REGISTROS Y NO INICIAR TRANSACCION
    if (resultsTrajectoryModel === null || resultsTrajectoryModel.length === 0) {
      return res.status(204).send(); // No se encontraron registros
    }

    // SINO
    return res.status(200).json({
      success: true,
      message: "Ok",
      result: resultsTrajectoryModel,
    });
  } catch (error) {
    console.log(error);

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
