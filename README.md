# CLI RPN Calculator
## Description

This RPN Calculator is a calculator where the user applies operators after their operands for calculation, this CLI application is my take on this specific type of calculator.

Generally, most users are probably used to infix type of operations (5 + 5 ). With an RPN calaculator you will be able to accomplish the same operation with the following: ( 5 5 + ). This will also apply to multiple operators, where an infix operation such as: ( 5 * ( 1 + 2)) would be the same in a RPN calculator as: ( 5 1 2 * + ).

## Features

_Prompt Sync:_
Used to make user prompts and responses.

_Current operator support:_
- Addition: +
- Substraction: -
- Multiplication: * 
- Division: /

## Application Design

When building out the application I actually written it in a single file at first, _calculator.js_, which for a simple project like this; it worked out fine. After trying to test out the project it was obvious it would be much easier if I had a seperate service to handle calculations and input processing. Going this route would also help applying multiple UI's for the future if I were to build this out even further. For the calculation I chose to return a resultObj and let the UI component handle the current state of the calculator. 

## Edge cases / Improvements

The way the application is currently implemented it can handle simple arithmetic operations, but I think there are some edge cases when it comes to processing inputs. If I had more time to develop, I think I would build out the input processing a bit more to be more efficient, for example if an input does not evaluate to a number it will be put in the operator queue. Since it won't evaluate to a currrent supported operator, it wouldn't effect the result but doing something simple to start like a RegEx helper function to evaulate appropriate inputs could be an option. 

## Installation

RPN Calculator requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and start the application.

```sh
npm install
npm start
```

## Test

To run test _calculator.test.js_

```sh
npm test
```
