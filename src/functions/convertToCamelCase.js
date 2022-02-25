
  export function convertToCamelCase(snake_case_object) {
    var camelCaseObject = {};
    _.forEach(
      snake_case_object,
      function(value, key) {
        if (_.isPlainObject(value) || _.isArray(value)) {     // checks that a value is a plain object or an array - for recursive key conversion
          value = convertToCamelCase(value);               // recursively update keys of any values that are also objects
        }
        camelCaseObject[_.camelCase(key)] = value;
      }
    )
    return camelCaseObject;
  };