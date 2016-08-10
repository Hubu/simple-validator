function equalTo (value, target) {
  return ('undefined' === typeof value || 'undefined' === typeof target) ? false : (value.toString() === target.toString())
}

function getLengthTarget (value) {
  return value.hasOwnProperty('length') ? value.length : (value.hasOwnProperty('replace') ? value.replace(/[\u4e00-\u9fa5]/g, '**').length : NaN)
}

module.exports = {
  required: function (value) {
    return '' !== value && 'undefined' !== typeof value
  },

  isNumber: function (value) {
    return /^\d+$/.test(value)
  },

  equalTo: equalTo,

  notEqualTo: function (value, target) {
    return !equalTo(value, target)
  },

  minLength: function (value, length) {
    return getLengthTarget(value) >= Number(length)
  },

  maxLength: function (value, length) {
    return getLengthTarget(value) <= Number(length)
  },

  minValue: function (value, min) {
    return Number(value) >= Number(min)
  },

  maxValue: function (value, target) {
    return Number(value) <= Number(target)
  },

  noSpecialChar: function (value) {
    var myReg = /[~`\-\_^@\/\'\\\"#$%&\*\?\(\),\+;\[\]\{\}\|\.:：<>!！￥？（），。、—]/
    return !myReg.test(value)
  },

  pattern: function (value, pattern) {
    return new RegExp(pattern).test(value)
  },
}
