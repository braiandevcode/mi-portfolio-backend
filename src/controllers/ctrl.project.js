import { getProjectModel } from "../model/model.project.js";

export const getProjects = async (req, res) => {
  try {
    // LLAMAMOS AL MODELO
    const resultsProjectsModel = await getProjectModel();

    // SI EL CONTADOR NO ES MAYOR A CERO NO HAY REGISTROS Y NO INICIAR TRANSACCION
    if (resultsProjectsModel === null || resultsProjectsModel.length === 0) {
      return res.status(204).send(); // No se encontraron registros
    }

    // Si hay registros, procesamos la ruta de la imagen
    const resultsWithImageUrls = resultsProjectsModel.map((record) => {
      const imageUrl = `/uploads/${record.file_name}`;
      return {
        ...record,
        imageUrl, // Añadimos la URL de la imagen a cada registro
      };
    });

    // Devolvemos los datos con la URL de la imagen
    return res.status(200).json({
      success: true,
      message: "Ok",
      result: resultsWithImageUrls,
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


