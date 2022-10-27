module.exports = (name) => `
const { send, parseReq } = require('../../_system');
const logger = require('../../_system/lib/Logger');
const store = require('../../store');

const resByExactPath = { // can hardcode here whole exact path (with slash) with all parameters and its [status, response]
  '/${name}/1?filter=a': [200, 'test data for "${name}"']
};

module.exports = (req, res) => {
  const { params, queryParams, method, path } = parseReq(req);

  switch(method) {

    case 'GET': {
      if (resByExactPath[path]) return send(res, resByExactPath[path][0], resByExactPath[path][1]);

      return send(res, 200, store.${name});
    }

    case 'POST': {
      let body = [];

      req.on('data', (chunk) => body.push(chunk));
      req.on('end', () => {
        if (body.length) {
          logger.info({ body });
          send(res, 201, 'Ok');
        }
      });

      return;
    }

  }

};
`