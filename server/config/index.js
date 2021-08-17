const assets = require('./assets')
const UTILS = require('../utils/paths.utils')

let config = {}



loadRoutes = (config) => {
    config.routes = UTILS.globbedPaths(assets.routes) || []
}
loadRoutes(config)

module.exports = Object.freeze(config)