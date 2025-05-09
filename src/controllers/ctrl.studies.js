import { getStudiesModel } from "../model/model.studies.js";

export const getStudies = async (req, res) => {
    try {
        // LLAMAMOS AL MODELO
        const resultsStudiesModel = await getStudiesModel();
        
        // SI EL CONTADOR NO ES MAYOR A CERO NO HAY REGISTROS Y NO INICIAR TRANSACCION
        if (resultsStudiesModel === null) {
            return res.status(200).json({ 
                success: false, 
                message: 'No se encontraron registros de estudios.',
                result:null
            });
        };
        // SINO
        return res.status(200).json({ 
            success: true, 
            message: 'Ok',
            result:resultsStudiesModel
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: 'No eres tú, soy yo. Intente más tarde.',
            result:null
        });
    }
}