'use strict'

const path = require('path')
const jwt = require('jsonwebtoken')

const jwtConfig = require('../config/api.config').JWT;
const restUtil = require('../utils/resUtil.util')
const ApiError = require('../utils/apiError.utils')


exports.createPayload = (planeta) => {
  return {
    "id": planeta.id,
    "clima":planeta.clima,
    "diametro":planeta.diametro,
    "gravedad":planeta.diametro,
    "nombre":planeta.nombre,
    "periodoDeOrbita":planeta.periodoDeOrbita,
    "poblacion":planeta.poblacion,
    "periodoDeRotacion": user.periodoDeRotacion,
    "SuperficieDelAgua":  user.SuperficieDelAgua,
    "terreno": user.terreno,
    "url": user.url
  }
}


exports.encode = data => {
  
  data = data || {}

  return new Promise((resolve, reject) => {
    jwt.sign(data, jwtConfig.seed,
    { expiresIn: jwtConfig.expires }, (e, token) => {
      if (e) {
        reject(e)
      } else {
        resolve(token)
      }
    })
  })
}

exports.decodeToken = token => {
  return jwt.decode(token, jwtConfig.seed);
}


exports.verifyToken = (req, res, next) => {
  let headers = {
    Authorization: req.get('Authorization'),
    // Platform : req.get('Platform')
  }
  console.log("BODY : ", req.body, headers);
  
  
  if(validateHeaders(headers) ){
    console.log("Llegamos 1");
    let jwtToken = headers.Authorization.startsWith('Bearer ') ? headers.Authorization.slice(7, headers.Authorization.length) : headers.Authorization;
    jwt.verify(jwtToken, jwtConfig.seed, (e, validatedToken) => {
      if (e) {
        console.log("LLegamos 3");
        return restUtil.error( res, 'Token es invalido', '401')
      }else{
        req.creatorInfo = validatedToken;
        next()
      }
      
    })
  }else{
    console.log("Llegamos 2");
    return restUtil.error( res, 'Acceso denegado, contacte con el provedor del servicio', '401')
  }
}

exports.refresh = token => {
  return new Promise((resolve, reject) => {
    if (token) {
      jwt.verify(token, jwtConfig.seed, (e, verjwt) => {
        if (e) {
          reject(new ApiError('Token vencido'))
        } else {
          delete verjwt.iat
          delete verjwt.exp

          jwt.sign(verjwt, jwtConfig.seed,
          { expiresIn: jwtConfig.expires }, (e, token) => {
            if (e) {
              reject(e)
            } else {
              resolve(token)
            }
          })
        }
      })
    } else {
      reject(new ApiError('Token inválido'))
    }
  })
}

exports.validetePlatform= (req, res, next)=> {
  let headers = {
    Platform : req.get('Platform')
  }

  if(validateHeaders(headers)) next()
  else return restUtil.error( res, 'Acceso denegado, Platform es obligatorio', '401')
}

let validateHeaders = (headers) => {
  
  for(let key in headers){
    if(headers[key] == null || headers[key] == ''){
      return false
    }
  }
  return true;
}
