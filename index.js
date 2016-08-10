var  strategies = require('./strategies')

function Validator (rules, options) {
  rules = rules || []
  options = options || {}
  this.validate = function () {return true}
  this.initValidator(rules, options)
}

Validator.prototype.initValidator = function(rules, options) {
  var self = this
  var splitor = options.splitor || '::'
  var matchedStrategies = []

  if ('[object Array]' === Object.prototype.toString.call(rules)) {
    rules.map(function (rule) {
      matchedStrategies.push(function (value, data) {
        var strategyArg = rule.split(splitor)

        if (strategyArg[1]) {
          strategyArg[1] = self.getRealValue(strategyArg[1], data)
        }

        var strategy = strategyArg.shift()
        strategyArg.unshift(value)

        return strategies[strategy] ? strategies[strategy].apply(self, strategyArg) : true
      })
    })
  } else if ('[object Function]' === Object.prototype.toString.call(rules)){
    matchedStrategies.push(rules)
  } else {
    return 
  }

  return this.validate = function (value, data) {
    var result = true
    var length = matchedStrategies.length
    for (var i = 0; i < length; i++) {
      result = result && matchedStrategies[i](value, data)
      if (!result) break
    }

    return result
  }
}

Validator.prototype.getRealValue = function (fakeValue, data) {
  var itIsVar = fakeValue.match(/^\{([^\{}].*)\}$/)
  return itIsVar ? (data[itIsVar[1]]) : fakeValue
}

Validator.prototype.check = function (value, data) {
  return this.validate(value, data)
}

module.exports = Validator
