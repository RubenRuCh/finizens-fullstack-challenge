// Assigning to exports will not modify module, must use module.exports
module.exports = class JsonSchemaValidation {
  constructor() {
    this.schemas = {
      'order': {
        "id": "/Order",
        "type": "object",
        "properties": {
          "id": {"type": "integer"},
          "portfolio": {"type": "integer"},
          "allocation": {"type": "integer"},
          "shares": {"type": "integer"},
          "type": {"type": "string"},
        },
        "required": ["id", "portfolio", "allocation", "shares", "type"]
      },
      'portfolio': {
        "id": "/Portfolio",
        "type": "object",
        "properties": {
          "allocations": {
            "type": "array",
            "items": {
              "properties": {
                "id": { "type": "integer" },
                "shares": { "type": "integer" }
              },
              "required": ["id", "shares"]
            }
          }
        },
        "required": ["allocations"]
      }
    };

    var Validator = require('jsonschema').Validator;
    this.validator = new Validator();
  }

  validate(payload, schema) {
    var validation = this.validator.validate(payload, this.schemas[schema]);
    if (validation.errors.length) {
      console.log(validation.errors);
    }
    return validation;
  }
}

