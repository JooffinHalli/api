const fs = require('fs');
const { resolve } = require('path');
const logger = require('../lib/Logger');

const root_path = resolve();
const new_endpoint_name = process.argv[2];

const endpoints_folder_path = root_path + '/endpoints/';
const endpoints_index_path = endpoints_folder_path + 'index.js';
const store_folder_path = root_path + '/store/';
const store_index_path = store_folder_path + 'index.js';

const new_endpoint_path = endpoints_folder_path + new_endpoint_name;
const new_endpoint_store_path = store_folder_path + new_endpoint_name;

const templates_folder_path = root_path + '/_system/templates';
const genEndpointTemplate = require(templates_folder_path + '/endpointTemplate.js');
const genStoreTemplate = require(templates_folder_path + '/storeTemplate.js');
const addToStore = require(templates_folder_path + '/addToStore.js');

if (!new_endpoint_name) {
  logger.warn('enter a name of endpoint');
  process.exit(0);
}

if (fs.existsSync(new_endpoint_path)) {
  logger.warn('endpoint already exists');
  process.exit(0);
}

fs.mkdirSync(new_endpoint_path, { recursive: true }); // create a folder serverMock/endpoints/...
fs.writeFileSync(new_endpoint_path + '/index.js', genEndpointTemplate(new_endpoint_name)); // create index.js
fs.mkdirSync(new_endpoint_store_path, { recursive: true }); // create a folder serverMock/store/...
fs.writeFileSync(new_endpoint_store_path + '/index.js', genStoreTemplate(new_endpoint_name)); // create index.js

{
  const [partToWork, staticPart2] = fs.readFileSync(endpoints_index_path).toLocaleString().split(']');
  const [staticPart1, endpointsString] = partToWork.split('[');
  const endpointsArr = endpointsString.split(',');
  const endpointsSet = [...new Set(endpointsArr)];
  const endpointsSetString = endpointsSet.join(',');
  let newArr = '';
  const endpointNameToCompare = `\n  '${new_endpoint_name}'`;
  if (endpointsSet.includes(endpointNameToCompare)) {
    newArr = `[${endpointsSetString}]`;
  } else {
    newArr = '[' + endpointsSetString + `  '${new_endpoint_name}',\n]`;
  }
  const allContent = staticPart1 + newArr + staticPart2;
  
  try {
    fs.writeFileSync(endpoints_index_path, allContent); // push new endpoint to array of AVAILABLE_ENDPOINTS
    logger.success('endpoint "' + new_endpoint_name + '" is created! Click -> endpoints/' + new_endpoint_name);
  } catch(e) {
    logger.err(e);
    process.exit(0);
  }
  
}

{
  const [partToWork] = fs.readFileSync(store_index_path).toLocaleString().split('}');

  let newStore = '';
  if (partToWork.includes(new_endpoint_name)) {
    newStore = `${partToWork}}`;
  } else {
    newStore = `${partToWork}${addToStore(new_endpoint_name)}}`;
  }

  try {
    fs.writeFileSync(store_index_path, newStore); // add new endpoint to store object
    logger.success('store folder for "' + new_endpoint_name + '" is created! Click -> store/' + new_endpoint_name);
  } catch(e) {
    logger.err(e);
    process.exit(0);
  }
}