const { Operator, CalcConstant } = require("./enums.js");

exports.processCalculation = (operandStack, operatorQueue) => {
  const { Addition, Subtraction, Multiplication, Division } = Operator;
  const { MinOperandStackLength, MinOperatorQueueLength } = CalcConstant;
  const operatorSet = new Set(Object.values(Operator));
  let resultObj = {};
  let result;

  // Keep computing until stack and queue
  // requirements are not valid
  while (
    operandStack.length >= MinOperandStackLength &&
    operatorQueue.length >= MinOperatorQueueLength
  ) {
    const operation = operatorQueue.pop();

    // Only run calculations on ( +, -, *, /)
    if (operatorSet.has(operation)) {
      // Because of the stack order, first popped number will be the second operand
      const operandTwo = operandStack.pop();
      const operandOne = operandStack.pop();

      switch (operation) {
        case Addition:
          result = operandOne + operandTwo;
          operandStack.push(result);
          break;
        case Subtraction:
          result = operandOne - operandTwo;
          operandStack.push(result);
          break;
        case Multiplication:
          result = operandOne * operandTwo;
          operandStack.push(result);
          break;
        case Division:
          result = operandOne / operandTwo;
          operandStack.push(result);
          break;
      }
      // resultObj for calculator state management
      resultObj.result = result;
      resultObj.operandStack = operandStack;
      resultObj.operatorQueue = operatorQueue;
      resultObj.validCalc = true;
    }
  }

  return resultObj;
};

exports.processInput = (input) => {
  const inputsToProcess = input.trim().split(" ");
  let processedOperands = [];
  let processedOperators = [];

  // Builds operand stack and operator queue
  for (let input of inputsToProcess) {
    if (isNaN(input)) {
      processedOperators.unshift(input);
    } else {
      processedOperands.push(Number(input));
    }
  }
  return { processedOperands, processedOperators };
};
