const { Operator, CalcConstant } = require("./enums.js");

exports.processCalculation = (operandStack, operatorQueue) => {

  const { Addition, Subtraction, Multiplication, Division } = Operator;
  const { MinOperandStackLength, MinOperatorQueueLength } = CalcConstant;
  const operatorSet = new Set(Object.values(Operator));
  let resultObj = {};
  let result;

  // Keep computing until stack and queue 
  // requirements are not valid
  while (operandStack.length >= MinOperandStackLength && 
         operatorQueue.length >= MinOperatorQueueLength) {

    const operation = operatorQueue.pop();

    // Only run calculations on ( +, -, *, /)
    if (operatorSet.has(operation)) {
      const operandTwo = operandStack.pop();
      const operandOne = operandStack.pop();

      switch (operation) {
        case Addition:
          result = Number(operandOne) + Number(operandTwo);
          operandStack.push(result);
          break;
        case Subtraction:
          result = Number(operandOne) - Number(operandTwo);
          operandStack.push(result);
          break;
        case Multiplication:
          result = Number(operandOne) * Number(operandTwo);
          operandStack.push(result);
          break;
        case Division:
          result = Number(operandOne) / Number(operandTwo);
          operandStack.push(result);
          break;
      }
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
      processedOperands.push(input);
    }
  }
  return { processedOperands, processedOperators };
};
