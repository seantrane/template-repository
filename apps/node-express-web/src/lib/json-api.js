const vars = require('./vars');

/**
 * Return JSON:API error object (jsonapi.org spec)
 * @param  {any}    data     JSON:API response data property.
 * @param  {string} message  JSON:API response meta.message property.
 * @param  {any}    metadata JSON:API response meta.data property.
 * @return {any}             Object following jsonapi.org specification.
 */
function jsonApiErrorObject(data = false, message = undefined, metadata = {}) {
  return jsonApiObject(
    data,
    'error',
    message || 'An error has occurred. Please try again later.',
    (vars.envPublic) ? {} : metadata
  );
}

/**
 * Return JSON:API Error Response (jsonapi.org spec)
 * @param  {express.Response} res Express Response instance.
 * @param  {express.Error}    err Express Error instance.
 * @return {express.Response}     Completed Express Response.
 */
function jsonApiErrorResponse(res, err) {
  return res.status(err.status || 500).json(
    jsonApiErrorObject(false, err.message || undefined, err)
  );
}
/**
 * Return JSON:API Object (jsonapi.org spec)
 * @param  {any}    data     JSON:API Response 'data' property.
 * @param  {string} message  JSON:API Response 'meta.message' property.
 * @param  {any}    metadata JSON:API Response 'meta.data' property.
 * @return {any}             Object following jsonapi.org specification.
 */
function jsonApiObject(data, status, message, metadata = {}) {
  return {
    data: data,
    meta: {
      status: status,
      message: message,
      data: metadata,
    }
  };
}

/**
 * Return JSON:API success object (jsonapi.org spec)
 * @param  {any}    data     JSON:API response data property.
 * @param  {string} message  JSON:API response meta.message property.
 * @param  {any}    metadata JSON:API response meta.data property.
 * @return {any}             Object following jsonapi.org specification.
 */
function jsonApiSuccessObject(data = true, message = undefined, metadata = {}) {
  return jsonApiObject(
    data,
    'success',
    message || 'Completed successfully.',
    metadata
  );
}

/**
 * Return JSON:API Success Response (jsonapi.org spec)
 * @param  {express.Response} res      Express Response instance.
 * @param  {any}              data     JSON:API response data property.
 * @param  {string}           message  JSON:API response meta.message property.
 * @param  {any}              metadata JSON:API response meta.data property.
 * @return {express.Response}          Completed Express Response.
 */
function jsonApiSuccessResponse(res, data = true, message = undefined, metadata = {}) {
  return res.status(200).json(
    jsonApiSuccessObject(data, message, metadata)
  );
}

module.exports = {
  errorObject    : jsonApiErrorObject,
  errorResponse  : jsonApiErrorResponse,
  object         : jsonApiObject,
  successObject  : jsonApiSuccessObject,
  successResponse: jsonApiSuccessResponse,
};
