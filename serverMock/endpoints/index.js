 // 1. add a new endpoint name in this array
 // 2. create a folder in this derictory with the same name with index.js file inside
 // 3. create a function in the folder (req, res) => void and export it (copypaste from another folder)
 // 4. restart a server

const AVAILABLE_ENDPOINTS = [
  'exampleEndpoint'
];

module.exports = { AVAILABLE_ENDPOINTS };