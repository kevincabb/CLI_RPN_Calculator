const { processCalculation, processInput } = require("../shared/calculator.service");
const { CalcAppAction, CalcConstant } = require("../shared/enums");

class Calculator {
  constructor() {
    this.userPrompt = require("prompt-sync")();
    this.operandStack = [];
    this.operatorQueue = [];
    this.calculatedResult = false;
    this.runApp = true;
  }

  // Initializes Calculator
  initCalculator() {
    this.printTitle();

    while (this.runApp) {
      const input = this.userPrompt(">");

      if (!input.length) {
        this.printInstructions();
        continue;
      }

      this.checkAction(input);
      this.evaluateInput(input);
      this.calculation(this.operandStack, this.operatorQueue);
      this.printInput(input);
    }
  }

  // Check for EOF or Clear
  checkAction(input) {
    const { End, Clear } = CalcAppAction;

    if (input === End) {
      this.runApp = false;
      console.log("End of Calculation");
    }

    if (input === Clear) {
      this.operandStack = [];
      this.operatorQueue = [];
      this.result = undefined;
    }
  }

  evaluateInput(input) {
    const processedInput = processInput(input);
    const { processedOperands, processedOperators } = processedInput;

    // Update operand stack
    if (this.operandStack.length) {
      this.operandStack = this.operandStack.concat(processedOperands);
    } else {
      this.operandStack = processedOperands;
    }

    // Update operator queue
    if (this.operatorQueue.length) {
      this.operatorQueue = processedOperators.concat(this.operatorQueue);
    } else {
      this.operatorQueue = processedOperators;
    }
  }

  calculation(operandStack, operatorQueue) {
    const processedCalc = processCalculation(operandStack, operatorQueue);

    // Update state of calculator
    if (processedCalc.validCalc) {
      this.calculatedResult = processedCalc.validCalc;
      this.result = processedCalc.result;
      this.operandStack = processedCalc.operandStack;
      this.operatorQueue = processedCalc.operatorQueue;
    }
  }

  printTitle() {
    console.log(
      " *********************************** \n ********* RPN CALCULATOR ********** \n ***********************************"
    );
    this.printInstructions();
  }

  printInstructions() {
    console.log(" CLEAR: Enter c \n EOF: Enter q");
    console.log(" \n Enter Values or Operators (+ - * /):");
  }

  printInput(input) {
    if (this.calculatedResult) {
      this.calculatedResult = false;
      console.log(this.result);
    } else {
      console.log(input);
    }
  }
}

const rpnCalculator = new Calculator();
rpnCalculator.initCalculator();
