import { getInfoTrajectoryeModel } from "../model/model.trajectory.js";

export const getTrajectoryInfo = async (req, res) => {
  try {
    // LLAMAMOS AL MODELO
    const resultsTrajectoryModel = await getInfoTrajectoryeModel();

    // SI EL CONTADOR NO ES MAYOR A CERO NO HAY REGISTROS Y NO INICIAR TRANSACCION
    if (resultsTrajectoryModel === null) {
      return res.status(200).json({
        success: false,
        message: "No se encontraron registros en trajectoria.",
        result: null,
      });
    }
    // SINO
    return res.status(200).json({
      success: true,
      message: "Ok",
      result: resultsTrajectoryModel,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "No eres tú, soy yo. Intente más tarde.",
      result: null,
    });
  }
};
