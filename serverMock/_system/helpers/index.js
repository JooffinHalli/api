const { parse } = require('url');
const { existsSync } = require('fs');
const { resolve } = require('path');

const routersPath = resolve() + '/endpoints/';
const routesHas = (folderName) => {
  return {
    folderExists: existsSync(routersPath + folderName),
    indexExists: existsSync(routersPath + folderName + '/index.js')
  }
}

const send = (res, code, data) => {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const parseReq = (req) => {
  const body = req.body;
  const reqData = parse(req.url, true);
  const path = reqData.path;
  const [empty, endpoint, ...params] = path.split('?')[0].split('/');

  return {
    endpoint,
    path,
    params,
    queryParams: reqData.query,
    method: req.method,
    body
  }
}

module.exports = {
  routesHas,
  send,
  parseReq
}