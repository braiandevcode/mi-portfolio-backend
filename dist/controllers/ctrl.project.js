import { getProjectModel } from "../model/model.project.js";
export const getProjects = async (req, res) => {
  try {
    // LLAMAMOS AL MODELO
    const resultsProjectsModel = await getProjectModel();

    // SI EL CONTADOR NO ES MAYOR A CERO NO HAY REGISTROS Y NO INICIAR TRANSACCION
    if (resultsProjectsModel === null) {
      return res.status(200).json({
        success: false,
        message: "No se encontraron registros de proyectos.",
        result: null
      });
    }

    // Si hay registros, procesamos la ruta de la imagen
    const resultsWithImageUrls = resultsProjectsModel.map(record => {
      const imageUrl = `/uploads/${record.file_name}`;
      return {
        ...record,
        imageUrl // Añadimos la URL de la imagen a cada registro
      };
    });

    // SINO
    return res.status(200).json({
      success: true,
      message: "Ok",
      result: resultsWithImageUrls
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "No eres tú, soy yo. Intente más tarde.",
      result: null
    });
  }
};