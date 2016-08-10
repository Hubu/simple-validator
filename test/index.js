var expect = require('chai').expect
var Validator = require('../index')

describe('Simple Validator', function () {
  describe('Constructor', function () {
    it('The Constructor is correct', function () {
      var validator = new Validator()
      expect(validator).to.be.instanceof(Validator)
      expect(validator).to.have.property('initValidator')
      expect(validator).to.have.property('validate')
      expect(validator).to.have.property('getRealValue')
      expect(validator).to.have.property('check')
    })

    it('No Error without any options', function () {
      var validator = new Validator()
      var result = validator.check()
      expect(result).is.true
    })
  })

  describe('Strtegies', function () {
    it('No Error when the strategy is not matched', function () {
      var validator = new Validator(['haha'])
      var result = validator.check()
      expect(result).is.true
    })

    describe('["required"]', function () {
      var validator = new Validator(['required'])

      it('Failed when the value is empty string', function () {
        expect(validator.check('')).is.false
      })

      it('Failed when the value is undefined', function () {
        expect(validator.check()).is.false
      })

      it('Successed when the value is 0', function () {
        expect(validator.check(0)).is.true
      })
    })

    describe('["isNumber"]', function () {
      var validator = new Validator(['isNumber'])

      it('Failed when the value is string', function () {
        expect(validator.check('abc')).is.false
      })

      it('Successed when the valud is number', function () {
        expect(validator.check(123)).is.true
      })
    })

    describe('["equalTo"]', function () {
      var validator = new Validator(['equalTo::123'])

      it('Failed when the value(1234) is not stringified equal target(123)', function () {
        expect(validator.check(1234)).is.false
      })

      it('Successed when the value(123) is stringified equal target(123)', function () {
        expect(validator.check(123)).is.true
      })

      it('Successed when the value("123") is stringified equal target(123)', function () {
        expect(validator.check('123')).is.true
      })
    })

    describe('["minLength"]', function () {
      var validator = new Validator(['minLength::2'])

      it('Failed when the value is type of object without length property', function () {
        expect(validator.check({})).is.false
      })

      it('Failed when the length(1) of vlaue is less than target(2)', function () {
        expect(validator.check([1])).is.false
        expect(validator.check({length: 1})).is.false 
        expect(validator.check('a')).is.false
      })

      it('Successed when the length(2) of value is equal or greater than target(2)', function () {
        expect(validator.check([1, 2, 3])).is.true
        expect(validator.check({length: 2})).is.true
        expect(validator.check('abcd')).is.true
      })
    })

    describe('["minValue"]', function () {
      var validator = new Validator(['minValue::2'])

      it('Failed when the value(1) is less than the target(2)', function () {
        expect(validator.check(1)).is.false
      })

      it('Failed when the value is not type of number', function () {
        expect(validator.check('a')).is.false
      })
    })

    describe('["pattern"]', function () {
      var validator = new Validator(['pattern::^abc$'])

      it('Failed when the valie is not matched target RegExp', function () {
        expect(validator.check('abcd')).is.false
      })

      it('Successed when the valie is matched target RegExp', function () {
        expect(validator.check('abc')).is.true
      })
    })

    describe('[xxx::{variable}]', function () {
      var validator = new Validator(['equalTo::{var}'])

      it('Failed when extra data is not exist', function () {
        expect(validator.check('sth')).is.false
      })

      it('Failed when the value is not matched target variable', function () {
        expect(validator.check('sth', {var: 'else'})).is.false
      })

      it('Successed when the value is  matched target variable', function () {
        expect(validator.check('sth', {var: 'sth'})).is.true
      })
    })

    describe('Combination', function () {
      var validator = new Validator(['required', 'minLength::2', 'maxLength::10'])

      it('Failed when any of the strategy not matched', function () {
        expect(validator.check('')).is.false
        expect(validator.check('a')).is.false
        expect(validator.check('abcdefghijklmn')).is.false
      })

      it('Successed when  all of strategy passed', function () {
        expect(validator.check('abcdef')).is.true
      })
    })
  })
})
