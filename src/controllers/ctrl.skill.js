import { getSkillModel } from "../model/model.skill.js";

export const getSkills = async (req, res) => {
    try {
        // LLAMAMOS AL MODELO
        const resultsSkillModel = await getSkillModel();
        
        // SI EL CONTADOR NO ES MAYOR A CERO NO HAY REGISTROS
        if (resultsSkillModel === null) {
            return res.status(204).send(); // Devuelve un 204 sin cuerpo si no hay datos
        }
        
        // SI HAY REGISTROS
        return res.status(200).json({ 
            success: true, 
            message: 'Ok',
            result: resultsSkillModel
        });
    } catch (error) {
        // Detectar error temporal para devolver 503
        if (error.code === 'ECONNREFUSED' || error.message.includes('timeout')) {
            return res.status(503).json({
                success: false,
                message: 'El servicio está temporalmente inactivo. Intente nuevamente en unos momentos.',
                result: null
            });
        }

        // Error general de servidor
        return res.status(500).json({
            success: false,
            message: 'No eres tú, soy yo. Intente más tarde.',
            result: null
        });
    }
}
