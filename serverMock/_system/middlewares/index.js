const { AVAILABLE_ENDPOINTS } = require('../../endpoints');
const { send, parseReq, routesHas } = require('../helpers');
const ERR = require('./constants');

const useCors = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
}

const useRoutes = (req, res) => {

  if (req.url === "/") return send(res, 200, {
    AVAILABLE_ENDPOINTS: AVAILABLE_ENDPOINTS.map(e => '/' + e)
  });

  if (req.method === "OPTIONS") return send(res, 200, 'Ok');

  const { endpoint } = parseReq(req);

  const { folderExists, indexExists } = routesHas(endpoint);
  const endpointExists = AVAILABLE_ENDPOINTS.includes(endpoint);

  if (endpointExists && !folderExists) {
    return send(res, 404, ERR.NO_FOLDER);

  } else if (endpointExists && folderExists && !indexExists) {
    return send(res, 404, ERR.NO_INDEX);

  } else if (!endpointExists && folderExists) {
    return send(res, 404, ERR.DID_NOT_REGISTRATE);

  } else if (endpointExists && folderExists && indexExists) {
    const controllerFn = require('../../endpoints/' + endpoint);

    if (typeof controllerFn !== 'function') {
      return send(res, 404, ERR.NO_CONTROLLER);

    } else return controllerFn(req, res);

  } else return send(res, 404, ERR.NOT_FOUND);

};

module.exports = {
  useCors,
  useRoutes
};