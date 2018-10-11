"use strict"

module.exports = {
  NON_VALID_ID: " no es un id valido.",
  BAD_REQUEST: "Request invalido.",
  NON_VALID_INPUT_DATA: " no es una entrada de datos valida.",
  NO_ALERTS_AT_ZONE: "La zona existe, pero no fue inicializada. No hay alertas por aquí.",
  REQUIRED_PARAM: " es un parametro requerido.",
  SHOULD_BE_STRING: " debe ser un texto.",
  SHOULD_BE_NUMBER: " debe ser un numero.",
  SHOULD_BE_BOOLEAN: " debe ser verdadero o falso.",
  SHOULD_BE_DATE: " debe ser una fecha.",
  UNDEFINED_PAYLOAD: "El payload es nulo o indefinido.",
  UNDEFINED_SCHEMA: "El schema es nulo o indefinido.",
  REDIS_DB_NUMBER: "La base de datos deseada esta reservada para motivos de testing.",
  UNDEFINED: "Error indefinido.",
  UNHANDEABLE: "Error no manejable.",
  EMPTY_ALERT_EXPORT: "La selección no ha producido ningún resultado.",
  EMPTY_DRIVER_EXPORT: "La selección no ha producido ningún resultado.",
  TRAVEL: {
    ALREADY_EXISTS: "El viaje que deseas agregar a favoritos ya existe.",
    DONT_EXISTS: "El viaje que deseas eliminar no existe."
  },
  GEOCODING: {
    NULL: "GeocodingClient error. Objeto de datos nulo o indefinido.",
    NULL_LAT: "GeocodingClient error. Intentando ejecutar getZoneFromLatLon(data), pero el atributo data.lat es requerido.",
    NULL_LON: "GeocodingClient error. Intentando ejecutar getZoneFromLatLon(data), pero el atributo data.lon es requerido.",
    NON_NUMERIC_INPUT: "GeocodingClient error. Intentando ejecutar getZoneFromLatLon(data), pero los campos data.lat y data.lon deben ser de tipo numerico.",
    GMAPS_API_UNKNOWN: "Error de geocoding inverso en el cliente de Google Maps: Error desconocido.",
    GMAPS_AMBIG: "Error de geocoding inverso en el cliente de Google Maps: La provincia a la cual pertenece el lugar es ambigua, hay más de un resultado.",
    GMAPS_NOT_FOUND_PROVINCE: "Error de geocoding inverso en el cliente de Google Maps: Provincia no encontrada.",
    GMAPS_API: "Error de geocoding inverso en el cliente de Google Maps:"
  },
  AUTH: {
    UNAUTHORIZED: "No autorizado.",
    FORBIDDEN: "Parece que ya tenés una cuenta creada en Greg con este mail. Probá recuperarla desde la app.",
    NOT_BOTH: "No es posible loguear por dispositivo y user + password a la vez.",
    NEED_BOTH: "No es posible actualizar email y contraseña si no se envian ambos a la vez.",
    EXISTENT_USER: "El usuario que estas usando ya esta registrado con otra cuenta Greg. Intenta recuperar su contraseña desde iniciar sesión en la app.",
    EXISTENT_EMAIL: "El email que estas usando ya esta registrado con otra cuenta Greg. Intenta recuperar su contraseña desde iniciar sesión en la app.",
    EXISTENT_DID: "El id de dispositivo que ingresas ya esta registrado.",
    STRICT_LOGIN: "Esta cuenta esta protegida con mail y contraseña.",
    WRONG_EMAIL: "Parece que el email que ingresaste no corresponde a una cuenta de Greg.",
    WRONG_USER: "Parece que el usuario que ingresaste no corresponde a una cuenta de Greg.",
    WRONG_PASS: "Parece que tu contraseña es inválida.",
    AWS_SES_PENDING_VERIFICATION: "Ingreso no autorizado debido a que tiene pendiente la verificación de su cuenta de correo.",
    EXPIRED: "Parece que el email que ingresaste no corresponde a una cuenta de Greg o que tu contraseña es inválida.",
    NOT_FOUND: "Parece que el email que ingresaste no corresponde a una cuenta de Greg o que tu contraseña es inválida.",
    NOT_FOUND_USER: "Parece que el email que ingresaste no corresponde a una cuenta de Greg.",
    NOT_FOUND_EMAIL: "Parece que tu contraseña es inválida."
  }
}
