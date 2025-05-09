import { getSkillModel } from "../models/model-pg/model.skill.js";

export const getSkills = async (req, res) => {
    try {
        // LLAMAMOS AL MODELO
        const resultsSkillModel = await getSkillModel();
        
        // SI EL CONTADOR NO ES MAYOR A CERO NO HAY REGISTROS Y NO INICIAR TRANSACCION
        if (!resultsSkillModel || resultsSkillModel.length == 0) {
            return res.status(200).json({ 
                success: false, 
                message: 'No se encontraron registros.',
                result:null
            });
        };
        // SINO
        return res.status(200).json({ 
            success: true, 
            message: 'Ok',
            result:resultsSkillModel
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: 'No eres tú, soy yo. Intente más tarde.',
            result:null
        });
    }
}