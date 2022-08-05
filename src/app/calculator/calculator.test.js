const {
  processInput,
  processCalculation,
} = require("../shared/calculator.service");

describe("Calculator tests", () => {
  test("Should be able to process decimal numbers: 10.0", () => {
    var input = processInput("10.0");
    // assert
    expect(input.processedOperands[0]).toBe(10.0);
  });

  test("Should be able to calculate basic addition: 1 2 3 + + equals 6", () => {
    var input = processInput("1 2 3 + +");
    var calcResult = processCalculation(
      input.processedOperands,
      input.processedOperators
    );
    // assert
    expect(calcResult.result).toBe(6);
  });

  test("Should be able to calculate basic subtraction: 10 10 10 - - equals 10", () => {
    var input = processInput("10 10 10 - -");
    var calcResult = processCalculation(
      input.processedOperands,
      input.processedOperators
    );
    // assert
    expect(calcResult.result).toBe(10);
  });

  test("Should be able to calculate basic multiplication: 5 5 * equals 25", () => {
    var input = processInput("5 5 *");
    var calcResult = processCalculation(
      input.processedOperands,
      input.processedOperators
    );
    // assert
    expect(calcResult.result).toBe(25);
  });

  test("Should be able to calculate basic division: 20 4 / equals 5", () => {
    var input = processInput("20 4 /");
    var calcResult = processCalculation(
      input.processedOperands,
      input.processedOperators
    );
    // assert
    expect(calcResult.result).toBe(5);
  });

  test("Should be able to handle infix notation: 5 + 5 equals 10", () => {
    var input = processInput("5 + 5");
    var calcResult = processCalculation(
      input.processedOperands,
      input.processedOperators
    );
    // assert
    expect(calcResult.result).toBe(10);
  });

  test("Should be able to handle mixed operators: 5 1 5 8 + - * equals -60", () => {
    var input = processInput("5 1 5 8 + - *");
    var calcResult = processCalculation(
      input.processedOperands,
      input.processedOperators
    );
    // assert
    expect(calcResult.result).toBe(-60);
  });

  test("multi-line input: 5 5 5 5 8 + + - and 13 + should return 0", () => {
    // arrange and act
    var operand = [];
    var operator = [];
    var calcResult;
    var input;

    input = processInput("5 5 5 8 + + -");
    calcResult = processCalculation(
      input.processedOperands,
      input.processedOperators
    );
    operand = calcResult.operandStack;
    operator = calcResult.operatorQueue;

    input = processInput("13 +");
    operand = operand.concat(input.processedOperands);
    operator = input.processedOperators.concat(operator);

    calcResult = processCalculation(operand, operator);
    // assert
    expect(calcResult.result).toBe(0);
  });
});
