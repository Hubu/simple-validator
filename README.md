# simple-custom-validator [![Build Status](https://travis-ci.org/Hubu/simple-validator.svg?branch=master)](https://travis-ci.org/Hubu/simple-validator)
Simple validator with custom strategies

## what?
this is not a complete validator lib/component, it can be used to make up your custom completely Validator
## how
* install
 `npm i simple-custom-validator --save`
* usage

 ```javascript
 var Validator = require('simple-custom-validator')
 var validator = new Validator(['required', 'maxLength::5', 'notEqualTo::{someValue}'])
 console.log(validator.check('abc')) //true
 console.log(validator.check('')) //false
 console.log(validator.check('abcdefg')) //false
 console.log(validator.check('abc'), {someValue: 'abc'}) //false
 ```


 ## strategies
 * [built-in strategies](https://github.com/Hubu/simple-validator/blob/master/strategies.js#L10)
 * custom strategy

 ```javascript
 var Validator = require('simple-custom-validator')
 var validator = new Validator(['pattern::yourCustomPatternHere'])
 ```
