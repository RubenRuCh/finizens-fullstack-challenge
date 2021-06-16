const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const schemaValidation = require('./schema-validation.js');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  var valid = true;
  if (req.method === 'POST') {
    valid = validatePostPayload(req.url, req.body, res);
  }
  if (req.method === 'PUT') {
    valid = validatePutPayload(req.url, req.body, res);
  }
  // Continue to JSON Server router
  if (valid) {
    next()
  }
})

//Json Schema Validation
var validator = new schemaValidation();

// Use default router
server.use('/api', router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})

function validatePostPayload(url, payload, res) {
  if (url.includes('/api/orders')) {
    validation = validator.validate(payload, 'order');
    if (validation.errors.length > 0) {
      res.sendStatus(400);
      return false;
    }
  }
  payload.completed = false;
  return true;
}

function validatePutPayload(url, payload, res) {
  if (url.includes('/api/orders')) {
    res.sendStatus(405);
    return false;
  }
  if (url.includes('/api/portfolios')) {
    validation = validator.validate(payload, 'portfolio');
    if (validation.errors.length > 0) {
      res.sendStatus(400);
      return false;
    }
  }
  return true;
}
