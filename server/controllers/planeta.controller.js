const PlanetaDatasource = require('../datasource/planeta.datasource')
const restUtil = require('../utils/resUtil.util')

/**
 * Funcion para REGISTRAR Planetas
 * @param {documentNumber, fullName, reference, phoneNumber} req 
 */
exports.registerPlaneta = async (req, res) => {
    try {
        let payload = req.body;

        console.log({
            payload
        });

        let planetaCreate = await PlanetaDatasource.savePlaneta(payload);
        if (!planetaCreate) throw 'Ocurrio un error Registrando  el planeta';
        return restUtil.send(res, planetaCreate, 'Planeta Registrado correctamente');
    } catch (error) {
        switch(error.name){
            case 'SequelizeUniqueConstraintError': return restUtil.error(res, `Planeta ya existe : ${req.body.documentNumber} ya está registrado`);
            default: return restUtil.error(res, error);
        }  
    }
}

exports.getPlanetaName = async (req, res) => {
    try {
        let payload = req.query;

        console.log('GET PLANETA NAME BODY: ', payload);
        if(payload.partialName && payload.partialName.length>=3){
            let fountPlaneta = await PlanetaDatasource.searchPlanetas(payload.partialName);
            if (!fountPlaneta) throw 'Ocurrio un error Registrando  al planeta';
            return restUtil.send(res, fountPlanet, 'Busqueda termino correctamente');
        }else throw 'Minimo 3 caracteres para la busqueda'
    } catch (error) {
        restUtil.error(res, error);
    }
}

exports.getPlanetasCreditByName = async(req, res) => {
    try {
        let payload = req.query;

        console.log('GET PLANETAS NAME BODY: ', payload);
        if(payload.planetaName){
            let fountClient = await PlanetaDatasource.searchPlanetasCreditsByName(payload.planetaName);
            if (!fountPlaneta) throw 'Ocurrio un error Registrando  al planeta';
            return restUtil.send(res, fountPlaneta, 'Busqueda termino correctamente');
        }else throw 'Minimo 3 caracteres para la busqueda'
    } catch (error) {
        restUtil.error(res, error);
    }
}

exports.updatePlanetaById = async(req, res) => {
    try {
        let payload = req.body;
        let planetaId = req.params.planetatId;
        console.log("paylaod update planeta : ", payload, " - id : ", planetaId);
        // if(payload.planetaId){
            let planetaUpdated = await PlanetaDatasource.updatePlanetaFilds(clientId, payload);
            if (!planetaUpdated) throw 'Ocurrio un error Registrando  al planeta';
            return restUtil.send(res, planetaUpdated, 'Planeta actualizado correctamente');
        // }else throw 'El codigo de planeta es obligatorio para actualizarlo'
    } catch (error) {
        console.log("ERROR UUPDATE : ", error);
        restUtil.error(res, error);
    }
}


exports.getPlanetaByAlpha = async (req, res) => {
    try {
        let planetasList = await PlanetaDatasource.getPlanetaOrderByAlpha();
        restUtil.send(res, planetasList);

    } catch (error) {
        restUtil.error(res, error);
    }
}
