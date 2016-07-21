module.exports = {
  required: function (value) {
    return !!value
  },

  isNumber: function (value) {
    return /^\d+$/.test(value)
  },

  equalTo: function (value, target) {
    return value === target
  },

  pattern: function (value, pattern) {
    if(value!=='' && value!==undefined){
      return new RegExp(pattern).test(value)
    }
    return true
  },

  minLength: function (value, length) {
    return value.replace(/[\u4e00-\u9fa5]/g, '**').length >= Number(length)
  },

  maxLength: function (value, length) {
    return value.replace(/[\u4e00-\u9fa5]/g, '**').length <= Number(length)
  },

  maxValue: function (value, target) {
    return Number(value) <= target
  },

  notEqualTo: function (value, target) {
    return value !== target
  },

  minValue: function (value, min) {
    return Number(value) >= Number(min)
  },

  noSpecialChar: function (value) {
    var myReg = /[~`\-\_^@\/\'\\\"#$%&\*\?\(\),\+;\[\]\{\}\|\.:：<>!！￥？（），。、—]/
    return !myReg.test(value)
  },
}
