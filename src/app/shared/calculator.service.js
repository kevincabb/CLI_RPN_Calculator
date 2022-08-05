const { Operator, CalcConstant } = require("./enums.js");

exports.processCalculation = (operandStack, operatorQueue) => {
  const { Addition, Subtraction, Multiplication, Division } = Operator;
  const { MinOperandStackLength, MinOperatorQueueLength } = CalcConstant;
  const operatorSet = new Set(Object.values(Operator));
  let resultObj = {};

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
          resultObj.result = operandOne + operandTwo;
          operandStack.push(resultObj.result);
          break;
        case Subtraction:
          resultObj.result = operandOne - operandTwo;
          operandStack.push(resultObj.result);
          break;
        case Multiplication:
          resultObj.result = operandOne * operandTwo;
          operandStack.push(resultObj.result);
          break;
        case Division:
          resultObj.result = operandOne / operandTwo;
          operandStack.push(resultObj.result);
          break;
      }
      // resultObj for calculator state management
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
