class Calculator {
  constructor() {
    this.userPrompt = require("prompt-sync")();
    this.enums = require("./enums.js");
    this.operandStack = [];
    this.operatorStack = [];
    this.operatorSet = new Set(Object.values(this.enums.Operator));
    this.processedInput = false;
    this.endApp = false;
  }

  initCalculator() {
    this.printTitle();
    while (!this.endApp) {
      const input = this.userPrompt(">");

      if (!input.length) {
        this.printInstructions();
        continue;
      }

      this.checkAction(input);
      this.evaluateInput(input);
    }
  }

  checkAction(input) {
    const { End, Clear } = this.enums.CalcAppAction;

    if (input === End) {
      this.endApp = true;
      console.log("End of Calculation");
    }

    if (input === Clear) {
      this.operandStack = [];
      this.operatorStack = [];
      this.result = undefined;
    }
  }

  evaluateInput(input) {
    const inputsToProcess = input.trim().split(" ");

    for (let input of inputsToProcess) {
      if (isNaN(input)) {
        this.operatorStack.push(input);
      } else {
        this.operandStack.push(input);
      }
      this.processCalculation();
    }

    if (this.processedInput) {
      console.log(this.result);
      this.processedInput = false;
    } else {
      console.log(input);
    }
  }

  processCalculation() {
    const { MinOperandStackLength, MinOperatorStackLength } =
      this.enums.CalcConstant;

    while (
      this.operandStack.length >= MinOperandStackLength &&
      this.operatorStack.length >= MinOperatorStackLength
    ) {
      const operation = this.operatorStack.pop();

      if (this.operatorSet.has(operation)) {
        this.operatorCases(operation);
      }
    }
  }

  operatorCases(operation) {
    const { Addition, Subtraction, Multiplication, Division } =
      this.enums.Operator;
    const numInputTwo = this.operandStack.pop();
    const numInputOne = this.operandStack.pop();

    switch (operation) {
      case Addition:
        this.result = Number(numInputOne) + Number(numInputTwo);
        this.processedInput = true;
        this.operandStack.push(this.result);
        break;
      case Subtraction:
        this.result = Number(numInputOne) - Number(numInputTwo);
        this.processedInput = true;
        this.operandStack.push(this.result);
        break;
      case Multiplication:
        this.result = Number(numInputOne) * Number(numInputTwo);
        this.processedInput = true;
        this.operandStack.push(this.result);
        break;
      case Division:
        this.result = Number(numInputOne) / Number(numInputTwo);
        this.processedInput = true;
        this.operandStack.push(this.result);
        break;
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
}

const calc = new Calculator();
calc.initCalculator();
