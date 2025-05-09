import { getInfoProfileModel } from "../models/model/model.profile.js";

export const getProfileInfo = async (req, res) => {
  try {
    // LLAMAMOS AL MODELO
    const resultsProfileModel = await getInfoProfileModel();

    // SI EL CONTADOR NO ES MAYOR A CERO NO HAY REGISTROS Y NO INICIAR TRANSACCION
    if (resultsProfileModel === null) {
      return res.status(200).json({
        success: false,
        message: "No se encontraron registros en perfil.",
        result: null,
      });
    }
    // Si hay registros, procesamos la ruta de la imagen
    const resultsWithImageUrls = resultsProfileModel.map((record) => {
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
    console.log(error);
    
    return res.status(500).json({
      success: false,
      message: "No eres tú, soy yo. Intente más tarde.",
      result: null,
    });
  }
};
