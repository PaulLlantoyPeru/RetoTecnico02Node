var glob = require("glob")
const _lodash = require('lodash')

exports.globbedPaths = (globPatterns, excludes) => {
    // URL paths regex
    let urlRegex = new RegExp('^(?:[a-z]+:)?//', 'i')
    // The output array
    let output = []

    // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
    if (_lodash.isArray(globPatterns)) {
        globPatterns.forEach(globPattern => {
            output = _lodash.union(output, globbedPaths(globPattern, excludes))
        })
    } else if (_lodash.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns)
        } else {
            let files = glob.sync(globPatterns)

            if (excludes) {
                files = files.map(file => {
                    if (_lodash.isArray(excludes)) {
                        for (let i in excludes) {
                            if (excludes.hasOwnProperty(i)) {
                                file = file.replace(excludes[i], '')
                            }
                        }
                    } else {
                        file = file.replace(excludes, '')
                    }
                    return file
                })
            }
            output = _lodash.union(output, files)
        }
    }
    return output
}