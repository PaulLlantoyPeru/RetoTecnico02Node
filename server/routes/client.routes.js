const planetaController = require("../controllers/planeta.controller");
const md_auth = require("../middlewares/auth.middleware")

module.exports = app => {
    app.route("/planeta/register").post( planetaController.registerPlaneta);
    app.route("/planeta/serchNamePlanetas").get( planetaController.getPlanetasName);
    

    // app.route("/planeta/serchPlanetasCredits").get( planetaController.getPlanetasCreditByName);


    app.route("/planeta/updatePlaneta/:planetaId").put( planetaController.updatePlanetaById);

    
    app.route("/planeta/getPlanetasByAlpha").get( planetaController.getPlanetasByAlpha);
    // app.route("/planeta").get( planetaController.getListPlanetas);
}