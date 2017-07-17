module.exports.log = function (message, obj) {
  console.log(message + ": " + JSON.stringify(obj, null, 2));
};