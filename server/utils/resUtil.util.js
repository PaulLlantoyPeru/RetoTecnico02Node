const ApiError = require('./apiError.utils')

exports.send = (res, data, message) => {
    message = message || undefined
    data = data || undefined
    let response = {
        responseCode: 0,
        responseData: data,
        responseMessage: message
    }
    res.json(response)
}

exports.error = (res, e, codeError = '422') => {
    const error = 1
    let message = 'No se pudo completar su solicitud'
    if (e instanceof ApiError) message = e.message
    else if (typeof e === 'string') message = e
    else console.error(e)
    let response = {
        responseCode: 1,
        responseMessage: message
    }
    codeError == '200' ? res.json(response) :
        res.status(codeError).json(response);
}