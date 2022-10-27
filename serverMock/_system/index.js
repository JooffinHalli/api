const constants = require('./constants');
const helpers = require('./helpers');
const middlewares = require('./middlewares');
const logger = require('./lib/Logger');

const { createServer } = require('http');

const useServer = (req, res) => {
  middlewares.useCors(req, res);
  middlewares.useRoutes(req, res);
}

const server = createServer(useServer);

server.listen(constants.PORT, () => {
  logger.success('Mock server is started on http://localhost:' + constants.PORT + ' ...');
});

module.exports = {
  ...constants,
  ...helpers,
  ...middlewares
};